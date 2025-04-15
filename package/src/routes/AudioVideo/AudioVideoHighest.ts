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
 * Downloads and processes the highest quality audio and video file with the provided parameters.
 *
 * @param {Object} options - The options for processing the highest quality audio and video.
 * @param {string} options.query - The search query for the audio and video.
 * @param {string} [options.output] - The output folder where the audio and video file will be saved. Optional.
 * @param {boolean} [options.useTor] - Flag to use Tor for anonymity. Optional.
 * @param {boolean} [options.stream] - Flag to stream the audio and video instead of saving it. Optional.
 * @param {boolean} [options.verbose] - Flag to enable verbose output. Optional.
 * @param {boolean} [options.metadata] - Flag to output metadata instead of downloading the audio and video. Optional.
 * @param {string} [options.filter] - The video filter to apply to the video file. Optional.
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
 * // Example 1: Download and process highest quality audio and video with only the query and filter
 * await YouTubeDLX.Audio_Video.Highest({ query: "Song title", filter: "grayscale" }).on("data", (audioVideoData) => console.log("Audio and video data:", audioVideoData)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 2: Download and process highest quality audio and video with query, filter, and verbose output enabled
 * await YouTubeDLX.Audio_Video.Highest({ query: "Song title", filter: "grayscale", verbose: true }).on("data", (audioVideoData) => console.log("Audio and video data:", audioVideoData)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 3: Download and process highest quality audio and video with query, filter, and custom output folder
 * await YouTubeDLX.Audio_Video.Highest({ query: "Song title", filter: "grayscale", output: "/path/to/folder" }).on("data", (audioVideoData) => console.log("Audio and video data:", audioVideoData)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 4: Stream highest quality audio and video with query, filter, and stream enabled
 * await YouTubeDLX.Audio_Video.Highest({ query: "Song title", filter: "grayscale", stream: true }).on("stream", (streamData) => console.log("Streaming audio and video:", streamData)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 5: Download and process highest quality audio and video with query, filter, and metadata output enabled
 * await YouTubeDLX.Audio_Video.Highest({ query: "Song title", filter: "grayscale", metadata: true }).on("metadata", (metadata) => console.log("Metadata:", metadata)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 6: Download and process highest quality audio and video with query, filter, stream, and metadata
 * await YouTubeDLX.Audio_Video.Highest({ query: "Song title", filter: "grayscale", stream: true, metadata: true }).on("data", (audioVideoData) => console.log("Audio and video data:", audioVideoData)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 7: Download and process highest quality audio and video with all parameters (query, output, filter, stream, verbose, metadata)
 * await YouTubeDLX.Audio_Video.Highest({ query: "Song title", output: "/path/to/folder", filter: "grayscale", stream: true, verbose: true, metadata: true }).on("data", (audioVideoData) => console.log("Audio and video data:", audioVideoData)).on("error", (err) => console.error("Error:", err));
 */
export default async function AudioVideoHighest({ query, stream, verbose, metadata, output, useTor, filter }: z.infer<typeof ZodSchema>): Promise<EventEmitter<[never]>> {
  const emitter = new EventEmitter();
  return new Promise(async (resolve, reject) => {
    try {
      ZodSchema.parse({ query, stream, verbose, metadata, output, useTor, filter });
      const engineData = await Tuber({ query, verbose, useTor });
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
      instance.addInput(engineData.ManifestHigh[engineData.ManifestHigh.length - 1].url);
      instance.addInput(engineData.AudioHighF.url);
      instance.withOutputFormat("matroska");
      instance.outputOptions("-c copy");
      const filenameBase = `yt-dlx_AudioVideoHighest_`;
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
          AudioHighF: engineData.AudioHighF,
          AudioHighDRC: engineData.AudioHighDRC,
          VideoHighF: engineData.VideoHighF,
          VideoHighHDR: engineData.VideoHighHDR,
          ManifestHigh: engineData.ManifestHigh,
        });
      }
      resolve(emitter);
    } catch (error) {
      if (error instanceof ZodError) emitter.emit("error", error.errors);
      else if (error instanceof Error) emitter.emit("error", error.message);
      else emitter.emit("error", String(error));
      reject(error);
    } finally {
      console.log(colors.green("@info:"), "❣️ Thank you for using yt-dlx. Consider 🌟starring the GitHub repo https://github.com/yt-dlx.");
    }
  });
}
