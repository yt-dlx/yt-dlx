import * as fs from "fs";
import colors from "colors";
import * as path from "path";
import { z, ZodError } from "zod";
import ffmpeg from "fluent-ffmpeg";
import type { FfmpegCommand } from "fluent-ffmpeg";

import ytdlx from "../../../base/Agent";
import formatTime from "../../../base/formatTime";
import calculateETA from "../../../base/calculateETA";

const ZodSchema = z.object({
  query: z.string().min(2),
  output: z.string().optional(),
  stream: z.boolean().optional(),
  verbose: z.boolean().optional(),
  onionTor: z.boolean().optional(),
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
 * Downloads audio and video from a YouTube video URL with the lowest available resolution.
 *
 * @param query - The YouTube video URL or ID or name.
 * @param stream - (optional) Whether to stream the output or not.
 * @param verbose - (optional) Whether to log verbose output or not.
 * @param output - (optional) The output directory for the processed file.
 * @param filter - (optional) The video filter to apply. Available options: "invert", "rotate90", "rotate270", "grayscale", "rotate180", "flipVertical", "flipHorizontal".
 * @param onionTor - (optional) Whether to use Tor for the download or not.
 * @returns A Promise that resolves when the audio and video processing is complete. If `stream` is true, it returns an object with the `ffmpeg` command and the `filename`.
 */
export default async function AudioVideoLowest({
  query,
  stream,
  verbose,
  output,
  filter,
  onionTor,
}: z.infer<typeof ZodSchema>): Promise<void | {
  ffmpeg: FfmpegCommand;
  filename: string;
}> {
  try {
    ZodSchema.parse({
      query,
      stream,
      verbose,
      output,
      filter,
      onionTor,
    });
    let startTime: Date;
    const engineData = await ytdlx({ query, verbose, onionTor });
    if (engineData === undefined) {
      throw new Error(`${colors.red("@error:")} unable to get response!`);
    } else {
      const title: string = engineData.metaData.title.replace(
        /[^a-zA-Z0-9_]+/g,
        "_"
      );
      const folder = output ? path.join(__dirname, output) : __dirname;
      if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
      const ff: FfmpegCommand = ffmpeg();
      const vdata = engineData.ManifestLow[0]?.url;
      ff.addInput(engineData.AudioLowF.url);
      ff.addInput(vdata.toString());
      ff.outputOptions("-c copy");
      ff.withOutputFormat("matroska");
      ff.addOption("-headers", "X-Forwarded-For: " + engineData.ipAddress);
      let filename: string = "yt-dlx_(AudioVideoLowest_";
      switch (filter) {
        case "grayscale":
          ff.withVideoFilter(
            "colorchannelmixer=.3:.4:.3:0:.3:.4:.3:0:.3:.4:.3"
          );
          filename += `grayscale)_${title}.mkv`;
          break;
        case "invert":
          ff.withVideoFilter("negate");
          filename += `invert)_${title}.mkv`;
          break;
        case "rotate90":
          ff.withVideoFilter("rotate=PI/2");
          filename += `rotate90)_${title}.mkv`;
          break;
        case "rotate180":
          ff.withVideoFilter("rotate=PI");
          filename += `rotate180)_${title}.mkv`;
          break;
        case "rotate270":
          ff.withVideoFilter("rotate=3*PI/2");
          filename += `rotate270)_${title}.mkv`;
          break;
        case "flipHorizontal":
          ff.withVideoFilter("hflip");
          filename += `flipHorizontal)_${title}.mkv`;
          break;
        case "flipVertical":
          ff.withVideoFilter("vflip");
          filename += `flipVertical)_${title}.mkv`;
          break;
        default:
          filename += `)_${title}.mkv`;
          break;
      }
      ff.on("error", (error) => {
        throw new Error(error.message);
      });
      ff.on("start", (comd) => {
        startTime = new Date();
        if (verbose) console.info(colors.green("@comd:"), comd);
      });
      ff.on("end", () => process.stdout.write("\n"));
      ff.on("progress", ({ percent, timemark }) => {
        let color = colors.green;
        if (isNaN(percent)) percent = 0;
        if (percent > 98) percent = 100;
        if (percent < 25) color = colors.red;
        else if (percent < 50) color = colors.yellow;
        const width = Math.floor(process.stdout.columns / 4);
        const scomp = Math.round((width * percent) / 100);
        const progb =
          color("━").repeat(scomp) + color(" ").repeat(width - scomp);
        process.stdout.write(
          `\r${color("@prog:")} ${progb}` +
            ` ${color("| @percent:")} ${percent.toFixed(2)}%` +
            ` ${color("| @timemark:")} ${timemark}` +
            ` ${color("| @eta:")} ${formatTime(
              calculateETA(startTime, percent)
            )}`
        );
      });
      if (stream) {
        return {
          ffmpeg: ff,
          filename: output
            ? path.join(folder, filename)
            : filename.replace("_)_", ")_"),
        };
      } else {
        await new Promise<void>((resolve, reject) => {
          ff.output(path.join(folder, filename.replace("_)_", ")_")));
          ff.on("end", () => resolve());
          ff.on("error", (error) => {
            reject(new Error(colors.red("@error: ") + error.message));
          });
          ff.run();
        });
      }
    }
  } catch (error: any) {
    switch (true) {
      case error instanceof ZodError:
        throw new Error(colors.red("@zod-error:") + error.errors);
      default:
        throw new Error(colors.red("@error:") + error.message);
    }
  } finally {
    console.log(
      colors.green("@info:"),
      "❣️ Thank you for using",
      colors.green("yt-dlx."),
      "Consider",
      colors.green("🌟starring"),
      "the GitHub repo",
      colors.green("https://github.com/yt-dlx\n")
    );
  }
}
