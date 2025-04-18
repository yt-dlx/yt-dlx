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
      if (!query) {
        emitter.emit("error", `${colors.red("@error:")} The 'query' parameter is required.`);
        return;
      }
      if (metadata) {
        if (stream) {
          emitter.emit("error", `${colors.red("@error:")} The 'stream' parameter cannot be used when 'metadata' is true.`);
          return;
        }
        if (output) {
          emitter.emit("error", `${colors.red("@error:")} The 'output' parameter cannot be used when 'metadata' is true.`);
          return;
        }
        if (filter) {
          emitter.emit("error", `${colors.red("@error:")} The 'filter' parameter cannot be used when 'metadata' is true.`);
          return;
        }
      }
      if (stream && metadata) {
        emitter.emit("error", `${colors.red("@error:")} The 'stream' parameter cannot be true when 'metadata' is true.`);
        return;
      }
      if (!resolution) {
        emitter.emit("error", `${colors.red("@error:")} The 'resolution' parameter is required.`);
        return;
      }
      ZodSchema.parse({ query, output, useTor, stream, filter, verbose, metadata, resolution });

      const engineData = await Tuber({ query, verbose, useTor });
      if (!engineData) {
        emitter.emit("error", `${colors.red("@error:")} Unable to retrieve a response from the engine.`);
        return;
      }
      if (!engineData.metaData) {
        emitter.emit("error", `${colors.red("@error:")} Metadata was not found in the engine's response.`);
        return;
      }
      if (metadata) {
        emitter.emit("metadata", {
          metaData: engineData.metaData,
          AudioLowF: engineData.AudioLowF,
          AudioHighF: engineData.AudioHighF,
          AudioLowDRC: engineData.AudioLowDRC,
          AudioHighDRC: engineData.AudioHighDRC,
          filename: engineData.metaData.title?.replace(/[^a-zA-Z0-9_]+/g, "_"),
        });
        return;
      }
      const title = engineData.metaData.title.replace(/[^a-zA-Z0-9_]+/g, "_");
      const folder = output ? output : process.cwd();
      if (!fs.existsSync(folder)) {
        try {
          fs.mkdirSync(folder, { recursive: true });
        } catch (mkdirError: any) {
          emitter.emit("error", `${colors.red("@error:")} Failed to create the output directory: ${mkdirError.message}`);
          return;
        }
      }
      const instance: ffmpeg.FfmpegCommand = ffmpeg();
      try {
        const paths = await locator();
        if (!paths.ffmpeg) {
          emitter.emit("error", `${colors.red("@error:")} ffmpeg executable not found.`);
          return;
        }
        if (!paths.ffprobe) {
          emitter.emit("error", `${colors.red("@error:")} ffprobe executable not found.`);
          return;
        }
        instance.setFfmpegPath(paths.ffmpeg);
        instance.setFfprobePath(paths.ffprobe);
      } catch (locatorError: any) {
        emitter.emit("error", `${colors.red("@error:")} Failed to locate ffmpeg or ffprobe: ${locatorError.message}`);
        return;
      }
      const resolutionFilter = resolution.replace("p", "");
      const adata = engineData.AudioHigh?.find((i: { format: string | string[] }) => i.format?.includes(resolutionFilter));
      if (!adata) {
        emitter.emit("error", `${colors.red("@error:")} No audio data found for the specified resolution: ${resolution}. Please use the 'list_formats()' command to see available formats.`);
        return;
      }
      if (!engineData.metaData.thumbnail) {
        emitter.emit("error", `${colors.red("@error:")} The thumbnail URL was not found.`);
        return;
      }
      instance.addInput(engineData.metaData.thumbnail);
      instance.withOutputFormat("avi");
      if (!adata.url) {
        emitter.emit("error", `${colors.red("@error:")} The audio URL was not found.`);
        return;
      }
      instance.addInput(adata.url);
      const filenameBase = `yt-dlx_AudioCustom_${resolution}_`;
      let filename = `${filenameBase}${filter ? filter + "_" : ""}${title}.avi`;
      const outputPath = path.join(folder, filename);
      const filterMap: { [key: string]: string[] } = {
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
      if (filter && filterMap[filter]) instance.withVideoFilter(filterMap[filter]);
      else instance.outputOptions("-c copy");
      instance.on("progress", progress => emitter.emit("progress", progress));
      instance.on("error", error => emitter.emit("error", `${colors.red("@error:")} FFmpeg encountered an error: ${error.message}`));
      instance.on("start", start => emitter.emit("start", start));
      instance.on("end", () => emitter.emit("end", outputPath));
      instance.output(outputPath);
      if (stream) emitter.emit("stream", { filename: outputPath, ffmpeg: instance });
      instance.run();
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
