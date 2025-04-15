import colors from "colors";
import { z, ZodError } from "zod";
import Tuber from "../../utils/Agent";
import { EventEmitter } from "events";
import type EngineOutput from "../../interfaces/EngineOutput";

const ZodSchema = z.object({
  query: z.string().min(2),
  verbose: z.boolean().optional(),
});

/**
 * Lists the available formats for the specified video on YouTube based on the provided search query.
 *
 * @param {Object} options - The parameters for listing formats.
 * @param {string} options.query - The search query string for the video.
 * @param {boolean} [options.verbose] - Flag to enable verbose output. Optional.
 *
 * @returns {EventEmitter} An EventEmitter object that emits the following events:
 * - "data": Contains the available formats for the video, including audio and video formats.
 * - "error": Emits an error message if the process fails.
 *
 * @example
 * // 1: List formats with only the query
 * YouTubeDLX.Info.Formats({ query: "Node.js tutorial" })
 *   .on("data", (formats) => console.log("Available formats:", formats))
 *   .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 2: List formats with query and verbose output enabled
 * YouTubeDLX.Info.Formats({ query: "Node.js tutorial", verbose: true })
 *   .on("data", (formats) => console.log("Available formats:", formats))
 *   .on("error", (err) => console.error("Error:", err));
 */
export default function list_formats({ query, verbose }: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse({ query, verbose });
      const metaBody: EngineOutput = await Tuber({ query, verbose });
      if (!metaBody) {
        emitter.emit("error", "@error: Unable to get response from YouTube.");
        return;
      }
      emitter.emit("data", {
        ManifestLow: metaBody.ManifestLow.map(item => ({ format: item.format, tbr: item.tbr })),
        ManifestHigh: metaBody.ManifestHigh.map(item => ({ format: item.format, tbr: item.tbr })),
        AudioLow: metaBody.AudioLow.map(item => ({ filesizeP: item.filesizeP, format_note: item.format_note })),
        VideoLow: metaBody.VideoLow.map(item => ({ filesizeP: item.filesizeP, format_note: item.format_note })),
        VideoHigh: metaBody.VideoHigh.map(item => ({ filesizeP: item.filesizeP, format_note: item.format_note })),
        AudioHigh: metaBody.AudioHigh.map(item => ({ filesizeP: item.filesizeP, format_note: item.format_note })),
        VideoLowHDR: metaBody.VideoLowHDR.map(item => ({ filesizeP: item.filesizeP, format_note: item.format_note })),
        AudioLowDRC: metaBody.AudioLowDRC.map(item => ({ filesizeP: item.filesizeP, format_note: item.format_note })),
        AudioHighDRC: metaBody.AudioHighDRC.map(item => ({ filesizeP: item.filesizeP, format_note: item.format_note })),
        VideoHighHDR: metaBody.VideoHighHDR.map(item => ({ filesizeP: item.filesizeP, format_note: item.format_note })),
      });
    } catch (error) {
      if (error instanceof ZodError) emitter.emit("error", error.errors);
      else if (error instanceof Error) emitter.emit("error", error.message);
      else emitter.emit("error", String(error));
    } finally {
      console.log(colors.green("@info:"), "❣️ Thank you for using yt-dlx. Consider 🌟starring the GitHub repo https://github.com/yt-dlx.");
    }
  })();
  return emitter;
}
