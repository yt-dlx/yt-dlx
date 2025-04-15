import * as fs from "fs";
import colors from "colors";
import * as path from "path";
import { z, ZodError } from "zod";
import ffmpeg from "fluent-ffmpeg";
import Agent from "../../utils/Agent";
import { EventEmitter } from "events";
import { locator } from "../../utils/locator";
var ZodSchema = z.object({
  query: z.string().min(2),
  output: z.string().optional(),
  useTor: z.boolean().optional(),
  stream: z.boolean().optional(),
  verbose: z.boolean().optional(),
  metadata: z.boolean().optional(),
  filter: z.enum(["echo", "slow", "speed", "phaser", "flanger", "panning", "reverse", "vibrato", "subboost", "surround", "bassboost", "nightcore", "superslow", "vaporwave", "superspeed"]).optional(),
});
/**
 * Downloads and processes the lowest quality audio with the provided parameters.
 *
 * @param {Object} options - The options for processing the lowest quality audio.
 * @param {string} options.query - The search query for the audio.
 * @param {string} [options.output] - The output folder where the audio file will be saved. Optional.
 * @param {boolean} [options.useTor] - Flag to use Tor for anonymity. Optional.
 * @param {boolean} [options.stream] - Flag to stream the audio instead of saving it. Optional.
 * @param {string} [options.filter] - The audio filter to apply to the audio file. Optional.
 * @param {boolean} [options.metadata] - Flag to output metadata instead of downloading the audio. Optional.
 * @param {boolean} [options.verbose] - Flag to enable verbose output. Optional.
 *
 * @returns {EventEmitter} An EventEmitter object that emits the following events:
 * - "data": Contains the processed audio data or metadata.
 * - "error": Emits an error message if the process fails.
 * - "progress": Emits the progress of the audio processing.
 * - "start": Emits the start of the audio processing.
 * - "end": Emits the end of the audio processing.
 * - "stream": Emits the stream object if the `stream` option is enabled.
 * - "metadata": Emits the metadata if the `metadata` option is enabled.
 *
 * @example
 * // Example 1: Download and process lowest quality audio with only the query and filter
 * YouTubeDLX.Audio.Lowest({ query: "Song title", filter: "bassboost" }).on("data", (audioData) => console.log("Audio data:", audioData)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 2: Download and process lowest quality audio with query, filter, and verbose output enabled
 * YouTubeDLX.Audio.Lowest({ query: "Song title", filter: "bassboost", verbose: true }).on("data", (audioData) => console.log("Audio data:", audioData)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 3: Download and process lowest quality audio with query, filter, and custom output folder
 * YouTubeDLX.Audio.Lowest({ query: "Song title", filter: "bassboost", output: "/path/to/folder" }).on("data", (audioData) => console.log("Audio data:", audioData)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 4: Stream lowest quality audio with query and stream enabled
 * YouTubeDLX.Audio.Lowest({ query: "Song title", stream: true }).on("stream", (streamData) => console.log("Streaming audio:", streamData)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 5: Download and process lowest quality audio with query, filter, and metadata output enabled
 * YouTubeDLX.Audio.Lowest({ query: "Song title", filter: "bassboost", metadata: true }).on("metadata", (metadata) => console.log("Metadata:", metadata)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 6: Download and process lowest quality audio with query, filter, stream, and metadata
 * YouTubeDLX.Audio.Lowest({ query: "Song title", filter: "bassboost", stream: true, metadata: true }).on("data", (audioData) => console.log("Audio data:", audioData)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 7: Download and process lowest quality audio with all parameters (query, output, filter, stream, verbose, metadata)
 * YouTubeDLX.Audio.Lowest({ query: "Song title", output: "/path/to/folder", filter: "bassboost", stream: true, verbose: true, metadata: true }).on("data", (audioData) => console.log("Audio data:", audioData)).on("error", (err) => console.error("Error:", err));
 */
export default async function AudioLowest({ query, output, useTor, stream, filter, metadata, verbose }: z.infer<typeof ZodSchema>): Promise<EventEmitter<[never]>> {
  const emitter = new EventEmitter();
  return new Promise(async (resolve, reject) => {
    try {
      ZodSchema.parse({ query, output, useTor, stream, filter, metadata, verbose });
      const engineData = await Agent({ query, verbose, useTor }).catch(error => {
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
      instance.addInput(engineData.metaData.thumbnail);
      instance.addInput(engineData.AudioLowF.url);
      instance.withOutputFormat("avi");
      const filenameBase = `yt-dlx_AudioLowest_`;
      let filename = `${filenameBase}${filter ? filter + "_" : "_"}${title}.avi`;
      const filterMap: Record<string, string[]> = {
        bassboost: ["bass=g=10,dynaudnorm=f=150"],
        echo: ["aecho=0.8:0.9:1000:0.3"],
        flanger: ["flanger"],
        nightcore: ["aresample=48000,asetrate=48000*1.25"],
        panning: ["apulsator=hz=0.08"],
        phaser: ["aphaser=in_gain=0.4"],
        reverse: ["areverse"],
        slow: ["atempo=0.8"],
        speed: ["atempo=2"],
        subboost: ["asubboost"],
        superslow: ["atempo=0.5"],
        superspeed: ["atempo=3"],
        surround: ["surround"],
        vaporwave: ["aresample=48000,asetrate=48000*1.8"],
        vibrato: ["vibrato=f=6.5"],
      };
      if (filter && filterMap[filter]) instance.withAudioFilter(filterMap[filter]);
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
        emitter.emit("metadata", { AudioLowDRC: engineData.AudioLowDRC, AudioLowF: engineData.AudioLowF, ipAddress: engineData.ipAddress, metaData: engineData.metaData, filename });
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
