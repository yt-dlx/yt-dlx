import { z } from "zod";
import type { FfmpegCommand } from "fluent-ffmpeg";
import EngineOutput from "../../../interfaces/EngineOutput";
declare var ZodSchema: z.ZodObject<{
    query: z.ZodString;
    output: z.ZodOptional<z.ZodString>;
    useTor: z.ZodOptional<z.ZodBoolean>;
    stream: z.ZodOptional<z.ZodBoolean>;
    verbose: z.ZodOptional<z.ZodBoolean>;
    metadata: z.ZodOptional<z.ZodBoolean>;
    resolution: z.ZodEnum<["144p", "240p", "360p", "480p", "720p", "1080p", "1440p", "2160p", "3072p", "4320p", "6480p", "8640p", "12000p"]>;
    filter: z.ZodOptional<z.ZodEnum<["invert", "rotate90", "rotate270", "grayscale", "rotate180", "flipVertical", "flipHorizontal"]>>;
}, "strip", z.ZodTypeAny, {
    query: string;
    resolution: "144p" | "240p" | "360p" | "480p" | "720p" | "1080p" | "1440p" | "2160p" | "3072p" | "4320p" | "6480p" | "8640p" | "12000p";
    useTor?: boolean | undefined;
    verbose?: boolean | undefined;
    output?: string | undefined;
    stream?: boolean | undefined;
    metadata?: boolean | undefined;
    filter?: "invert" | "rotate90" | "rotate270" | "grayscale" | "rotate180" | "flipVertical" | "flipHorizontal" | undefined;
}, {
    query: string;
    resolution: "144p" | "240p" | "360p" | "480p" | "720p" | "1080p" | "1440p" | "2160p" | "3072p" | "4320p" | "6480p" | "8640p" | "12000p";
    useTor?: boolean | undefined;
    verbose?: boolean | undefined;
    output?: string | undefined;
    stream?: boolean | undefined;
    metadata?: boolean | undefined;
    filter?: "invert" | "rotate90" | "rotate270" | "grayscale" | "rotate180" | "flipVertical" | "flipHorizontal" | undefined;
}>;
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
export default function AudioVideoCustom({ query, stream, output, useTor, filter, metadata, verbose, resolution, }: z.infer<typeof ZodSchema>): Promise<void | {
    ffmpeg: FfmpegCommand;
    filename: string;
} | {
    filename: string;
    metaData: EngineOutput["metaData"];
    ipAddress: EngineOutput["ipAddress"];
    AudioLowF: EngineOutput["AudioLowF"];
    AudioHighF: EngineOutput["AudioHighF"];
    AudioLowDRC: EngineOutput["AudioLowDRC"];
    AudioHighDRC: EngineOutput["AudioHighDRC"];
    VideoLowF: EngineOutput["VideoLowF"];
    VideoHighF: EngineOutput["VideoHighF"];
    VideoLowHDR: EngineOutput["VideoLowHDR"];
    VideoHighHDR: EngineOutput["VideoHighHDR"];
    ManifestLow: EngineOutput["ManifestLow"];
    ManifestHigh: EngineOutput["ManifestHigh"];
}>;
export {};
//# sourceMappingURL=AudioVideoCustom.d.ts.map