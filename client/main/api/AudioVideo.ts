import * as fs from "fs";
import ytdlx from "yt-dlx";
import { ipcMain as api } from "electron";

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
