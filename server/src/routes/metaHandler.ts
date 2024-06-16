// import WebSocket from "ws";
// import ytdlx from "yt-dlx";

// const metaHandler = (ws: WebSocket, message: string) => {
// const req = JSON.parse(message);
// ytdlx.AudioOnly.Highest({
// stream: false,
// metadata: true,
// query: req.payload.query,
// useTor: req.payload.useTor,
// verbose: req.payload.verbose,
// })
// .on("error", error => {
// console.log("@error:", error);
// ws.send(JSON.stringify({ event: "error", data: error }));
// })
// .on("end", filename => {
// console.log("@end:", filename);
// ws.send(JSON.stringify({ event: "end", data: filename }));
// })
// .on("start", command => {
// console.log("@start:", command);
// ws.send(JSON.stringify({ event: "start", data: command }));
// })
// .on("progress", progress => {
// console.log("@progress:", progress);
// ws.send(JSON.stringify({ event: "progress", data: progress }));
// })
// .on("metadata", metadata => {
// console.log("@metadata:", metadata);
// ws.send(JSON.stringify({ event: "metadata", data: metadata }));
// });
// };
// export default metaHandler;

// import Agent from "../base/Agent";

// const metaHandler = async (ws: WebSocket, message: string) => {
// const req = JSON.parse(message);
// const metadata = await Agent({
// query: req.payload.query,
// useTor: req.payload.useTor,
// verbose: req.payload.verbose,
// });
// ws.send(JSON.stringify({ event: "metadata", data: metadata }));
// };
// export default metaHandler;

import * as fs from "fs";
import WebSocket from "ws";
import colors from "colors";
import * as path from "path";
import ytdlx from "../base/Agent";
import { z, ZodError } from "zod";
import ffmpeg from "fluent-ffmpeg";
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
            AudioLowF: engineData.AudioLowF,
            AudioHighF: engineData.AudioHighF,
            AudioLowDRC: engineData.AudioLowDRC,
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
  })();
  return emitter;
}

const metaHandler = async (ws: WebSocket, message: string) => {
  const req = JSON.parse(message);
  AudioHighest({
    stream: false,
    metadata: true,
    query: req.payload.query,
    useTor: req.payload.useTor,
    verbose: req.payload.verbose,
  })
    .on("error", error => {
      ws.send(JSON.stringify({ event: "error", data: error }));
    })
    .on("end", filename => {
      ws.send(JSON.stringify({ event: "end", data: filename }));
    })
    .on("start", command => {
      ws.send(JSON.stringify({ event: "start", data: command }));
    })
    .on("progress", progress => {
      ws.send(JSON.stringify({ event: "progress", data: progress }));
    })
    .on("metadata", metadata => {
      ws.send(JSON.stringify({ event: "metadata", data: metadata }));
    });
};

export default metaHandler;
