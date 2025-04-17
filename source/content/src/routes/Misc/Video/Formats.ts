import colors from "colors";
import { z, ZodError } from "zod";
import { EventEmitter } from "events";
import Tuber from "../../../utils/Agent";
import type EngineOutput from "../../../interfaces/EngineOutput";
const ZodSchema = z.object({ query: z.string().min(2), verbose: z.boolean().optional() });
/**
 * @shortdesc Lists available audio and video formats for a video.
 *
 * @description This function takes a search query to find a YouTube video and then retrieves a comprehensive list of available audio and video formats. The list includes information about different manifests, audio and video qualities (low and high), and HDR options. It provides details such as format type and bitrate for manifests, and filesize and format notes for audio and video streams. You can optionally enable verbose logging to see more detailed information about the process in the console.
 *
 * @param {object} options - An object containing the configuration options for listing video formats.
 * @param {string} options.query - The search query string (minimum 2 characters) to find the desired video. **Required**.
 * @param {boolean} [options.verbose=false] - An optional boolean value that, if set to `true`, enables verbose logging to the console, providing more detailed information about the process.
 *
 * @returns {EventEmitter} An EventEmitter instance that emits events during the format listing process.
 * The following events can be listened to:
 * - `"data"`: Emitted when the list of available formats is successfully retrieved. The data is an object with the following structure:
 * ```typescript
 * {
 * ManifestLow: { format: string; tbr: number }[];
 * ManifestHigh: { format: string; tbr: number }[];
 * AudioLow: { filesizeP: number; format_note: string }[];
 * VideoLow: { filesizeP: number; format_note: string }[];
 * VideoHigh: { filesizeP: number; format_note: string }[];
 * AudioHigh: { filesizeP: number; format_note: string }[];
 * VideoLowHDR: { filesizeP: number; format_note: string }[];
 * AudioLowDRC: { filesizeP: number; format_note: string }[];
 * AudioHighDRC: { filesizeP: number; format_note: string }[];
 * VideoHighHDR: { filesizeP: number; format_note: string }[];
 * }
 * ```
 * - `"error"`: Emitted when an error occurs during any stage of the process, including argument validation or if no video is found for the query. The emitted data is the error message or object.
 *
 * @example
 * // 1. List available formats for a video using a search query
 * YouTubeDLX.list_formats({ query: "high quality music video" })
 * .on("data", (formats) => console.log("Available Formats:", formats))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 2. List available formats with verbose logging
 * YouTubeDLX.list_formats({ query: "short film 4k", verbose: true })
 * .on("data", (formats) => console.log("Available Formats:", formats))
 * .on("error", (error) => console.error("Error:", error));
 */
export default function list_formats({ query, verbose }: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse({ query, verbose });
      const metaBody: EngineOutput = await Tuber({ query, verbose });
      if (!metaBody) {
        emitter.emit("error", `${colors.red("@error:")} Unable to get response from YouTube.`);
        return;
      }
      emitter.emit("data", {
        ManifestLow: metaBody.ManifestLow?.map(item => ({ format: item.format, tbr: item.tbr })) || [],
        ManifestHigh: metaBody.ManifestHigh?.map(item => ({ format: item.format, tbr: item.tbr })) || [],
        AudioLow: metaBody.AudioLow?.map(item => ({ filesizeP: item.filesizeP, format_note: item.format_note })) || [],
        VideoLow: metaBody.VideoLow?.map(item => ({ filesizeP: item.filesizeP, format_note: item.format_note })) || [],
        VideoHigh: metaBody.VideoHigh?.map(item => ({ filesizeP: item.filesizeP, format_note: item.format_note })) || [],
        AudioHigh: metaBody.AudioHigh?.map(item => ({ filesizeP: item.filesizeP, format_note: item.format_note })) || [],
        VideoLowHDR: metaBody.VideoLowHDR?.map(item => ({ filesizeP: item.filesizeP, format_note: item.format_note })) || [],
        AudioLowDRC: metaBody.AudioLowDRC?.map(item => ({ filesizeP: item.filesizeP, format_note: item.format_note })) || [],
        AudioHighDRC: metaBody.AudioHighDRC?.map(item => ({ filesizeP: item.filesizeP, format_note: item.format_note })) || [],
        VideoHighHDR: metaBody.VideoHighHDR?.map(item => ({ filesizeP: item.filesizeP, format_note: item.format_note })) || [],
      });
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
