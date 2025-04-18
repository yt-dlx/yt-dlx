# code 2: logic.py
import os
import sys
import json
import argparse
import subprocess
def find_bundled_file(relative_bundle_path):
    if getattr(sys, "frozen", False):
        base_path = sys._MEIPASS
    else:
        base_path = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(base_path, relative_bundle_path.replace("/", os.sep))
    if os.path.exists(file_path):
        return file_path
    else:
        return None
def run_executable(executable_name_without_ext, executable_path, args):
    if not executable_path:
        print(f"Error: {executable_name_without_ext} not found in bundle.", file=sys.stderr)
        sys.exit(1)
    command = [executable_path] + args
    is_ytprobe_script = executable_name_without_ext == "ytprobe"
    if is_ytprobe_script:
        command.insert(0, sys.executable)
    try:
        if is_ytprobe_script:
            result = subprocess.run(
                command,
                capture_output=True,
                text=True,
                check=False
            )
            modified_stdout = result.stdout.replace("yt-dlp", "yt-dlx")
            sys.stdout.write(modified_stdout)
            sys.stderr.write(result.stderr)
            sys.exit(result.returncode)
        else:
            result = subprocess.run(
                command,
                stdout=None,
                stderr=None,
                check=False
            )
            sys.exit(result.returncode)
    except FileNotFoundError:
         print(f"Error: The executable \"{command[0]}\" was not found. Make sure it exists at \"{executable_path}\" and has execute permissions.", file=sys.stderr)
         sys.exit(127)
    except PermissionError:
         print(f"Error: Permission denied to execute \"{command[0]}\". Make sure it has execute permissions.", file=sys.stderr)
         sys.exit(126)
    except subprocess.SubprocessError as e:
        print(f"Error running {executable_name_without_ext}: {e}", file=sys.stderr)
        sys.exit(1)
def main():
    parser = argparse.ArgumentParser(description="yt-dlx: YouTube downloader utility with bundled executables")
    parser.add_argument("--tor", nargs=argparse.REMAINDER, help="Run tor with the arguments...")
    parser.add_argument("--ffmpeg", nargs=argparse.REMAINDER, help="Run ffmpeg with the arguments...")
    parser.add_argument("--ffprobe", nargs=argparse.REMAINDER, help="Run ffprobe with the arguments...")
    parser.add_argument("--ytprobe", nargs=argparse.REMAINDER, help="Run ytprobe with the arguments...")
    args = parser.parse_args()
    if sys.platform == "win32":
        tor_path = find_bundled_file("context/windows/tor.exe")
        ffmpeg_path = find_bundled_file("context/windows/ffmpeg.exe")
        ffprobe_path = find_bundled_file("context/windows/ffprobe.exe")
        torrc_path = find_bundled_file("context/windows/torrc")
    else:
        tor_path = find_bundled_file("context/linux/tor.bin")
        ffmpeg_path = find_bundled_file("context/linux/ffmpeg.bin")
        ffprobe_path = find_bundled_file("context/linux/ffprobe.bin")
        torrc_path = find_bundled_file("context/linux/torrc")
    ytprobe_path = find_bundled_file("scripts/ytprobe.py")
    if args.tor is not None:
        if torrc_path:
            tor_args = ["-f", torrc_path] + args.tor
        else:
            tor_args = args.tor
        run_executable("tor", tor_path, tor_args)
    elif args.ffmpeg is not None:
        run_executable("ffmpeg", ffmpeg_path, args.ffmpeg)
    elif args.ffprobe is not None:
        run_executable("ffprobe", ffprobe_path, args.ffprobe)
    elif args.ytprobe is not None:
        run_executable("ytprobe", ytprobe_path, args.ytprobe)
    else:
        paths_info = {
            "tor": tor_path if tor_path else "Not found in bundle",
            "ffmpeg": ffmpeg_path if ffmpeg_path else "Not found in bundle",
            "ffprobe": ffprobe_path if ffprobe_path else "Not found in bundle",
            "ytprobe": ytprobe_path if ytprobe_path else "Not found in bundle",
        }
        print(json.dumps(paths_info, indent=2))
if __name__ == "__main__":
    main()