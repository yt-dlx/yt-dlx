import colors from "colors";
import { z, ZodError } from "zod";
import Tuber from "../../base/Agent";
import { EventEmitter } from "events";
import type EngineOutput from "../../interfaces/EngineOutput";

/**
 * Defines the schema for the input parameters used in the `list_formats` function.
 *
 * @typedef {object} ListFormatsOptions
 * @property {string} query - The query string for the YouTube video.
 * @property {boolean} [verbose] - Whether to enable verbose logging.
 */
const ZodSchema = z.object({ query: z.string().min(2), verbose: z.boolean().optional() });

/**
 * Fetches the available formats for a YouTube video, including audio and video options,
 * and emits the data in a structured format.
 *
 * @function list_formats
 * @param {ListFormatsOptions} options - The options object containing query and settings.
 * @returns {EventEmitter} The event emitter to handle the `data`, `error` events.
 *
 * @example
 * const emitter = list_formats({ query: "Funny Video" });
 * emitter.on("data", data => console.log(data));
 */
export default function list_formats({ query, verbose }: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse({ query, verbose });

      const metaBody: EngineOutput = await Tuber({ query, verbose });
      if (!metaBody) throw new Error("@error: Unable to get response from YouTube.");

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
    } catch (error: unknown) {
      switch (true) {
        case error instanceof ZodError:
          emitter.emit("error", error.errors);
          break;
        default:
          emitter.emit("error", (error as Error).message);
          break;
      }
    } finally {
      console.log(colors.green("@info:"), "❣️ Thank you for using yt-dlx. Consider 🌟starring the GitHub repo https://github.com/yt-dlx.");
    }
  })().catch(error => emitter.emit("error", error.message));
  return emitter;
}
