import path from "path";
import ytdlx from "yt-dlx";
import colors from "colors";
import serve from "electron-serve";
import { spawn } from "child_process";
import { createWindow } from "./helpers";
import { ipcMain as api, dialog, app } from "electron";
import { singleVideoType, searchVideosType } from "yt-dlx/out/types/web";

const onprod = process.env.NODE_ENV === "production";
if (onprod) serve({ directory: "app" });
else app.setPath("userData", `${app.getPath("userData")} (development)`);
const startServer = (): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    let serverExecutable: string;
    switch (process.platform) {
      case "win32":
        serverExecutable = "server-win.exe";
        break;
      case "linux":
        serverExecutable = "server-linux";
        break;
      case "darwin":
        serverExecutable = "server-macos";
        break;
      default:
        reject(new Error(`Unsupported platform: ${process.platform}`));
        return;
    }
    const serverProcess = onprod
      ? spawn(path.join(process.resourcesPath, serverExecutable))
      : spawn(path.join(__dirname, "../resources", serverExecutable));
    serverProcess.on("error", err => {
      console.error(`Failed to start ${serverExecutable}:`, err);
      reject(err);
    });
    serverProcess.stdout.on("data", data => {
      console.log(`${serverExecutable}: ${data}`);
    });
    serverProcess.stderr.on("data", data => {
      console.error(`${serverExecutable} error: ${data}`);
    });
    serverProcess.on("close", code => {
      if (code !== 0) {
        console.error(`${serverExecutable} exited with code ${code}`);
        reject(new Error(`${serverExecutable} exited with code ${code}`));
      } else resolve();
    });
  });
};

(async () => {
  try {
    console.log(process.resourcesPath);
    await startServer();
    await app.whenReady();
    const mainWindow = createWindow("main", {
      fullscreen: true,
      autoHideMenuBar: true,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
      },
    });
    switch (onprod) {
      case false:
        await mainWindow.loadURL("http://localhost:" + process.argv[2] + "/home");
        mainWindow.webContents.openDevTools();
        break;
      default:
        await mainWindow.loadURL("app://./home");
        break;
    }
  } catch (error) {
    console.error("Error during app initialization:", error);
  }
})();

api.on("search", async (event, response) => {
  try {
    let TubeBody: singleVideoType | searchVideosType[];
    if (response.videoId) {
      console.log(colors.green("❓ videoId:"), colors.italic(response.videoId));
      TubeBody = await ytdlx.ytSearch.Video.Single({
        query: "https://youtu.be/" + response.videoId,
      });
      if (TubeBody) event.reply("search", TubeBody);
      else event.sender.send("search", null);
    } else {
      console.log(colors.green("❓ query:"), colors.italic(response.query));
      TubeBody = await ytdlx.ytSearch.Video.Multiple({
        query: response.query,
      });
      if (TubeBody) event.reply("search", TubeBody);
      else event.sender.send("search", null);
    }
  } catch (error) {
    event.reply("search", error.message);
  }
});
api.handle("select-output-folder", async event => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });
  if (result.canceled) return null;
  else return result.filePaths[0];
});
app.on("window-all-closed", () => app.quit());
