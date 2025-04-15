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
 * Downloads and processes a custom audio and video file based on the provided parameters.
 *
 * @param {Object} options - The options for processing the audio and video file.
 * @param {string} options.query - The search query for the audio and video.
 * @param {string} [options.output] - The output folder where the file will be saved. Optional.
 * @param {boolean} [options.useTor] - Flag to use Tor for anonymity. Optional.
 * @param {boolean} [options.stream] - Flag to stream the audio and video instead of saving it. Optional.
 * @param {boolean} [options.verbose] - Flag to enable verbose output. Optional.
 * @param {boolean} [options.metadata] - Flag to output metadata instead of downloading the audio and video. Optional.
 * @param {string} [options.filter] - The video filter to apply to the video file. Optional.
 * @param {"144p" | "240p" | "360p" | "480p" | "720p" | "1080p" | "1440p" | "2160p" | "3072p" | "4320p" | "6480p" | "8640p" | "12000p"} options.resolution - The resolution of the video file to download.
 *
 * @returns {EventEmitter} An EventEmitter object that emits the following events:
 * - "data": Contains the processed audio and video data or metadata.
 * - "error": Emits an error message if the process fails.
 * - "progress": Emits the progress of the audio and video processing.
 * - "start": Emits the start of the audio and video processing.
 * - "end": Emits the end of the audio and video processing.
 * - "stream": Emits the stream object if the `stream` option is enabled.
 * - "metadata": Emits the metadata if the `metadata` option is enabled.
 *
 * @example
 * // Example 1: Download and process audio and video with only the query, resolution, and filter
 * AudioVideoCustom({ query: "Song title", resolution: "720p", filter: "grayscale" }).on("data", (audioVideoData) => console.log("Audio and video data:", audioVideoData)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 2: Download and process audio and video with query, resolution, filter, and verbose output enabled
 * AudioVideoCustom({ query: "Song title", resolution: "720p", filter: "grayscale", verbose: true }).on("data", (audioVideoData) => console.log("Audio and video data:", audioVideoData)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 3: Download and process audio and video with query, resolution, and custom output folder
 * AudioVideoCustom({ query: "Song title", resolution: "720p", filter: "grayscale", output: "/path/to/folder" }).on("data", (audioVideoData) => console.log("Audio and video data:", audioVideoData)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 4: Stream audio and video with query, resolution, and stream enabled
 * AudioVideoCustom({ query: "Song title", resolution: "720p", stream: true }).on("stream", (streamData) => console.log("Streaming audio and video:", streamData)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 5: Download and process audio and video with query, resolution, filter, and metadata output enabled
 * AudioVideoCustom({ query: "Song title", resolution: "720p", filter: "grayscale", metadata: true }).on("metadata", (metadata) => console.log("Metadata:", metadata)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 6: Download and process audio and video with query, resolution, filter, stream, and metadata
 * AudioVideoCustom({ query: "Song title", resolution: "720p", filter: "grayscale", stream: true, metadata: true }).on("data", (audioVideoData) => console.log("Audio and video data:", audioVideoData)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 7: Download and process audio and video with all parameters (query, output, filter, stream, verbose, metadata, resolution)
 * AudioVideoCustom({ query: "Song title", output: "/path/to/folder", resolution: "720p", filter: "grayscale", stream: true, verbose: true, metadata: true }).on("data", (audioVideoData) => console.log("Audio and video data:", audioVideoData)).on("error", (err) => console.error("Error:", err));
 */
export default function AudioVideoCustom({ query, stream, output, useTor, filter, metadata, verbose, resolution }: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse({ query, stream, output, useTor, filter, metadata, verbose, resolution });
      const engineData = await ytdlx({ query, verbose, useTor }).catch(error => {
        emitter.emit("error", `Engine error: ${error.message}`);
        return;
      });
      if (!engineData) {
        emitter.emit("error", `${colors.red("@error:")} unable to get response!`);
        return;
      }
      const title = engineData.metaData.title.replace(/[^a-zA-Z0-9_]+/g, "_");
      const folder = output ? output : process.cwd();
      if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
      const instance: ffmpeg.FfmpegCommand = ffmpeg();
      instance.setFfmpegPath(await locator().then(fp => fp.ffmpeg));
      instance.setFfprobePath(await locator().then(fp => fp.ffprobe));
      /* instance.addOption("-headers", `X-Forwarded-For: ${engineData.ipAddress}`); */
      instance.addInput(engineData.AudioHighF.url);
      instance.withOutputFormat("matroska");
      const filenameBase = `yt-dlx_AudioVideoCustom_${resolution}_`;
      let filename = `${filenameBase}${filter ? filter + "_" : "_"}${title}.mkv`;
      const vdata = engineData.ManifestHigh.find((i: { format: string | string[] }) => i.format.includes(resolution.replace("p", "").toString()));
      if (vdata) {
        instance.addInput(vdata.url.toString());
      } else {
        emitter.emit("error", `${colors.red("@error:")} no video data found. use list_formats() maybe?`);
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
      if (filter && filterMap[filter]) instance.withVideoFilter(filterMap[filter]);
      instance.on("progress", progress => emitter.emit("progress", progress));
      instance.on("error", error => emitter.emit("error", error.message));
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
    } catch (error: unknown) {
      switch (true) {
        case error instanceof ZodError:
          emitter.emit("error", error.errors);
          break;
        default:
          emitter.emit("error", (error as Error).message);
          break;
      }
    } finally {
      console.log(colors.green("@info:"), "❣️ Thank you for using yt-dlx. Consider 🌟starring the GitHub repo https://github.com/yt-dlx.");
    }
  })().catch(error => emitter.emit("error", error.message));
  return emitter;
}
