/**
 * @shortdesc Downloads or streams the lowest quality audio from YouTube.
 * @description This function allows you to download or stream the lowest available audio quality from YouTube based on a search query or video URL. It offers customization options such as saving the output to a specified directory, using Tor for anonymity, enabling verbose logging, streaming the output, or simply fetching the metadata without downloading. Audio filters can also be applied.
 *
 * The function requires a search query or video URL. It automatically selects the lowest quality audio format available.
 *
 * It supports the following configuration options:
 * - **query:** A string representing the search query or video URL. This is a mandatory parameter.
 * - **output:** An optional string specifying the directory where the output audio file should be saved. If not provided, the file will be saved in the current working directory. This parameter cannot be used when `metadata` is true.
 * - **useTor:** An optional boolean value. If true, the function will attempt to use Tor for the network requests, enhancing anonymity.
 * - **stream:** An optional boolean value. If true, the audio will be streamed instead of saved to a file. When streaming, the `end` event will provide the streamable path and the `stream` event will provide the FFmpeg instance. This parameter cannot be used when `metadata` is true.
 * - **verbose:** An optional boolean value. If true, enables detailed logging to the console, providing more information about the process.
 * - **metadata:** An optional boolean value. If true, the function will only fetch and emit the video metadata without downloading or streaming the audio. When `metadata` is true, the `output`, `stream`, and `filter` parameters are not allowed.
 * - **filter:** An optional string specifying an audio filter to apply to the audio stream. This parameter is ignored when `metadata` is true. Available filters include: "echo", "slow", "speed", "phaser", "flanger", "panning", "reverse", "vibrato", "subboost", "surround", "bassboost", "nightcore", "superslow", "vaporwave", "superspeed".
 *
 * The function returns an EventEmitter instance that emits events during the process:
 * - "start": Emitted when the process begins, providing the FFmpeg command being executed.
 * - "progress": Emitted periodically during the download/streaming process, providing progress details (e.g., downloaded size, time remaining).
 * - "end": Emitted when the download/streaming process completes successfully, providing the path to the saved file. If `stream` is true, it provides the streamable path.
 * - "metadata": Emitted only when the `metadata` parameter is true. Provides an object containing the video metadata, the lowest audio format details, and a suggested filename.
 * - "stream": Emitted only when the `stream` parameter is true. Provides an object containing the streamable filename/path and the FFmpeg instance.
 * - "error": Emitted when an error occurs at any stage, such as argument validation, network issues, or FFmpeg errors. The emitted data is the error message.
 *
 * @param {object} options - An object containing the configuration options.
 * @param {string} options.query - The search query or video URL. **Required**.
 * @param {string} [options.output] - The directory to save the output file. Cannot be used with `metadata: true`.
 * @param {boolean} [options.useTor] - Whether to use Tor.
 * @param {boolean} [options.stream] - Whether to stream the output. Cannot be used with `metadata: true`.
 * @param {boolean} [options.verbose] - Enable verbose logging.
 * @param {boolean} [options.metadata] - Only fetch metadata. Cannot be used with `output`, `stream`, or `filter`.
 * @param {("echo" | "slow" | "speed" | "phaser" | "flanger" | "panning" | "reverse" | "vibrato" | "subboost" | "surround" | "bassboost" | "nightcore" | "superslow" | "vaporwave" | "superspeed")} [options.filter] - An audio filter to apply. Cannot be used with `metadata: true`.
 * @returns {EventEmitter} An EventEmitter instance for handling events during the audio processing.
 *
 */

import YouTubeDLX from "yt-dlx";

// 1. Download the lowest quality audio to the current directory
YouTubeDLX.Audio.Lowest({ query: "your search query or url" })
  .on("start", start => console.log("FFmpeg started:", start))
  .on("progress", progress => console.log("Progress:", progress))
  .on("end", outputPath => console.log("Download finished:", outputPath))
  .on("error", error => console.error("Error:", error));

// 2. Download the lowest quality audio to a custom output directory
YouTubeDLX.Audio.Lowest({ query: "your search query or url", output: "./lowest_audio_downloads" })
  .on("start", start => console.log("FFmpeg started:", start))
  .on("progress", progress => console.log("Progress:", progress))
  .on("end", outputPath => console.log("Download finished:", outputPath))
  .on("error", error => console.error("Error:", error));

// 3. Stream the lowest quality audio
YouTubeDLX.Audio.Lowest({ query: "your search query or url", stream: true })
  .on("start", start => console.log("FFmpeg started:", start))
  .on("progress", progress => console.log("Progress:", progress))
  .on("stream", data => {
    console.log("Stream available:", data.filename); // You can use data.ffmpeg instance for streaming
  })
  .on("end", streamPath => console.log("Streaming session ended:", streamPath))
  .on("error", error => console.error("Error:", error));

// 4. Fetch only metadata for the lowest quality audio
YouTubeDLX.Audio.Lowest({ query: "your search query or url", metadata: true })
  .on("metadata", data => console.log("Metadata:", data))
  .on("error", error => console.error("Error:", error));
// Note: output, stream, and filter are ignored when metadata is true.

// 5. Download the lowest quality audio and apply a filter
YouTubeDLX.Audio.Lowest({ query: "your search query or url", filter: "flanger" })
  .on("start", start => console.log("FFmpeg started:", start))
  .on("progress", progress => console.log("Progress:", progress))
  .on("end", outputPath => console.log("Download finished:", outputPath))
  .on("error", error => console.error("Error:", error));

// 6. Download the lowest quality audio and use Tor
YouTubeDLX.Audio.Lowest({ query: "your search query or url", useTor: true })
  .on("start", start => console.log("FFmpeg started:", start))
  .on("progress", progress => console.log("Progress:", progress))
  .on("end", outputPath => console.log("Download finished:", outputPath))
  .on("error", error => console.error("Error:", error));

// 7. Download the lowest quality audio and enable verbose logging
YouTubeDLX.Audio.Lowest({ query: "your search query or url", verbose: true })
  .on("start", start => console.log("FFmpeg started:", start))
  .on("progress", progress => console.log("Progress:", progress))
  .on("end", outputPath => console.log("Download finished:", outputPath))
  .on("error", error => console.error("Error:", error));

// 8. Download the lowest quality audio with custom output and apply a filter
YouTubeDLX.Audio.Lowest({ query: "your search query or url", output: "./filtered_audio", filter: "bassboost" })
  .on("start", start => console.log("FFmpeg started:", start))
  .on("progress", progress => console.log("Progress:", progress))
  .on("end", outputPath => console.log("Download finished:", outputPath))
  .on("error", error => console.error("Error:", error));

// 9. Stream the lowest quality audio and apply a filter
YouTubeDLX.Audio.Lowest({ query: "your search query or url", stream: true, filter: "nightcore" })
  .on("start", start => console.log("FFmpeg started:", start))
  .on("progress", progress => console.log("Progress:", progress))
  .on("stream", data => {
    console.log("Stream available:", data.filename); // You can use data.ffmpeg instance for streaming
  })
  .on("end", streamPath => console.log("Streaming session ended:", streamPath))
  .on("error", error => console.error("Error:", error));

// 10. Download the lowest quality audio with all applicable options (query, output, useTor, verbose, filter)
YouTubeDLX.Audio.Lowest({ query: "your search query or url", output: "./full_options", useTor: true, verbose: true, filter: "vaporwave" })
  .on("start", start => console.log("FFmpeg started:", start))
  .on("progress", progress => console.log("Progress:", progress))
  .on("end", outputPath => console.log("Download finished:", outputPath))
  .on("error", error => console.error("Error:", error));

// 11. Stream the lowest quality audio with all applicable options (query, stream, useTor, verbose, filter)
YouTubeDLX.Audio.Lowest({ query: "your search query or url", stream: true, useTor: true, verbose: true, filter: "superspeed" })
  .on("start", start => console.log("FFmpeg started:", start))
  .on("progress", progress => console.log("Progress:", progress))
  .on("stream", data => {
    console.log("Stream available:", data.filename); // You can use data.ffmpeg instance for streaming
  })
  .on("end", streamPath => console.log("Streaming session ended:", streamPath))
  .on("error", error => console.error("Error:", error));

// 12. Fetch metadata with verbose logging and use Tor
YouTubeDLX.Audio.Lowest({ query: "your search query or url", metadata: true, verbose: true, useTor: true })
  .on("metadata", data => console.log("Metadata (Verbose, Tor):", data))
  .on("error", error => console.error("Error:", error));

// 13. Attempt to use output with metadata (will result in an error)
YouTubeDLX.Audio.Lowest({ query: "your search query or url", metadata: true, output: "./should_fail" }).on("error", error => console.error("Expected Error (output with metadata):", error));

// 14. Attempt to use stream with metadata (will result in an error)
YouTubeDLX.Audio.Lowest({ query: "your search query or url", metadata: true, stream: true }).on("error", error => console.error("Expected Error (stream with metadata):", error));

// 15. Attempt to use filter with metadata (will result in an error)
YouTubeDLX.Audio.Lowest({ query: "your search query or url", metadata: true, filter: "speed" }).on("error", error => console.error("Expected Error (filter with metadata):", error));

// 16. Attempt to use stream and output together
// Based on the code, stream: true and an output path provided will likely result in a file being saved and the stream event also firing.
YouTubeDLX.Audio.Lowest({ query: "your search query or url", stream: true, output: "./streamed_and_saved" })
  .on("start", start => console.log("FFmpeg started:", start))
  .on("progress", progress => console.log("Progress:", progress))
  .on("stream", data => {
    console.log("Stream event fired, file likely being saved to:", data.filename);
  })
  .on("end", outputPath => console.log("Process ended, file saved at:", outputPath)) // Should output the path in './streamed_and_saved'
  .on("error", error => console.error("Error:", error));

// 17. Missing required 'query' parameter (will result in an error)
YouTubeDLX.Audio.Lowest({}).on("error", error => console.error("Expected Error (missing query):", error));

// 18. Invalid 'filter' value (will result in an error - Zod validation)
YouTubeDLX.Audio.Lowest({ query: "your search query or url", filter: "nonexistentfilter" }).on("error", error => console.error("Expected Error (invalid filter):", error));

// 19. Query results in no engine data
// Note: This scenario depends on the internal Agent function's behavior.
// You can simulate by providing a query that is unlikely to return results.
YouTubeDLX.Audio.Lowest({ query: "a query that should return no results 12345abcde" }).on("error", error => console.error("Expected Error (no engine data):", error));
