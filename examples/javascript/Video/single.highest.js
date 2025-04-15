const fs = require("fs");
const colors = require("colors");
const express = require("express");
const YouTube = require("../../../out/cjs/src/index.js");

const videoFilters = ["grayscale", "invert", "rotate90", "rotate180", "rotate270", "flipHorizontal", "flipVertical"];

(async () => {
  try {
    for (const filter of videoFilters) {
      YouTube.default.VideoOnly.Highest({ filter, stream: false, verbose: true, useTor: false, output: "public/video", query: "video-NAME/ID/URL" });
    }
  } catch (error) {
    console.error(colors.red(error.message));
  }
})();

(async () => {
  try {
    const result = YouTube.default.VideoOnly.Highest({
      stream: true,
      verbose: true,
      useTor: false,
      output: "public/video",
      query: "video-NAME/ID/URL",
    });
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
    server.get("/video/:query", async (req, res) => {
      try {
        const queryParam = req.params.query;
        const result = YouTube.default.VideoOnly.Highest({ stream: true, verbose: true, useTor: false, query: queryParam });
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
    const result = YouTube.default.VideoOnly.Highest({ metadata: true, verbose: true, query: "video-NAME/ID/URL" });
    if (result?.metaData) {
      console.log(colors.green("Video Title:"), result.metaData.title);
      console.log(colors.green("Duration:"), result.metaData.duration);
      console.log(colors.green("View Count:"), result.metaData.view_count);
      console.log(colors.green("Available Formats:"), { standard: result.VideoHighF, hdr: result.VideoHighHDR, manifest: result.ManifestHigh });
    }
  } catch (error) {
    console.error(colors.red(error.message));
  }
})();
