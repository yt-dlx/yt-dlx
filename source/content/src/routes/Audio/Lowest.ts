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
 * @shortdesc Fetches the lowest quality audio and applies audio filters with options for streaming, Tor, and metadata.
 *
 * @description This function allows you to search for audio content and retrieve it in the lowest quality available. You can either stream the audio, apply various audio filters to modify the sound when processing, save it to a specified output directory, or just fetch the metadata associated with the audio. The function utilizes `ffmpeg` for audio processing and provides an option to use the Tor network for anonymizing your requests. When not fetching just metadata, the function downloads and saves the audio file to the specified output path or the current directory.
 *
 * The function provides the following configuration options:
 * - **Query:** The search query string (minimum 2 characters) to find the desired audio. This is a mandatory parameter.
 * - **Output:** An optional string specifying the directory path where the processed audio file should be saved. This is applicable when `metadata` is false. If not provided when `metadata` is false, the file will be saved in the current working directory.
 * - **Use Tor:** An optional boolean value that, if true, routes the network request through the Tor network, enhancing privacy. Requires Tor to be running on your system.
 * - **Stream:** An optional boolean value that, if true, enables streaming (downloading) of the audio. This cannot be used with `metadata: true`.
 * - **Verbose:** An optional boolean value that, if true, enables detailed logging to the console.
 * - **Metadata:** An optional boolean value that, if true, only fetches and emits metadata about the audio, without downloading or processing. This cannot be used with `stream`, `output`, or `filter`.
 * - **Filter:** An optional string specifying an audio filter to apply during processing. This is only applicable when `metadata` is false. Available filters include: "echo", "slow", "speed", "phaser", "flanger", "panning", "reverse", "vibrato", "subboost", "surround", "bassboost", "nightcore", "superslow", "vaporwave", and "superspeed".
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
 * @param {boolean} [options.stream=false] - Enable audio streaming (only with `metadata: false`).
 * @param {("echo" | "slow" | "speed" | "phaser" | "flanger" | "panning" | "reverse" | "vibrato" | "subboost" | "surround" | "bassboost" | "nightcore" | "superslow" | "vaporwave" | "superspeed")} [options.filter] - Apply an audio filter during processing (only with `metadata: false`).
 * @param {boolean} [options.verbose=false] - Enable verbose logging.
 * @param {boolean} [options.metadata=false] - Only fetch and emit metadata (cannot be used with `stream`, `output`, `filter`).
 *
 * @returns {EventEmitter} An EventEmitter instance for handling events during audio processing.
 *
 * @example
 * // 1. Get basic metadata for the lowest quality audio
 * YouTubeDLX.AudioLowest({ query: "low quality music", metadata: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 2. Get metadata with verbose logging for the lowest quality audio
 * YouTubeDLX.AudioLowest({ query: "worst audio quality", metadata: true, verbose: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 3. Get metadata using Tor for the lowest quality audio
 * YouTubeDLX.AudioLowest({ query: "anonymous low quality audio search", metadata: true, useTor: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 4. Get metadata with verbose logging and Tor for the lowest quality audio
 * YouTubeDLX.AudioLowest({ query: "private audio metadata low", metadata: true, verbose: true, useTor: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 5. Stream the lowest quality audio
 * YouTubeDLX.AudioLowest({ query: "bottom audio track", stream: true })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 6. Stream the lowest quality audio with verbose logging
 * YouTubeDLX.AudioLowest({ query: "economy sound", stream: true, verbose: true })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 7. Stream the lowest quality audio to a specific output directory
 * YouTubeDLX.AudioLowest({ query: "download low quality audio", stream: true, output: "./lq_downloads" })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 8. Stream the lowest quality audio with verbose logging to a specific output directory
 * YouTubeDLX.AudioLowest({ query: "save worst audio", stream: true, verbose: true, output: "./low_audio" })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 9. Stream the lowest quality audio using Tor
 * YouTubeDLX.AudioLowest({ query: "anonymous low quality audio", stream: true, useTor: true })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 10. Stream the lowest quality audio with verbose logging using Tor
 * YouTubeDLX.AudioLowest({ query: "private low quality audio stream", stream: true, verbose: true, useTor: true })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 11. Stream the lowest quality audio to a specific output directory using Tor
 * YouTubeDLX.AudioLowest({ query: "download worst audio anonymously", stream: true, output: "./lq_hidden", useTor: true })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 12. Stream the lowest quality audio with verbose logging to a specific output directory using Tor
 * YouTubeDLX.AudioLowest({ query: "save lowest quality audio privately", stream: true, verbose: true, output: "./lq_anonymous_audio", useTor: true })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 13. Stream the lowest quality audio with the 'echo' filter
 * YouTubeDLX.AudioLowest({ query: "echo effect low audio", stream: true, filter: "echo" })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 14. Stream the lowest quality audio with the 'slow' filter and verbose logging
 * YouTubeDLX.AudioLowest({ query: "slowed down low audio", stream: true, filter: "slow", verbose: true })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 15. Stream the lowest quality audio with the 'speed' filter and output directory
 * YouTubeDLX.AudioLowest({ query: "sped up low audio track", stream: true, filter: "speed", output: "./lq_modified" })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 16. Stream the lowest quality audio with the 'phaser' filter and Tor
 * YouTubeDLX.AudioLowest({ query: "phaser low sound effect", stream: true, filter: "phaser", useTor: true })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 17. Stream the lowest quality audio with the 'flanger' filter, verbose logging, and output directory
 * YouTubeDLX.AudioLowest({ query: "flanger effect on low audio", stream: true, filter: "flanger", verbose: true, output: "./lq_filtered" })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 18. Stream the lowest quality audio with the 'panning' filter, verbose logging, and Tor
 * YouTubeDLX.AudioLowest({ query: "low audio with panning effect", stream: true, filter: "panning", verbose: true, useTor: true })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 19. Stream the lowest quality audio with the 'reverse' filter, output directory, and Tor
 * YouTubeDLX.AudioLowest({ query: "reversed low audio track", stream: true, filter: "reverse", output: "./lq_reversed", useTor: true })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 20. Stream the lowest quality audio with the 'vibrato' filter, verbose logging, output directory, and Tor
 * YouTubeDLX.AudioLowest({ query: "low audio with vibrato", stream: true, filter: "vibrato", verbose: true, output: "./lq_vibrato", useTor: true })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 21. Stream the lowest quality audio with the 'subboost' filter
 * YouTubeDLX.AudioLowest({ query: "low audio with sub-bass boost", stream: true, filter: "subboost" })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 22. Stream the lowest quality audio with the 'surround' filter
 * YouTubeDLX.AudioLowest({ query: "low surround sound audio", stream: true, filter: "surround" })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 23. Stream the lowest quality audio with the 'bassboost' filter
 * YouTubeDLX.AudioLowest({ query: "low bass boosted audio", stream: true, filter: "bassboost" })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 24. Stream the lowest quality audio with the 'nightcore' filter
 * YouTubeDLX.AudioLowest({ query: "low nightcore remix", stream: true, filter: "nightcore" })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 25. Stream the lowest quality audio with the 'superslow' filter
 * YouTubeDLX.AudioLowest({ query: "super slowed down low audio", stream: true, filter: "superslow" })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 26. Stream the lowest quality audio with the 'vaporwave' filter
 * YouTubeDLX.AudioLowest({ query: "low vaporwave music", stream: true, filter: "vaporwave" })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 27. Stream the lowest quality audio with the 'superspeed' filter
 * YouTubeDLX.AudioLowest({ query: "super sped up low audio", stream: true, filter: "superspeed" })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 28. Download the lowest quality audio to a specific output directory
 * YouTubeDLX.AudioLowest({ query: "low quality podcast", stream: false, output: "./lq_downloads" })
 * .on("end", (filename) => console.log("Download finished:", filename))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 29. Download the lowest quality audio to current directory
 * YouTubeDLX.AudioLowest({ query: "low quality music", stream: false })
 * .on("end", (filename) => console.log("Download finished:", filename))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 30. Download the lowest quality audio with the 'echo' filter to a specific output directory
 * YouTubeDLX.AudioLowest({ query: "filtered low quality podcast", stream: false, filter: "echo", output: "./lq_filtered_downloads" })
 * .on("end", (filename) => console.log("Filtered download finished:", filename))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 31. Download the lowest quality audio with the 'bassboost' filter to current directory
 * YouTubeDLX.AudioLowest({ query: "filtered low quality music", stream: false, filter: "bassboost" })
 * .on("end", (filename) => console.log("Filtered download finished:", filename))
 * .on("error", (error) => console.error("Error:", error));
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
      if (metadata) {
        emitter.emit("metadata", { AudioLowDRC: engineData.AudioLowDRC, AudioLowF: engineData.AudioLowF, ipAddress: engineData.ipAddress, metaData: engineData.metaData });
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
      let filename = `${filenameBase}${filter ? filter + "_" : ""}${title}.avi`;
      const outputPath = path.join(folder, filename);
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
      instance.on("error", error => emitter.emit("error", `${colors.red("@error:")} FFmpeg error: ${error?.message}`));
      instance.on("start", start => emitter.emit("start", start));
      instance.on("end", () => emitter.emit("end", outputPath));
      instance.output(outputPath);
      if (stream) emitter.emit("stream", { filename: outputPath, ffmpeg: instance });
      instance.run();
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
