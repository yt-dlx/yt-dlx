import * as fs from "fs";
import colors from "colors";
import * as path from "path";
import { z, ZodError } from "zod";
import ffmpeg from "fluent-ffmpeg";
import ytdlx from "../../../base/Agent";
import formatTime from "../../../base/formatTime";
import type { FfmpegCommand } from "fluent-ffmpeg";
import calculateETA from "../../../base/calculateETA";
import EngineOutput from "../../../interfaces/EngineOutput";
import { ffmpegPath, ffprobePath } from "../../../base/ffbins";

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

/**
 * Downloads audio and video from a YouTube video URL with customizable options such as resolution and filters.
 *
 * @param query - The YouTube video URL or ID or name.
 * @param resolution - The desired resolution for the video.
 * @param stream - (optional) Whether to stream the output or not.
 * @param verbose - (optional) Whether to log verbose output or not.
 * @param useTor - (optional) Whether to use Tor for the download or not.
 * @param output - (optional) The output directory for the processed file.
 * @param metadata - (optional) If true, the function returns the extracted metadata and filename without processing the audio.
 * @param filter - (optional) The video filter to apply.
 * @returns A Promise that resolves when the audio and video processing is complete.
 */
export default async function AudioVideoCustom({
  query,
  stream,
  output,
  useTor,
  filter,
  metadata,
  verbose,
  resolution,
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
      VideoLowF: EngineOutput["VideoLowF"];
      VideoHighF: EngineOutput["VideoHighF"];
      VideoLowHDR: EngineOutput["VideoLowHDR"];
      VideoHighHDR: EngineOutput["VideoHighHDR"];
      ManifestLow: EngineOutput["ManifestLow"];
      ManifestHigh: EngineOutput["ManifestHigh"];
    }
> {
  try {
    ZodSchema.parse({
      query,
      stream,
      output,
      useTor,
      filter,
      metadata,
      verbose,
      resolution,
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
      .setFfmpegPath(ffmpegPath)
      .setFfprobePath(ffprobePath)
      .addInput(engineData.AudioHighF.url)
      .withOutputFormat("matroska")
      .addOption("-headers", `X-Forwarded-For: ${engineData.ipAddress}`);
    var filenameBase = `yt-dlx_(AudioVideoCustom_${resolution}_`;
    let filename = `${filenameBase}${
      filter ? filter + ")_" : ")_"
    }${title}.mkv`;
    var vdata = engineData.ManifestHigh.find((i) =>
      i.format.includes(resolution.replace("p", "").toString())
    );
    if (vdata) ff.addInput(vdata.url.toString());
    else {
      throw new Error(
        `${colors.red(
          "@error:"
        )} no video data found. use list_formats() maybe?`
      );
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
    if (filter && filterMap[filter]) ff.withVideoFilter(filterMap[filter]);
    var logProgress = ({
      percent,
      timemark,
    }: {
      percent: number;
      timemark: string;
    }) => {
      if (isNaN(percent)) percent = 0;
      percent = Math.min(Math.max(percent, 0), 100);
      var color =
        percent < 25 ? colors.red : percent < 50 ? colors.yellow : colors.green;
      var width = Math.floor(process.stdout.columns / 4);
      var scomp = Math.round((width * percent) / 100);
      var progb = color("━").repeat(scomp) + color(" ").repeat(width - scomp);
      process.stdout.write(
        `\r${color("@prog:")} ${progb} ${color(
          "| @percent:"
        )} ${percent.toFixed(2)}% ${color("| @timemark:")} ${timemark} ${color(
          "| @eta:"
        )} ${formatTime(calculateETA(startTime, percent))}`
      );
    };
    ff.on("error", (error) => {
      throw new Error(error.message);
    })
      .on("start", (comd) => {
        if (verbose) console.info(colors.green("@comd:"), comd);
      })
      .on("end", () => process.stdout.write("\n"))
      .on("progress", logProgress);
    if (stream) {
      return {
        ffmpeg: ff,
        filename: output
          ? path.join(folder, filename)
          : filename.replace("_)_", ")_"),
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
        VideoLowF: engineData.VideoLowF,
        VideoHighF: engineData.VideoHighF,
        VideoLowHDR: engineData.VideoLowHDR,
        VideoHighHDR: engineData.VideoHighHDR,
        ManifestLow: engineData.ManifestLow,
        ManifestHigh: engineData.ManifestHigh,
      };
    }
    await new Promise<void>((resolve, reject) => {
      ff.output(path.join(folder, filename.replace("_)_", ")_")))
        .on("end", () => resolve())
        .on("error", (error) =>
          reject(new Error(colors.red("@error: ") + error.message))
        )
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
      "❣️ Thank you for using yt-dlx. Consider 🌟starring the GitHub repo https://github.com/yt-dlx."
    );
  }
}
