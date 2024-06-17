import * as fs from "fs";
import WebSocket from "ws";
import colors from "colors";
import * as path from "path";
import { z, ZodError } from "zod";
import ffmpeg from "fluent-ffmpeg";
import ytdlx from "../../base/Agent";
import { EventEmitter } from "events";

var ZodSchema = z.object({
  query: z.string().min(2),
  output: z.string().optional(),
  useTor: z.boolean().optional(),
  stream: z.boolean().optional(),
  verbose: z.boolean().optional(),
  metadata: z.boolean().optional(),
  resolution: z.enum([
    "144p",
    "240p",
    "360p",
    "480p",
    "720p",
    "1080p",
    "1440p",
    "2160p",
    "3072p",
    "4320p",
    "6480p",
    "8640p",
    "12000p",
  ]),
  filter: z
    .enum([
      "invert",
      "rotate90",
      "rotate270",
      "grayscale",
      "rotate180",
      "flipVertical",
      "flipHorizontal",
    ])
    .optional(),
});
function VideoCustom({
  query,
  stream,
  useTor,
  filter,
  output,
  verbose,
  metadata,
  resolution,
}: z.infer<typeof ZodSchema>): EventEmitter {
  var emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse({
        query,
        stream,
        useTor,
        filter,
        output,
        verbose,
        metadata,
        resolution,
      });
      var engineData = await ytdlx({
        query,
        verbose,
        useTor,
      });
      if (!engineData) {
        throw new Error(`${colors.red("@error:")} unable to get response!`);
      }
      var title = engineData.metaData.title.replace(/[^a-zA-Z0-9_]+/g, "_");
      var folder = output ? output : __dirname;
      if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
      var proc: ffmpeg.FfmpegCommand = ffmpeg();
      proc.setFfmpegPath(path.join(__dirname, "../", "../", "public", "ffmpeg.exe"));
      proc.setFfprobePath(path.join(__dirname, "../", "../", "public", "ffprobe.exe"));
      proc.addInput(engineData.AudioHighF.url);
      proc.withOutputFormat("matroska");
      proc.videoCodec("copy");
      proc.addOption("-headers", `X-Forwarded-For: ${engineData.ipAddress}`);
      var filenameBase = `yt-dlx_(VideoCustom_${resolution}_`;
      let filename = `${filenameBase}${filter ? filter + ")_" : ")_"}${title}.mkv`;
      var vdata = engineData.ManifestHigh.find(i =>
        i.format.includes(resolution.replace("p", "").toString()),
      );

      if (vdata) proc.addInput(vdata.url.toString());
      else {
        throw new Error(`${colors.red("@error:")} no video data found. Use list_formats() maybe?`);
      }
      var filterMap: Record<string, string[]> = {
        grayscale: ["colorchannelmixer=.3:.4:.3:0:.3:.4:.3:0:.3:.4:.3"],
        invert: ["negate"],
        rotate90: ["rotate=PI/2"],
        rotate180: ["rotate=PI"],
        rotate270: ["rotate=3*PI/2"],
        flipHorizontal: ["hflip"],
        flipVertical: ["vflip"],
      };
      if (filter && filterMap[filter]) proc.withVideoFilter(filterMap[filter]);
      proc.addOption("-headers", `X-Forwarded-For: ${engineData.ipAddress}`);
      proc.on("start", comd => {
        if (verbose) emitter.emit("log", colors.green("@comd:"), comd);
        emitter.emit("start", comd);
      });
      proc.on("progress", progress => emitter.emit("progress", progress));
      proc.on("error", error => emitter.emit("error", error.message));
      proc.on("end", () => emitter.emit("end", filename));
      switch (true) {
        case stream:
          emitter.emit("ready", {
            ffmpeg: proc,
            filename: path.join(folder, filename),
          });
          break;
        case metadata:
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
          break;
        default:
          proc.output(path.join(folder, filename));
          proc.on("end", () => emitter.emit("end", filename));
          proc.on("error", error => emitter.emit("error", error.message));
          proc.run();
          break;
      }
    } catch (error: any) {
      switch (true) {
        case error instanceof ZodError:
          emitter.emit("error", colors.red("@zod-error:"), error.errors);
          break;
        default:
          emitter.emit("error", colors.red("@error:"), error.message);
          break;
      }
    } finally {
      emitter.emit(
        "info",
        colors.green("@info:"),
        "❣️ Thank you for using yt-dlx. Consider 🌟starring the GitHub repo https://github.com/yt-dlx.",
      );
    }
  })();
  return emitter;
}
