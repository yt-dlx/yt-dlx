import * as fs from "fs";
import colors from "colors";
import * as path from "path";
import { z, ZodError } from "zod";
import ffmpeg from "fluent-ffmpeg";
import ytdlx from "../../base/Agent";
import { EventEmitter } from "events";
import { locator } from "../../base/locator";

var ZodSchema = z.object({
    query: z.string().min(2),
    output: z.string().optional(),
    useTor: z.boolean().optional(),
    stream: z.boolean().optional(),
    verbose: z.boolean().optional(),
    metadata: z.boolean().optional(),
    filter: z.enum(["invert", "rotate90", "rotate270", "grayscale", "rotate180", "flipVertical", "flipHorizontal"]).optional(),
});

/**
 * Downloads the lowest quality version of a YouTube video with optional video filter.
 *
 * @param query - The YouTube video URL or ID or name.
 * @param stream - (optional) Whether to return the FfmpegCommand instead of downloading the video.
 * @param verbose - (optional) Whether to log verbose output or not.
 * @param useTor - (optional) Whether to use Tor for the download or not.
 * @param output - (optional) The output directory for the processed files.
 * @param metadata - (optional) If true, the function returns the extracted metadata and filename without processing the audio. This can be useful for debugging or obtaining metadata without downloading the audio.
 * @param filter - (optional) The video filter to apply. Available options: "invert", "rotate90", "rotate270", "grayscale", "rotate180", "flipVertical", "flipHorizontal".
 *
 * @returns An EventEmitter instance to handle events.
 */
export default function VideoLowest({ query, stream, verbose, output, metadata, useTor, filter }: z.infer<typeof ZodSchema>): EventEmitter {
    var emitter = new EventEmitter();
    (async () => {
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
            var engineData = await ytdlx({
                query,
                verbose,
                useTor,
            });
            if (!engineData) {
                throw new Error(`${colors.red("@error:")} unable to get response!`);
            }
            var title = engineData.metaData.title.replace(/[^a-zA-Z0-9_]+/g, "_");
            var folder = output ? output : __dirname;
            if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
            var ff = ffmpeg()
                .setFfmpegPath((await locator().then(fp => fp.ffmpeg)).toString())
                .setFfprobePath((await locator().then(fp => fp.ffprobe)).toString())
                .addInput(engineData.ManifestLow[0].url)
                .withOutputFormat("matroska")
                .videoCodec("copy")
                .addOption("-headers", `X-Forwarded-For: ${engineData.ipAddress}`);
            var filenameBase = `yt-dlx_(VideoLowest_`;
            let filename = `${filenameBase}${filter ? filter + ")_" : ")_"}${title}.mkv`;
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
            ff.addOption("-headers", `X-Forwarded-For: ${engineData.ipAddress}`);
            ff.on("start", comd => {
                if (verbose) emitter.emit("log", colors.green("@comd:"), comd);
                emitter.emit("start", comd);
            })
                .on("progress", progress => emitter.emit("progress", progress))
                .on("error", error => emitter.emit("error", error.message))
                .on("end", () => emitter.emit("end", filename));
            switch (true) {
                case stream:
                    emitter.emit("ready", {
                        ffmpeg: ff,
                        filename: path.join(folder, filename),
                    });
                    break;
                case metadata:
                    emitter.emit("metadata", {
                        filename,
                        metaData: engineData.metaData,
                        ipAddress: engineData.ipAddress,
                        VideoLowF: engineData.VideoLowF,
                        VideoHighF: engineData.VideoHighF,
                        VideoLowHDR: engineData.VideoLowHDR,
                        VideoHighHDR: engineData.VideoHighHDR,
                        ManifestLow: engineData.ManifestLow,
                        ManifestHigh: engineData.ManifestHigh,
                    });
                    break;
                default:
                    ff.output(path.join(folder, filename))
                        .on("end", () => emitter.emit("end", filename))
                        .on("error", error => emitter.emit("error", error.message))
                        .run();
                    break;
            }
        } catch (error: any) {
            switch (true) {
                case error instanceof ZodError:
                    emitter.emit("error", colors.red("@zod-error:"), error.errors);
                    break;
                default:
                    emitter.emit("error", colors.red("@error:"), error.message);
                    break;
            }
        } finally {
            emitter.emit("info", colors.green("@info:"), "❣️ Thank you for using yt-dlx. Consider 🌟starring the GitHub repo https://github.com/yt-dlx.");
        }
    })();
    return emitter;
}
