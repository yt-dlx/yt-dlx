import { z } from "zod";
import type { FfmpegCommand } from "fluent-ffmpeg";
declare const ZodSchema: z.ZodObject<{
    query: z.ZodString;
    output: z.ZodOptional<z.ZodString>;
    stream: z.ZodOptional<z.ZodBoolean>;
    verbose: z.ZodOptional<z.ZodBoolean>;
    filter: z.ZodOptional<z.ZodEnum<["invert", "rotate90", "rotate270", "grayscale", "rotate180", "flipVertical", "flipHorizontal"]>>;
}, "strip", z.ZodTypeAny, {
    query: string;
    filter?: "invert" | "rotate90" | "rotate270" | "grayscale" | "rotate180" | "flipVertical" | "flipHorizontal" | undefined;
    verbose?: boolean | undefined;
    output?: string | undefined;
    stream?: boolean | undefined;
}, {
    query: string;
    filter?: "invert" | "rotate90" | "rotate270" | "grayscale" | "rotate180" | "flipVertical" | "flipHorizontal" | undefined;
    verbose?: boolean | undefined;
    output?: string | undefined;
    stream?: boolean | undefined;
}>;
/**
 * Downloads the lowest quality version of a YouTube video with optional video filter.
 *
 * @param query - The YouTube video URL or ID or name.
 * @param stream - (optional) Whether to return the FfmpegCommand instead of downloading the video.
 * @param verbose - (optional) Whether to log verbose output or not.
 * @param output - (optional) The output directory for the processed files.
 * @param filter - (optional) The video filter to apply. Available options: "invert", "rotate90", "rotate270", "grayscale", "rotate180", "flipVertical", "flipHorizontal".
 * @returns A Promise that resolves when the video has been processed, unless `stream` is `true`, in which case it resolves with an object containing the `ffmpeg` command and the `filename`.
 */
export default function VideoLowest({ query, stream, verbose, output, filter, }: z.infer<typeof ZodSchema>): Promise<void | {
    ffmpeg: FfmpegCommand;
    filename: string;
}>;
export {};
//# sourceMappingURL=VideoLowest.d.ts.map