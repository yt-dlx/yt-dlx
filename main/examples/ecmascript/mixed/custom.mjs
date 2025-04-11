import * as fs from "fs";
import colors from "colors";
import express from "express";
import YouTube from "../../../out/esm/src/index.js";
const audioFilters = [
  "echo",
  "slow",
  "speed",
  "phaser",
  "flanger",
  "panning",
  "reverse",
  "vibrato",
  "subboost",
  "surround",
  "bassboost",
  "nightcore",
  "superslow",
  "vaporwave",
  "superspeed",
];
const videoFilters = ["grayscale", "invert", "rotate90", "rotate180", "rotate270", "flipHorizontal", "flipVertical"];
const resolutions = ["144p", "240p", "360p", "480p", "720p", "1080p", "1440p", "2160p", "3072p", "4320p", "6480p", "8640p", "12000p"];
(async () => {
  try {
    for (const resolution of resolutions) {
      for (const filter of audioFilters) {
        YouTube.AudioVideo.Custom({
          resolution,
          audioFilter: filter,
          stream: false,
          verbose: true,
          useTor: false,
          output: "public/audiovideo",
          query: "video-NAME/ID/URL",
        });
      }
      for (const filter of videoFilters) {
        YouTube.AudioVideo.Custom({
          resolution,
          videoFilter: filter,
          stream: false,
          verbose: true,
          useTor: false,
          output: "public/audiovideo",
          query: "video-NAME/ID/URL",
        });
      }
      YouTube.AudioVideo.Custom({
        resolution,
        audioFilter: "bassboost",
        videoFilter: "grayscale",
        stream: false,
        verbose: true,
        useTor: false,
        output: "public/audiovideo",
        query: "video-NAME/ID/URL",
      });
    }
  } catch (error) {
    console.error(colors.red(error.message));
  }
})();
(async () => {
  try {
    for (const resolution of resolutions) {
      const result = YouTube.AudioVideo.Custom({
        resolution,
        stream: true,
        verbose: true,
        useTor: false,
        output: "public/mix",
        query: "video-NAME/ID/URL",
      });
      if (result && "ffmpeg" in result && "filename" in result) {
        result.ffmpeg.pipe(fs.createWriteStream(result.filename), { end: true });
      } else {
        console.error(colors.red("@error:"), "ffmpeg or filename not found!");
      }
    }
  } catch (error) {
    console.error(colors.red(error.message));
  }
})();
(async () => {
  try {
    const server = express();
    server.get("/mix/:resolution/:query", async (req, res) => {
      try {
        const queryParam = req.params.query;
        const resparam = req.params.resolution;
        if (!resolutions.includes(resparam)) {
          res.status(404).send("Invalid resolution parameter");
          return;
        }
        const result = YouTube.AudioVideo.Custom({ stream: true, verbose: true, useTor: false, query: queryParam, resolution: resparam });
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
    const result = YouTube.AudioVideo.Custom({ resolution: "1080p", metadata: true, verbose: true, query: "video-NAME/ID/URL" });
    if (result?.metaData) {
      console.log(colors.green("Video Title:"), result.metaData.title);
      console.log(colors.green("Duration:"), result.metaData.duration);
      console.log(colors.green("View Count:"), result.metaData.view_count);
      console.log(colors.green("Available Formats:"), {
        audio: result.AudioHighF,
        video: result.VideoHighF,
        hdr: result.VideoHighHDR,
        manifest: result.ManifestHigh,
      });
    }
  } catch (error) {
    console.error(colors.red(error.message));
  }
})();
