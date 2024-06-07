import * as fs from "fs";
import colors from "colors";
import * as path from "path";
import web from "../../../web";
import { z, ZodError } from "zod";
import ffmpeg from "fluent-ffmpeg";
import ytdlx from "../../../base/Agent";
import YouTubeID from "../../../web/YouTubeId";
import formatTime from "../../../base/formatTime";
import calculateETA from "../../../base/calculateETA";
import { ffmpegPath, ffprobePath } from "../../../base/ffbins";
var ZodSchema = z.object({
    output: z.string().optional(),
    useTor: z.boolean().optional(),
    verbose: z.boolean().optional(),
    query: z.array(z.string().min(2)),
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
 * Downloads and processes audio and video from a list of YouTube playlists or video URLs with customization options.
 *
 * @param query - An array of YouTube playlist URLs or video URLs.
 * @param resolution - The desired video resolution. Available options: "144p", "240p", "360p", "480p", "720p", "1080p", "1440p", "2160p", "3072p", "4320p", "6480p", "8640p", "12000p".
 * @param verbose - (optional) Whether to log verbose output or not.
 * @param useTor - (optional) Whether to use Tor for the download or not.
 * @param output - (optional) The output directory for the processed files.
 * @param filter - (optional) The video filter to apply. Available options: "invert", "rotate90", "rotate270", "grayscale", "rotate180", "flipVertical", "flipHorizontal".
 * @returns A Promise that resolves when the audio and video processing is complete.
 */
export default async function ListAudioVideoCustom({ query, resolution, verbose, output, useTor, filter, }) {
    try {
        ZodSchema.parse({
            query,
            resolution,
            verbose,
            output,
            useTor,
            filter,
        });
        var startTime;
        var unique = new Set();
        for (var purl of query) {
            try {
                var playlistId = await YouTubeID(purl);
                if (!playlistId) {
                    console.log(colors.red("@error: "), "@error: invalid playlist", purl);
                    continue;
                }
                else {
                    var punique = await web.playlistVideos({
                        playlistId,
                    });
                    if (punique === undefined) {
                        console.log(colors.red("@error:"), "unable to get response for", purl);
                        continue;
                    }
                    for (var video of punique.result)
                        unique.add(video);
                }
            }
            catch (error) {
                console.log(colors.red("@error:"), error.message);
                continue;
            }
        }
        console.log(colors.blue("@info:"), "total number of uncommon videos:", colors.blue(unique.size.toString()));
        for (const video of unique) {
            try {
                var engineData = await ytdlx({
                    query: video.videoLink,
                    verbose,
                    useTor,
                });
                if (engineData === undefined) {
                    console.log(colors.red("@error:"), "unable to get response!");
                    continue;
                }
                var title = engineData.metaData.title.replace(/[^a-zA-Z0-9_]+/g, "_");
                var folder = output ? path.join(__dirname, output) : __dirname;
                if (!fs.existsSync(folder))
                    fs.mkdirSync(folder, { recursive: true });
                var filename = `yt-dlx_(AudioVideoCustom_${resolution}_`;
                var ff = ffmpeg()
                    .setFfmpegPath(ffmpegPath)
                    .setFfprobePath(ffprobePath);
                var vdata = engineData.ManifestHigh.find((i) => i.format.includes(resolution.replace("p", "").toString()));
                ff.addInput(engineData.AudioHighF.url);
                if (vdata)
                    ff.addInput(vdata.url.toString());
                else
                    throw new Error(colors.red("@error: ") +
                        "no video data found. use list_formats() maybe?");
                ff.outputOptions("-c copy");
                ff.withOutputFormat("matroska");
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
                await new Promise((resolve, _reject) => {
                    ff.output(path.join(folder, filename.replace("_)_", ")_")));
                    ff.on("end", () => resolve());
                    ff.on("error", (error) => {
                        throw new Error(colors.red("@error: ") + error.message);
                    });
                    ff.run();
                });
            }
            catch (error) {
                console.log(colors.red("@error:"), error);
                continue;
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
//# sourceMappingURL=ListAudioVideoCustom.js.map