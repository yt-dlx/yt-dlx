import * as fs from "fs";
import * as path from "path";

const getFiles = (dir: string, files: string[]): string[] => {
  return files
    .filter((file) => fs.existsSync(path.join(dir, file)))
    .map((file) => path.join(dir, file));
};

const encore = getFiles(path.resolve(__dirname, ".."), [
  "cprobe.exe",
  "ffmpeg.exe",
  "ffprobe.exe",
]);

export { encore };
