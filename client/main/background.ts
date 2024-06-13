import path from "path";
import * as fs from "fs";
import ytdlx from "yt-dlx";
import colors from "colors";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import { ipcMain as api, dialog, app } from "electron";
// ================================================================================
const onprod = process.env.NODE_ENV === "production";
if (onprod) serve({ directory: "app" });
else app.setPath("userData", `${app.getPath("userData")} (development)`);
(async () => {
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
      break;
    default:
      await mainWindow.loadURL("app://./home");
      break;
  }
  mainWindow.webContents.openDevTools();
})();
// ================================================================================
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
api.on("formats", async (event, response) => {
  try {
    console.log(colors.green("❓ query:"), colors.italic(response.query));
    var io = await ytdlx.info.list_formats({
      query: response.query,
      verbose: response.verbose || false,
    });
    if (io) event.reply("formats", io);
    else event.sender.send("formats", null);
  } catch (error: any) {
    event.reply("formats", error.message);
  }
});
api.on("AudioVideo", async (event, response) => {
  try {
    ytdlx.AudioVideo.Single.Highest({
      output: response.output || undefined,
      verbose: response.verbose || false,
      useTor: response.useTor || false,
      query: response.videoId,
      metadata: false,
      stream: true,
    })
      .on("end", end => event.reply("end", end))
      .on("error", error => {
        event.reply("error", error);
        console.error(error);
      })
      .on("start", start => event.reply("start", start))
      .on("progress", progress => event.reply("progress", progress))
      .on("metadata", metadata => event.reply("metadata", metadata))
      .on("ready", ({ ffmpeg, filename }) => {
        ffmpeg.pipe(fs.createWriteStream(filename), {
          end: true,
        });
      });
  } catch (error: any) {
    event.reply("AudioVideo", error.message);
  }
});
api.on("Video", async (event, response) => {
  try {
    ytdlx.VideoOnly.Single.Highest({
      output: response.output || undefined,
      verbose: response.verbose || false,
      useTor: response.useTor || false,
      query: response.videoId,
      metadata: false,
      stream: true,
    })
      .on("end", end => event.reply("end", end))
      .on("error", error => {
        event.reply("error", error);
        console.error(error);
      })
      .on("start", start => event.reply("start", start))
      .on("progress", progress => event.reply("progress", progress))
      .on("metadata", metadata => event.reply("metadata", metadata))
      .on("ready", ({ ffmpeg, filename }) => {
        ffmpeg.pipe(fs.createWriteStream(filename), {
          end: true,
        });
      });
  } catch (error: any) {
    event.reply("Video", error.message);
  }
});
api.on("Audio", async (event, response) => {
  console.log("Audio event received", response);
  try {
    ytdlx.AudioOnly.Single.Highest({
      output: response.output || undefined,
      verbose: response.verbose || false,
      useTor: response.useTor || false,
      query: response.videoId,
      metadata: false,
      stream: true,
    })
      .on("end", end => {
        console.log("Audio download end", end);
        event.reply("end", end);
      })
      .on("error", error => {
        console.error("Audio download error", error);
        event.reply("error", error);
      })
      .on("start", start => {
        console.log("Audio download start", start);
        event.reply("start", start);
      })
      .on("progress", progress => {
        console.log("Audio download progress", progress);
        event.reply("progress", progress);
      })
      .on("metadata", metadata => {
        console.log("Audio download metadata", metadata);
        event.reply("metadata", metadata);
      })
      .on("ready", ({ ffmpeg, filename }) => {
        console.log("Audio download ready", { ffmpeg, filename });
        ffmpeg.pipe(fs.createWriteStream(filename), {
          end: true,
        });
      });
  } catch (error) {
    console.error("Audio processing error", error);
    event.reply("Audio", error.message);
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
