import * as fs from "fs";
import ytdlx from "yt-dlx";
import { ipcMain as api, dialog } from "electron";

api.handle("select-output-folder", async event => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });
  if (result.canceled) return null;
  else return result.filePaths[0];
});

api.on("Audio", async (event, response) => {
  try {
    ytdlx.AudioOnly.Single.Highest({
      output: response.output || undefined,
      verbose: response.verbose || false,
      useTor: response.useTor || false,
      query: response.videoId,
      metadata: false,
      stream: true,
    })
      .on("end", end => event.reply("end", end))
      .on("error", error => event.reply("error", error))
      .on("start", start => event.reply("start", start))
      .on("progress", progress => event.reply("progress", progress))
      .on("metadata", metadata => event.reply("metadata", metadata))
      .on("ready", ({ ffmpeg, filename }) => {
        ffmpeg.pipe(fs.createWriteStream(filename), {
          end: true,
        });
      });
  } catch (error: any) {
    event.reply("Audio", error.message);
  }
});
