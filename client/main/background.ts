import path from "path";
import * as fs from "fs";
import ytdlx from "yt-dlx";
import colors from "colors";
import fetch from "node-fetch";
import ffmpeg from "fluent-ffmpeg";
import serve from "electron-serve";
import { spawn } from "child_process";
import { encore } from "yt-dlx-encore";
import { createWindow } from "./helpers";
import { ipcMain as api, dialog, app } from "electron";
import { singleVideoType, searchVideosType } from "yt-dlx/out/types/web";

const onprod = process.env.NODE_ENV === "production";
if (onprod) serve({ directory: "app" });
else app.setPath("userData", `${app.getPath("userData")} (development)`);
// ================================================================================
// const startServer = (): Promise<void> => {
// return new Promise<void>((resolve, reject) => {
// let serverExecutable: string;
// switch (process.platform) {
// case "win32":
// serverExecutable = "server-win.exe";
// break;
// case "linux":
// serverExecutable = "server-linux";
// break;
// case "darwin":
// serverExecutable = "server-macos";
// break;
// default:
// reject(new Error(`Unsupported platform: ${process.platform}`));
// return;
// }
// const serverPath = path.join(__dirname, serverExecutable);
// const serverProcess = spawn(serverPath);
// serverProcess.on("error", err => {
// console.error(`Failed to start ${serverExecutable}:`, err);
// reject(err);
// });
// serverProcess.stdout.on("data", data => {
// console.log(`${serverExecutable}: ${data}`);
// });
// serverProcess.stderr.on("data", data => {
// console.error(`${serverExecutable} error: ${data}`);
// });
// serverProcess.on("close", code => {
// if (code !== 0) {
// console.error(`${serverExecutable} exited with code ${code}`);
// reject(new Error(`${serverExecutable} exited with code ${code}`));
// } else resolve();
// });
// });
// };
// ================================================================================
(async () => {
  try {
    // await startServer();
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
// ================================================================================
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
api.on("formats", async (event, response) => {
  try {
    console.log(colors.green("❓ query:"), colors.italic(response.query));
    const io = await ytdlx.info.list_formats({
      query: response.query,
      verbose: response.verbose || false,
    });
    if (io) event.reply("formats", io);
    else event.sender.send("formats", null);
  } catch (error) {
    event.reply("formats", error.message);
  }
});
api.on("Audio", async (event, response) => {
  try {
    const param = new URLSearchParams({
      verbose: response.verbose || "true",
      useTor: response.useTor || "true",
      query: response.query,
      metadata: "true",
    }).toString();
    const resp = await fetch(`http://localhost:8642/api/meta?${param}`);
    const metadata = await resp.json();
    const proc: ffmpeg.FfmpegCommand = ffmpeg()
      .setFfprobePath((await encore().then(fp => fp.ffprobe)).toString())
      .setFfmpegPath((await encore().then(fp => fp.ffmpeg)).toString())
      .addOption("-headers", "X-Forwarded-For: " + metadata.ipAddress)
      .withOutputFormat("avi");
    switch (response.quality) {
      case "Highest":
        proc.addInput(metadata.AudioHighF.url);
        proc.addInput(metadata.metaData.thumbnail);
        proc.output("yt-dlx_(AudioHighest)_(" + metadata.title + ")_.avi");
        break;
      case "Lowest":
        proc.addInput(metadata.AudioLowF.url);
        proc.addInput(metadata.metaData.thumbnail);
        proc.output("yt-dlx_(AudioLowest)_(" + metadata.title + ")_.avi");
        break;
      default:
        break;
    }
    proc.on("end", end => event.reply("AudioEnd", end));
    proc.on("error", error => event.reply("AudioError", error));
    proc.on("start", start => event.reply("AudioStart", start));
    proc.on("progress", progress => event.reply("AudioProgress", progress));
    proc.run();
  } catch (error) {
    event.reply("AudioError", error.message);
  }
});
// ================================================================================
api.handle("select-output-folder", async event => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });
  if (result.canceled) return null;
  else return result.filePaths[0];
});
app.on("window-all-closed", () => app.quit());
