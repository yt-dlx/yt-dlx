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
      "echo",
      "slow",
      "speed",
      "phaser",
      "flanger",
      "panning",
      "reverse",
      "vibrato",
      "subboost",
      "surround",
      "bassboost",
      "nightcore",
      "superslow",
      "vaporwave",
      "superspeed",
    ])
    .optional(),
});

function AudioHighest({
  query,
  output,
  useTor,
  stream,
  filter,
  metadata,
  verbose,
}: z.infer<typeof ZodSchema>): EventEmitter {
  var emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse({
        query,
        output,
        useTor,
        stream,
        filter,
        metadata,
        verbose,
      });
      var engineData = await ytdlx({
        query,
        verbose,
        useTor,
      }).catch(error => {
        throw new Error(`Engine error: ${error.message}`);
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
      proc.addInput(engineData.metaData.thumbnail);
      proc.withOutputFormat("avi");
      proc.addOption("-headers", `X-Forwarded-For: ${engineData.ipAddress}`);
      var filenameBase = `yt-dlx_(AudioHighest_`;
      let filename = `${filenameBase}${filter ? filter + ")_" : ")_"}${title}.avi`;
      var filterMap: Record<string, string[]> = {
        bassboost: ["bass=g=10,dynaudnorm=f=150"],
        echo: ["aecho=0.8:0.9:1000:0.3"],
        flanger: ["flanger"],
        nightcore: ["aresample=48000,asetrate=48000*1.25"],
        panning: ["apulsator=hz=0.08"],
        phaser: ["aphaser=in_gain=0.4"],
        reverse: ["areverse"],
        slow: ["atempo=0.8"],
        speed: ["atempo=2"],
        subboost: ["asubboost"],
        superslow: ["atempo=0.5"],
        superspeed: ["atempo=3"],
        surround: ["surround"],
        vaporwave: ["aresample=48000,asetrate=48000*0.8"],
        vibrato: ["vibrato=f=6.5"],
      };
      if (filter && filterMap[filter]) proc.withAudioFilter(filterMap[filter]);
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

const routeAudioHighest = (ws: WebSocket, message: string) => {
  const req = JSON.parse(message);
  const res = AudioHighest({
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

export default routeAudioHighest;
