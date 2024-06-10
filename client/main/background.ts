// ==============================================[ Imports ]==============================================
import path from "path";
import * as fs from "fs";
import ytdlx from "yt-dlx";
import colors from "colors";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import { app, ipcMain as api } from "electron";
// ==============================================[ Imports ]==============================================
//
//
//
// ============================================[ App Handlers ]===========================================
const isProd = process.env.NODE_ENV === "production";
if (isProd) serve({ directory: "app" });
else app.setPath("userData", `${app.getPath("userData")} (development)`);
(async () => {
  await app.whenReady();
  const mainWindow = createWindow("main", {
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  if (isProd) await mainWindow.loadURL("app://./home");
  const port = process.argv[2];
  await mainWindow.loadURL(`http://localhost:${port}/home`);
  mainWindow.webContents.openDevTools();
})();
app.on("window-all-closed", () => app.quit());
// ============================================[ App Handlers ]===========================================
//
//
//
// ============================================[ IPC Handlers ]===========================================
api.on("time", async (event, response) => event.reply("time", response));
api.on("add", async (event, response) => {
  try {
    event.reply("add", response.num1 + response.num2);
  } catch (error: any) {
    event.reply("add", error.message);
  }
});
api.on("search", async (event, response) => {
  try {
    var TubeBody: any;
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
  } catch (error: any) {
    event.reply("search", error.message);
  }
});
api.on("audio", async (event, response) => {
  try {
    console.log(colors.green("❓ videoId:"), colors.italic(response.videoId));
    var io = await ytdlx.AudioOnly.Single.Highest({
      stream: true,
      metadata: false,
      query: response.videoId,
      useTor: response.useTor || false,
      verbose: response.verbose || false,
      output: response.output || undefined,
    });
    if (io && "ffmpeg" in io && "filename" in io) {
      io.ffmpeg.pipe(fs.createWriteStream(io.filename), {
        end: true,
      });
      io.ffmpeg.on(
        "progress",
        ({ percent, timemark }: { percent: number; timemark: string }) => {
          event.reply("audio", { percent, timemark });
        }
      );
    } else event.sender.send("AudioError", "ffmpeg or filename not found!");
  } catch (error: any) {
    event.reply("audio", error.message);
  }
});
// ============================================[ IPC Handlers ]===========================================
