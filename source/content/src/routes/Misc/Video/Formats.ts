import colors from "colors";
import { z, ZodError } from "zod";
import Tuber from "../../../utils/Agent";
import { EventEmitter } from "events";
import type EngineOutput from "../../../interfaces/EngineOutput";
const ZodSchema = z.object({ query: z.string().min(2), verbose: z.boolean().optional() });
/**
 * Lists available formats for a video based on a query.
 *
 * This function uses a search query to find a video and then retrieves a list of available audio and video formats,
 * including information about manifests, audio quality, video quality, and HDR options.
 * It supports optional verbose logging.
 *
 * @param {object} options - An object containing the configuration options for listing video formats.
 * @param {string} options.query - The search query string (minimum 2 characters) to find the desired video. This is a mandatory parameter.
 * @param {boolean} [options.verbose=false] - An optional boolean value that, if set to `true`, enables verbose logging to the console, providing more detailed information about the process.
 *
 * @returns {EventEmitter} An EventEmitter instance that emits events during the format listing process.
 * The following events can be listened to:
 * - `"data"`: Emitted when the list of available formats is successfully retrieved. The data is an object containing arrays of format information for different categories (ManifestLow, ManifestHigh, AudioLow, VideoLow, VideoHigh, AudioHigh, VideoLowHDR, AudioLowDRC, AudioHighDRC, VideoHighHDR). Each item in the arrays provides details about the format (e.g., format, tbr for manifests; filesizeP, format_note for audio/video).
 * - `"error"`: Emitted when an error occurs during any stage of the process, including argument validation or network requests. The emitted data is the error message or object.
 *
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
