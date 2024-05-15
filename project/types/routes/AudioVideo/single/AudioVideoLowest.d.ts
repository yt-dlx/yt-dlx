import { z } from "zod";
import type { FfmpegCommand } from "fluent-ffmpeg";
declare const ZodSchema: z.ZodObject<{
    query: z.ZodString;
    output: z.ZodOptional<z.ZodString>;
    stream: z.ZodOptional<z.ZodBoolean>;
    verbose: z.ZodOptional<z.ZodBoolean>;
    onionTor: z.ZodOptional<z.ZodBoolean>;
    filter: z.ZodOptional<z.ZodEnum<["invert", "rotate90", "rotate270", "grayscale", "rotate180", "flipVertical", "flipHorizontal"]>>;
}, "strip", z.ZodTypeAny, {
    query: string;
    onionTor?: boolean | undefined;
    filter?: "invert" | "rotate90" | "rotate270" | "grayscale" | "rotate180" | "flipVertical" | "flipHorizontal" | undefined;
    verbose?: boolean | undefined;
    output?: string | undefined;
    stream?: boolean | undefined;
}, {
    query: string;
    onionTor?: boolean | undefined;
    filter?: "invert" | "rotate90" | "rotate270" | "grayscale" | "rotate180" | "flipVertical" | "flipHorizontal" | undefined;
    verbose?: boolean | undefined;
    output?: string | undefined;
    stream?: boolean | undefined;
}>;
/**
 * Downloads audio and video from a YouTube video URL with the lowest available resolution.
 *
 * @param query - The YouTube video URL or ID or name.
 * @param stream - (optional) Whether to stream the output or not.
 * @param verbose - (optional) Whether to log verbose output or not.
 * @param output - (optional) The output directory for the processed file.
 * @param filter - (optional) The video filter to apply. Available options: "invert", "rotate90", "rotate270", "grayscale", "rotate180", "flipVertical", "flipHorizontal".
 * @param onionTor - (optional) Whether to use Tor for the download or not.
 * @returns A Promise that resolves when the audio and video processing is complete. If `stream` is true, it returns an object with the `ffmpeg` command and the `filename`.
 */
export default function AudioVideoLowest({ query, stream, verbose, output, filter, onionTor, }: z.infer<typeof ZodSchema>): Promise<void | {
    ffmpeg: FfmpegCommand;
    filename: string;
}>;
export {};
//# sourceMappingURL=AudioVideoLowest.d.ts.map