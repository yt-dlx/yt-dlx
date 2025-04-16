import colors from "colors";
import { z, ZodError } from "zod";
import Tuber from "../../utils/Agent";
import { EventEmitter } from "events";
import type EngineOutput from "../../interfaces/EngineOutput";
const ZodSchema = z.object({ query: z.string().min(2), verbose: z.boolean().optional() });
/**
 * Lists the available download formats for a given Tube (e.g., YouTube) video query.
 *
 * @param {object} options - An object containing the necessary options.
 * @param {string} options.query - The URL or search query for the video.
 * @param {boolean} [options.verbose=false] - If true, enables verbose logging to the console.
 *
 * @returns {EventEmitter} An EventEmitter that emits the following events:
 * - "data": Emitted with an object containing arrays of available formats for different media types (Manifest, Audio, Video) and qualities (Low, High, DRC, HDR). Each item in the arrays includes format-specific information like format name and bitrate or filesize.
 * - "error": Emitted if there is an error during the process.
 *
 * @example
 * // 1: List available formats for a video URL
 * YouTubeDLX.ListFormats({ query: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" })
 * .on("data", (formats) => console.log("Available formats:", formats))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 2: List available formats for a search query with verbose logging
 * YouTubeDLX.ListFormats({ query: "funny cats video", verbose: true })
 * .on("data", (formats) => console.log("Available formats:", formats))
 * .on("error", (err) => console.error("Error:", err));
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
