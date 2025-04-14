import * as fs from "fs";
import colors from "colors";
import * as path from "path";
import { z, ZodError } from "zod";
import ffmpeg from "fluent-ffmpeg";
import Tuber from "../../utils/Agent";
import { EventEmitter } from "events";
import { locator } from "../../utils/locator";
/**
 * Defines the schema for the input parameters used in the `AudioHighest` function.
 *
 * @typedef {object} AudioHighestOptions
 * @property {string} query - The query string for the YouTube video.
 * @property {string} [output] - The output folder to store the result.
 * @property {boolean} [useTor] - Whether to use Tor for anonymization.
 * @property {boolean} [stream] - Whether to stream the output.
 * @property {string} [filter] - The audio filter to apply (e.g., "bassboost", "echo").
 * @property {boolean} [metadata] - Whether to include metadata.
 * @property {boolean} [verbose] - Whether to enable verbose logging.
 */
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
 * Processes a YouTube video query and applies the highest quality audio format to it with optional effects,
 * either streaming or saving the result.
 *
 * @function AudioHighest
 * @param {AudioHighestOptions} options - The options object containing query and settings.
 * @returns {EventEmitter} The event emitter to handle progress, error, start, end, and stream events.
 *
 * @example
 * const emitter = AudioHighest({ query: "Funny Video", filter: "bassboost", stream: true });
 * emitter.on("progress", progress => console.log(progress));
 */
export default function AudioHighest({ query, output, useTor, stream, filter, metadata, verbose }: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse({ query, output, useTor, stream, filter, metadata, verbose });
      const engineData = await Tuber({ query, verbose, useTor }).catch(error => {
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
      instance.addOption("-headers", `X-Forwarded-For: ${engineData.ipAddress}`);
      instance.addInput(engineData.metaData.thumbnail);
      instance.addInput(engineData.AudioHighF.url);
      instance.withOutputFormat("avi");
      const filenameBase = `yt-dlx_AudioHighest_`;
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
        vaporwave: ["aresample=48000,asetrate=48000*0.8"],
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
    } catch (error: any) {
      switch (true) {
        case error instanceof ZodError:
          emitter.emit("error", error.errors);
          break;
        default:
          emitter.emit("error", error.message);
          break;
      }
    } finally {
      console.log(colors.green("@info:"), "❣️ Thank you for using yt-dlx. Consider 🌟starring the GitHub repo https://github.com/yt-dlx.");
    }
  })().catch(error => emitter.emit("error", error.message));
  return emitter;
}
