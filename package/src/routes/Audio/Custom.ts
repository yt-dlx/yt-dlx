import * as fs from "fs";
import colors from "colors";
import * as path from "path";
import { z, ZodError } from "zod";
import ffmpeg from "fluent-ffmpeg";
import Tuber from "../../utils/Agent";
import { EventEmitter } from "events";
import { locator } from "../../utils/locator";
const ZodSchema = z.object({
  query: z.string().min(2),
  output: z.string().optional(),
  useTor: z.boolean().optional(),
  stream: z.boolean().optional(),
  verbose: z.boolean().optional(),
  metadata: z.boolean().optional(),
  resolution: z.enum(["high", "medium", "low", "ultralow"]),
  filter: z.enum(["echo", "slow", "speed", "phaser", "flanger", "panning", "reverse", "vibrato", "subboost", "surround", "bassboost", "nightcore", "superslow", "vaporwave", "superspeed"]).optional(),
});
export default function AudioCustom({ query, output, useTor, stream, filter, verbose, metadata, resolution }: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse({ query, output, useTor, stream, filter, verbose, metadata, resolution });
      const engineData = await Tuber({ query, verbose, useTor });
      if (!engineData) {
        emitter.emit("error", `${colors.red("@error:")} Unable to get response from the engine.`);
        return;
      }
      if (!engineData.metaData) {
        emitter.emit("error", `${colors.red("@error:")} Metadata not found in the engine response.`);
        return;
      }
      const title = engineData.metaData.title.replace(/[^a-zA-Z0-9_]+/g, "_");
      const folder = output ? output : process.cwd();
      if (!fs.existsSync(folder)) {
        try {
          fs.mkdirSync(folder, { recursive: true });
        } catch (mkdirError: any) {
          emitter.emit("error", `${colors.red("@error:")} Failed to create output directory: ${mkdirError.message}`);
          return;
        }
      }
      const instance: ffmpeg.FfmpegCommand = ffmpeg();
      try {
        const paths = await locator();
        instance.setFfmpegPath(paths.ffmpeg);
        instance.setFfprobePath(paths.ffprobe);
      } catch (locatorError: any) {
        emitter.emit("error", `${colors.red("@error:")} Failed to locate ffmpeg or ffprobe: ${locatorError.message}`);
        return;
      }
      const resolutionFilter = resolution.replace("p", "");
      const adata = engineData.AudioHigh?.find((i: { format: string | string[] }) => i.format?.includes(resolutionFilter));
      if (!adata) {
        emitter.emit("error", `${colors.red("@error:")} No audio data found for resolution: ${resolution}. Use list_formats() to see available formats.`);
        return;
      }
      if (!engineData.metaData.thumbnail) {
        emitter.emit("error", `${colors.red("@error:")} Thumbnail URL not found.`);
        return;
      }
      instance.addInput(engineData.metaData.thumbnail);
      instance.withOutputFormat("avi");
      if (!adata.url) {
        emitter.emit("error", `${colors.red("@error:")} Audio URL not found.`);
        return;
      }
      instance.addInput(adata.url);
      const filenameBase = `yt-dlx_AudioCustom_${resolution}_`;
      let filename = `${filenameBase}${filter ? filter + "_" : "_"}${title}.avi`;
      const filterMap = {
        speed: ["atempo=2"],
        flanger: ["flanger"],
        slow: ["atempo=0.8"],
        reverse: ["areverse"],
        surround: ["surround"],
        subboost: ["asubboost"],
        superspeed: ["atempo=3"],
        superslow: ["atempo=0.5"],
        vibrato: ["vibrato=f=6.5"],
        panning: ["apulsator=hz=0.08"],
        phaser: ["aphaser=in_gain=0.4"],
        echo: ["aecho=0.8:0.9:1000:0.3"],
        bassboost: ["bass=g=10,dynaudnorm=f=150"],
        vaporwave: ["aresample=48000,asetrate=48000*0.8"],
        nightcore: ["aresample=48000,asetrate=48000*1.25"],
      };
      if (filter && filterMap[filter]) instance.withAudioFilter(filterMap[filter]);
      instance.on("progress", progress => emitter.emit("progress", progress));
      instance.on("error", error => emitter.emit("error", `${colors.red("@error:")} FFmpeg error: ${error.message}`));
      instance.on("start", start => emitter.emit("start", start));
      instance.on("end", () => emitter.emit("end", filename));
      if (stream && !metadata) {
        emitter.emit("stream", { filename: path.join(folder, filename), ffmpeg: instance });
        instance.output(path.join(folder, filename));
        instance.run();
      }
      if (!stream && metadata) {
        emitter.emit("metadata", {
          AudioLowDRC: engineData.AudioLowDRC,
          AudioLowF: engineData.AudioLowF,
          ipAddress: engineData.ipAddress,
          metaData: engineData.metaData,
          filename,
        });
      }
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
