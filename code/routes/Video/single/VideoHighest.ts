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

/**
 * Downloads the highest quality version of a YouTube video with optional video filter.
 *
 * @param query - The YouTube video URL or ID or name.
 * @param stream - (optional) Whether to return the FfmpegCommand instead of downloading the video.
 * @param verbose - (optional) Whether to log verbose output or not.
 * @param useTor - (optional) Whether to use Tor for the download or not.
 * @param output - (optional) The output directory for the processed files.
 * @param metadata - (optional) If true, the function returns the extracted metadata and filename without processing the audio. This can be useful for debugging or obtaining metadata without downloading the audio.
 * @param filter - (optional) The video filter to apply. Available options: "invert", "rotate90", "rotate270", "grayscale", "rotate180", "flipVertical", "flipHorizontal".
 * @returns A Promise that resolves when the video has been processed, unless `stream` is `true`, in which case it resolves with an object containing the `ffmpeg` command and the `filename`.
 */
export default async function VideoHighest({
  query,
  stream,
  verbose,
  output,
  metadata,
  useTor,
  filter,
}: z.infer<typeof ZodSchema>): Promise<
  | void
  | { ffmpeg: FfmpegCommand; filename: string }
  | {
      filename: string;
      metaData: EngineOutput["metaData"];
      ipAddress: EngineOutput["ipAddress"];
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
      verbose,
      output,
      metadata,
      useTor,
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
      .addInput(engineData.ManifestHigh[engineData.ManifestHigh.length - 1].url)
      .withOutputFormat("matroska")
      .videoCodec("copy")
      .addOption("-headers", `X-Forwarded-For: ${engineData.ipAddress}`);
    var filenameBase = `yt-dlx_(VideoHighest_`;
    let filename = `${filenameBase}${
      filter ? filter + ")_" : ")_"
    }${title}.mkv`;
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
