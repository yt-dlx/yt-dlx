import * as fs from "fs";
import colors from "colors";
import * as path from "path";
import { z, ZodError } from "zod";
import ffmpeg from "fluent-ffmpeg";
import Tuber from "../../utils/Agent";
import { EventEmitter } from "events";
import { locator } from "../../utils/locator";
const ZodSchema = z.object({
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
 * Fetches and processes video from a specified query at a custom resolution with optional video filters.
 *
 * This function allows you to search for video content, download or stream it at a specific resolution,
 * apply video filters, save it to a file, or retrieve metadata.
 * It utilizes `ffmpeg` for processing and supports optional Tor usage for enhanced privacy.
 *
 * @param {object} options - An object containing the configuration options for fetching and processing video.
 * @param {string} options.query - The search query string (minimum 2 characters) to find the desired video. This is a mandatory parameter.
 * @param {boolean} [options.stream=false] - An optional boolean value that, if set to `true`, will enable streaming of the video.
 * When streaming is enabled, the `output` parameter can be used to specify the save location.
 * This option cannot be used when `metadata` is `true`.
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
 * @param {string} [options.output] - An optional string specifying the directory path where the downloaded video file should be saved.
 * This parameter is only applicable when the `stream` option is set to `true` and `metadata` is `false`.
 * If not provided, the video file will be saved in the current working directory.
 * @param {boolean} [options.verbose=false] - An optional boolean value that, if set to `true`, enables verbose logging to the console, providing more detailed information about the process.
 * @param {boolean} [options.metadata=false] - An optional boolean value that, if set to `true`, will only fetch and emit metadata about the video, without downloading or processing it.
 * This option cannot be used with `stream`, `output`, or `filter`.
 * @param {("144p" | "240p" | "360p" | "480p" | "720p" | "1080p" | "1440p" | "2160p" | "3072p" | "4320p" | "6480p" | "8640p" | "12000p")} options.resolution - The desired video resolution. This is a mandatory parameter.
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
 * // 1: Get metadata for a video at 720p resolution
 * YouTubeDLX.VideoCustom({ query: "nature documentary", resolution: "720p", metadata: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 2: Get metadata for a video at 1080p resolution with verbose logging
 * YouTubeDLX.VideoCustom({ query: "movie trailer", resolution: "1080p", metadata: true, verbose: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 3: Get metadata for a video at 480p resolution using Tor
 * YouTubeDLX.VideoCustom({ query: "old film", resolution: "480p", metadata: true, useTor: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 4: Stream a video at 360p resolution
 * YouTubeDLX.VideoCustom({ query: "funny cats", resolution: "360p", stream: true })
 * .on("stream", (streamData) => console.log("Streaming to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 5: Stream a video at 1080p resolution to a specific output directory
 * YouTubeDLX.VideoCustom({ query: "concert", resolution: "1080p", stream: true, output: "/path/to/save" })
 * .on("stream", (streamData) => console.log("Streaming to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 6: Stream a video at 720p resolution with verbose logging
 * YouTubeDLX.VideoCustom({ query: "tutorial", resolution: "720p", stream: true, verbose: true })
 * .on("stream", (streamData) => console.log("Streaming to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 7: Stream a video at 480p resolution using Tor
 * YouTubeDLX.VideoCustom({ query: "news report", resolution: "480p", stream: true, useTor: true })
 * .on("stream", (streamData) => console.log("Streaming via Tor to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 8: Stream a video at 144p resolution with the "grayscale" filter
 * YouTubeDLX.VideoCustom({ query: "silent movie", resolution: "144p", stream: true, filter: "grayscale" })
 * .on("stream", (streamData) => console.log("Streaming with grayscale filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 9: Stream a video at 2160p resolution with the "invert" filter
 * YouTubeDLX.VideoCustom({ query: "abstract video", resolution: "2160p", stream: true, filter: "invert" })
 * .on("stream", (streamData) => console.log("Streaming with invert filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 10: Stream a video at 720p resolution with output directory "/tmp/videos"
 * YouTubeDLX.VideoCustom({ query: "home video", resolution: "720p", stream: true, output: "/tmp/videos" })
 * .on("stream", (streamData) => console.log("Streaming to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 11: Stream a video at 1080p resolution using Tor and verbose logging
 * YouTubeDLX.VideoCustom({ query: "documentary", resolution: "1080p", stream: true, useTor: true, verbose: true })
 * .on("stream", (streamData) => console.log("Streaming via Tor to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 12: Stream a video at 480p resolution with the "rotate90" filter and output directory "./rotated_videos"
 * YouTubeDLX.VideoCustom({ query: "vertical video", resolution: "480p", stream: true, filter: "rotate90", output: "./rotated_videos" })
 * .on("stream", (streamData) => console.log("Streaming with rotate90 filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 13: Stream a video at 360p resolution with all optional parameters
 * YouTubeDLX.VideoCustom({ query: "old cartoon", resolution: "360p", stream: true, useTor: true, filter: "flipHorizontal", output: "./flipped_cartoons", verbose: true })
 * .on("stream", (streamData) => console.log("Streaming with flipHorizontal filter via Tor to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 14: Get metadata for a video at 144p resolution with verbose logging and Tor
 * YouTubeDLX.VideoCustom({ query: "very low quality video", resolution: "144p", metadata: true, verbose: true, useTor: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 15: Get metadata for a video at 8640p resolution
 * YouTubeDLX.VideoCustom({ query: "8k video", resolution: "8640p", metadata: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 16: Stream a video at 12000p resolution
 * YouTubeDLX.VideoCustom({ query: "highest resolution video", resolution: "12000p", stream: true })
 * .on("stream", (streamData) => console.log("Streaming to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 17: Stream a video at 240p with the "rotate180" filter
 * YouTubeDLX.VideoCustom({ query: "upside down video", resolution: "240p", stream: true, filter: "rotate180" })
 * .on("stream", (streamData) => console.log("Streaming with rotate180 filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 18: Stream a video at 3072p with the "flipVertical" filter and verbose logging
 * YouTubeDLX.VideoCustom({ query: "vertically flipped high quality", resolution: "3072p", stream: true, filter: "flipVertical", verbose: true })
 * .on("stream", (streamData) => console.log("Streaming with flipVertical filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 19: Get metadata for a video at 360p
 * YouTubeDLX.VideoCustom({ query: "standard definition video", resolution: "360p", metadata: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 20: Stream a video at 6480p using Tor and the "flipHorizontal" filter
 * YouTubeDLX.VideoCustom({ query: "horizontally flipped 6k", resolution: "6480p", stream: true, useTor: true, filter: "flipHorizontal" })
 * .on("stream", (streamData) => console.log("Streaming with flipHorizontal filter via Tor to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 */
export default function VideoCustom({ query, stream, useTor, filter, output, verbose, metadata, resolution }: z.infer<typeof ZodSchema>): EventEmitter {
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
      ZodSchema.parse({ query, stream, useTor, filter, output, verbose, metadata, resolution });
      const engineData = await Tuber({ query, verbose, useTor }).catch(error => {
        emitter.emit("error", `${colors.red("@error:")} Engine error: ${error?.message}`);
        return undefined;
      });
      if (!engineData) {
        emitter.emit("error", `${colors.red("@error:")} Unable to retrieve a response from the engine.`);
        return;
      }
      if (!engineData.metaData) {
        emitter.emit("error", `${colors.red("@error:")} Metadata not found in the engine response.`);
        return;
      }
      const title = engineData.metaData.title?.replace(/[^a-zA-Z0-9_]+/g, "_") || "video";
      const folder = output ? output : process.cwd();
      if (!fs.existsSync(folder)) {
        try {
          fs.mkdirSync(folder, { recursive: true });
        } catch (mkdirError: any) {
          emitter.emit("error", `${colors.red("@error:")} Failed to create output directory: ${mkdirError?.message}`);
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
      const resolutionWithoutP = resolution.replace("p", "");
      const vdata = engineData.ManifestHigh?.find((i: { format: string | string[] }) => i.format?.includes(resolutionWithoutP));
      if (!vdata) {
        emitter.emit("error", `${colors.red("@error:")} No video data found for resolution: ${resolution}. Use list_formats() maybe?`);
        return;
      }
      if (!engineData.AudioHighF?.url) {
        emitter.emit("error", `${colors.red("@error:")} Highest quality audio URL not found.`);
        return;
      }
      if (!vdata.url) {
        emitter.emit("error", `${colors.red("@error:")} Video URL not found for resolution: ${resolution}.`);
        return;
      }
      instance.addInput(engineData.AudioHighF.url);
      instance.addInput(vdata.url.toString());
      instance.withOutputFormat("matroska");
      const filenameBase = `yt-dlx_VideoCustom_${resolution}_`;
      let filename = `${filenameBase}${filter ? filter + "_" : "_"}${title}.mkv`;
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
