import * as fs from "fs";
import colors from "colors";
import * as path from "path";
import { z, ZodError } from "zod";
import ffmpeg from "fluent-ffmpeg";
import ytdlx from "../../../base/Agent";
import formatTime from "../../../base/formatTime";
import calculateETA from "../../../base/calculateETA";
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
 * @param resolution - The desired resolution for the video. Available options: "144p", "240p", "360p", "480p", "720p", "1080p", "1440p", "2160p", "3072p", "4320p", "6480p", "8640p", "12000p".
 * @param stream - (optional) Whether to stream the output or not.
 * @param verbose - (optional) Whether to log verbose output or not.
 * @param useTor - (optional) Whether to use Tor for the download or not.
 * @param output - (optional) The output directory for the processed file.
 * @param metadata - (optional) If true, the function returns the extracted metadata and filename without processing the audio. This can be useful for debugging or obtaining metadata without downloading the audio.
 * @param filter - (optional) The video filter to apply. Available options: "invert", "rotate90", "rotate270", "grayscale", "rotate180", "flipVertical", "flipHorizontal".
 * @returns A Promise that resolves when the audio and video processing is complete. If `stream` is true, it returns an object with the `ffmpeg` command and the `filename`.
 */
export default async function AudioVideoCustom({ query, stream, output, useTor, filter, metadata, verbose, resolution, }) {
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
        var startTime;
        var engineData = await ytdlx({ query, verbose, useTor });
        if (engineData === undefined) {
            throw new Error(`${colors.red("@error:")} unable to get response!`);
        }
        else {
            var title = engineData.metaData.title.replace(/[^a-zA-Z0-9_]+/g, "_");
            var folder = output ? path.join(__dirname, output) : __dirname;
            if (!fs.existsSync(folder))
                fs.mkdirSync(folder, { recursive: true });
            var filename = `yt-dlx_(AudioVideoCustom_${resolution}_`;
            var ff = ffmpeg();
            var vdata = engineData.ManifestHigh.find((i) => i.format.includes(resolution.replace("p", "").toString()));
            ff.addInput(engineData.AudioHighF.url);
            if (vdata)
                ff.addInput(vdata.url.toString());
            else {
                throw new Error(`${colors.red("@error:")} no video data found. use list_formats() maybe?`);
            }
            ff.outputOptions("-c copy");
            ff.withOutputFormat("matroska");
            ff.addOption("-headers", "X-Forwarded-For: " + engineData.ipAddress);
            switch (filter) {
                case "grayscale":
                    ff.withVideoFilter("colorchannelmixer=.3:.4:.3:0:.3:.4:.3:0:.3:.4:.3");
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
                if (verbose)
                    console.info(colors.green("@comd:"), comd);
            });
            ff.on("end", () => process.stdout.write("\n"));
            ff.on("progress", ({ percent, timemark }) => {
                var color = colors.green;
                if (isNaN(percent))
                    percent = 0;
                if (percent > 98)
                    percent = 100;
                if (percent < 25)
                    color = colors.red;
                else if (percent < 50)
                    color = colors.yellow;
                var width = Math.floor(process.stdout.columns / 4);
                var scomp = Math.round((width * percent) / 100);
                var progb = color("━").repeat(scomp) + color(" ").repeat(width - scomp);
                process.stdout.write(`\r${color("@prog:")} ${progb}` +
                    ` ${color("| @percent:")} ${percent.toFixed(2)}%` +
                    ` ${color("| @timemark:")} ${timemark}` +
                    ` ${color("| @eta:")} ${formatTime(calculateETA(startTime, percent))}`);
            });
            switch (true) {
                case stream:
                    return {
                        ffmpeg: ff,
                        filename: output
                            ? path.join(folder, filename)
                            : filename.replace("_)_", ")_"),
                    };
                case metadata:
                    return {
                        filename,
                        metaData: engineData.metaData,
                        ipAddress: engineData.ipAddress,
                        AudioLowF: engineData.AudioLowF,
                        AudioHighF: engineData.AudioHighF,
                        AudioLowDRC: engineData.AudioLowDRC,
                        AudioHighDRC: engineData.AudioHighDRC,
                        VideoLowF: engineData.videoLowF,
                        VideoHighF: engineData.VideoHighF,
                        VideoLowHDR: engineData.VideoLowHDR,
                        VideoHighHDR: engineData.VideoHighHDR,
                        ManifestLow: engineData.ManifestLow,
                        ManifestHigh: engineData.ManifestHigh,
                    };
                default:
                    await new Promise((resolve, reject) => {
                        ff.output(path.join(folder, filename.replace("_)_", ")_")));
                        ff.on("end", () => resolve());
                        ff.on("error", (error) => {
                            reject(new Error(colors.red("@error: ") + error.message));
                        });
                        ff.run();
                    });
                    break;
            }
        }
    }
    catch (error) {
        switch (true) {
            case error instanceof ZodError:
                throw new Error(colors.red("@zod-error:") + error.errors);
            default:
                throw new Error(colors.red("@error:") + error.message);
        }
    }
    finally {
        console.log(colors.green("@info:"), "❣️ Thank you for using yt-dlx. Consider 🌟starring the GitHub repo https://github.com/yt-dlx.");
    }
}
//# sourceMappingURL=AudioVideoCustom.js.map