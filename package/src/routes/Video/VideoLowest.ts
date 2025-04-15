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
 * Downloads or streams the lowest quality video with various filters based on the provided parameters.
 *
 * @param {Object} options - The parameters for processing the lowest quality video.
 * @param {string} options.query - The search query for the video.
 * @param {string} [options.output] - The output folder where the processed video will be saved. Optional.
 * @param {boolean} [options.useTor] - Flag to use Tor for anonymity. Optional.
 * @param {boolean} [options.stream] - Flag to stream the video instead of saving it. Optional.
 * @param {boolean} [options.verbose] - Flag to enable verbose output. Optional.
 * @param {boolean} [options.metadata] - Flag to output metadata instead of processing the video. Optional.
 * @param {"invert" | "rotate90" | "rotate270" | "grayscale" | "rotate180" | "flipVertical" | "flipHorizontal"} [options.filter] - The video filter to apply. Optional.
 *
 * @returns {EventEmitter} An EventEmitter object that emits the following events:
 * - "data": Contains the processed video or metadata.
 * - "error": Emits an error message if the video processing fails.
 * - "progress": Emits the progress of the video processing.
 * - "start": Emits when the video processing starts.
 * - "end": Emits when the video processing ends.
 * - "stream": Emits the stream object if streaming is enabled.
 * - "metadata": Emits the metadata if metadata option is enabled.
 *
 * @example
 * // Example 1: Process the lowest quality video with only the query and resolution
 * YouTubeDLX.Video.Lowest({ query: "Node.js tutorial", resolution: "144p" }).on("data", (videoData) => console.log("Video data:", videoData)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 2: Process the lowest quality video with the query, resolution, and a filter (grayscale)
 * YouTubeDLX.Video.Lowest({ query: "Node.js tutorial", resolution: "144p", filter: "grayscale" }).on("data", (videoData) => console.log("Video data:", videoData)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 3: Stream the lowest quality video with the query, resolution, and stream option enabled
 * YouTubeDLX.Video.Lowest({ query: "Node.js tutorial", resolution: "144p", stream: true }).on("stream", (streamData) => console.log("Streaming video:", streamData)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 4: Process the lowest quality video with verbose output enabled
 * YouTubeDLX.Video.Lowest({ query: "Node.js tutorial", resolution: "144p", verbose: true }).on("data", (videoData) => console.log("Video data:", videoData)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 5: Fetch metadata instead of processing the video
 * YouTubeDLX.Video.Lowest({ query: "Node.js tutorial", resolution: "144p", metadata: true }).on("metadata", (metadata) => console.log("Video metadata:", metadata)).on("error", (err) => console.error("Error:", err));
 */
export default function VideoLowest({ query, stream, verbose, output, metadata, useTor, filter }: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse({ query, stream, verbose, output, metadata, useTor, filter });
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
      instance.addInput(engineData.VideoLowF.url);
      instance.withOutputFormat("matroska");
      instance.videoCodec("copy");
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
          VideoLowF: engineData.VideoLowF,
          VideoLowHDR: engineData.VideoLowHDR,
          ManifestLow: engineData.ManifestLow,
        });
      }
    } catch (error) {
      if (error instanceof ZodError) emitter.emit("error", error.errors);
      else if (error instanceof Error) emitter.emit("error", error.message);
      else emitter.emit("error", String(error));
    } finally {
      console.log(colors.green("@info:"), "❣️ Thank you for using yt-dlx. Consider 🌟starring the GitHub repo https://github.com/yt-dlx.");
    }
  })();
  return emitter;
}
