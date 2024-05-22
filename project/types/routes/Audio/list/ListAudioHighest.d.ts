import { z } from "zod";
declare const ZodSchema: z.ZodObject<{
    output: z.ZodOptional<z.ZodString>;
    useTor: z.ZodOptional<z.ZodBoolean>;
    verbose: z.ZodOptional<z.ZodBoolean>;
    query: z.ZodArray<z.ZodString, "many">;
    filter: z.ZodOptional<z.ZodEnum<["echo", "slow", "speed", "phaser", "flanger", "panning", "reverse", "vibrato", "subboost", "surround", "bassboost", "nightcore", "superslow", "vaporwave", "superspeed"]>>;
}, "strip", z.ZodTypeAny, {
    query: string[];
    useTor?: boolean | undefined;
    verbose?: boolean | undefined;
    output?: string | undefined;
    filter?: "echo" | "slow" | "speed" | "phaser" | "flanger" | "panning" | "reverse" | "vibrato" | "subboost" | "surround" | "bassboost" | "nightcore" | "superslow" | "vaporwave" | "superspeed" | undefined;
}, {
    query: string[];
    useTor?: boolean | undefined;
    verbose?: boolean | undefined;
    output?: string | undefined;
    filter?: "echo" | "slow" | "speed" | "phaser" | "flanger" | "panning" | "reverse" | "vibrato" | "subboost" | "surround" | "bassboost" | "nightcore" | "superslow" | "vaporwave" | "superspeed" | undefined;
}>;
/**
 * Downloads and processes the highest quality audio from a list of YouTube playlists or video URLs.
 *
 * @param query - An array of YouTube playlist URLs or video URLs.
 * @param output - (optional) The output directory for the processed files.
 * @param verbose - (optional) Whether to log verbose output or not.
 * @param useTor - (optional) Whether to use Tor for the download or not.
 * @param filter - (optional) The audio filter to apply. Available options: "echo", "slow", "speed", "phaser", "flanger", "panning", "reverse", "vibrato", "subboost", "surround", "bassboost", "nightcore", "superslow", "vaporwave", "superspeed".
 * @returns A Promise that resolves when the audio processing is complete.
 */
export default function ListAudioHighest({ query, output, useTor, verbose, filter, }: z.infer<typeof ZodSchema>): Promise<void>;
export {};
//# sourceMappingURL=ListAudioHighest.d.ts.map