import colors from "colors";
import { z, ZodError } from "zod";
import Tuber from "../../utils/Agent";
import { EventEmitter } from "events";
import type EngineOutput from "../../interfaces/EngineOutput";
const ZodSchema = z.object({ videoLink: z.string().min(2), verbose: z.boolean().optional() });
export default function list_formats({ videoLink, verbose }: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse({ videoLink, verbose });
      const metaBody: EngineOutput = await Tuber({ query: videoLink, verbose });
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
