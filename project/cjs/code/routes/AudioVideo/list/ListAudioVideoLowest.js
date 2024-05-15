"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const colors_1 = __importDefault(require("colors"));
const path = __importStar(require("path"));
const zod_1 = require("zod");
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const web_1 = __importDefault(require("../../../web"));
const Agent_1 = __importDefault(require("../../../base/Agent"));
const YouTubeId_1 = __importDefault(require("../../../web/YouTubeId"));
const formatTime_1 = __importDefault(require("../../../base/formatTime"));
const calculateETA_1 = __importDefault(require("../../../base/calculateETA"));
const ZodSchema = zod_1.z.object({
    output: zod_1.z.string().optional(),
    verbose: zod_1.z.boolean().optional(),
    onionTor: zod_1.z.boolean().optional(),
    query: zod_1.z.array(zod_1.z.string().min(2)),
    filter: zod_1.z
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
 * @param query - An array of YouTube playlist URLs or video URLs to process.
 * @param verbose - (optional) Whether to log verbose output or not.
 * @param output - (optional) The output directory for the processed files.
 * @param filter - (optional) The video filter to apply. Available options: "invert", "rotate90", "rotate270", "grayscale", "rotate180", "flipVertical", "flipHorizontal".
 * @param onionTor - (optional) Whether to use Tor for the download or not.
 * @returns A Promise that resolves when the audio and video processing is complete.
 */
async function ListAudioVideoLowest({ query, verbose, output, filter, onionTor, }) {
    try {
        ZodSchema.parse({
            query,
            verbose,
            output,
            filter,
            onionTor,
        });
        let startTime;
        const unique = new Set();
        for (const purl of query) {
            try {
                const playlistId = await (0, YouTubeId_1.default)(purl);
                if (!playlistId) {
                    console.log(colors_1.default.red("@error: "), "@error: invalid playlist", purl);
                    continue;
                }
                else {
                    const punique = await web_1.default.playlistVideos({
                        playlistId,
                    });
                    if (punique === undefined) {
                        console.log(colors_1.default.red("@error:"), "unable to get response for", purl);
                        continue;
                    }
                    for (const video of punique.result)
                        unique.add(video);
                }
            }
            catch (error) {
                console.log(colors_1.default.red("@error:"), error.message);
                continue;
            }
        }
        console.log(colors_1.default.blue("@info:"), "total number of uncommon videos:", colors_1.default.blue(unique.size.toString()));
        for (const video of unique) {
            try {
                const engineData = await (0, Agent_1.default)({
                    query: video.videoLink,
                    onionTor,
                    verbose,
                });
                if (engineData === undefined) {
                    console.log(colors_1.default.red("@error:"), "unable to get response!");
                    continue;
                }
                const title = engineData.metaData.title.replace(/[^a-zA-Z0-9_]+/g, "_");
                const folder = output ? path.join(__dirname, output) : __dirname;
                if (!fs.existsSync(folder))
                    fs.mkdirSync(folder, { recursive: true });
                let filename = "yt-dlx_(AudioVideoLowest_";
                const ff = (0, fluent_ffmpeg_1.default)();
                const vdata = engineData.ManifestLow[0].url;
                ff.addInput(engineData.AudioLowF.url);
                ff.addInput(vdata.toString());
                ff.outputOptions("-c copy");
                ff.withOutputFormat("matroska");
                ff.addOption("-headers", "X-Forwarded-For: " + engineData.ipAddress);
                ff.withOutputFormat("matroska");
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
                        console.info(colors_1.default.green("@comd:"), comd);
                });
                ff.on("end", () => process.stdout.write("\n"));
                ff.on("progress", ({ percent, timemark }) => {
                    let color = colors_1.default.green;
                    if (isNaN(percent))
                        percent = 0;
                    if (percent > 98)
                        percent = 100;
                    if (percent < 25)
                        color = colors_1.default.red;
                    else if (percent < 50)
                        color = colors_1.default.yellow;
                    const width = Math.floor(process.stdout.columns / 4);
                    const scomp = Math.round((width * percent) / 100);
                    const progb = color("━").repeat(scomp) + color(" ").repeat(width - scomp);
                    process.stdout.write(`\r${color("@prog:")} ${progb}` +
                        ` ${color("| @percent:")} ${percent.toFixed(2)}%` +
                        ` ${color("| @timemark:")} ${timemark}` +
                        ` ${color("| @eta:")} ${(0, formatTime_1.default)((0, calculateETA_1.default)(startTime, percent))}`);
                });
                await new Promise((resolve, _reject) => {
                    ff.output(path.join(folder, filename.replace("_)_", ")_")));
                    ff.on("end", () => resolve());
                    ff.on("error", (error) => {
                        throw new Error(colors_1.default.red("@error: ") + error.message);
                    });
                    ff.run();
                });
            }
            catch (error) {
                console.log(colors_1.default.red("@error:"), error);
                continue;
            }
        }
    }
    catch (error) {
        switch (true) {
            case error instanceof zod_1.ZodError:
                throw new Error(colors_1.default.red("@zod-error:") + error.errors);
            default:
                throw new Error(colors_1.default.red("@error:") + error.message);
        }
    }
    finally {
        console.log(colors_1.default.green("@info:"), "❣️ Thank you for using", colors_1.default.green("yt-dlx."), "Consider", colors_1.default.green("🌟starring"), "the GitHub repo", colors_1.default.green("https://github.com/yt-dlx\n"));
    }
}
exports.default = ListAudioVideoLowest;
//# sourceMappingURL=ListAudioVideoLowest.js.map