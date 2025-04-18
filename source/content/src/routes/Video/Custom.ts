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
 * @shortdesc Fetches and processes video at a user-defined resolution with optional filters, streaming, Tor, and metadata options.
 *
 * @description This function allows you to search for video content and download or stream it at a specific resolution chosen from a list of available options. It also supports applying video filters when processing, saving the video to a specified file path, or retrieving metadata about the video. The function utilizes `ffmpeg` for video processing and offers the option to route network requests through the Tor network for enhanced privacy. When not fetching just metadata, the function downloads and saves the video file to the specified output path or the current directory.
 *
 * The function provides the following configuration options:
 * - **Query:** The search query string (minimum 2 characters) to find the desired video. This is a mandatory parameter.
 * - **Resolution:** The desired video resolution from the available options: "144p", "240p", "360p", "480p", "720p", "1080p", "1440p", "2160p", "3072p", "4320p", "6480p", "8640p", "12000p". This is a mandatory parameter.
 * - **Stream:** An optional boolean value that, if set to `true`, will enable streaming (downloading) of the video. This cannot be used with `metadata: true`.
 * - **Use Tor:** An optional boolean value that, if set to `true`, will route the network request through the Tor network. This can help in anonymizing your request. Requires Tor to be running on your system.
 * - **Filter:** An optional string specifying a video filter to apply during processing. This parameter is only applicable when `metadata` is false. Available filters include: "invert", "rotate90", "rotate270", "grayscale", "rotate180", "flipVertical", and "flipHorizontal".
 * - **Output:** An optional string specifying the directory path where the processed video file should be saved. This parameter is applicable when `metadata` is false. If not provided when `metadata` is false, the video file will be saved in the current working directory.
 * - **Verbose:** An optional boolean value that, if set to `true`, enables verbose logging to the console, providing more detailed information about the process.
 * - **Metadata:** An optional boolean value that, if set to `true`, will only fetch and emit metadata about the video, without downloading or processing it. This option cannot be used with `stream`, `output`, or `filter`.
 *
 * The function returns an EventEmitter instance that emits events during the video processing:
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
 * @param {object} options - An object containing the configuration options.
 * @param {string} options.query - The search query string (minimum 2 characters). **Required**.
 * @param {boolean} [options.stream=false] - Enable video streaming (only with `metadata: false`).
 * @param {boolean} [options.useTor=false] - Route requests through the Tor network.
 * @param {("invert" | "rotate90" | "rotate270" | "grayscale" | "rotate180" | "flipVertical" | "flipHorizontal")} [options.filter] - Apply a video filter during processing (only with `metadata: false`).
 * @param {string} [options.output] - The directory path to save the processed video (only with `metadata: false`).
 * @param {boolean} [options.verbose=false] - Enable verbose logging.
 * @param {boolean} [options.metadata=false] - Only fetch and emit metadata (cannot be used with `stream`, `output`, `filter`).
 * @param {("144p" | "240p" | "360p" | "480p" | "720p" | "1080p" | "1440p" | "2160p" | "3072p" | "4320p" | "6480p" | "8640p" | "12000p")} options.resolution - The desired video resolution. **Required**.
 *
 * @returns {EventEmitter} An EventEmitter instance for handling events during video processing.
 *
 * @example
 * // 1. Get basic metadata for video at 720p
 * YouTubeDLX.VideoCustom({ query: "video metadata", resolution: "720p", metadata: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 2. Get metadata with verbose logging for video at 1080p
 * YouTubeDLX.VideoCustom({ query: "detailed video info", resolution: "1080p", metadata: true, verbose: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 3. Get metadata using Tor for video at 480p
 * YouTubeDLX.VideoCustom({ query: "private video info", resolution: "480p", metadata: true, useTor: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 4. Get metadata with verbose logging and Tor for video at 360p
 * YouTubeDLX.VideoCustom({ query: "anonymous video metadata", resolution: "360p", metadata: true, verbose: true, useTor: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 5. Stream video at 720p
 * YouTubeDLX.VideoCustom({ query: "stream video 720p", resolution: "720p", stream: true })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 6. Stream video at 1080p with verbose logging
 * YouTubeDLX.VideoCustom({ query: "stream video 1080p verbose", resolution: "1080p", stream: true, verbose: true })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 7. Stream video at 480p to a specific output directory
 * YouTubeDLX.VideoCustom({ query: "stream video to folder", resolution: "480p", stream: true, output: "./video_streams" })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 8. Stream video at 360p with grayscale filter
 * YouTubeDLX.VideoCustom({ query: "stream grayscale video", resolution: "360p", stream: true, filter: "grayscale" })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 9. Stream video at 720p with invert filter and verbose logging
 * YouTubeDLX.VideoCustom({ query: "stream invert video verbose", resolution: "720p", stream: true, filter: "invert", verbose: true })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 10. Stream video at 1080p with rotate90 filter to an output directory
 * YouTubeDLX.VideoCustom({ query: "stream rotate video", resolution: "1080p", stream: true, filter: "rotate90", output: "./rotated_streams" })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 11. Stream video at 480p using Tor
 * YouTubeDLX.VideoCustom({ query: "stream video tor", resolution: "480p", stream: true, useTor: true })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 12. Stream video at 360p with flipHorizontal filter and Tor
 * YouTubeDLX.VideoCustom({ query: "stream flip video tor", resolution: "360p", stream: true, filter: "flipHorizontal", useTor: true })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 28. Download video at 1080p to a specific output directory
 * YouTubeDLX.VideoCustom({ query: "download video 1080p", resolution: "1080p", stream: false, output: "./video_downloads" })
 * .on("end", (filename) => console.log("Download finished:", filename))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 29. Download video at 720p to current directory
 * YouTubeDLX.VideoCustom({ query: "download video 720p", resolution: "720p", stream: false })
 * .on("end", (filename) => console.log("Download finished:", filename))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 30. Download video at 480p with rotate180 filter to output directory
 * YouTubeDLX.VideoCustom({ query: "rotate video 480p", resolution: "480p", stream: false, filter: "rotate180", output: "./filtered_videos" })
 * .on("end", (filename) => console.log("Filtered download finished:", filename))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 31. Download video at 360p with flipVertical filter to current directory
 * YouTubeDLX.VideoCustom({ query: "flip video 360p", resolution: "360p", stream: false, filter: "flipVertical" })
 * .on("end", (filename) => console.log("Filtered download finished:", filename))
 * .on("error", (error) => console.error("Error:", error));
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
      if (metadata) {
        emitter.emit("metadata", {
          metaData: engineData.metaData,
          VideoLowF: engineData.VideoLowF,
          VideoHighF: engineData.VideoHighF,
          VideoLowHDR: engineData.VideoLowHDR,
          VideoHighHDR: engineData.VideoHighHDR,
          ManifestLow: engineData.ManifestLow,
          ManifestHigh: engineData.ManifestHigh,
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
      const resolutionWithoutP = resolution.replace("p", "");
      const vdata = engineData.ManifestHigh?.find((i: { format: string | string[] }) => i.format?.includes(resolutionWithoutP));
      if (!vdata) {
        emitter.emit("error", `${colors.red("@error:")} No video data found for resolution: ${resolution}. Use list_formats() maybe?`);
        return;
      }
      if (!vdata.url) {
        emitter.emit("error", `${colors.red("@error:")} Video URL not found for resolution: ${resolution}.`);
        return;
      }
      instance.addInput(vdata.url.toString());
      instance.withOutputFormat("mp4");
      const filenameBase = `yt-dlx_VideoCustom_${resolution}_`;
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
