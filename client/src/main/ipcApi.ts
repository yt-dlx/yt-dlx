import { BrowserWindow, ipcMain as bot } from "electron";
import colors from "colors";
import ytdlx from "yt-dlx";
import * as fs from "fs";

var ipcApi = async (): Promise<void> => {
  bot.on(
    "AddSend",
    async (
      event: Electron.IpcMainEvent,
      data: {
        num1: number;
        num2: number;
      }
    ) => {
      event.sender.send("AddGet", data.num1 + data.num2);
    }
  );
  // ================================================================
  bot.on(
    "AudioSend",
    async (
      event: Electron.IpcMainEvent,
      data: {
        output: string;
        videoId: string;
        useTor: boolean;
        verbose: boolean;
      }
    ) => {
      console.log(colors.green("❓ videoId:"), colors.italic(data.videoId));
      try {
        var response = await ytdlx.AudioOnly.Single.Highest({
          stream: true,
          metadata: false,
          query: data.videoId,
          useTor: data.useTor || false,
          verbose: data.verbose || false,
          output: data.output || undefined,
        });
        if (response && "ffmpeg" in response && "filename" in response) {
          response.ffmpeg.pipe(fs.createWriteStream(response.filename), {
            end: true,
          });
          response.ffmpeg.on(
            "progress",
            ({ percent, timemark }: { percent: number; timemark: string }) =>
              event.sender.send("AudioGet", { percent, timemark })
          );
        } else event.sender.send("AudioError", "ffmpeg or filename not found!");
      } catch (error: any) {
        event.sender.send("AudioError", error.message);
      }
    }
  );
  // ================================================================
  bot.on(
    "SearchSend",
    async (
      event: Electron.IpcMainEvent,
      data: {
        query: string;
        videoId: string;
      }
    ) => {
      try {
        var TubeBody: any;
        if (data.videoId) {
          console.log(colors.green("❓ videoId:"), colors.italic(data.videoId));
          TubeBody = await ytdlx.ytSearch.Video.Single({
            query: "https://youtu.be/" + data.videoId,
          });
          if (TubeBody) event.sender.send("SearchGet", TubeBody);
          else event.sender.send("SearchError", "Try Again!");
        } else {
          console.log(colors.green("❓ query:"), colors.italic(data.query));
          TubeBody = await ytdlx.ytSearch.Video.Multiple({
            query: data.query,
          });
          if (TubeBody) event.sender.send("SearchGet", TubeBody);
          else event.sender.send("SearchError", "Try Again!");
        }
      } catch (error: any) {
        event.sender.send("SearchError", error.message);
      }
    }
  );
  // ================================================================
  setInterval(() => {
    BrowserWindow.getAllWindows().forEach((window) => {
      window.webContents.send("TimeGet", new Date().toLocaleTimeString());
    });
  }, 1000);
};

export default ipcApi;
