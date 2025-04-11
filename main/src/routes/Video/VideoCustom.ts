import * as fs from "fs";
import colors from "colors";
import * as path from "path";
import { z, ZodError } from "zod";
import ffmpeg from "fluent-ffmpeg";
import ytdlx from "../../base/Agent";
import { EventEmitter } from "events";
import { locator } from "../../base/locator";
var ZodSchema = z.object({
  query: z.string().min(2),
  output: z.string().optional(),
  useTor: z.boolean().optional(),
  stream: z.boolean().optional(),
  verbose: z.boolean().optional(),
  metadata: z.boolean().optional(),
  resolution: z.enum(["144p", "240p", "360p", "480p", "720p", "1080p", "1440p", "2160p", "3072p", "4320p", "6480p", "8640p", "12000p"]),
  filter: z.enum(["invert", "rotate90", "rotate270", "grayscale", "rotate180", "flipVertical", "flipHorizontal"]).optional(),
});
export default function VideoCustom({
  query,
  stream,
  useTor,
  filter,
  output,
  verbose,
  metadata,
  resolution,
}: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse({ query, stream, useTor, filter, output, verbose, metadata, resolution });
      const engineData = await ytdlx({ query, verbose, useTor });
      if (!engineData) {
        throw new Error(`${colors.red("@error:")} unable to get response!`);
      }
      const title = engineData.metaData.title.replace(/[^a-zA-Z0-9_]+/g, "_");
      const folder = output ? output : process.cwd();
      if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
      const proc: ffmpeg.FfmpegCommand = ffmpeg();
      proc.setFfmpegPath(await locator().then(fp => fp.ffmpeg));
      proc.setFfprobePath(await locator().then(fp => fp.ffprobe));
      proc.addOption("-headers", `X-Forwarded-For: ${engineData.ipAddress}`);
      const vdata = engineData.ManifestHigh.find((i: { format: string | string[] }) => i.format.includes(resolution.replace("p", "").toString()));
      if (!vdata) {
        throw new Error(`${colors.red("@error:")} no video data found. Use list_formats() maybe?`);
      }
      proc.addInput(engineData.AudioHighF.url);
      proc.addInput(vdata.url.toString());
      proc.withOutputFormat("matroska");
      proc.videoCodec("copy");
      const filenameBase = `yt-dlx_VideoCustom_${resolution}_`;
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
      if (filter && filterMap[filter]) proc.withAudioFilter(filterMap[filter]);
      proc.on("progress", progress => {
        emitter.emit("progress", progress);
      });
      proc.on("error", error => {
        emitter.emit("error", error.message);
      });
      proc.on("start", start => {
        emitter.emit("start", start);
      });
      proc.on("end", () => {
        emitter.emit("end", filename);
      });
      if (stream && !metadata) {
        emitter.emit("stream", { filename: path.join(folder, filename), ffmpeg: proc });
        proc.output(path.join(folder, filename));
        proc.run();
      }
      if (!stream && metadata) {
        emitter.emit("metadata", {
          filename,
          metaData: engineData.metaData,
          ipAddress: engineData.ipAddress,
          VideoLowF: engineData.VideoLowF,
          VideoHighF: engineData.VideoHighF,
          VideoLowHDR: engineData.VideoLowHDR,
          VideoHighHDR: engineData.VideoHighHDR,
          ManifestLow: engineData.ManifestLow,
          ManifestHigh: engineData.ManifestHigh,
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
