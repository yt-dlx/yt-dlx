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
function AudioVideoHighest({
  query,
  stream,
  verbose,
  metadata,
  output,
  useTor,
  filter,
}: z.infer<typeof ZodSchema>): EventEmitter {
  var emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse({
        query,
        stream,
        verbose,
        metadata,
        output,
        useTor,
        filter,
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
      var proc = ffmpeg()
        .setFfmpegPath(path.join(__dirname, "../", "../", "public", "ffmpeg.exe"))
        .setFfprobePath(path.join(__dirname, "../", "../", "public", "ffprobe.exe"));
      proc.addInput(engineData.AudioHighF.url);
      proc.addInput(engineData.ManifestHigh[engineData.ManifestHigh.length - 1].url);
      proc.withOutputFormat("matroska");
      proc.outputOptions("-c copy");
      proc.addOption("-headers", `X-Forwarded-For: ${engineData.ipAddress}`);
      var filenameBase = `yt-dlx_(AudioVideoHighest_`;
      let filename = `${filenameBase}${filter ? filter + ")_" : ")_"}${title}.mkv`;
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
            AudioHighF: engineData.AudioHighF,
            AudioHighDRC: engineData.AudioHighDRC,
            VideoHighF: engineData.VideoHighF,
            VideoHighHDR: engineData.VideoHighHDR,
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
  })().catch(error => emitter.emit("error", error.message));
  return emitter;
}
const routeAudioVideoHighest = (ws: WebSocket, message: string) => {
  const req = JSON.parse(message);
  const res = AudioVideoHighest({
    query: req.payload.query,
    useTor: req.payload.useTor,
    stream: req.payload.stream,
    verbose: req.payload.verbose,
    metadata: req.payload.metadata,
  });
  res.on("end", data => ws.send(JSON.stringify({ event: "end", data })));
  res.on("error", data => ws.send(JSON.stringify({ event: "error", data })));
  res.on("start", data => ws.send(JSON.stringify({ event: "start", data })));
  res.on("progress", data => ws.send(JSON.stringify({ event: "progress", data })));
  res.on("metadata", data => ws.send(JSON.stringify({ event: "metadata", data })));
};
export default routeAudioVideoHighest;
