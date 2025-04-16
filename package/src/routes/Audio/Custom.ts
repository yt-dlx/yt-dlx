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
 * Fetches and processes audio from a specified query with customizable settings, including resolution and filters.
 *
 * This function allows you to search for audio content, select a specific resolution,
 * apply audio filters, stream the output, save it to a file, or retrieve metadata.
 * It leverages `ffmpeg` for audio processing and supports optional Tor usage for enhanced privacy.
 *
 * @param {object} options - An object containing the configuration options for fetching and processing audio.
 * @param {string} options.query - The search query string (minimum 2 characters) to find the desired audio. This is a mandatory parameter.
 * @param {string} [options.output] - An optional string specifying the directory path where the downloaded audio file should be saved.
 * This parameter is only applicable when the `stream` option is set to `true` and `metadata` is `false`.
 * If not provided, the audio file will be saved in the current working directory.
 * @param {boolean} [options.useTor=false] - An optional boolean value that, if set to `true`, will route the network request through the Tor network.
 * This can help in anonymizing your request. Requires Tor to be running on your system.
 * @param {boolean} [options.stream=false] - An optional boolean value that, if set to `true`, will enable streaming of the audio.
 * When streaming is enabled, the `output` parameter can be used to specify the save location.
 * This option cannot be used when `metadata` is `true`.
 * @param {boolean} [options.verbose=false] - An optional boolean value that, if set to `true`, enables verbose logging to the console, providing more detailed information about the process.
 * @param {boolean} [options.metadata=false] - An optional boolean value that, if set to `true`, will only fetch and emit metadata about the audio, without downloading or processing it.
 * This option cannot be used with `stream`, `output`, or `filter`.
 * @param {("high" | "medium" | "low" | "ultralow")} options.resolution - A required string specifying the desired audio resolution. Available options are:
 * - `"high"`: Highest available audio quality.
 * - `"medium"`: Medium audio quality.
 * - `"low"`: Low audio quality.
 * - `"ultralow"`: Lowest available audio quality.
 * @param {("echo" | "slow" | "speed" | "phaser" | "flanger" | "panning" | "reverse" | "vibrato" | "subboost" | "surround" | "bassboost" | "nightcore" | "superslow" | "vaporwave" | "superspeed")} [options.filter] - An optional string specifying an audio filter to apply during processing.
 * This parameter is only applicable when `stream` is `true` and `metadata` is `false`. Available filters include:
 * - `"echo"`
 * - `"slow"`
 * - `"speed"`
 * - `"phaser"`
 * - `"flanger"`
 * - `"panning"`
 * - `"reverse"`
 * - `"vibrato"`
 * - `"subboost"`
 * - `"surround"`
 * - `"bassboost"`
 * - `"nightcore"`
 * - `"superslow"`
 * - `"vaporwave"`
 * - `"superspeed"`
 *
 * @returns {EventEmitter} An EventEmitter instance that emits events during the audio processing.
 * The following events can be listened to:
 * - `"progress"`: Emitted with progress information during the download and processing of the audio. The data is an object containing progress details.
 * - `"error"`: Emitted when an error occurs during any stage of the process, including argument validation, network requests, or FFmpeg operations. The emitted data is the error message or object.
 * - `"start"`: Emitted when the FFmpeg processing starts. The emitted data is the FFmpeg start command string.
 * - `"end"`: Emitted when the FFmpeg processing successfully completes. The emitted data is the filename of the processed audio file.
 * - `"stream"`: Emitted when streaming is enabled (`stream: true` and `metadata: false`). The emitted data is an object with the following structure:
 * ```typescript
 * {
 * filename: string; // The full path to the output file
 * ffmpeg: ffmpeg.FfmpegCommand; // The FFmpeg command instance
 * }
 * ```
 * - `"metadata"`: Emitted when only metadata is requested (`metadata: true`). The emitted data is an object containing various metadata about the audio.
 *
 * @example
 * // 1: Fetch audio metadata for a query with high resolution
 * YouTubeDLX.AudioCustom({ query: "relaxing music", resolution: "high", metadata: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 2: Fetch audio metadata for a query with medium resolution and verbose logging
 * YouTubeDLX.AudioCustom({ query: "classical music", resolution: "medium", metadata: true, verbose: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 3: Fetch audio metadata for a query with low resolution using Tor
 * YouTubeDLX.AudioCustom({ query: "anonymous song", resolution: "low", metadata: true, useTor: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 4: Fetch audio metadata for a query with ultralow resolution, verbose logging, and using Tor
 * YouTubeDLX.AudioCustom({ query: "private audio", resolution: "ultralow", metadata: true, verbose: true, useTor: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 5: Stream audio for a query with high resolution
 * YouTubeDLX.AudioCustom({ query: "jazz music", resolution: "high", stream: true })
 * .on("stream", (streamData) => console.log("Streaming to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 6: Stream audio to a specific output directory with medium resolution
 * YouTubeDLX.AudioCustom({ query: "ambient music", resolution: "medium", stream: true, output: "/path/to/save" })
 * .on("stream", (streamData) => console.log("Streaming to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 7: Stream audio with low resolution and verbose logging
 * YouTubeDLX.AudioCustom({ query: "live concert", resolution: "low", stream: true, verbose: true })
 * .on("stream", (streamData) => console.log("Streaming to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 8: Stream audio with ultralow resolution using Tor
 * YouTubeDLX.AudioCustom({ query: "hidden track", resolution: "ultralow", stream: true, useTor: true })
 * .on("stream", (streamData) => console.log("Streaming via Tor to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 9: Stream audio with high resolution and the "echo" filter
 * YouTubeDLX.AudioCustom({ query: "haunted house sounds", resolution: "high", stream: true, filter: "echo" })
 * .on("stream", (streamData) => console.log("Streaming with echo filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 10: Stream audio with medium resolution and the "slow" filter
 * YouTubeDLX.AudioCustom({ query: "slowed song", resolution: "medium", stream: true, filter: "slow" })
 * .on("stream", (streamData) => console.log("Streaming with slow filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 11: Stream audio with low resolution and the "speed" filter
 * YouTubeDLX.AudioCustom({ query: "sped up audio", resolution: "low", stream: true, filter: "speed" })
 * .on("stream", (streamData) => console.log("Streaming with speed filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 12: Stream audio with ultralow resolution and the "phaser" filter
 * YouTubeDLX.AudioCustom({ query: "phaser effect music", resolution: "ultralow", stream: true, filter: "phaser" })
 * .on("stream", (streamData) => console.log("Streaming with phaser filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 13: Stream audio with high resolution and the "flanger" filter
 * YouTubeDLX.AudioCustom({ query: "flanger sound", resolution: "high", stream: true, filter: "flanger" })
 * .on("stream", (streamData) => console.log("Streaming with flanger filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 14: Stream audio with medium resolution and the "panning" filter
 * YouTubeDLX.AudioCustom({ query: "panning audio", resolution: "medium", stream: true, filter: "panning" })
 * .on("stream", (streamData) => console.log("Streaming with panning filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 15: Stream audio with low resolution and the "reverse" filter
 * YouTubeDLX.AudioCustom({ query: "reversed audio", resolution: "low", stream: true, filter: "reverse" })
 * .on("stream", (streamData) => console.log("Streaming with reverse filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 16: Stream audio with ultralow resolution and the "vibrato" filter
 * YouTubeDLX.AudioCustom({ query: "vibrato music", resolution: "ultralow", stream: true, filter: "vibrato" })
 * .on("stream", (streamData) => console.log("Streaming with vibrato filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 17: Stream audio with high resolution and the "subboost" filter
 * YouTubeDLX.AudioCustom({ query: "sub bass music", resolution: "high", stream: true, filter: "subboost" })
 * .on("stream", (streamData) => console.log("Streaming with subboost filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 18: Stream audio with medium resolution and the "surround" filter
 * YouTubeDLX.AudioCustom({ query: "surround sound audio", resolution: "medium", stream: true, filter: "surround" })
 * .on("stream", (streamData) => console.log("Streaming with surround filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 19: Stream audio with low resolution and the "bassboost" filter
 * YouTubeDLX.AudioCustom({ query: "bass boosted song", resolution: "low", stream: true, filter: "bassboost" })
 * .on("stream", (streamData) => console.log("Streaming with bassboost filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 20: Stream audio with ultralow resolution and the "nightcore" filter
 * YouTubeDLX.AudioCustom({ query: "nightcore remix", resolution: "ultralow", stream: true, filter: "nightcore" })
 * .on("stream", (streamData) => console.log("Streaming with nightcore filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 21: Stream audio with high resolution and the "superslow" filter
 * YouTubeDLX.AudioCustom({ query: "extremely slow music", resolution: "high", stream: true, filter: "superslow" })
 * .on("stream", (streamData) => console.log("Streaming with superslow filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 22: Stream audio with medium resolution and the "vaporwave" filter
 * YouTubeDLX.AudioCustom({ query: "vaporwave music", resolution: "medium", stream: true, filter: "vaporwave" })
 * .on("stream", (streamData) => console.log("Streaming with vaporwave filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 23: Stream audio with low resolution and the "superspeed" filter
 * YouTubeDLX.AudioCustom({ query: "very fast song", resolution: "low", stream: true, filter: "superspeed" })
 * .on("stream", (streamData) => console.log("Streaming with superspeed filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 24: Stream audio with ultralow resolution and output directory "/tmp/audio"
 * YouTubeDLX.AudioCustom({ query: "simple sound", resolution: "ultralow", stream: true, output: "/tmp/audio" })
 * .on("stream", (streamData) => console.log("Streaming to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 25: Stream audio with high resolution and using Tor
 * YouTubeDLX.AudioCustom({ query: "anonymous track", resolution: "high", stream: true, useTor: true })
 * .on("stream", (streamData) => console.log("Streaming via Tor to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 26: Stream audio with medium resolution, output directory "./downloads", and verbose logging
 * YouTubeDLX.AudioCustom({ query: "lecture recording", resolution: "medium", stream: true, output: "./downloads", verbose: true })
 * .on("stream", (streamData) => console.log("Streaming to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 27: Stream audio with low resolution, using Tor, and the "reverse" filter
 * YouTubeDLX.AudioCustom({ query: "secret message", resolution: "low", stream: true, useTor: true, filter: "reverse" })
 * .on("stream", (streamData) => console.log("Streaming reversed audio via Tor to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 28: Stream audio with ultralow resolution, output directory "~/audio_files", verbose logging, and the "nightcore" filter
 * YouTubeDLX.AudioCustom({ query: "fast remix", resolution: "ultralow", stream: true, output: "~/audio_files", verbose: true, filter: "nightcore" })
 * .on("stream", (streamData) => console.log("Streaming nightcore version to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 29: Stream audio with high resolution, using Tor, verbose logging, and the "bassboost" filter
 * YouTubeDLX.AudioCustom({ query: "deep bass song", resolution: "high", stream: true, useTor: true, verbose: true, filter: "bassboost" })
 * .on("stream", (streamData) => console.log("Streaming bass boosted audio via Tor to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 30: Get metadata for a query with high resolution and verbose output
 * YouTubeDLX.AudioCustom({ query: "interview", resolution: "high", metadata: true, verbose: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 31: Get metadata for a query with medium resolution using Tor
 * YouTubeDLX.AudioCustom({ query: "documentary audio", resolution: "medium", metadata: true, useTor: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 32: Get metadata for a query with low resolution, verbose output, and using Tor
 * YouTubeDLX.AudioCustom({ query: "old recording", resolution: "low", metadata: true, verbose: true, useTor: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 33: Get metadata for a query with ultralow resolution
 * YouTubeDLX.AudioCustom({ query: "simple notification sound", resolution: "ultralow", metadata: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
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
      if (output && (!stream || metadata)) {
        emitter.emit("error", `${colors.red("@error:")} The 'output' parameter can only be used when 'stream' is true and 'metadata' is false.`);
        return;
      }
      if (stream && filter && metadata) {
        emitter.emit("error", `${colors.red("@error:")} The 'filter' parameter can only be used when 'stream' is true and 'metadata' is false.`);
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
      const instance: ffmpeg.FfmpegCommand = ffmpeg();
      try {
        const paths = await locator();
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
      if (stream && filter && filterMap[filter]) {
        instance.withAudioFilter(filterMap[filter]);
      }
      instance.on("progress", progress => emitter.emit("progress", progress));
      instance.on("error", error => emitter.emit("error", `${colors.red("@error:")} FFmpeg encountered an error: ${error.message}`));
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
