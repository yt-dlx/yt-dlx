import * as fsx from "fs-extra";
import * as path from "path";

async function scanner(
  directory: string,
  execName: string
): Promise<string | null> {
  try {
    const files = await fsx.readdir(directory);
    for (const file of files) {
      const filePath = path.join(directory, file);
      const stat = await fsx.stat(filePath);
      if (stat.isDirectory()) {
        const result = await scanner(filePath, execName);
        if (result) return result;
      } else {
        if (
          file.toLowerCase() === execName.toLowerCase() ||
          file.toLowerCase() === execName.toLowerCase() + ".exe"
        ) {
          return filePath;
        }
      }
    }
    return null;
  } catch (error) {
    return null;
  }
}

export async function main() {
  const projectDirectory = __dirname;
  const executablesToFind = ["ffmpeg", "ffprobe", "cprobe"];
  const results: { [key: string]: string } = {};
  for (const execName of executablesToFind) {
    const execPath = await scanner(projectDirectory, execName);
    results[execName] = execPath || "";
  }
  return results;
}
