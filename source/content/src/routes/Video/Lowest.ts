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
 * @shortdesc Fetches and processes video at the lowest quality with optional filters, streaming, Tor, and metadata options.
 *
 * @description This function provides a comprehensive way to interact with video content by searching for a query and then either downloading (streaming) it at the lowest available quality or retrieving its metadata. It leverages `ffmpeg` for video processing, allowing for the application of various filters when processing. Additionally, it supports routing network requests through the Tor network for enhanced privacy. When not fetching just metadata, the function downloads and saves the video file to the specified output path or the current directory.
 *
 * The function offers several configuration options to tailor the video fetching and processing:
 * - **Query:** A mandatory search term to find the desired video.
 * - **Stream:** Enables streaming (downloading) of the video. When true, you can specify an output directory. This cannot be used with `metadata: true`.
 * - **Verbose:** Activates detailed logging to the console for more information about the process.
 * - **Output:** Specifies the directory to save the processed video. Applicable when `metadata` is false. If not provided when `metadata` is false, the file will be saved in the current working directory.
 * - **Metadata:** If true, only fetches and emits video metadata without downloading. Cannot be used with `stream`, `output`, or `filter`.
 * - **Use Tor:** Routes network requests through the Tor network for anonymity. Requires Tor to be running.
 * - **Filter:** Applies a video filter during processing. Applicable when `metadata` is false. Available options include "invert", "rotate90", "rotate270", "grayscale", "rotate180", "flipVertical", and "flipHorizontal".
 *
 * The function returns an EventEmitter that emits various events to keep you informed about the progress and any errors encountered. These events include:
 * - `"progress"`: Reports download and processing progress.
 * - `"error"`: Indicates any errors during the process.
 * - `"start"`: Emitted when FFmpeg processing begins.
 * - `"end"`: Emitted upon successful completion of FFmpeg processing, providing the filename.
 * - `"stream"`: Emitted when streaming is enabled (`stream: true` and `metadata: false`), providing the filename and the FFmpeg command instance.
 * - `"metadata"`: Emitted when only metadata is requested (`metadata: true`), containing detailed information about the video.
 *
 * @param {object} options - An object containing the configuration options.
 * @param {string} options.query - The search query string (minimum 2 characters). **Required**.
 * @param {boolean} [options.stream=false] - Enable video streaming (only with `metadata: false`).
 * @param {boolean} [options.verbose=false] - Enable verbose logging.
 * @param {string} [options.output] - The directory path to save the processed video (only with `metadata: false`).
 * @param {boolean} [options.metadata=false] - Only fetch and emit metadata (cannot be used with `stream`, `output`, `filter`).
 * @param {boolean} [options.useTor=false] - Route requests through the Tor network.
 * @param {("invert" | "rotate90" | "rotate270" | "grayscale" | "rotate180" | "flipVertical" | "flipHorizontal")} [options.filter] - Apply a video filter during processing (only with `metadata: false`).
 *
 * @returns {EventEmitter} An EventEmitter instance for handling events during video processing.
 *
 * @example
 * // 1. Get basic metadata for the lowest quality video
 * YouTubeDLX.VideoLowest({ query: "low quality video", metadata: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 2. Get metadata with verbose logging for the lowest quality video
 * YouTubeDLX.VideoLowest({ query: "lowest resolution info", metadata: true, verbose: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 3. Get metadata using Tor for the lowest quality video
 * YouTubeDLX.VideoLowest({ query: "anonymous lowest video info", metadata: true, useTor: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 4. Get metadata with verbose logging and Tor for the lowest quality video
 * YouTubeDLX.VideoLowest({ query: "private lowest video metadata", metadata: true, verbose: true, useTor: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 5. Stream the lowest quality video
 * YouTubeDLX.VideoLowest({ query: "stream low quality video", stream: true })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 6. Stream the lowest quality video with verbose logging
 * YouTubeDLX.AudioVideoLowest({ query: "stream lowest video verbose", stream: true, verbose: true }) // Corrected example function name if it was AVL
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 7. Stream the lowest quality video to a specific output directory
 * YouTubeDLX.VideoLowest({ query: "stream low video to folder", stream: true, output: "./low_video_streams" })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 8. Stream the lowest quality video with grayscale filter
 * YouTubeDLX.VideoLowest({ query: "stream grayscale low video", stream: true, filter: "grayscale" })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 9. Stream the lowest quality video with invert filter and verbose logging
 * YouTubeDLX.VideoLowest({ query: "stream invert lowest video verbose", stream: true, filter: "invert", verbose: true })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 10. Stream the lowest quality video with rotate90 filter to an output directory
 * YouTubeDLX.VideoLowest({ query: "stream rotate low video", stream: true, filter: "rotate90", output: "./low_rotated_streams" })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 11. Stream the lowest quality video using Tor
 * YouTubeDLX.VideoLowest({ query: "stream low video tor", stream: true, useTor: true })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 12. Stream the lowest quality video with flipHorizontal filter and Tor
 * YouTubeDLX.VideoLowest({ query: "stream flip low video tor", stream: true, filter: "flipHorizontal", useTor: true })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 28. Download the lowest quality video to a specific output directory
 * YouTubeDLX.VideoLowest({ query: "download lowest video", stream: false, output: "./low_video_downloads" })
 * .on("end", (filename) => console.log("Download finished:", filename))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 29. Download the lowest quality video to current directory
 * YouTubeDLX.VideoLowest({ query: "download lowest video", stream: false })
 * .on("end", (filename) => console.log("Download finished:", filename))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 30. Download the lowest quality video with rotate180 filter to output directory
 * YouTubeDLX.VideoLowest({ query: "rotate lowest video", stream: false, filter: "rotate180", output: "./low_filtered_videos" })
 * .on("end", (filename) => console.log("Filtered download finished:", filename))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 31. Download the lowest quality video with flipVertical filter to current directory
 * YouTubeDLX.VideoLowest({ query: "flip lowest video", stream: false, filter: "flipVertical" })
 * .on("end", (filename) => console.log("Filtered download finished:", filename))
 * .on("error", (error) => console.error("Error:", error));
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
      if (metadata) {
        emitter.emit("metadata", {
          metaData: engineData.metaData,
          VideoLowF: engineData.VideoLowF,
          VideoLowHDR: engineData.VideoLowHDR,
          ManifestLow: engineData.ManifestLow,
          filename: engineData.metaData.title?.replace(/[^a-zA-Z0-9_]+/g, "_"),
        });
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
        if (!paths.ffmpeg) {
          emitter.emit("error", `${colors.red("@error:")} ffmpeg executable not found.`);
          return;
        }
        if (!paths.ffprobe) {
          emitter.emit("error", `${colors.red("@error:")} ffprobe executable not found.`);
          return;
        }
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
      instance.withOutputFormat("mp4");
      const filenameBase = `yt-dlx_VideoLowest_`;
      let filename = `${filenameBase}${filter ? filter + "_" : ""}${title}.mp4`;
      const outputPath = path.join(folder, filename);
      const filterMap: Record<string, string[]> = {
        grayscale: ["colorchannelmixer=.3:.4:.3:0:.3:.4:.3:0:.3:.4:.3"],
        invert: ["negate"],
        rotate90: ["rotate=PI/2"],
        rotate180: ["rotate=PI"],
        rotate270: ["rotate=3*PI/2"],
        flipHorizontal: ["hflip"],
        flipVertical: ["vflip"],
      };
      if (filter && filterMap[filter]) instance.withVideoFilter(filterMap[filter]);
      else instance.outputOptions("-c copy");
      instance.on("progress", progress => emitter.emit("progress", progress));
      instance.on("error", error => emitter.emit("error", `${colors.red("@error:")} FFmpeg error: ${error?.message}`));
      instance.on("start", start => emitter.emit("start", start));
      instance.on("end", () => emitter.emit("end", outputPath));
      instance.output(outputPath);
      if (stream) emitter.emit("stream", { filename: outputPath, ffmpeg: instance });
      instance.run();
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
