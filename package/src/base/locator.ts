import colors from "colors";
import { readdir, stat } from "fs/promises";
import { resolve, join, extname } from "path";
interface ExecPaths {
  [key: string]: string;
}
async function findRootDirectory(startPath: string): Promise<string | null> {
  let currentPath = resolve(startPath);
  const root = resolve("/");
  while (currentPath !== root) {
    try {
      const files = await readdir(currentPath);
      if (files.includes("package.json")) return currentPath;
      currentPath = resolve(currentPath, "..");
    } catch (error) {
      console.warn(colors.yellow("@warning:"), `Cannot read ${currentPath}:`, error);
      return null;
    }
  }
  return null;
}
async function scanForExecutables(directory: string, execNames: string[], platform: NodeJS.Platform = process.platform): Promise<ExecPaths> {
  const results: ExecPaths = {};
  const targetNames = new Set<string>();
  for (const name of execNames) {
    targetNames.add(name.toLowerCase());
    if (platform === "win32") {
      targetNames.add(`${name.toLowerCase()}.exe`);
    }
  }
  async function searchDir(currentDir: string): Promise<void> {
    try {
      const entries = await readdir(currentDir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = join(currentDir, entry.name);
        if (entry.isDirectory()) {
          if (entry.name === "node_modules") continue;
          await searchDir(fullPath);
        } else if (entry.isFile()) {
          const fileName = entry.name.toLowerCase();
          if (targetNames.has(fileName)) {
            const fileStat = await stat(fullPath);
            const isExecutable = process.platform !== "win32" ? (fileStat.mode & 0o111) !== 0 : extname(fileName) === ".exe";
            if (isExecutable) {
              const baseName = fileName.replace(/\.exe$/, "");
              if (!results[baseName]) results[baseName] = fullPath;
            }
          }
        }
      }
    } catch (error) {
      console.warn(colors.yellow("@warning:"), `Error scanning ${currentDir}:`, error);
    }
  }
  await searchDir(directory);
  return results;
}
export async function locator(execNames: string[] = ["ffmpeg", "ffprobe", "cprobe"], startPath: string = resolve(__dirname, "../../..")): Promise<ExecPaths> {
  try {
    const rootDir = await findRootDirectory(startPath);
    if (!rootDir) {
      console.log(colors.red("@error:"), "Root directory not found.");
      return {};
    }
    const results = await scanForExecutables(rootDir, execNames);
    for (const name of execNames) {
      if (!results[name]) {
        console.log(colors.red("@error:"), `${name} not found.`);
        results[name] = "";
      }
    }
    return results;
  } catch (error) {
    console.error(colors.red("@error:"), "Error in locator:", error);
    return {};
  }
}
