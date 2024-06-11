import * as fs from "fs";
import * as path from "path";

const rootDir = path.resolve(__dirname, "..");
const filenames = ["cprobe.exe", "ffmpeg.exe", "ffplay.exe", "ffprobe.exe"];
const findFiles = (dir: string, files: string[]) => {
  return files.filter((file) => fs.existsSync(path.join(dir, file)));
};
const foundFiles = findFiles(rootDir, filenames);
export { foundFiles };
