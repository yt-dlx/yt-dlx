import * as fs from "fs";
import colors from "colors";
import * as path from "path";
import { z, ZodError } from "zod";
import ffmpeg from "fluent-ffmpeg";
import type { FfmpegCommand } from "fluent-ffmpeg";

import web from "../../../web";
import ytdlx from "../../../base/Agent";
import YouTubeID from "../../../web/YouTubeId";
import formatTime from "../../../base/formatTime";
import calculateETA from "../../../base/calculateETA";

const ZodSchema = z.object({
  output: z.string().optional(),
  verbose: z.boolean().optional(),
  onionTor: z.boolean().optional(),
  query: z.array(z.string().min(2)),
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
 * Downloads videos from YouTube based on a list of video URLs with the highest available resolution.
 *
 * @param query - An array of YouTube video URLs to process.
 * @param verbose - (optional) Whether to log verbose output or not.
 * @param output - (optional) The output directory for the processed files.
 * @param filter - (optional) The video filter to apply. Available options: "invert", "rotate90", "rotate270", "grayscale", "rotate180", "flipVertical", "flipHorizontal".
 * @param onionTor - (optional) Whether to use Tor for the download or not.
 * @returns A Promise that resolves when all videos have been processed.
 */
export default async function ListVideoHighest({
  query,
  verbose,
  output,
  filter,
  onionTor,
}: z.infer<typeof ZodSchema>): Promise<void> {
  try {
    ZodSchema.parse({
      query,
      verbose,
      output,
      filter,
      onionTor,
    });
    let startTime: Date;
    const unique = new Set<{
      ago: string;
      title: string;
      views: string;
      author: string;
      videoId: string;
      videoLink: string;
      authorUrl: string;
      thumbnailUrls: string[];
    }>();
    for (const purl of query) {
      try {
        const playlistId = await YouTubeID(purl);
        if (!playlistId) {
          console.log(colors.red("@error: "), "@error: invalid playlist", purl);
          continue;
        } else {
          const punique = await web.playlistVideos({
            playlistId,
          });
          if (punique === undefined) {
            console.log(
              colors.red("@error:"),
              "unable to get response for",
              purl
            );
            continue;
          }
          for (const video of punique.result) unique.add(video);
        }
      } catch (error: any) {
        console.log(colors.red("@error:"), error.message);
        continue;
      }
    }
    console.log(
      colors.blue("@info:"),
      "total number of uncommon videos:",
      colors.blue(unique.size.toString())
    );
    for (const video of unique) {
      try {
        const engineData = await ytdlx({
          query: video.videoLink,
          onionTor,
          verbose,
        });
        if (engineData === undefined) {
          console.log(colors.red("@error:"), "unable to get response!");
          continue;
        }
        const title: string = engineData.metaData.title.replace(
          /[^a-zA-Z0-9_]+/g,
          "_"
        );
        const folder = output ? path.join(__dirname, output) : __dirname;
        if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
        let filename: string = "yt-dlx_(VideoHighest_";
        const ff: FfmpegCommand = ffmpeg();
        const vdata =
          engineData.ManifestHigh[engineData.ManifestHigh.length - 1].url;
        ff.addInput(vdata.toString());
        ff.videoCodec("copy");
        ff.addOption("-headers", "X-Forwarded-For: " + engineData.ipAddress);
        ff.withOutputFormat("matroska");
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
        await new Promise<void>((resolve, _reject) => {
          ff.output(path.join(folder, filename.replace("_)_", ")_")));
          ff.on("end", () => resolve());
          ff.on("error", (error) => {
            throw new Error(colors.red("@error: ") + error.message);
          });
          ff.run();
        });
      } catch (error) {
        console.log(colors.red("@error:"), error);
        continue;
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
