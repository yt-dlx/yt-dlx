import * as fs from "fs";
import colors from "colors";
import * as path from "path";
import { z, ZodError } from "zod";
import ffmpeg from "fluent-ffmpeg";
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
 * Downloads and processes the lowest quality audio from a list of YouTube playlists or video URLs.
 *
 * @param query - An array of YouTube playlist URLs or video URLs.
 * @param output - (optional) The output directory for the processed files.
 * @param verbose - (optional) Whether to log verbose output or not.
 * @param filter - (optional) The audio filter to apply. Available options: "echo", "slow", "speed", "phaser", "flanger", "panning", "reverse", "vibrato", "subboost", "surround", "bassboost", "nightcore", "superslow", "vaporwave", "superspeed".
 * @param onionTor - (optional) Whether to use Tor for the download or not.
 * @returns A Promise that resolves when the audio processing is complete.
 */
export default async function ListAudioLowest({ query, output, verbose, filter, onionTor, }) {
    try {
        ZodSchema.parse({ query, output, verbose, filter, onionTor });
        let startTime;
        const unique = new Set();
        for (const purl of query) {
            try {
                const playlistId = await YouTubeID(purl);
                if (!playlistId) {
                    console.log(colors.red("@error: "), "@error: invalid playlist", purl);
                    continue;
                }
                else {
                    const punique = await web.playlistVideos({
                        playlistId,
                    });
                    if (punique === undefined) {
                        console.log(colors.red("@error:"), "unable to get response for", purl);
                        continue;
                    }
                    for (const video of punique.result)
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
                const engineData = await ytdlx({
                    query: video.videoLink,
                    onionTor,
                    verbose,
                });
                if (engineData === undefined) {
                    console.log(colors.red("@error:"), "unable to get response for", video.videoLink);
                    continue;
                }
                const title = engineData.metaData.title.replace(/[^a-zA-Z0-9_]+/g, "_");
                const folder = output ? path.join(__dirname, output) : __dirname;
                if (!fs.existsSync(folder))
                    fs.mkdirSync(folder, { recursive: true });
                let filename = "yt-dlx_(AudioLowest_";
                const ff = ffmpeg();
                ff.addInput(engineData.AudioLowF.url);
                ff.addInput(engineData.metaData.thumbnail);
                ff.withOutputFormat("avi");
                ff.addOption("-headers", "X-Forwarded-For: " + engineData.ipAddress);
                switch (filter) {
                    case "bassboost":
                        ff.withAudioFilter(["bass=g=10,dynaudnorm=f=150"]);
                        filename += `bassboost)_${title}.avi`;
                        break;
                    case "echo":
                        ff.withAudioFilter(["aecho=0.8:0.9:1000:0.3"]);
                        filename += `echo)_${title}.avi`;
                        break;
                    case "flanger":
                        ff.withAudioFilter(["flanger"]);
                        filename += `flanger)_${title}.avi`;
                        break;
                    case "nightcore":
                        ff.withAudioFilter(["aresample=48000,asetrate=48000*1.25"]);
                        filename += `nightcore)_${title}.avi`;
                        break;
                    case "panning":
                        ff.withAudioFilter(["apulsator=hz=0.08"]);
                        filename += `panning)_${title}.avi`;
                        break;
                    case "phaser":
                        ff.withAudioFilter(["aphaser=in_gain=0.4"]);
                        filename += `phaser)_${title}.avi`;
                        break;
                    case "reverse":
                        ff.withAudioFilter(["areverse"]);
                        filename += `reverse)_${title}.avi`;
                        break;
                    case "slow":
                        ff.withAudioFilter(["atempo=0.8"]);
                        filename += `slow)_${title}.avi`;
                        break;
                    case "speed":
                        ff.withAudioFilter(["atempo=2"]);
                        filename += `speed)_${title}.avi`;
                        break;
                    case "subboost":
                        ff.withAudioFilter(["asubboost"]);
                        filename += `subboost)_${title}.avi`;
                        break;
                    case "superslow":
                        ff.withAudioFilter(["atempo=0.5"]);
                        filename += `superslow)_${title}.avi`;
                        break;
                    case "superspeed":
                        ff.withAudioFilter(["atempo=3"]);
                        filename += `superspeed)_${title}.avi`;
                        break;
                    case "surround":
                        ff.withAudioFilter(["surround"]);
                        filename += `surround)_${title}.avi`;
                        break;
                    case "vaporwave":
                        ff.withAudioFilter(["aresample=48000,asetrate=48000*0.8"]);
                        filename += `vaporwave)_${title}.avi`;
                        break;
                    case "vibrato":
                        ff.withAudioFilter(["vibrato=f=6.5"]);
                        filename += `vibrato)_${title}.avi`;
                        break;
                    default:
                        filename += `)_${title}.avi`;
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
                    let color = colors.green;
                    if (isNaN(percent))
                        percent = 0;
                    if (percent > 98)
                        percent = 100;
                    if (percent < 25)
                        color = colors.red;
                    else if (percent < 50)
                        color = colors.yellow;
                    const width = Math.floor(process.stdout.columns / 4);
                    const scomp = Math.round((width * percent) / 100);
                    const progb = color("━").repeat(scomp) + color(" ").repeat(width - scomp);
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
        console.log(colors.green("@info:"), "❣️ Thank you for using", colors.green("yt-dlx."), "Consider", colors.green("🌟starring"), "the GitHub repo", colors.green("https://github.com/yt-dlx\n"));
    }
}
//# sourceMappingURL=ListAudioLowest.js.map