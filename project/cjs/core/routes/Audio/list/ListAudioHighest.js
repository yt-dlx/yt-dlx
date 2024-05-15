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
 * Downloads and processes the highest quality audio from a list of YouTube playlists or video URLs.
 *
 * @param query - An array of YouTube playlist URLs or video URLs.
 * @param output - (optional) The output directory for the processed files.
 * @param verbose - (optional) Whether to log verbose output or not.
 * @param filter - (optional) The audio filter to apply. Available options: "echo", "slow", "speed", "phaser", "flanger", "panning", "reverse", "vibrato", "subboost", "surround", "bassboost", "nightcore", "superslow", "vaporwave", "superspeed".
 * @param onionTor - (optional) Whether to use Tor for the download or not.
 * @returns A Promise that resolves when the audio processing is complete.
 */
async function ListAudioHighest({ query, output, verbose, filter, onionTor, }) {
    try {
        ZodSchema.parse({ query, output, verbose, filter, onionTor });
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
                    console.log(colors_1.default.red("@error:"), "unable to get response for", video.videoLink);
                    continue;
                }
                const title = engineData.metaData.title.replace(/[^a-zA-Z0-9_]+/g, "_");
                const folder = output ? path.join(__dirname, output) : __dirname;
                if (!fs.existsSync(folder))
                    fs.mkdirSync(folder, { recursive: true });
                let filename = "yt-dlx_(AudioHighest_";
                const ff = (0, fluent_ffmpeg_1.default)();
                ff.addInput(engineData.AudioHighF.url);
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
exports.default = ListAudioHighest;
//# sourceMappingURL=ListAudioHighest.js.map