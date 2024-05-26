import { z } from "zod";
import type { FfmpegCommand } from "fluent-ffmpeg";
import EngineOutput from "../../../interfaces/EngineOutput";
declare const ZodSchema: z.ZodObject<{
    query: z.ZodString;
    output: z.ZodOptional<z.ZodString>;
    useTor: z.ZodOptional<z.ZodBoolean>;
    stream: z.ZodOptional<z.ZodBoolean>;
    verbose: z.ZodOptional<z.ZodBoolean>;
    extract: z.ZodOptional<z.ZodBoolean>;
    filter: z.ZodOptional<z.ZodEnum<["invert", "rotate90", "rotate270", "grayscale", "rotate180", "flipVertical", "flipHorizontal"]>>;
}, "strip", z.ZodTypeAny, {
    query: string;
    useTor?: boolean | undefined;
    verbose?: boolean | undefined;
    output?: string | undefined;
    stream?: boolean | undefined;
    extract?: boolean | undefined;
    filter?: "invert" | "rotate90" | "rotate270" | "grayscale" | "rotate180" | "flipVertical" | "flipHorizontal" | undefined;
}, {
    query: string;
    useTor?: boolean | undefined;
    verbose?: boolean | undefined;
    output?: string | undefined;
    stream?: boolean | undefined;
    extract?: boolean | undefined;
    filter?: "invert" | "rotate90" | "rotate270" | "grayscale" | "rotate180" | "flipVertical" | "flipHorizontal" | undefined;
}>;
/**
 * Downloads audio and video from a YouTube video URL with the lowest available resolution.
 *
 * @param query - The YouTube video URL or ID or name.
 * @param stream - (optional) Whether to stream the output or not.
 * @param verbose - (optional) Whether to log verbose output or not.
 * @param useTor - (optional) Whether to use Tor for the download or not.
 * @param output - (optional) The output directory for the processed file.
 * @param extract - (optional) If true, the function returns the extracted metadata and filename without processing the audio. This can be useful for debugging or obtaining metadata without downloading the audio.
 * @param filter - (optional) The video filter to apply. Available options: "invert", "rotate90", "rotate270", "grayscale", "rotate180", "flipVertical", "flipHorizontal".
 * @returns A Promise that resolves when the audio and video processing is complete. If `stream` is true, it returns an object with the `ffmpeg` command and the `filename`.
 */
export default function AudioVideoLowest({ query, stream, verbose, output, extract, useTor, filter, }: z.infer<typeof ZodSchema>): Promise<void | {
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
//# sourceMappingURL=AudioVideoLowest.d.ts.map