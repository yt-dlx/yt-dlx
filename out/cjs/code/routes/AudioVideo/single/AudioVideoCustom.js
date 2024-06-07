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
const Agent_1 = __importDefault(require("../../../base/Agent"));
const formatTime_1 = __importDefault(require("../../../base/formatTime"));
const calculateETA_1 = __importDefault(require("../../../base/calculateETA"));
const ffbins_1 = require("../../../base/ffbins");
var ZodSchema = zod_1.z.object({
    query: zod_1.z.string().min(2),
    output: zod_1.z.string().optional(),
    useTor: zod_1.z.boolean().optional(),
    stream: zod_1.z.boolean().optional(),
    verbose: zod_1.z.boolean().optional(),
    metadata: zod_1.z.boolean().optional(),
    resolution: zod_1.z.enum([
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
async function AudioVideoCustom({ query, stream, output, useTor, filter, metadata, verbose, resolution, }) {
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
        var startTime = new Date();
        var engineData = await (0, Agent_1.default)({ query, verbose, useTor });
        if (!engineData) {
            throw new Error(`${colors_1.default.red("@error:")} unable to get response!`);
        }
        var title = engineData.metaData.title.replace(/[^a-zA-Z0-9_]+/g, "_");
        var folder = output ? path.join(__dirname, output) : __dirname;
        if (!fs.existsSync(folder))
            fs.mkdirSync(folder, { recursive: true });
        var ff = (0, fluent_ffmpeg_1.default)()
            .setFfmpegPath(ffbins_1.ffmpegPath)
            .setFfprobePath(ffbins_1.ffprobePath)
            .addInput(engineData.AudioHighF.url)
            .withOutputFormat("matroska")
            .addOption("-headers", `X-Forwarded-For: ${engineData.ipAddress}`);
        var filenameBase = `yt-dlx_(AudioVideoCustom_${resolution}_`;
        let filename = `${filenameBase}${filter ? filter + ")_" : ")_"}${title}.mkv`;
        var vdata = engineData.ManifestHigh.find((i) => i.format.includes(resolution.replace("p", "").toString()));
        if (vdata)
            ff.addInput(vdata.url.toString());
        else {
            throw new Error(`${colors_1.default.red("@error:")} no video data found. use list_formats() maybe?`);
        }
        var filterMap = {
            grayscale: ["colorchannelmixer=.3:.4:.3:0:.3:.4:.3:0:.3:.4:.3"],
            invert: ["negate"],
            rotate90: ["rotate=PI/2"],
            rotate180: ["rotate=PI"],
            rotate270: ["rotate=3*PI/2"],
            flipHorizontal: ["hflip"],
            flipVertical: ["vflip"],
        };
        if (filter && filterMap[filter])
            ff.withVideoFilter(filterMap[filter]);
        var logProgress = ({ percent, timemark, }) => {
            if (isNaN(percent))
                percent = 0;
            percent = Math.min(Math.max(percent, 0), 100);
            var color = percent < 25 ? colors_1.default.red : percent < 50 ? colors_1.default.yellow : colors_1.default.green;
            var width = Math.floor(process.stdout.columns / 4);
            var scomp = Math.round((width * percent) / 100);
            var progb = color("━").repeat(scomp) + color(" ").repeat(width - scomp);
            process.stdout.write(`\r${color("@prog:")} ${progb} ${color("| @percent:")} ${percent.toFixed(2)}% ${color("| @timemark:")} ${timemark} ${color("| @eta:")} ${(0, formatTime_1.default)((0, calculateETA_1.default)(startTime, percent))}`);
        };
        ff.on("error", (error) => {
            throw new Error(error.message);
        })
            .on("start", (comd) => {
            if (verbose)
                console.info(colors_1.default.green("@comd:"), comd);
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
        await new Promise((resolve, reject) => {
            ff.output(path.join(folder, filename.replace("_)_", ")_")))
                .on("end", () => resolve())
                .on("error", (error) => reject(new Error(colors_1.default.red("@error: ") + error.message)))
                .run();
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            throw new Error(colors_1.default.red("@zod-error:") + error.errors);
        }
        throw new Error(colors_1.default.red("@error:") + error.message);
    }
    finally {
        console.log(colors_1.default.green("@info:"), "❣️ Thank you for using yt-dlx. Consider 🌟starring the GitHub repo https://github.com/yt-dlx.");
    }
}
exports.default = AudioVideoCustom;
//# sourceMappingURL=AudioVideoCustom.js.map