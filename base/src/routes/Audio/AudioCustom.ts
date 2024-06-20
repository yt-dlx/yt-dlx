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
  resolution: z.enum(["high", "medium", "low", "ultralow"]),
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

/**
 * Downloads and processes a single YouTube video with audio customization options.
 *
 * @param resolution - The desired audio resolution.
 * @param query - The YouTube video URL or ID or name.
 * @param filter - (optional) The audio filter to apply.
 * @param verbose - (optional) Whether to log verbose output or not.
 * @param output - (optional) The output directory for the processed file.
 * @param useTor - (optional) Whether to use Tor for the download or not.
 * @param stream - (optional) Whether to stream the processed video or not.
 * @param metadata - (optional) If true, the function returns the extracted metadata and filename without processing the audio.
 *
 * @returns An EventEmitter instance to handle events.
 */
export default function AudioCustom({
  query,
  output,
  useTor,
  stream,
  filter,
  verbose,
  metadata,
  resolution,
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
      var resolutionFilter = resolution.replace("p", "");
      var adata = engineData.AudioHigh.find(i => i.format.includes(resolutionFilter));
      if (!adata) {
        throw new Error(`${colors.red("@error:")} no audio data found. use list_formats() maybe?`);
      }
      var ff = ffmpeg()
        .setFfmpegPath((await locator().then(fp => fp.ffmpeg)).toString())
        .setFfprobePath((await locator().then(fp => fp.ffprobe)).toString())
        .addInput(adata.url)
        .addInput(engineData.metaData.thumbnail)
        .withOutputFormat("avi");
      var filenameBase = `yt-dlx_(AudioCustom_${resolution}_`;
      let filename = `${filenameBase}${filter ? filter + ")_" : ")_"}${title}.avi`;
      var filterMap = {
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
      if (filter && filterMap[filter]) ff.withAudioFilter(filterMap[filter]);
      ff.addOption("-headers", `X-Forwarded-For: ${engineData.ipAddress}`);
      ff.on("start", comd => {
        if (verbose) emitter.emit("log", colors.green("@comd:"), comd);
        emitter.emit("start", comd);
      })
        .on("progress", progress => emitter.emit("progress", progress))
        .on("error", error => emitter.emit("error", error.message))
        .on("end", () => emitter.emit("end", filename));
      switch (true) {
        case stream:
          emitter.emit("ready", {
            ffmpeg: ff,
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
          ff.output(path.join(folder, filename))
            .on("end", () => emitter.emit("end", filename))
            .on("error", error => emitter.emit("error", error.message))
            .run();
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
      emitter.emit("info", colors.green("@info:"), "❣️ Thank you for using yt-dlx. Consider 🌟starring the GitHub repo https://github.com/yt-dlx.");
    }
  })();

  return emitter;
}
