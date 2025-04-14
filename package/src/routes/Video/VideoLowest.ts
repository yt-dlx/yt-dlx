import * as fs from "fs";
import colors from "colors";
import * as path from "path";
import { z, ZodError } from "zod";
import ffmpeg from "fluent-ffmpeg";
import Tuber from "../../utils/Agent";
import { EventEmitter } from "events";
import { locator } from "../../utils/locator";
var ZodSchema = z.object({
  query: z.string().min(2),
  output: z.string().optional(),
  useTor: z.boolean().optional(),
  stream: z.boolean().optional(),
  verbose: z.boolean().optional(),
  metadata: z.boolean().optional(),
  filter: z.enum(["invert", "rotate90", "rotate270", "grayscale", "rotate180", "flipVertical", "flipHorizontal"]).optional(),
});
export default function VideoLowest({ query, stream, verbose, output, metadata, useTor, filter }: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse({ query, stream, verbose, output, metadata, useTor, filter });
      const engineData = await Tuber({ query, verbose, useTor });
      if (!engineData) {
        emitter.emit("error", `${colors.red("@error:")} unable to get response!`);
        return;
      }
      const title = engineData.metaData.title.replace(/[^a-zA-Z0-9_]+/g, "_");
      const folder = output ? output : process.cwd();
      if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
      const instance: ffmpeg.FfmpegCommand = ffmpeg();
      instance.setFfmpegPath(await locator().then(fp => fp.ffmpeg));
      instance.setFfprobePath(await locator().then(fp => fp.ffprobe));
      instance.addOption("-headers", `X-Forwarded-For: ${engineData.ipAddress}`);
      instance.addInput(engineData.VideoLowF.url);
      instance.withOutputFormat("matroska");
      instance.videoCodec("copy");
      const filenameBase = `yt-dlx_VideoLowest_`;
      let filename = `${filenameBase}${filter ? filter + "_" : "_"}${title}.mkv`;
      const filterMap: Record<string, string[]> = {
        grayscale: ["colorchannelmixer=.3:.4:.3:0:.3:.4:.3:0:.3:.4:.3"],
        invert: ["negate"],
        rotate90: ["rotate=PI/2"],
        rotate180: ["rotate=PI"],
        rotate270: ["rotate=3*PI/2"],
        flipHorizontal: ["hflip"],
        flipVertical: ["vflip"],
      };
      if (filter && filterMap[filter]) instance.withVideoFilter(filterMap[filter]);
      instance.on("progress", progress => emitter.emit("progress", progress));
      instance.on("error", error => emitter.emit("error", error.message));
      instance.on("start", start => emitter.emit("start", start));
      instance.on("end", () => emitter.emit("end", filename));
      if (stream && !metadata) {
        emitter.emit("stream", { filename: path.join(folder, filename), ffmpeg: instance });
        instance.output(path.join(folder, filename));
        instance.run();
      }
      if (!stream && metadata) {
        emitter.emit("metadata", {
          filename,
          metaData: engineData.metaData,
          ipAddress: engineData.ipAddress,
          VideoLowF: engineData.VideoLowF,
          VideoLowHDR: engineData.VideoLowHDR,
          ManifestLow: engineData.ManifestLow,
        });
      }
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
