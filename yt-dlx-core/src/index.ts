import * as fs from "fs";
import * as path from "path";

const getFiles = (dir: string, files: string[]): Record<string, string> => {
  const filesObject: Record<string, string> = {};
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.existsSync(filePath)) filesObject[file] = filePath;
  });
  return filesObject;
};
const encore = getFiles(path.resolve(__dirname, ".."), [
  "cprobe.exe",
  "ffmpeg.exe",
  "ffprobe.exe",
]);
export { encore };
