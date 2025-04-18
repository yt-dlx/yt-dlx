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
 * @shortdesc Fetches audio with customizable quality and applies audio filters with options for streaming, Tor, and metadata.
 *
 * @description This function enables you to search for audio content and process it according to your specifications. You can select the desired audio quality from a range of resolutions, apply various audio filters to modify the sound, stream the processed audio, save it to a file in a specified directory, or simply retrieve metadata about the audio source. The function utilizes `ffmpeg` for robust audio processing and offers the option to use the Tor network for anonymizing your requests. When not fetching just metadata, the function downloads and saves the audio file to the specified output path or the current directory.
 *
 * The function provides the following configuration options:
 * - **Query:** The search query string (minimum 2 characters) to find the desired audio. This is a mandatory parameter.
 * - **Output:** An optional string specifying the directory path where the processed audio file should be saved. This is applicable when `metadata` is false. If not provided when `metadata` is false, the file will be saved in the current working directory.
 * - **Use Tor:** An optional boolean value that, if true, routes the network request through the Tor network, enhancing privacy. Requires Tor to be running on your system.
 * - **Stream:** An optional boolean value that, if true, enables streaming (downloading) of the audio, also allowing filtering. This cannot be used with `metadata: true`.
 * - **Verbose:** An optional boolean value that, if true, enables detailed logging to the console.
 * - **Metadata:** An optional boolean value that, if true, only fetches and emits metadata about the audio, without downloading or processing. This cannot be used with `stream`, `output`, or `filter`.
 * - **Resolution:** A required string specifying the desired audio quality. Available options are: "high", "medium", "low", and "ultralow".
 * - **Filter:** An optional string specifying an audio filter to apply during processing. This is only applicable when `stream` is true and `metadata` is false. Available filters include: "echo", "slow", "speed", "phaser", "flanger", "panning", "reverse", "vibrato", "subboost", "surround", "bassboost", "nightcore", "superslow", "vaporwave", and "superspeed".
 *
 * The function returns an EventEmitter instance that emits events during the audio processing:
 * - `"progress"`: Emitted with progress information during the download and processing. The data is an object containing progress details.
 * - `"error"`: Emitted when an error occurs during any stage of the process. The emitted data is the error message or object.
 * - `"start"`: Emitted when the FFmpeg processing starts. The emitted data is the FFmpeg start command string.
 * - `"end"`: Emitted when the FFmpeg processing successfully completes. The emitted data is the filename of the processed audio file.
 * - `"stream"`: Emitted when streaming is enabled (`stream: true, metadata: false`). The emitted data is an object containing the filename and the FFmpeg command instance.
 * - `"metadata"`: Emitted when only metadata is requested (`metadata: true`). The emitted data is an object containing various metadata about the audio.
 *
 * @param {object} options - An object containing the configuration options.
 * @param {string} options.query - The search query string (minimum 2 characters). **Required**.
 * @param {string} [options.output] - The directory path to save the processed audio file (only with `metadata: false`).
 * @param {boolean} [options.useTor=false] - Route requests through the Tor network.
 * @param {boolean} [options.stream=false] - Enable audio streaming and filtering (only with `metadata: false`).
 * @param {("echo" | "slow" | "speed" | "phaser" | "flanger" | "panning" | "reverse" | "vibrato" | "subboost" | "surround" | "bassboost" | "nightcore" | "superslow" | "vaporwave" | "superspeed")} [options.filter] - Apply an audio filter during streaming (only with `stream: true` and `metadata: false`).
 * @param {boolean} [options.verbose=false] - Enable verbose logging.
 * @param {boolean} [options.metadata=false] - Only fetch and emit metadata (cannot be used with `stream`, `output`, `filter`).
 * @param {("high" | "medium" | "low" | "ultralow")} options.resolution - The desired audio quality. **Required**.
 *
 * @returns {EventEmitter} An EventEmitter instance for handling events during audio processing.
 *
 */
export default function AudioCustom({ query, output, useTor, stream, filter, verbose, metadata, resolution }: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      if (!query) {
        emitter.emit("error", `${colors.red("@error:")} The 'query' parameter is required.`);
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
      if (filter && !stream) {
        emitter.emit("error", `${colors.red("@error:")} The 'filter' parameter can only be used when 'stream' is true.`);
        return;
      }
      if (!resolution) {
        emitter.emit("error", `${colors.red("@error:")} The 'resolution' parameter is required.`);
        return;
      }
      ZodSchema.parse({ query, output, useTor, stream, filter, verbose, metadata, resolution });
      const engineData = await Tuber({ query, verbose, useTor });
      if (!engineData) {
        emitter.emit("error", `${colors.red("@error:")} Unable to retrieve a response from the engine.`);
        return;
      }
      if (!engineData.metaData) {
        emitter.emit("error", `${colors.red("@error:")} Metadata was not found in the engine's response.`);
        return;
      }
      const title = engineData.metaData.title.replace(/[^a-zA-Z0-9_]+/g, "_");
      const folder = output ? output : process.cwd();
      if (!fs.existsSync(folder)) {
        try {
          fs.mkdirSync(folder, { recursive: true });
        } catch (mkdirError: any) {
          emitter.emit("error", `${colors.red("@error:")} Failed to create the output directory: ${mkdirError.message}`);
          return;
        }
      }
      if (!metadata) {
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
          emitter.emit("error", `${colors.red("@error:")} Failed to locate ffmpeg or ffprobe: ${locatorError.message}`);
          return;
        }
        const resolutionFilter = resolution.replace("p", "");
        const adata = engineData.AudioHigh?.find((i: { format: string | string[] }) => i.format?.includes(resolutionFilter));
        if (!adata) {
          emitter.emit("error", `${colors.red("@error:")} No audio data found for the specified resolution: ${resolution}. Please use the 'list_formats()' command to see available formats.`);
          return;
        }
        if (!engineData.metaData.thumbnail) {
          emitter.emit("error", `${colors.red("@error:")} The thumbnail URL was not found.`);
          return;
        }
        instance.addInput(engineData.metaData.thumbnail);
        instance.withOutputFormat("avi");
        if (!adata.url) {
          emitter.emit("error", `${colors.red("@error:")} The audio URL was not found.`);
          return;
        }
        instance.addInput(adata.url);
        const filenameBase = `yt-dlx_AudioCustom_${resolution}_`;
        let filename = `${filenameBase}${filter && stream ? filter + "_" : ""}${title}.avi`;
        const outputPath = path.join(folder, filename);
        const filterMap: { [key: string]: string[] } = {
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
        if (stream && filter && filterMap[filter]) instance.withAudioFilter(filterMap[filter]);
        instance.on("progress", progress => emitter.emit("progress", progress));
        instance.on("error", error => emitter.emit("error", `${colors.red("@error:")} FFmpeg encountered an error: ${error.message}`));
        instance.on("start", start => emitter.emit("start", start));
        instance.on("end", () => emitter.emit("end", outputPath));
        instance.output(outputPath);
        if (stream) emitter.emit("stream", { filename: outputPath, ffmpeg: instance });
        instance.run();
      } else {
        emitter.emit("metadata", { AudioLowDRC: engineData.AudioLowDRC, AudioLowF: engineData.AudioLowF, ipAddress: engineData.ipAddress, metaData: engineData.metaData });
      }
    } catch (error) {
      if (error instanceof ZodError) emitter.emit("error", `${colors.red("@error:")} Argument validation failed: ${error.errors.map(e => `${e.path.join(".")}: ${e.message}`).join(", ")}`);
      else if (error instanceof Error) emitter.emit("error", `${colors.red("@error:")} ${error.message}`);
      else emitter.emit("error", `${colors.red("@error:")} An unexpected error occurred: ${String(error)}`);
    } finally {
      console.log(colors.green("@info:"), "❣️ Thank you for using yt-dlx. Consider 🌟starring the GitHub repo https://github.com/yt-dlx.");
    }
  })();
  return emitter;
}
