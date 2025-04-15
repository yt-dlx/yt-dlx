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
  resolution: z.enum(["high", "medium", "low", "ultralow"]),
  filter: z.enum(["echo", "slow", "speed", "phaser", "flanger", "panning", "reverse", "vibrato", "subboost", "surround", "bassboost", "nightcore", "superslow", "vaporwave", "superspeed"]).optional(),
});

/**
 * Downloads and processes a custom audio file based on the provided parameters.
 *
 * @param {Object} options - The options for processing the audio file.
 * @param {string} options.query - The search query for the audio.
 * @param {string} [options.output] - The output folder where the audio file will be saved. Optional.
 * @param {boolean} [options.useTor] - Flag to use Tor for anonymity. Optional.
 * @param {boolean} [options.stream] - Flag to stream the audio instead of saving it. Optional.
 * @param {string} [options.filter] - The audio filter to apply to the audio file. Optional.
 * @param {boolean} [options.verbose] - Flag to enable verbose output. Optional.
 * @param {boolean} [options.metadata] - Flag to output metadata instead of downloading the audio. Optional.
 * @param {"high" | "medium" | "low" | "ultralow"} options.resolution - The resolution of the audio file to download.
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
 * // 1: Download and process audio with only the query and resolution
 * YouTubeDLX.Audio.Custom({ query: "Song title", resolution: "high" })
 *   .on("data", (audioData) => console.log("Audio data:", audioData))
 *   .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 2: Download and process audio with query, resolution, and verbose output enabled
 * YouTubeDLX.Audio.Custom({ query: "Song title", resolution: "high", verbose: true })
 *   .on("data", (audioData) => console.log("Audio data:", audioData))
 *   .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 3: Download and process audio with query, resolution, and custom output folder
 * YouTubeDLX.Audio.Custom({ query: "Song title", resolution: "high", output: "/path/to/folder" })
 *   .on("data", (audioData) => console.log("Audio data:", audioData))
 *   .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 4: Download and stream audio with query, resolution, and stream enabled
 * YouTubeDLX.Audio.Custom({ query: "Song title", resolution: "high", stream: true })
 *   .on("stream", (streamData) => console.log("Streaming audio:", streamData))
 *   .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 5: Download and process audio with query, resolution, and audio filter applied
 * YouTubeDLX.Audio.Custom({ query: "Song title", resolution: "high", filter: "bassboost" })
 *   .on("data", (audioData) => console.log("Audio data:", audioData))
 *   .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 6: Download and process audio with metadata instead of downloading the audio
 * YouTubeDLX.Audio.Custom({ query: "Song title", resolution: "high", metadata: true })
 *   .on("metadata", (metadata) => console.log("Metadata:", metadata))
 *   .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 7: Download and process audio with all parameters (query, resolution, output, stream, filter, verbose, metadata)
 * YouTubeDLX.Audio.Custom({ query: "Song title", resolution: "high", output: "/path/to/folder", stream: true, filter: "echo", verbose: true, metadata: true })
 *   .on("data", (audioData) => console.log("Audio data:", audioData))
 *   .on("error", (err) => console.error("Error:", err));
 */
export default function AudioCustom({ query, output, useTor, stream, filter, verbose, metadata, resolution }: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse({ query, output, useTor, stream, filter, verbose, metadata, resolution });
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
      const resolutionFilter = resolution.replace("p", "");
      const adata = engineData.AudioHigh.find((i: { format: string | string[] }) => i.format.includes(resolutionFilter));
      if (!adata) {
        emitter.emit("error", `${colors.red("@error:")} no audio data found. use list_formats() maybe?`);
        return;
      }
      instance.addInput(engineData.metaData.thumbnail);
      instance.withOutputFormat("avi");
      instance.addInput(adata.url);
      const filenameBase = `yt-dlx_AudioCustom_${resolution}_`;
      let filename = `${filenameBase}${filter ? filter + "_" : "_"}${title}.avi`;
      const filterMap = {
        speed: ["atempo=2"],
        flanger: ["flanger"],
        slow: ["atempo=0.8"],
        reverse: ["areverse"],
        surround: ["surround"],
        subboost: ["asubboost"],
        superspeed: ["atempo=3"],
        superslow: ["atempo=0.5"],
        vibrato: ["vibrato=f=6.5"],
        panning: ["apulsator=hz=0.08"],
        phaser: ["aphaser=in_gain=0.4"],
        echo: ["aecho=0.8:0.9:1000:0.3"],
        bassboost: ["bass=g=10,dynaudnorm=f=150"],
        vaporwave: ["aresample=48000,asetrate=48000*0.8"],
        nightcore: ["aresample=48000,asetrate=48000*1.25"],
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
        emitter.emit("metadata", {
          AudioLowDRC: engineData.AudioLowDRC,
          AudioLowF: engineData.AudioLowF,
          ipAddress: engineData.ipAddress,
          metaData: engineData.metaData,
          filename,
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
