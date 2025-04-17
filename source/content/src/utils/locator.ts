import colors from "colors";
import * as path from "path";
import * as fsx from "fs-extra";
import { spawn } from "child_process";

async function getBinaryPath(execName: string): Promise<string | null> {
  try {
    const nodeModulesPath = path.join(process.cwd(), "node_modules", "yt-dlx", "pkg");
    const binaryPath = path.join(nodeModulesPath, execName + (process.platform === "win32" ? ".exe" : process.platform === "linux" ? ".bin" : ""));
    try {
      await fsx.access(binaryPath, fsx.constants.X_OK);
      return `"${binaryPath}"`;
    } catch {
      const devPath = path.join(process.cwd(), "pkg", execName + (process.platform === "win32" ? ".exe" : process.platform === "linux" ? ".bin" : ""));
      await fsx.access(devPath, fsx.constants.X_OK);
      return `"${devPath}"`;
    }
  } catch {
    return null;
  }
}
export async function locator() {
  try {
    const results: { [key: string]: string } = {};
    const execNames = ["ffmpeg", "ffprobe", "ytprobe"];
    for (const execName of execNames) {
      const execPath = await getBinaryPath(execName);
      if (execPath) results[execName] = execPath;
      else {
        console.log(colors.red("@red:"), `${execName} not found in package binary directory. Auto-Downloading....`);
        const postdepsPath = path.join(process.cwd(), "postdeps.mjs");
        const nodeProcess = spawn("node", [postdepsPath]);
        nodeProcess.stdout.on("data", data => console.log(data.toString()));
        nodeProcess.stderr.on("data", data => console.error(data.toString()));
        nodeProcess.on("close", code => console.log(`child process exited with code ${code}`));
        results[execName] = "";
      }
    }
    return results;
  } catch (error) {
    console.error(colors.red("@error:"), "Error in locator function:", error);
    return {};
  }
}
