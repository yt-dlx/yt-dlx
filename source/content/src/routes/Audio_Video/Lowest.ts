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
});
/**
 * @shortdesc Fetches and processes video and audio at the lowest quality with optional filters, streaming, Tor, and metadata options.
 *
 * @description This function provides a comprehensive way to interact with video content by searching for a query and then either downloading (streaming) it with the lowest available quality for both video and audio, or retrieving its metadata. It leverages `ffmpeg` for video processing, allowing for the application of various filters during streaming. Additionally, it supports routing network requests through the Tor network for enhanced privacy.
 *
 * The function offers several configuration options to tailor the video and audio fetching and processing:
 * - **Query:** A mandatory search term to find the desired video.
 * - **Stream:** Enables streaming (downloading) of the video and audio. When true, you can specify an output directory.
 * - **Verbose:** Activates detailed logging to the console for more information about the process.
 * - **Output:** Specifies the directory to save the streamed video and audio. Only applicable when `stream` is true.
 * - **Metadata:** If true, only fetches and emits video metadata without downloading. Cannot be used with `stream`, `output`, or `filter`.
 * - **Use Tor:** Routes network requests through the Tor network for anonymity. Requires Tor to be running.
 * - **Filter:** Applies a video filter during streaming. Available options include "invert", "rotate90", "rotate270", "grayscale", "rotate180", "flipVertical", and "flipHorizontal". Only applicable when `stream` is true.
 *
 * The function returns an EventEmitter that emits various events to keep you informed about the progress and any errors encountered. These events include:
 * - `"progress"`: Reports download and processing progress.
 * - `"error"`: Indicates any errors during the process.
 * - `"start"`: Emitted when FFmpeg processing begins.
 * - `"end"`: Emitted upon successful completion of FFmpeg processing, providing the filename.
 * - `"stream"`: Emitted when streaming is enabled, providing the filename and the FFmpeg command instance.
 * - `"metadata"`: Emitted when only metadata is requested, containing detailed information about the video.
 *
 * @param {object} options - An object containing the configuration options.
 * @param {string} options.query - The search query string (minimum 2 characters). **Required**.
 * @param {boolean} [options.stream=false] - Enable video and audio streaming (download).
 * @param {boolean} [options.verbose=false] - Enable verbose logging.
 * @param {string} [options.output] - The directory path to save the downloaded video and audio (only with `stream: true`).
 * @param {boolean} [options.metadata=false] - Only fetch and emit metadata (cannot be used with `stream`, `output`, `filter`).
 * @param {boolean} [options.useTor=false] - Route requests through the Tor network.
 * @param {("invert" | "rotate90" | "rotate270" | "grayscale" | "rotate180" | "flipVertical" | "flipHorizontal")} [options.filter] - Apply a video filter during streaming (only with `stream: true`).
 *
 * @returns {EventEmitter} An EventEmitter instance for handling events during video processing.
 *
 */
export default function AudioVideoLowest({ query, stream, verbose, output, metadata, useTor, filter }: z.infer<typeof ZodSchema>): EventEmitter {
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
      if (!engineData.ManifestLow || engineData.ManifestLow.length === 0 || !engineData.ManifestLow[0]?.url) {
        emitter.emit("error", `${colors.red("@error:")} Lowest quality video URL not found.`);
        return;
      }
      instance.addInput(engineData.ManifestLow[0].url);
      if (!engineData.AudioLowF?.url) {
        emitter.emit("error", `${colors.red("@error:")} Lowest quality audio URL not found.`);
        return;
      }
      instance.addInput(engineData.AudioLowF.url);
      instance.withOutputFormat("matroska");
      instance.outputOptions("-c copy");
      const filenameBase = `yt-dlx_AudioVideoLowest_`;
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
          AudioLowF: engineData.AudioLowF,
          AudioLowDRC: engineData.AudioLowDRC,
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
