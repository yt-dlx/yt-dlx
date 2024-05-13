import { z } from "zod";
import type { FfmpegCommand } from "fluent-ffmpeg";
declare const ZodSchema: z.ZodObject<{
    query: z.ZodString;
    output: z.ZodOptional<z.ZodString>;
    stream: z.ZodOptional<z.ZodBoolean>;
    verbose: z.ZodOptional<z.ZodBoolean>;
    onionTor: z.ZodOptional<z.ZodBoolean>;
    filter: z.ZodOptional<z.ZodEnum<["echo", "slow", "speed", "phaser", "flanger", "panning", "reverse", "vibrato", "subboost", "surround", "bassboost", "nightcore", "superslow", "vaporwave", "superspeed"]>>;
}, "strip", z.ZodTypeAny, {
    query: string;
    filter?: "reverse" | "echo" | "slow" | "speed" | "phaser" | "flanger" | "panning" | "vibrato" | "subboost" | "surround" | "bassboost" | "nightcore" | "superslow" | "vaporwave" | "superspeed" | undefined;
    onionTor?: boolean | undefined;
    verbose?: boolean | undefined;
    output?: string | undefined;
    stream?: boolean | undefined;
}, {
    query: string;
    filter?: "reverse" | "echo" | "slow" | "speed" | "phaser" | "flanger" | "panning" | "vibrato" | "subboost" | "surround" | "bassboost" | "nightcore" | "superslow" | "vaporwave" | "superspeed" | undefined;
    onionTor?: boolean | undefined;
    verbose?: boolean | undefined;
    output?: string | undefined;
    stream?: boolean | undefined;
}>;
/**
 * Downloads and processes the lowest quality audio from a single YouTube video.
 *
 * @param query - The YouTube video URL or ID or name.
 * @param output - (optional) The output directory for the processed file.
 * @param stream - (optional) Whether to stream the processed video or not.
 * @param verbose - (optional) Whether to log verbose output or not.
 * @param filter - (optional) The audio filter to apply. Available options: "echo", "slow", "speed", "phaser", "flanger", "panning", "reverse", "vibrato", "subboost", "surround", "bassboost", "nightcore", "superslow", "vaporwave", "superspeed".
 * @param onionTor - (optional) Whether to use Tor for the download or not.
 * @returns A Promise that resolves with either `void` (if `stream` is false) or an object containing the `ffmpeg` instance and the output filename (if `stream` is true).
 */
export default function AudioLowest({ query, output, stream, verbose, filter, onionTor, }: z.infer<typeof ZodSchema>): Promise<void | {
    ffmpeg: FfmpegCommand;
    filename: string;
}>;
export {};
//# sourceMappingURL=AudioLowest.d.ts.map