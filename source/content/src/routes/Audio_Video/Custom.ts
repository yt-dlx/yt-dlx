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
 * @shortdesc Fetches high-quality audio and video at a custom resolution with optional filters, streaming, Tor, and metadata options.
 *
 * @description This function allows you to search for video content and download or stream it with the highest available audio quality and a user-specified video resolution. It also supports applying video filters, saving the combined audio and video to a file, or retrieving metadata. The function utilizes `ffmpeg` for processing and offers the option to route network requests through the Tor network for enhanced privacy.
 *
 * The function provides the following configuration options:
 * - **Query:** The search query string (minimum 2 characters) to find the desired content. This is a mandatory parameter.
 * - **Stream:** An optional boolean value that, if set to `true`, will enable streaming (downloading) of the audio and video. When streaming is enabled, you can use the `output` parameter to specify the save location. This option cannot be used when `metadata` is `true`.
 * - **Output:** An optional string specifying the directory path where the downloaded audio and video file should be saved. This parameter is only applicable when the `stream` option is set to `true` and `metadata` is `false`. If not provided, the file will be saved in the current working directory.
 * - **Use Tor:** An optional boolean value that, if set to `true`, will route the network request through the Tor network. This can help in anonymizing your request. Requires Tor to be running on your system.
 * - **Filter:** An optional string specifying a video filter to apply during processing. This parameter is only applicable when `stream` is `true` and `metadata` is `false`. Available filters include: "invert", "rotate90", "rotate270", "grayscale", "rotate180", "flipVertical", and "flipHorizontal".
 * - **Metadata:** An optional boolean value that, if set to `true`, will only fetch and emit metadata about the audio and video, without downloading or processing it. This option cannot be used with `stream`, `output`, or `filter`.
 * - **Verbose:** An optional boolean value that, if set to `true`, enables verbose logging to the console, providing more detailed information about the process.
 * - **Resolution:** A required string specifying the desired video resolution. Available options are: "144p", "240p", "360p", "480p", "720p", "1080p", "1440p", "2160p", "3072p", "4320p", "6480p", "8640p", and "12000p".
 *
 * The function returns an EventEmitter instance that emits events during the processing:
 * - `"progress"`: Emitted with progress information during the download and processing. The data is an object containing progress details.
 * - `"error"`: Emitted when an error occurs during any stage of the process, including argument validation, network requests, or FFmpeg operations. The emitted data is the error message or object.
 * - `"start"`: Emitted when the FFmpeg processing starts. The emitted data is the FFmpeg start command string.
 * - `"end"`: Emitted when the FFmpeg processing successfully completes. The emitted data is the filename of the processed file.
 * - `"stream"`: Emitted when streaming is enabled (`stream: true` and `metadata: false`). The emitted data is an object with the following structure:
 * ```typescript
 * {
 * filename: string; // The full path to the output file
 * ffmpeg: ffmpeg.FfmpegCommand; // The FFmpeg command instance
 * }
 * ```
 * - `"metadata"`: Emitted when only metadata is requested (`metadata: true`). The emitted data is an object containing various metadata about the audio and video.
 *
 * @param {object} options - An object containing the configuration options.
 * @param {string} options.query - The search query string (minimum 2 characters). **Required**.
 * @param {boolean} [options.stream=false] - Enable audio and video streaming (download).
 * @param {string} [options.output] - The directory path to save the downloaded audio and video (only with `stream: true`).
 * @param {boolean} [options.useTor=false] - Route requests through the Tor network.
 * @param {("invert" | "rotate90" | "rotate270" | "grayscale" | "rotate180" | "flipVertical" | "flipHorizontal")} [options.filter] - Apply a video filter during streaming (only with `stream: true`).
 * @param {boolean} [options.metadata=false] - Only fetch and emit metadata (cannot be used with `stream`, `output`, `filter`).
 * @param {boolean} [options.verbose=false] - Enable verbose logging.
 * @param {("144p" | "240p" | "360p" | "480p" | "720p" | "1080p" | "1440p" | "2160p" | "3072p" | "4320p" | "6480p" | "8640p" | "12000p")} options.resolution - The desired video resolution. **Required**.
 *
 * @returns {EventEmitter} An EventEmitter instance for handling events during audio and video processing.
 *
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
