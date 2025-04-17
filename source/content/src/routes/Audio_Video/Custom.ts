import * as fs from "fs";
import colors from "colors";
import * as path from "path";
import { z, ZodError } from "zod";
import ffmpeg from "fluent-ffmpeg";
import ytdlx from "../../utils/Agent";
import { EventEmitter } from "events";
import { locator } from "../../utils/locator";
var ZodSchema = z.object({
  query: z.string().min(2),
  output: z.string().optional(),
  useTor: z.boolean().optional(),
  stream: z.boolean().optional(),
  verbose: z.boolean().optional(),
  metadata: z.boolean().optional(),
  filter: z.enum(["invert", "rotate90", "rotate270", "grayscale", "rotate180", "flipVertical", "flipHorizontal"]).optional(),
  resolution: z.enum(["144p", "240p", "360p", "480p", "720p", "1080p", "1440p", "2160p", "3072p", "4320p", "6480p", "8640p", "12000p"]),
});

/**
 * Fetches and processes video from a specified query with customizable resolution and video filters.
 *
 * This function allows you to search for video content, select a specific resolution,
 * apply video filters, stream the output, save it to a file, or retrieve metadata.
 * It utilizes `ffmpeg` for video processing and supports optional Tor usage for enhanced privacy.
 *
 * @param {object} options - An object containing the configuration options for fetching and processing video.
 * @param {string} options.query - The search query string (minimum 2 characters) to find the desired video. This is a mandatory parameter.
 * @param {boolean} [options.stream=false] - An optional boolean value that, if set to `true`, will enable streaming of the video.
 * When streaming is enabled, the `output` parameter can be used to specify the save location.
 * This option cannot be used when `metadata` is `true`.
 * @param {string} [options.output] - An optional string specifying the directory path where the downloaded video file should be saved.
 * This parameter is only applicable when the `stream` option is set to `true` and `metadata` is `false`.
 * If not provided, the video file will be saved in the current working directory.
 * @param {boolean} [options.useTor=false] - An optional boolean value that, if set to `true`, will route the network request through the Tor network.
 * This can help in anonymizing your request. Requires Tor to be running on your system.
 * @param {("invert" | "rotate90" | "rotate270" | "grayscale" | "rotate180" | "flipVertical" | "flipHorizontal")} [options.filter] - An optional string specifying a video filter to apply during processing.
 * This parameter is only applicable when `stream` is `true` and `metadata` is `false`. Available filters include:
 * - `"invert"`: Inverts the colors of the video.
 * - `"rotate90"`: Rotates the video by 90 degrees clockwise.
 * - `"rotate270"`: Rotates the video by 270 degrees clockwise.
 * - `"grayscale"`: Converts the video to grayscale.
 * - `"rotate180"`: Rotates the video by 180 degrees.
 * - `"flipVertical"`: Flips the video vertically.
 * - `"flipHorizontal"`: Flips the video horizontally.
 * @param {boolean} [options.metadata=false] - An optional boolean value that, if set to `true`, will only fetch and emit metadata about the video, without downloading or processing it.
 * This option cannot be used with `stream`, `output`, or `filter`.
 * @param {boolean} [options.verbose=false] - An optional boolean value that, if set to `true`, enables verbose logging to the console, providing more detailed information about the process.
 * @param {("144p" | "240p" | "360p" | "480p" | "720p" | "1080p" | "1440p" | "2160p" | "3072p" | "4320p" | "6480p" | "8640p" | "12000p")} options.resolution - A required string specifying the desired video resolution. Available options are:
 * - `"144p"`
 * - `"240p"`
 * - `"360p"`
 * - `"480p"`
 * - `"720p"`
 * - `"1080p"`
 * - `"1440p"`
 * - `"2160p"`
 * - `"3072p"`
 * - `"4320p"`
 * - `"6480p"`
 * - `"8640p"`
 * - `"12000p"`
 *
 * @returns {EventEmitter} An EventEmitter instance that emits events during the video processing.
 * The following events can be listened to:
 * - `"progress"`: Emitted with progress information during the download and processing of the video. The data is an object containing progress details.
 * - `"error"`: Emitted when an error occurs during any stage of the process, including argument validation, network requests, or FFmpeg operations. The emitted data is the error message or object.
 * - `"start"`: Emitted when the FFmpeg processing starts. The emitted data is the FFmpeg start command string.
 * - `"end"`: Emitted when the FFmpeg processing successfully completes. The emitted data is the filename of the processed video file.
 * - `"stream"`: Emitted when streaming is enabled (`stream: true` and `metadata: false`). The emitted data is an object with the following structure:
 * ```typescript
 * {
 * filename: string; // The full path to the output file
 * ffmpeg: ffmpeg.FfmpegCommand; // The FFmpeg command instance
 * }
 * ```
 * - `"metadata"`: Emitted when only metadata is requested (`metadata: true`). The emitted data is an object containing various metadata about the video.
 *
 * @example
 * // 1: Get metadata for a video with 720p resolution
 * YouTubeDLX.AudioVideoCustom({ query: "nature documentary", resolution: "720p", metadata: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 2: Get metadata for a video with 1080p resolution and verbose output
 * YouTubeDLX.AudioVideoCustom({ query: "concert performance", resolution: "1080p", metadata: true, verbose: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 3: Get metadata for a video with 480p resolution using Tor
 * YouTubeDLX.AudioVideoCustom({ query: "news report", resolution: "480p", metadata: true, useTor: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 4: Stream a video with 360p resolution
 * YouTubeDLX.AudioVideoCustom({ query: "funny cats video", resolution: "360p", stream: true })
 * .on("stream", (streamData) => console.log("Streaming to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 5: Stream a video with 720p resolution to a specific output directory
 * YouTubeDLX.AudioVideoCustom({ query: "music video", resolution: "720p", stream: true, output: "/path/to/save" })
 * .on("stream", (streamData) => console.log("Streaming to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 6: Stream a video with 1080p resolution and verbose logging
 * YouTubeDLX.AudioVideoCustom({ query: "tutorial video", resolution: "1080p", stream: true, verbose: true })
 * .on("stream", (streamData) => console.log("Streaming to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 7: Stream a video with 480p resolution using Tor
 * YouTubeDLX.AudioVideoCustom({ query: "anonymous video", resolution: "480p", stream: true, useTor: true })
 * .on("stream", (streamData) => console.log("Streaming via Tor to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 8: Stream a video with 144p resolution and the "grayscale" filter
 * YouTubeDLX.AudioVideoCustom({ query: "old film footage", resolution: "144p", stream: true, filter: "grayscale" })
 * .on("stream", (streamData) => console.log("Streaming with grayscale filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 9: Stream a video with 240p resolution and the "invert" filter
 * YouTubeDLX.AudioVideoCustom({ query: "experimental video", resolution: "240p", stream: true, filter: "invert" })
 * .on("stream", (streamData) => console.log("Streaming with invert filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 10: Stream a video with 360p resolution and the "rotate90" filter
 * YouTubeDLX.AudioVideoCustom({ query: "skateboard tricks", resolution: "360p", stream: true, filter: "rotate90" })
 * .on("stream", (streamData) => console.log("Streaming with rotate90 filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 11: Stream a video with 480p resolution and the "rotate270" filter
 * YouTubeDLX.AudioVideoCustom({ query: "vertical video compilation", resolution: "480p", stream: true, filter: "rotate270" })
 * .on("stream", (streamData) => console.log("Streaming with rotate270 filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 12: Stream a video with 720p resolution and the "rotate180" filter
 * YouTubeDLX.AudioVideoCustom({ query: "upside down video", resolution: "720p", stream: true, filter: "rotate180" })
 * .on("stream", (streamData) => console.log("Streaming with rotate180 filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 13: Stream a video with 1080p resolution and the "flipVertical" filter
 * YouTubeDLX.AudioVideoCustom({ query: "mirror effect video", resolution: "1080p", stream: true, filter: "flipVertical" })
 * .on("stream", (streamData) => console.log("Streaming with flipVertical filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 14: Stream a video with 1440p resolution and the "flipHorizontal" filter
 * YouTubeDLX.AudioVideoCustom({ query: "reversed view video", resolution: "1440p", stream: true, filter: "flipHorizontal" })
 * .on("stream", (streamData) => console.log("Streaming with flipHorizontal filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 15: Stream a video with 2160p resolution to output directory "/tmp/videos"
 * YouTubeDLX.AudioVideoCustom({ query: "4k drone footage", resolution: "2160p", stream: true, output: "/tmp/videos" })
 * .on("stream", (streamData) => console.log("Streaming to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 16: Stream a video with 3072p resolution using Tor and verbose output
 * YouTubeDLX.AudioVideoCustom({ query: "high quality animation", resolution: "3072p", stream: true, useTor: true, verbose: true })
 * .on("stream", (streamData) => console.log("Streaming via Tor to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 17: Stream a video with 4320p resolution with the "grayscale" filter and output directory "./downloads"
 * YouTubeDLX.AudioVideoCustom({ query: "8k black and white film", resolution: "4320p", stream: true, filter: "grayscale", output: "./downloads" })
 * .on("stream", (streamData) => console.log("Streaming with grayscale filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 18: Stream a video with 6480p resolution using Tor and the "invert" filter
 * YouTubeDLX.AudioVideoCustom({ query: "unusual colors video", resolution: "6480p", stream: true, useTor: true, filter: "invert" })
 * .on("stream", (streamData) => console.log("Streaming with invert filter via Tor to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 19: Stream a video with 8640p resolution with verbose output and the "rotate90" filter
 * YouTubeDLX.AudioVideoCustom({ query: "vertically filmed content", resolution: "8640p", stream: true, verbose: true, filter: "rotate90" })
 * .on("stream", (streamData) => console.log("Streaming with rotate90 filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 20: Stream a video with 12000p resolution to output directory "/media/ultra_hd" with verbose output and using Tor
 * YouTubeDLX.AudioVideoCustom({ query: "highest resolution test", resolution: "12000p", stream: true, output: "/media/ultra_hd", verbose: true, useTor: true })
 * .on("stream", (streamData) => console.log("Streaming via Tor to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 21: Get metadata for a video with 144p resolution
 * YouTubeDLX.AudioVideoCustom({ query: "very low quality video", resolution: "144p", metadata: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 22: Get metadata for a video with 240p resolution
 * YouTubeDLX.AudioVideoCustom({ query: "older video", resolution: "240p", metadata: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 23: Get metadata for a video with 360p resolution
 * YouTubeDLX.AudioVideoCustom({ query: "standard quality video", resolution: "360p", metadata: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 24: Get metadata for a video with 1440p resolution
 * YouTubeDLX.AudioVideoCustom({ query: "quad hd video", resolution: "1440p", metadata: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 25: Get metadata for a video with 2160p resolution
 * YouTubeDLX.AudioVideoCustom({ query: "4k video info", resolution: "2160p", metadata: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 26: Get metadata for a video with 3072p resolution
 * YouTubeDLX.AudioVideoCustom({ query: "5k video details", resolution: "3072p", metadata: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 27: Get metadata for a video with 4320p resolution
 * YouTubeDLX.AudioVideoCustom({ query: "8k video analysis", resolution: "4320p", metadata: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 28: Get metadata for a video with 6480p resolution
 * YouTubeDLX.AudioVideoCustom({ query: "12k video preview", resolution: "6480p", metadata: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 29: Get metadata for a video with 8640p resolution
 * YouTubeDLX.AudioVideoCustom({ query: "16k video information", resolution: "8640p", metadata: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 30: Get metadata for a video with 12000p resolution
 * YouTubeDLX.AudioVideoCustom({ query: "highest possible resolution video", resolution: "12000p", metadata: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 */
export default function AudioVideoCustom({ query, stream, output, useTor, filter, metadata, verbose, resolution }: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      if (!query) {
        emitter.emit("error", `${colors.red("@error:")} The 'query' parameter is always required.`);
        return;
      }
      if (!resolution) {
        emitter.emit("error", `${colors.red("@error:")} The 'resolution' parameter is always required.`);
        return;
      }
      if (metadata) {
        if (stream) {
          emitter.emit("error", `${colors.red("@error:")} The 'stream' parameter cannot be used when 'metadata' is true.`);
          return;
        }
        if (output) {
          emitter.emit("error", `${colors.red("@error:")} The 'output' parameter cannot be used when 'metadata' is true.`);
          return;
        }
        if (filter) {
          emitter.emit("error", `${colors.red("@error:")} The 'filter' parameter cannot be used when 'metadata' is true.`);
          return;
        }
      }
      if (stream && metadata) {
        emitter.emit("error", `${colors.red("@error:")} The 'stream' parameter cannot be true when 'metadata' is true.`);
        return;
      }
      if (output && (!stream || metadata)) {
        emitter.emit("error", `${colors.red("@error:")} The 'output' parameter can only be used when 'stream' is true and 'metadata' is false.`);
        return;
      }
      if (filter && (!stream || metadata)) {
        emitter.emit("error", `${colors.red("@error:")} The 'filter' parameter can only be used when 'stream' is true and 'metadata' is false.`);
        return;
      }
      ZodSchema.parse({ query, stream, output, useTor, filter, metadata, verbose, resolution });
      const engineData = await ytdlx({ query, verbose, useTor }).catch(error => {
        emitter.emit("error", `${colors.red("@error:")} Engine error: ${error?.message}`);
        return undefined;
      });
      if (!engineData) {
        emitter.emit("error", `${colors.red("@error:")} Unable to retrieve a response from the engine.`);
        return;
      }
      if (!engineData.metaData) {
        emitter.emit("error", `${colors.red("@error:")} Metadata was not found in the engine response.`);
        return;
      }
      const title = engineData.metaData.title?.replace(/[^a-zA-Z0-9_]+/g, "_") || "video";
      const folder = output ? output : process.cwd();
      if (!fs.existsSync(folder)) {
        try {
          fs.mkdirSync(folder, { recursive: true });
        } catch (mkdirError: any) {
          emitter.emit("error", `${colors.red("@error:")} Failed to create the output directory: ${mkdirError?.message}`);
          return;
        }
      }
      const instance: ffmpeg.FfmpegCommand = ffmpeg();
      try {
        const paths = await locator();
        instance.setFfmpegPath(paths.ffmpeg);
        instance.setFfprobePath(paths.ffprobe);
      } catch (locatorError: any) {
        emitter.emit("error", `${colors.red("@error:")} Failed to locate ffmpeg or ffprobe: ${locatorError?.message}`);
        return;
      }
      if (!engineData.AudioHighF?.url) {
        emitter.emit("error", `${colors.red("@error:")} Highest quality audio URL was not found.`);
        return;
      }
      instance.addInput(engineData.AudioHighF.url);
      instance.withOutputFormat("matroska");
      const resolutionWithoutP = resolution.replace("p", "");
      const vdata = engineData.ManifestHigh?.find((i: { format: string | string[] }) => i.format?.includes(resolutionWithoutP));
      if (vdata) {
        if (!vdata.url) {
          emitter.emit("error", `${colors.red("@error:")} Video URL not found for resolution: ${resolution}.`);
          return;
        }
        instance.addInput(vdata.url.toString());
      } else {
        emitter.emit("error", `${colors.red("@error:")} No video data found for resolution: ${resolution}. Use list_formats() maybe?`);
        return;
      }
      const filterMap: Record<string, string[]> = {
        grayscale: ["colorchannelmixer=.3:.4:.3:0:.3:.4:.3:0:.3:.4:.3"],
        invert: ["negate"],
        rotate90: ["rotate=PI/2"],
        rotate180: ["rotate=PI"],
        rotate270: ["rotate=3*PI/2"],
        flipHorizontal: ["hflip"],
        flipVertical: ["vflip"],
      };
      if (stream && filter && filterMap[filter]) instance.withVideoFilter(filterMap[filter]);
      instance.on("progress", progress => emitter.emit("progress", progress));
      instance.on("error", error => emitter.emit("error", `${colors.red("@error:")} FFmpeg error: ${error?.message}`));
      instance.on("start", start => emitter.emit("start", start));
      const filenameBase = `yt-dlx_AudioVideoCustom_${resolution}_`;
      let filename = `${filenameBase}${filter ? filter + "_" : "_"}${title}.mkv`;
      instance.on("end", () => emitter.emit("end", filename));
      if (stream && !metadata) {
        emitter.emit("stream", { filename: path.join(folder, filename), ffmpeg: instance });
        instance.output(path.join(folder, filename));
        instance.run();
      }
      if (!stream && metadata) {
        emitter.emit("metadata", {
          filename,
          metaData: engineData.metaData,
          ipAddress: engineData.ipAddress,
          AudioLowF: engineData.AudioLowF,
          AudioHighF: engineData.AudioHighF,
          AudioLowDRC: engineData.AudioLowDRC,
          AudioHighDRC: engineData.AudioHighDRC,
          VideoLowF: engineData.VideoLowF,
          VideoHighF: engineData.VideoHighF,
          VideoLowHDR: engineData.VideoLowHDR,
          VideoHighHDR: engineData.VideoHighHDR,
          ManifestLow: engineData.ManifestLow,
          ManifestHigh: engineData.ManifestHigh,
        });
      }
    } catch (error) {
      if (error instanceof ZodError) emitter.emit("error", `${colors.red("@error:")} Argument validation failed: ${error.errors.map(e => `${e.path.join(".")}: ${e.message}`).join(", ")}`);
      else if (error instanceof Error) emitter.emit("error", `${colors.red("@error:")} ${error?.message}`);
      else emitter.emit("error", `${colors.red("@error:")} An unexpected error occurred: ${String(error)}`);
    } finally {
      console.log(colors.green("@info:"), "❣️ Thank you for using yt-dlx. Consider 🌟starring the GitHub repo https://github.com/yt-dlx.");
    }
  })();
  return emitter;
}
