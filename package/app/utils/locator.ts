import colors from "colors";
import * as path from "path";
import * as fsx from "fs-extra";

/**
 * Attempts to find the path of the specified binary (e.g., ffmpeg, cprobe) in the project directory.
 * It first looks in the "node_modules/yt-dlx/out" directory, then checks the "out" directory if not found.
 *
 * @function getBinaryPath
 * @async
 * @param {string} execName - The name of the executable binary to locate (e.g., "ffmpeg", "cprobe").
 * @returns {Promise<string | null>} The path to the binary if found and accessible; otherwise, null.
 *
 * @example
 * const binaryPath = await getBinaryPath('ffmpeg');
 * console.log(binaryPath); // Output: Path to ffmpeg binary or null if not found
 */
async function getBinaryPath(execName: string): Promise<string | null> {
  try {
    const nodeModulesPath = path.join(process.cwd(), "node_modules", "yt-dlx", "out");
    const binaryPath = path.join(nodeModulesPath, execName + (process.platform === "win32" ? ".exe" : ""));
    try {
      await fsx.access(binaryPath, fsx.constants.X_OK);
      return binaryPath;
    } catch {
      const devPath = path.join(process.cwd(), "out", execName + (process.platform === "win32" ? ".exe" : ""));
      await fsx.access(devPath, fsx.constants.X_OK);
      return devPath;
    }
  } catch {
    return null;
  }
}

/**
 * Locates the paths of required binary executables (ffmpeg, ffprobe, cprobe) in the project directory.
 * It calls `getBinaryPath` for each binary and stores the results.
 * If any binary is not found, a warning is logged to the console.
 *
 * @function locator
 * @async
 * @returns {Promise<{ [key: string]: string }>} A promise resolving to an object containing the paths of the located binaries.
 *         The keys are the names of the binaries, and the values are their respective paths.
 *         If a binary is not found, the value will be an empty string.
 *
 * @example
 * const binaries = await locator();
 * console.log(binaries); // Output: { ffmpeg: 'path/to/ffmpeg', ffprobe: 'path/to/ffprobe', cprobe: 'path/to/cprobe' }
 */
export async function locator() {
  try {
    const results: { [key: string]: string } = {};
    const execNames = ["ffmpeg", "ffprobe", "cprobe"];
    for (const execName of execNames) {
      const execPath = await getBinaryPath(execName);
      if (execPath) {
        results[execName] = execPath;
      } else {
        console.log(colors.yellow("@warning:"), `${execName} not found in package binary directory.`);
        results[execName] = "";
      }
    }
    return results;
  } catch (error) {
    console.error(colors.red("@error:"), "Error in locator function:", error);
    return {};
  }
}
