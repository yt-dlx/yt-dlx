import * as fs from "fs";
import colors from "colors";
import * as path from "path";
import { z, ZodError } from "zod";
import ffmpeg from "fluent-ffmpeg";
import Tuber from "../../utils/Agent";
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
});

/**
 * Fetches and processes video from a specified query at the lowest available quality with optional video filters.
 *
 * This function allows you to search for video content, download or stream it at the lowest available quality,
 * apply video filters, save it to a file, or retrieve metadata.
 * It utilizes `ffmpeg` for processing and supports optional Tor usage for enhanced privacy.
 *
 * @param {object} options - An object containing the configuration options for fetching and processing video.
 * @param {string} options.query - The search query string (minimum 2 characters) to find the desired video. This is a mandatory parameter.
 * @param {boolean} [options.stream=false] - An optional boolean value that, if set to `true`, will enable streaming of the video.
 * When streaming is enabled, the `output` parameter can be used to specify the save location.
 * This option cannot be used when `metadata` is `true`.
 * @param {boolean} [options.verbose=false] - An optional boolean value that, if set to `true`, enables verbose logging to the console, providing more detailed information about the process.
 * @param {string} [options.output] - An optional string specifying the directory path where the downloaded video file should be saved.
 * This parameter is only applicable when the `stream` option is set to `true` and `metadata` is `false`.
 * If not provided, the video file will be saved in the current working directory.
 * @param {boolean} [options.metadata=false] - An optional boolean value that, if set to `true`, will only fetch and emit metadata about the video, without downloading or processing it.
 * This option cannot be used with `stream`, `output`, or `filter`.
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
 * // 1: Get metadata for a video at the lowest quality
 * YouTubeDLX.VideoLowest({ query: "educational video", metadata: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 2: Get metadata for a video at the lowest quality with verbose logging
 * YouTubeDLX.VideoLowest({ query: "short film", metadata: true, verbose: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 3: Get metadata for a video at the lowest quality using Tor
 * YouTubeDLX.VideoLowest({ query: "private video", metadata: true, useTor: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 4: Get metadata for a video at the lowest quality with verbose logging and using Tor
 * YouTubeDLX.VideoLowest({ query: "hidden video", metadata: true, verbose: true, useTor: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 5: Stream a video at the lowest quality
 * YouTubeDLX.VideoLowest({ query: "low quality movie", stream: true })
 * .on("stream", (streamData) => console.log("Streaming to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 6: Stream a video at the lowest quality to a specific output directory
 * YouTubeDLX.VideoLowest({ query: "grainy footage", stream: true, output: "/path/to/save" })
 * .on("stream", (streamData) => console.log("Streaming to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 7: Stream a video at the lowest quality with verbose logging
 * YouTubeDLX.VideoLowest({ query: "small video", stream: true, verbose: true })
 * .on("stream", (streamData) => console.log("Streaming to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 8: Stream a video at the lowest quality using Tor
 * YouTubeDLX.VideoLowest({ query: "anonymous low quality", stream: true, useTor: true })
 * .on("stream", (streamData) => console.log("Streaming via Tor to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 9: Stream a video at the lowest quality with the "invert" filter
 * YouTubeDLX.VideoLowest({ query: "inverted colors low", stream: true, filter: "invert" })
 * .on("stream", (streamData) => console.log("Streaming with invert filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 10: Stream a video at the lowest quality with the "rotate90" filter
 * YouTubeDLX.VideoLowest({ query: "rotated low quality", stream: true, filter: "rotate90" })
 * .on("stream", (streamData) => console.log("Streaming with rotate90 filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 11: Stream a video at the lowest quality with the "rotate270" filter
 * YouTubeDLX.VideoLowest({ query: "another rotation low", stream: true, filter: "rotate270" })
 * .on("stream", (streamData) => console.log("Streaming with rotate270 filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 12: Stream a video at the lowest quality with the "grayscale" filter
 * YouTubeDLX.VideoLowest({ query: "grayscale low quality", stream: true, filter: "grayscale" })
 * .on("stream", (streamData) => console.log("Streaming with grayscale filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 13: Stream a video at the lowest quality with the "rotate180" filter
 * YouTubeDLX.VideoLowest({ query: "flipped low quality", stream: true, filter: "rotate180" })
 * .on("stream", (streamData) => console.log("Streaming with rotate180 filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 14: Stream a video at the lowest quality with the "flipVertical" filter
 * YouTubeDLX.VideoLowest({ query: "vertical flip low", stream: true, filter: "flipVertical" })
 * .on("stream", (streamData) => console.log("Streaming with flipVertical filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 15: Stream a video at the lowest quality with the "flipHorizontal" filter
 * YouTubeDLX.VideoLowest({ query: "horizontal flip low", stream: true, filter: "flipHorizontal" })
 * .on("stream", (streamData) => console.log("Streaming with flipHorizontal filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 16: Stream a video at the lowest quality to output directory "/tmp/lowest"
 * YouTubeDLX.VideoLowest({ query: "temp low quality", stream: true, output: "/tmp/lowest" })
 * .on("stream", (streamData) => console.log("Streaming to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 17: Stream a video at the lowest quality using Tor and verbose logging
 * YouTubeDLX.VideoLowest({ query: "anonymous low verbose", stream: true, useTor: true, verbose: true })
 * .on("stream", (streamData) => console.log("Streaming via Tor to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 18: Stream a video at the lowest quality with output directory "./low_downloads" and the "grayscale" filter
 * YouTubeDLX.VideoLowest({ query: "gray low download", stream: true, output: "./low_downloads", filter: "grayscale" })
 * .on("stream", (streamData) => console.log("Streaming with grayscale filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 19: Stream a video at the lowest quality using Tor and the "invert" filter
 * YouTubeDLX.VideoLowest({ query: "invert low tor", stream: true, useTor: true, filter: "invert" })
 * .on("stream", (streamData) => console.log("Streaming with invert filter via Tor to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 20: Stream a video at the lowest quality with verbose logging and the "rotate90" filter
 * YouTubeDLX.VideoLowest({ query: "rotate low verbose", stream: true, verbose: true, filter: "rotate90" })
 * .on("stream", (streamData) => console.log("Streaming with rotate90 filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 21: Stream a video at the lowest quality with all optional parameters
 * YouTubeDLX.VideoLowest({ query: "all options low", stream: true, verbose: true, output: "./all_low", metadata: false, useTor: true, filter: "flipHorizontal" })
 * .on("stream", (streamData) => console.log("Streaming with flipHorizontal filter via Tor to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 22: Get metadata for a video at the lowest quality with only query
 * YouTubeDLX.VideoLowest({ query: "simple metadata", metadata: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 23: Stream a video at the lowest quality with only query and stream
 * YouTubeDLX.VideoLowest({ query: "simple stream", stream: true })
 * .on("stream", (streamData) => console.log("Streaming to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 24: Stream a video at the lowest quality with query and output
 * YouTubeDLX.VideoLowest({ query: "output stream", stream: true, output: "./output_dir" })
 * .on("stream", (streamData) => console.log("Streaming to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 25: Stream a video at the lowest quality with query and useTor
 * YouTubeDLX.VideoLowest({ query: "tor stream", stream: true, useTor: true })
 * .on("stream", (streamData) => console.log("Streaming via Tor to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 26: Stream a video at the lowest quality with query and verbose
 * YouTubeDLX.VideoLowest({ query: "verbose stream", stream: true, verbose: true })
 * .on("stream", (streamData) => console.log("Streaming to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 27: Stream a video at the lowest quality with query and filter (grayscale)
 * YouTubeDLX.VideoLowest({ query: "grayscale only", stream: true, filter: "grayscale" })
 * .on("stream", (streamData) => console.log("Streaming with grayscale filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Video saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 */
export default function VideoLowest({ query, stream, verbose, output, metadata, useTor, filter }: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      if (!query) {
        emitter.emit("error", `${colors.red("@error:")} The 'query' parameter is always required.`);
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
      ZodSchema.parse({ query, stream, verbose, output, metadata, useTor, filter });
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
      if (!engineData.VideoLowF?.url) {
        emitter.emit("error", `${colors.red("@error:")} Lowest quality video URL not found.`);
        return;
      }
      instance.addInput(engineData.VideoLowF.url);
      instance.withOutputFormat("matroska");
      const filenameBase = `yt-dlx_VideoLowest_`;
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
          VideoLowHDR: engineData.VideoLowHDR,
          ManifestLow: engineData.ManifestLow,
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
