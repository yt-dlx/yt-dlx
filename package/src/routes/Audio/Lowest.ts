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
 * Fetches and processes audio from a specified query at the lowest available quality.
 *
 * This function allows you to search for audio content, stream it, save it to a file,
 * apply audio filters, or retrieve metadata about the lowest quality audio available.
 * It utilizes `ffmpeg` for audio processing and supports optional Tor usage for enhanced privacy.
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
 * // 1: Fetch audio metadata for a query (lowest quality)
 * YouTubeDLX.AudioLowest({ query: "relaxing music", metadata: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 2: Fetch audio metadata with verbose logging (lowest quality)
 * YouTubeDLX.AudioLowest({ query: "classical music", metadata: true, verbose: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 3: Fetch audio metadata using Tor (lowest quality)
 * YouTubeDLX.AudioLowest({ query: "anonymous song", metadata: true, useTor: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 4: Fetch audio metadata with verbose logging and using Tor (lowest quality)
 * YouTubeDLX.AudioLowest({ query: "private audio", metadata: true, verbose: true, useTor: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 5: Stream audio for a query (lowest quality)
 * YouTubeDLX.AudioLowest({ query: "jazz music", stream: true })
 * .on("stream", (streamData) => console.log("Streaming to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 6: Stream audio to a specific output directory (lowest quality)
 * YouTubeDLX.AudioLowest({ query: "ambient music", stream: true, output: "/path/to/save" })
 * .on("stream", (streamData) => console.log("Streaming to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 7: Stream audio with verbose logging (lowest quality)
 * YouTubeDLX.AudioLowest({ query: "live concert", stream: true, verbose: true })
 * .on("stream", (streamData) => console.log("Streaming to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 8: Stream audio using Tor (lowest quality)
 * YouTubeDLX.AudioLowest({ query: "hidden track", stream: true, useTor: true })
 * .on("stream", (streamData) => console.log("Streaming via Tor to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 9: Stream audio with the "echo" filter (lowest quality)
 * YouTubeDLX.AudioLowest({ query: "haunted house sounds", stream: true, filter: "echo" })
 * .on("stream", (streamData) => console.log("Streaming with echo filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 10: Stream audio with the "slow" filter (lowest quality)
 * YouTubeDLX.AudioLowest({ query: "slowed song", stream: true, filter: "slow" })
 * .on("stream", (streamData) => console.log("Streaming with slow filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 11: Stream audio with the "speed" filter (lowest quality)
 * YouTubeDLX.AudioLowest({ query: "sped up audio", stream: true, filter: "speed" })
 * .on("stream", (streamData) => console.log("Streaming with speed filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 12: Stream audio with the "phaser" filter (lowest quality)
 * YouTubeDLX.AudioLowest({ query: "phaser effect music", stream: true, filter: "phaser" })
 * .on("stream", (streamData) => console.log("Streaming with phaser filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 13: Stream audio with the "flanger" filter (lowest quality)
 * YouTubeDLX.AudioLowest({ query: "flanger sound", stream: true, filter: "flanger" })
 * .on("stream", (streamData) => console.log("Streaming with flanger filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 14: Stream audio with the "panning" filter (lowest quality)
 * YouTubeDLX.AudioLowest({ query: "panning audio", stream: true, filter: "panning" })
 * .on("stream", (streamData) => console.log("Streaming with panning filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 15: Stream audio with the "reverse" filter (lowest quality)
 * YouTubeDLX.AudioLowest({ query: "reversed audio", stream: true, filter: "reverse" })
 * .on("stream", (streamData) => console.log("Streaming with reverse filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 16: Stream audio with the "vibrato" filter (lowest quality)
 * YouTubeDLX.AudioLowest({ query: "vibrato music", stream: true, filter: "vibrato" })
 * .on("stream", (streamData) => console.log("Streaming with vibrato filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 17: Stream audio with the "subboost" filter (lowest quality)
 * YouTubeDLX.AudioLowest({ query: "sub bass music", stream: true, filter: "subboost" })
 * .on("stream", (streamData) => console.log("Streaming with subboost filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 18: Stream audio with the "surround" filter (lowest quality)
 * YouTubeDLX.AudioLowest({ query: "surround sound audio", stream: true, filter: "surround" })
 * .on("stream", (streamData) => console.log("Streaming with surround filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 19: Stream audio with the "bassboost" filter (lowest quality)
 * YouTubeDLX.AudioLowest({ query: "bass boosted song", stream: true, filter: "bassboost" })
 * .on("stream", (streamData) => console.log("Streaming with bassboost filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 20: Stream audio with the "nightcore" filter (lowest quality)
 * YouTubeDLX.AudioLowest({ query: "nightcore remix", stream: true, filter: "nightcore" })
 * .on("stream", (streamData) => console.log("Streaming with nightcore filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 21: Stream audio with the "superslow" filter (lowest quality)
 * YouTubeDLX.AudioLowest({ query: "extremely slow music", stream: true, filter: "superslow" })
 * .on("stream", (streamData) => console.log("Streaming with superslow filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 22: Stream audio with the "vaporwave" filter (lowest quality)
 * YouTubeDLX.AudioLowest({ query: "vaporwave music", stream: true, filter: "vaporwave" })
 * .on("stream", (streamData) => console.log("Streaming with vaporwave filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 23: Stream audio with the "superspeed" filter (lowest quality)
 * YouTubeDLX.AudioLowest({ query: "very fast song", stream: true, filter: "superspeed" })
 * .on("stream", (streamData) => console.log("Streaming with superspeed filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 24: Stream audio with output directory and verbose logging (lowest quality)
 * YouTubeDLX.AudioLowest({ query: "podcast episode", stream: true, output: "/tmp/podcasts", verbose: true })
 * .on("stream", (streamData) => console.log("Streaming to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 25: Stream audio with output directory and using Tor (lowest quality)
 * YouTubeDLX.AudioLowest({ query: "secret audio", stream: true, output: "/home/user/tor_downloads", useTor: true })
 * .on("stream", (streamData) => console.log("Streaming via Tor to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 26: Stream audio with output directory and a filter (lowest quality)
 * YouTubeDLX.AudioLowest({ query: "remixed song", stream: true, output: "/path/to/remixes", filter: "nightcore" })
 * .on("stream", (streamData) => console.log("Streaming nightcore version to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 27: Stream audio with verbose logging and using Tor (lowest quality)
 * YouTubeDLX.AudioLowest({ query: "encrypted audio", stream: true, verbose: true, useTor: true })
 * .on("stream", (streamData) => console.log("Streaming via Tor to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 28: Stream audio with verbose logging and a filter (lowest quality)
 * YouTubeDLX.AudioLowest({ query: "live performance audio", stream: true, verbose: true, filter: "surround" })
 * .on("stream", (streamData) => console.log("Streaming surround sound version to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 29: Stream audio using Tor and a filter (lowest quality)
 * YouTubeDLX.AudioLowest({ query: "obscure audio", stream: true, useTor: true, filter: "reverse" })
 * .on("stream", (streamData) => console.log("Streaming reversed audio via Tor to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 30: Stream audio with output directory, verbose logging, and using Tor (lowest quality)
 * YouTubeDLX.AudioLowest({ query: "private podcast", stream: true, output: "/mnt/media/tor_podcasts", verbose: true, useTor: true })
 * .on("stream", (streamData) => console.log("Streaming via Tor to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 31: Stream audio with output directory, verbose logging, and a filter (lowest quality)
 * YouTubeDLX.AudioLowest({ query: "instrumental music", stream: true, output: "./instrumentals", verbose: true, filter: "bassboost" })
 * .on("stream", (streamData) => console.log("Streaming bass boosted version to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 32: Stream audio with output directory, using Tor, and a filter (lowest quality)
 * YouTubeDLX.AudioLowest({ query: "experimental audio", stream: true, output: "~/tor_audio", useTor: true, filter: "flanger" })
 * .on("stream", (streamData) => console.log("Streaming flanger version via Tor to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 33: Stream audio with verbose logging, using Tor, and a filter (lowest quality)
 * YouTubeDLX.AudioLowest({ query: "unique sound", stream: true, verbose: true, useTor: true, filter: "phaser" })
 * .on("stream", (streamData) => console.log("Streaming phaser version via Tor to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 34: Stream audio with output directory, verbose logging, using Tor, and a filter (lowest quality)
 * YouTubeDLX.AudioLowest({ query: "rare recording", stream: true, output: "/data/audio/rare", verbose: true, useTor: true, filter: "reverse" })
 * .on("stream", (streamData) => console.log("Streaming reversed audio via Tor to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 */
export default function AudioLowest({ query, output, useTor, stream, filter, metadata, verbose }: z.infer<typeof ZodSchema>): EventEmitter {
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
      ZodSchema.parse({ query, output, useTor, stream, filter, metadata, verbose });
      const engineData = await Agent({ query, verbose, useTor }).catch(error => {
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
      const title = engineData.metaData.title?.replace(/[^a-zA-Z0-9_]+/g, "_");
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
        instance.setFfmpegPath(paths.ffmpeg);
        instance.setFfprobePath(paths.ffprobe);
      } catch (locatorError: any) {
        emitter.emit("error", `${colors.red("@error:")} Failed to locate ffmpeg or ffprobe: ${locatorError?.message}`);
        return;
      }
      if (!engineData.metaData.thumbnail) {
        emitter.emit("error", `${colors.red("@error:")} Thumbnail URL was not found.`);
        return;
      }
      instance.addInput(engineData.metaData.thumbnail);
      instance.withOutputFormat("avi");
      if (!engineData.AudioLowF?.url) {
        emitter.emit("error", `${colors.red("@error:")} Lowest quality audio URL was not found.`);
        return;
      }
      instance.addInput(engineData.AudioLowF.url);
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
        vaporwave: ["aresample=48000,asetrate=48000*0.8"],
        vibrato: ["vibrato=f=6.5"],
      };
      if (stream && filter && filterMap[filter]) instance.withAudioFilter(filterMap[filter]);
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
        emitter.emit("metadata", { AudioLowDRC: engineData.AudioLowDRC, AudioLowF: engineData.AudioLowF, ipAddress: engineData.ipAddress, metaData: engineData.metaData, filename });
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
