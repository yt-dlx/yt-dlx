import * as fs from "fs";
import colors from "colors";
import * as path from "path";
import { z, ZodError } from "zod";
import ffmpeg from "fluent-ffmpeg";
import { encore } from "yt-dlx-encore";
import ytdlx from "../../../base/Agent";
import formatTime from "../../../base/formatTime";
import type { FfmpegCommand } from "fluent-ffmpeg";
import calculateETA from "../../../base/calculateETA";
import EngineOutput from "../../../interfaces/EngineOutput";

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

/**
 * Downloads and processes the lowest quality audio from a single YouTube video.
 *
 * @param query - The YouTube video URL or ID or name.
 * @param output - (optional) The output directory for the processed file.
 * @param stream - (optional) Whether to stream the processed video or not.
 * @param verbose - (optional) Whether to log verbose output or not.
 * @param useTor - (optional) Whether to use Tor for the download or not.
 * @param metadata - (optional) If true, the function returns the extracted metadata and filename without processing the audio. This can be useful for debugging or obtaining metadata without downloading the audio.
 * @param filter - (optional) The audio filter to apply. Available options: "echo", "slow", "speed", "phaser", "flanger", "panning", "reverse", "vibrato", "subboost", "surround", "bassboost", "nightcore", "superslow", "vaporwave", "superspeed".
 * @returns A Promise that resolves with either `void` (if `stream` is false) or an object containing the `ffmpeg` instance and the output filename (if `stream` is true).
 */
export default async function AudioLowest({
  query,
  output,
  useTor,
  stream,
  verbose,
  metadata,
  filter,
}: z.infer<typeof ZodSchema>): Promise<
  | void
  | { ffmpeg: FfmpegCommand; filename: string }
  | {
      filename: string;
      metaData: EngineOutput["metaData"];
      ipAddress: EngineOutput["ipAddress"];
      AudioLowF: EngineOutput["AudioLowF"];
      AudioHighF: EngineOutput["AudioHighF"];
      AudioLowDRC: EngineOutput["AudioLowDRC"];
      AudioHighDRC: EngineOutput["AudioHighDRC"];
    }
> {
  try {
    ZodSchema.parse({
      query,
      output,
      useTor,
      stream,
      verbose,
      metadata,
      filter,
    });
    var startTime: Date = new Date();
    var engineData = await ytdlx({ query, verbose, useTor });
    if (!engineData) {
      throw new Error(`${colors.red("@error:")} unable to get response!`);
    }
    var title = engineData.metaData.title.replace(/[^a-zA-Z0-9_]+/g, "_");
    var folder = output ? path.join(__dirname, output) : __dirname;
    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
    var ff: FfmpegCommand = ffmpeg()
      .setFfmpegPath((await encore().then(fp => fp.ffmpeg)).toString())
      .setFfprobePath((await encore().then(fp => fp.ffprobe)).toString())
      .addInput(engineData.AudioLowF.url)
      .addInput(engineData.metaData.thumbnail)
      .withOutputFormat("avi")
      .addOption("-headers", `X-Forwarded-For: ${engineData.ipAddress}`);
    var filenameBase = `yt-dlx_(AudioLowest_`;
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
    if (filter && filterMap[filter]) ff.withAudioFilter(filterMap[filter]);
    var logProgress = ({ percent, timemark }: { percent: number; timemark: string }) => {
      if (isNaN(percent)) percent = 0;
      percent = Math.min(Math.max(percent, 0), 100);

      var color = percent < 25 ? colors.red : percent < 50 ? colors.yellow : colors.green;
      var width = Math.floor(process.stdout.columns / 4);
      var scomp = Math.round((width * percent) / 100);
      var progb = color("━").repeat(scomp) + color(" ").repeat(width - scomp);
      process.stdout.write(
        `\r${color("@prog:")} ${progb} ${color(
          "| @percent:",
        )} ${percent.toFixed(2)}% ${color("| @timemark:")} ${timemark} ${color(
          "| @eta:",
        )} ${formatTime(calculateETA(startTime, percent))}`,
      );
    };
    ff.on("error", error => {
      throw new Error(error.message);
    })
      .on("start", comd => {
        if (verbose) console.info(colors.green("@comd:"), comd);
      })
      .on("end", () => process.stdout.write("\n"))
      .on("progress", logProgress);
    if (stream) {
      return {
        ffmpeg: ff,
        filename: output ? path.join(folder, filename) : filename.replace("_)_", ")_"),
      };
    }
    if (metadata) {
      return {
        filename,
        metaData: engineData.metaData,
        ipAddress: engineData.ipAddress,
        AudioLowF: engineData.AudioLowF,
        AudioHighF: engineData.AudioHighF,
        AudioLowDRC: engineData.AudioLowDRC,
        AudioHighDRC: engineData.AudioHighDRC,
      };
    }
    await new Promise<void>((resolve, reject) => {
      ff.output(path.join(folder, filename.replace("_)_", ")_")))
        .on("end", () => resolve())
        .on("error", error => reject(new Error(colors.red("@error: ") + error.message)))
        .run();
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      throw new Error(colors.red("@zod-error:") + error.errors);
    }
    throw new Error(colors.red("@error:") + error.message);
  } finally {
    console.log(
      colors.green("@info:"),
      "❣️ Thank you for using yt-dlx. Consider 🌟starring the GitHub repo https://github.com/yt-dlx.",
    );
  }
}
