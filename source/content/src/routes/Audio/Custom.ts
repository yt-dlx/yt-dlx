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
 * @description This function enables you to search for audio content and process it according to your specifications. You can select the desired audio quality from a range of resolutions, apply various audio filters to modify the sound when processing, stream the processed audio, save it to a file in a specified directory, or simply retrieve metadata about the audio source. The function utilizes `ffmpeg` for robust audio processing and offers the option to use the Tor network for anonymizing your requests. When not fetching just metadata, the function downloads and saves the audio file to the specified output path or the current directory.
 *
 * The function provides the following configuration options:
 * - **Query:** The search query string (minimum 2 characters) to find the desired audio. This is a mandatory parameter.
 * - **Output:** An optional string specifying the directory path where the processed audio file should be saved. This is applicable when `metadata` is false. If not provided when `metadata` is false, the file will be saved in the current working directory.
 * - **Use Tor:** An optional boolean value that, if true, routes the network request through the Tor network, enhancing privacy. Requires Tor to be running on your system.
 * - **Stream:** An optional boolean value that, if true, enables streaming (downloading) of the audio. This cannot be used with `metadata: true`.
 * - **Verbose:** An optional boolean value that, if true, enables detailed logging to the console.
 * - **Metadata:** An optional boolean value that, if true, only fetches and emits metadata about the audio, without downloading or processing. This cannot be used with `stream`, `output`, or `filter`.
 * - **Resolution:** A required string specifying the desired audio quality. Available options are: "high", "medium", "low", and "ultralow".
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
 * @param {("high" | "medium" | "low" | "ultralow")} options.resolution - The desired audio quality. **Required**.
 *
 * @returns {EventEmitter} An EventEmitter instance for handling events during audio processing.
 *
 * @example
 * // 1. Get basic metadata for audio at high resolution
 * YouTubeDLX.AudioCustom({ query: "podcast episode", resolution: "high", metadata: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 2. Get metadata with verbose logging for audio at medium resolution
 * YouTubeDLX.AudioCustom({ query: "audiobook excerpt", resolution: "medium", metadata: true, verbose: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 3. Get metadata using Tor for audio at low resolution
 * YouTubeDLX.AudioCustom({ query: "short audio clip", resolution: "low", metadata: true, useTor: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 4. Get metadata with verbose logging and Tor for audio at ultralow resolution
 * YouTubeDLX.AudioCustom({ query: "voice memo", resolution: "ultralow", metadata: true, verbose: true, useTor: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 5. Stream audio at high resolution
 * YouTubeDLX.AudioCustom({ query: "instrumental music", resolution: "high", stream: true })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 6. Stream audio at medium resolution with verbose logging
 * YouTubeDLX.AudioCustom({ query: "news briefing", resolution: "medium", stream: true, verbose: true })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 7. Stream audio at low resolution to a specific output directory
 * YouTubeDLX.AudioCustom({ query: "old radio show", resolution: "low", stream: true, output: "./downloads" })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 8. Stream audio at ultralow resolution with verbose logging to a specific output directory
 * YouTubeDLX.AudioCustom({ query: "voice recording", resolution: "ultralow", stream: true, verbose: true, output: "./audio" })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 9. Stream audio at high resolution using Tor
 * YouTubeDLX.AudioCustom({ query: "private lecture audio", resolution: "high", stream: true, useTor: true })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 10. Stream audio at medium resolution with verbose logging using Tor
 * YouTubeDLX.AudioCustom({ query: "anonymous audio", resolution: "medium", stream: true, verbose: true, useTor: true })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 11. Stream audio at low resolution to a specific output directory using Tor
 * YouTubeDLX.AudioCustom({ query: "hidden audio", resolution: "low", stream: true, output: "./secret", useTor: true })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 12. Stream audio at ultralow resolution with verbose logging to a specific output directory using Tor
 * YouTubeDLX.AudioCustom({ query: "discreet recording", resolution: "ultralow", stream: true, verbose: true, output: "./vibrato", useTor: true })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 13. Stream audio at high resolution with the 'echo' filter
 * YouTubeDLX.AudioCustom({ query: "audio with echo", resolution: "high", stream: true, filter: "echo" })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 14. Stream audio at medium resolution with the 'slow' filter and verbose logging
 * YouTubeDLX.AudioCustom({ query: "slowed audio", resolution: "medium", stream: true, filter: "slow", verbose: true })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 15. Stream audio at low resolution with the 'speed' filter and output directory
 * YouTubeDLX.AudioCustom({ query: "sped up audio", resolution: "low", stream: true, filter: "speed", output: "./modified" })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 16. Stream audio at ultralow resolution with the 'phaser' filter and Tor
 * YouTubeDLX.AudioCustom({ query: "phaser effect audio", resolution: "ultralow", stream: true, filter: "phaser", useTor: true })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 17. Stream audio at high resolution with the 'flanger' filter, verbose logging, and output directory
 * YouTubeDLX.AudioCustom({ query: "flanger audio", resolution: "high", stream: true, filter: "flanger", verbose: true, output: "./filtered" })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 18. Stream audio at medium resolution with the 'panning' filter, verbose logging, and Tor
 * YouTubeDLX.AudioCustom({ query: "panning audio", resolution: "medium", stream: true, filter: "panning", verbose: true, useTor: true })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 19. Stream audio at low resolution with the 'reverse' filter, output directory, and Tor
 * YouTubeDLX.AudioCustom({ query: "reversed audio", resolution: "low", stream: true, filter: "reverse", output: "./reversed", useTor: true })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 20. Stream audio at ultralow resolution with the 'vibrato' filter, verbose logging, output directory, and Tor
 * YouTubeDLX.AudioCustom({ query: "vibrato audio", resolution: "ultralow", stream: true, verbose: true, output: "./vibrato", useTor: true })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 21. Stream audio with 'subboost' filter at high resolution
 * YouTubeDLX.AudioCustom({ query: "audio with subboost", resolution: "high", stream: true, filter: "subboost" })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 22. Stream audio with 'surround' filter at medium resolution
 * YouTubeDLX.AudioCustom({ query: "surround sound audio", resolution: "medium", stream: true, filter: "surround" })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 23. Stream audio with 'bassboost' filter at low resolution
 * YouTubeDLX.AudioCustom({ query: "bass boosted audio", resolution: "low", stream: true, filter: "bassboost" })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 24. Stream audio with 'nightcore' filter at ultralow resolution
 * YouTubeDLX.AudioCustom({ query: "nightcore version", resolution: "ultralow", stream: true, filter: "nightcore" })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 25. Stream audio with 'superslow' filter at high resolution
 * YouTubeDLX.AudioCustom({ query: "super slowed audio", resolution: "high", stream: true, filter: "superslow" })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 26. Stream audio with 'vaporwave' filter at medium resolution
 * YouTubeDLX.AudioCustom({ query: "vaporwave music", resolution: "medium", stream: true, filter: "vaporwave" })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 27. Stream audio with 'superspeed' filter at low resolution
 * YouTubeDLX.AudioCustom({ query: "super sped up song", resolution: "low", stream: true, filter: "superspeed" })
 * .on("stream", (streamData) => {
 * console.log("Streaming to:", streamData.filename);
 * streamData.ffmpeg.on("progress", (progress) => console.log("Progress:", progress));
 * streamData.ffmpeg.on("end", () => console.log("Stream finished"));
 * })
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 28. Download audio at high resolution to a specific output directory
 * YouTubeDLX.AudioCustom({ query: "downloadable podcast", resolution: "high", stream: false, output: "./downloads" })
 * .on("end", (filename) => console.log("Download finished:", filename))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 29. Download audio at medium resolution to current directory
 * YouTubeDLX.AudioCustom({ query: "downloadable music", resolution: "medium", stream: false })
 * .on("end", (filename) => console.log("Download finished:", filename))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 30. Download audio at high resolution with the 'echo' filter to a specific output directory
 * YouTubeDLX.AudioCustom({ query: "filtered podcast", resolution: "high", stream: false, filter: "echo", output: "./filtered_downloads" })
 * .on("end", (filename) => console.log("Filtered download finished:", filename))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 31. Download audio at medium resolution with the 'bassboost' filter to current directory
 * YouTubeDLX.AudioCustom({ query: "filtered music", resolution: "medium", stream: false, filter: "bassboost" })
 * .on("end", (filename) => console.log("Filtered download finished:", filename))
 * .on("error", (error) => console.error("Error:", error));
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
      if (metadata) {
        emitter.emit("metadata", {
          metaData: engineData.metaData,
          AudioLowF: engineData.AudioLowF,
          AudioHighF: engineData.AudioHighF,
          AudioLowDRC: engineData.AudioLowDRC,
          AudioHighDRC: engineData.AudioHighDRC,
          filename: engineData.metaData.title?.replace(/[^a-zA-Z0-9_]+/g, "_"),
        });
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
      let filename = `${filenameBase}${filter ? filter + "_" : ""}${title}.avi`;
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
      if (filter && filterMap[filter]) instance.withVideoFilter(filterMap[filter]);
      else instance.outputOptions("-c copy");
      instance.on("progress", progress => emitter.emit("progress", progress));
      instance.on("error", error => emitter.emit("error", `${colors.red("@error:")} FFmpeg encountered an error: ${error.message}`));
      instance.on("start", start => emitter.emit("start", start));
      instance.on("end", () => emitter.emit("end", outputPath));
      instance.output(outputPath);
      if (stream) emitter.emit("stream", { filename: outputPath, ffmpeg: instance });
      instance.run();
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
