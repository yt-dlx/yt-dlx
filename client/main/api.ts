import path from "path";
import * as fs from "fs";
import ytdlx from "yt-dlx";
import colors from "colors";
import { ipcMain as api, dialog } from "electron";
import { singleVideoType, searchVideosType } from "yt-dlx/out/types/web";

api.handle("select-save-location", async () => {
  const result = await dialog.showOpenDialog({
    title: "Select Save Location",
    buttonLabel: "Select Folder",
    properties: ["openDirectory"],
  });
  if (result.canceled || result.filePaths.length === 0) {
    return { filePath: null };
  }
  return { filePath: result.filePaths[0] };
});

api.on("search", async (event, response) => {
  try {
    let io: singleVideoType | searchVideosType[];
    if (response.videoId) {
      console.log(colors.green("❓ videoId:"), colors.italic(response.videoId));
      io = await ytdlx.ytSearch.Video.Single({
        query: "https://youtu.be/" + response.videoId,
      });
      if (io) event.reply("search", io);
      else event.sender.send("search", null);
    } else {
      console.log(colors.green("❓ query:"), colors.italic(response.query));
      io = await ytdlx.ytSearch.Video.Multiple({
        query: response.query,
      });
      if (io) event.reply("search", io);
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

api.on("audio", async (event, response) => {
  try {
    console.log(colors.green("❓ videoId:"), colors.italic(response.videoId));
    let io;
    if (response.quality === "highest") {
      io = await ytdlx.AudioOnly.Single.Highest({
        stream: true,
        metadata: false,
        query: response.videoId,
        useTor: response.useTor || false,
        verbose: response.verbose || false,
        output: response.output,
      });
    } else {
      io = await ytdlx.AudioOnly.Single.Lowest({
        stream: true,
        metadata: false,
        query: response.videoId,
        useTor: response.useTor || false,
        verbose: response.verbose || false,
        output: response.output,
      });
    }
    if (io && "ffmpeg" in io && "filename" in io) {
      io.ffmpeg.pipe(
        fs.createWriteStream(path.join(response.output, io.filename)),
        {
          end: true,
        },
      );
      io.ffmpeg.on("progress", ({ percent, timemark }) => {
        event.reply("audio", { percent, timemark });
      });
    } else event.sender.send("audio", "ffmpeg or filename not found!");
  } catch (error) {
    event.reply("audio", error.message);
  }
});

api.on("video", async (event, response) => {
  try {
    console.log(colors.green("❓ videoId:"), colors.italic(response.videoId));
    const io = await ytdlx.VideoOnly.Single.Highest({
      stream: true,
      metadata: false,
      query: response.videoId,
      useTor: response.useTor || false,
      verbose: response.verbose || false,
      output: response.output,
    });
    if (io && "ffmpeg" in io && "filename" in io) {
      io.ffmpeg.pipe(
        fs.createWriteStream(path.join(response.output, io.filename)),
        {
          end: true,
        },
      );
      io.ffmpeg.on("progress", ({ percent, timemark }) => {
        event.reply("video", { percent, timemark });
      });
    } else event.sender.send("video", "ffmpeg or filename not found!");
  } catch (error) {
    event.reply("video", error.message);
  }
});

api.on("audiovideo", async (event, response) => {
  try {
    console.log(colors.green("❓ videoId:"), colors.italic(response.videoId));
    const io = await ytdlx.AudioVideo.Single.Highest({
      stream: true,
      metadata: false,
      query: response.videoId,
      useTor: response.useTor || false,
      verbose: response.verbose || false,
      output: response.output,
    });
    if (io && "ffmpeg" in io && "filename" in io) {
      io.ffmpeg.pipe(
        fs.createWriteStream(path.join(response.output, io.filename)),
        {
          end: true,
        },
      );
      io.ffmpeg.on("progress", ({ percent, timemark }) => {
        event.reply("audiovideo", { percent, timemark });
      });
    } else event.sender.send("audiovideo", "ffmpeg or filename not found!");
  } catch (error) {
    event.reply("audiovideo", error.message);
  }
});
