import * as fs from "fs";
import colors from "colors";
import express from "express";
import YouTube from "../../../out/esm/src/index.js";
const audioFilters = ["echo", "slow", "speed", "phaser", "flanger", "panning", "reverse", "vibrato", "subboost", "surround", "bassboost", "nightcore", "superslow", "vaporwave", "superspeed"];
const videoFilters = ["grayscale", "invert", "rotate90", "rotate180", "rotate270", "flipHorizontal", "flipVertical"];
(async () => {
  try {
    for (const filter of audioFilters) {
      YouTube.AudioVideo.Lowest({
        audioFilter: filter,
        stream: false,
        verbose: true,
        useTor: false,
        output: "public/audiovideo",
        query: "video-NAME/ID/URL",
      });
    }
    for (const filter of videoFilters) {
      YouTube.AudioVideo.Lowest({
        videoFilter: filter,
        stream: false,
        verbose: true,
        useTor: false,
        output: "public/audiovideo",
        query: "video-NAME/ID/URL",
      });
    }
    YouTube.AudioVideo.Lowest({
      audioFilter: "nightcore",
      videoFilter: "rotate90",
      stream: false,
      verbose: true,
      useTor: false,
      output: "public/audiovideo",
      query: "video-NAME/ID/URL",
    });
  } catch (error) {
    console.error(colors.red(error.message));
  }
})();
(async () => {
  try {
    const result = YouTube.AudioVideo.Lowest({ stream: true, verbose: true, useTor: false, output: "public/mix", query: "video-NAME/ID/URL" });
    if (result && "ffmpeg" in result && "filename" in result) {
      result.ffmpeg.pipe(fs.createWriteStream(result.filename), { end: true });
    } else {
      console.error(colors.red("@error:"), "ffmpeg or filename not found!");
    }
  } catch (error) {
    console.error(colors.red(error.message));
  }
})();
(async () => {
  try {
    const server = express();
    server.get("/mix/:query", async (req, res) => {
      try {
        const queryParam = req.params.query;
        const result = YouTube.AudioVideo.Lowest({ stream: true, verbose: true, useTor: false, query: queryParam });
        if (result && "ffmpeg" in result && "filename" in result) {
          result.ffmpeg.pipe(res, { end: true });
        } else res.status(404).send("ffmpeg or filename not found!");
      } catch (error) {
        res.status(500).send(error.message);
      }
    });
    server.listen(3000, () => {
      console.log(colors.blue("@server:"), "running on port 3000");
    });
  } catch (error) {
    console.error(colors.red(error.message));
  }
})();
(async () => {
  try {
    const result = YouTube.AudioVideo.Lowest({ metadata: true, verbose: true, query: "video-NAME/ID/URL" });
    if (result?.metaData) {
      console.log(colors.green("Video Title:"), result.metaData.title);
      console.log(colors.green("Duration:"), result.metaData.duration);
      console.log(colors.green("View Count:"), result.metaData.view_count);
      console.log(colors.green("Available Formats:"), { audio: result.AudioLowF, video: result.VideoLowF });
    }
  } catch (error) {
    console.error(colors.red(error.message));
  }
})();
