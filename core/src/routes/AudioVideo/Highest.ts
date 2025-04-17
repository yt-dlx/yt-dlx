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
  filter: z.enum(["invert", "rotate90", "rotate270", "grayscale", "rotate180", "flipVertical", "flipHorizontal"]).optional(),
});

/**
 * Fetches and processes audio from a specified query at the highest available quality with optional video filters.
 *
 * This function allows you to search for audio content, download or stream it at the highest available quality,
 * apply video filters (note: these might not have a visual effect on audio), save it to a file, or retrieve metadata.
 * It utilizes `ffmpeg` for processing and supports optional Tor usage for enhanced privacy.
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
 * @param {("invert" | "rotate90" | "rotate270" | "grayscale" | "rotate180" | "flipVertical" | "flipHorizontal")} [options.filter] - An optional string specifying a video filter to apply during processing.
 * This parameter is only applicable when `stream` is `true` and `metadata` is `false`. Available filters include:
 * - `"invert"`
 * - `"rotate90"`
 * - `"rotate270"`
 * - `"grayscale"`
 * - `"rotate180"`
 * - `"flipVertical"`
 * - `"flipHorizontal"`
 * Note: These are video filters and might not have a discernible effect on audio output.
 * @param {boolean} [options.metadata=false] - An optional boolean value that, if set to `true`, will only fetch and emit metadata about the audio, without downloading or processing it.
 * This option cannot be used with `stream`, `output`, or `filter`.
 * @param {boolean} [options.verbose=false] - An optional boolean value that, if set to `true`, enables verbose logging to the console, providing more detailed information about the process.
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
 * // 1: Get metadata for a query
 * YouTubeDLX.AudioHighest({ query: "relaxing music", metadata: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 2: Get metadata for a query with verbose logging
 * YouTubeDLX.AudioHighest({ query: "classical music", metadata: true, verbose: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 3: Get metadata for a query using Tor
 * YouTubeDLX.AudioHighest({ query: "anonymous audio", metadata: true, useTor: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 4: Get metadata for a query with verbose logging and using Tor
 * YouTubeDLX.AudioHighest({ query: "private recording", metadata: true, verbose: true, useTor: true })
 * .on("metadata", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 5: Stream audio for a query
 * YouTubeDLX.AudioHighest({ query: "jazz music", stream: true })
 * .on("stream", (streamData) => console.log("Streaming to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 6: Stream audio to a specific output directory
 * YouTubeDLX.AudioHighest({ query: "ambient music", stream: true, output: "/path/to/save" })
 * .on("stream", (streamData) => console.log("Streaming to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 7: Stream audio with verbose logging
 * YouTubeDLX.AudioHighest({ query: "live concert", stream: true, verbose: true })
 * .on("stream", (streamData) => console.log("Streaming to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 8: Stream audio using Tor
 * YouTubeDLX.AudioHighest({ query: "hidden track", stream: true, useTor: true })
 * .on("stream", (streamData) => console.log("Streaming via Tor to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 9: Stream audio with the "invert" filter (note: video filter on audio)
 * YouTubeDLX.AudioHighest({ query: "experimental sound", stream: true, filter: "invert" })
 * .on("stream", (streamData) => console.log("Streaming with invert filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 10: Stream audio with the "rotate90" filter (note: video filter on audio)
 * YouTubeDLX.AudioHighest({ query: "rotated sound", stream: true, filter: "rotate90" })
 * .on("stream", (streamData) => console.log("Streaming with rotate90 filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 11: Stream audio with the "rotate270" filter (note: video filter on audio)
 * YouTubeDLX.AudioHighest({ query: "another rotation", stream: true, filter: "rotate270" })
 * .on("stream", (streamData) => console.log("Streaming with rotate270 filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 12: Stream audio with the "grayscale" filter (note: video filter on audio)
 * YouTubeDLX.AudioHighest({ query: "monochrome sound", stream: true, filter: "grayscale" })
 * .on("stream", (streamData) => console.log("Streaming with grayscale filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 13: Stream audio with the "rotate180" filter (note: video filter on audio)
 * YouTubeDLX.AudioHighest({ query: "flipped sound", stream: true, filter: "rotate180" })
 * .on("stream", (streamData) => console.log("Streaming with rotate180 filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 14: Stream audio with the "flipVertical" filter (note: video filter on audio)
 * YouTubeDLX.AudioHighest({ query: "vertically flipped sound", stream: true, filter: "flipVertical" })
 * .on("stream", (streamData) => console.log("Streaming with flipVertical filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 15: Stream audio with the "flipHorizontal" filter (note: video filter on audio)
 * YouTubeDLX.AudioHighest({ query: "horizontally flipped sound", stream: true, filter: "flipHorizontal" })
 * .on("stream", (streamData) => console.log("Streaming with flipHorizontal filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 16: Stream audio to output directory "/tmp/audio"
 * YouTubeDLX.AudioHighest({ query: "simple sound", stream: true, output: "/tmp/audio" })
 * .on("stream", (streamData) => console.log("Streaming to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 17: Stream audio using Tor and verbose logging
 * YouTubeDLX.AudioHighest({ query: "anonymous recording", stream: true, useTor: true, verbose: true })
 * .on("stream", (streamData) => console.log("Streaming via Tor to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 18: Stream audio with output directory "./downloads" and the "grayscale" filter (note: video filter on audio)
 * YouTubeDLX.AudioHighest({ query: "black and white audio", stream: true, output: "./downloads", filter: "grayscale" })
 * .on("stream", (streamData) => console.log("Streaming with grayscale filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 19: Stream audio using Tor and the "invert" filter (note: video filter on audio)
 * YouTubeDLX.AudioHighest({ query: "inverted audio", stream: true, useTor: true, filter: "invert" })
 * .on("stream", (streamData) => console.log("Streaming with invert filter via Tor to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 20: Stream audio with verbose logging and the "rotate90" filter (note: video filter on audio)
 * YouTubeDLX.AudioHighest({ query: "rotated audio log", stream: true, verbose: true, filter: "rotate90" })
 * .on("stream", (streamData) => console.log("Streaming with rotate90 filter to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 21: Stream audio with output directory "~/audio_files", verbose logging, and using Tor
 * YouTubeDLX.AudioHighest({ query: "secret audio", stream: true, output: "~/audio_files", verbose: true, useTor: true })
 * .on("stream", (streamData) => console.log("Streaming via Tor to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 22: Stream audio with all optional parameters: output, useTor, verbose, and filter
 * YouTubeDLX.AudioHighest({ query: "filtered anonymous sound", stream: true, output: "./filtered_audio", useTor: true, verbose: true, filter: "grayscale" })
 * .on("stream", (streamData) => console.log("Streaming with grayscale filter via Tor to:", streamData.filename))
 * .on("end", (filename) => console.log("Audio saved to:", filename))
 * .on("error", (err) => console.error("Error:", err));
 */
export default function AudioHighest({ query, output, useTor, stream, filter, metadata, verbose }: z.infer<typeof ZodSchema>): EventEmitter {
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
      const engineData = await Tuber({ query, verbose, useTor }).catch(error => {
        emitter.emit("error", `${colors.red("@error:")} Engine error: ${error?.message}`);
        return undefined;
      });
      if (!engineData) {
        emitter.emit("error", `${colors.red("@error:")} Unable to retrieve a response from the engine.`);
        return;
      }
      if (!engineData.metaData) {
        emitter.emit("error", `${colors.red("@error:")} Metadata not found in the engine response.`);
        return;
      }
      const title = engineData.metaData.title?.replace(/[^a-zA-Z0-9_]+/g, "_") || "audio";
      const folder = output ? output : process.cwd();
      if (!fs.existsSync(folder)) {
        try {
          fs.mkdirSync(folder, { recursive: true });
        } catch (mkdirError: any) {
          emitter.emit("error", `${colors.red("@error:")} Failed to create output directory: ${mkdirError?.message}`);
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
        emitter.emit("error", `${colors.red("@error:")} Thumbnail URL not found.`);
        return;
      }
      instance.addInput(engineData.metaData.thumbnail);
      instance.addInput(engineData.AudioHighF?.url);
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
