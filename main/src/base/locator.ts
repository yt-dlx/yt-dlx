import colors from "colors";
import * as path from "path";
import * as fsx from "fs-extra";
async function findRootDirectory(currentPath: string): Promise<string | null> {
  const markerFile = "package.json";
  try {
    const files = await fsx.readdir(currentPath);
    if (files.includes(markerFile)) return currentPath;
    const parentDir = path.resolve(currentPath, "..");
    if (parentDir === currentPath) return null;
    return findRootDirectory(parentDir);
  } catch (error) {
    return null;
  }
}
async function scanner(directory: string, execName: string): Promise<string | null> {
  try {
    const files = await fsx.readdir(directory);
    for (const file of files) {
      const filePath = path.join(directory, file);
      const stat = await fsx.stat(filePath);
      if (stat.isDirectory()) {
        if (file === "node_modules") continue;
        const subFiles = await fsx.readdir(filePath);
        for (const subFile of subFiles) {
          const subFilePath = path.join(filePath, subFile);
          if (subFile.toLowerCase() === execName.toLowerCase() || subFile.toLowerCase() === execName.toLowerCase() + ".exe") return subFilePath;
        }
      } else {
        if (file.toLowerCase() === execName.toLowerCase() || file.toLowerCase() === execName.toLowerCase() + ".exe") return filePath;
      }
    }
    return null;
  } catch (error) {
    return null;
  }
}
export async function locator() {
  try {
    const initialPath = path.resolve(__dirname, "../../..");
    const rootDirectory = await findRootDirectory(initialPath);
    if (!rootDirectory) return {};
    const results: { [key: string]: string } = {};
    const execNames = ["ffmpeg", "ffprobe", "cprobe"];
    for (const execName of execNames) {
      const execPath = await scanner(rootDirectory, execName);
      if (execPath) {
        results[execName] = execPath;
      } else {
        console.log(colors.red("@error:"), `${execName} not found.`);
        results[execName] = "";
      }
    }
    return results;
  } catch (error) {
    console.error(colors.red("@error:"), "Error in locator function:", error);
    return {};
  }
}
