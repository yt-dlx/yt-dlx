import { z } from "zod";
declare const ZodSchema: z.ZodObject<{
    output: z.ZodOptional<z.ZodString>;
    verbose: z.ZodOptional<z.ZodBoolean>;
    query: z.ZodArray<z.ZodString, "many">;
    filter: z.ZodOptional<z.ZodEnum<["echo", "slow", "speed", "phaser", "flanger", "panning", "reverse", "vibrato", "subboost", "surround", "bassboost", "nightcore", "superslow", "vaporwave", "superspeed"]>>;
}, "strip", z.ZodTypeAny, {
    query: string[];
    filter?: "reverse" | "echo" | "slow" | "speed" | "phaser" | "flanger" | "panning" | "vibrato" | "subboost" | "surround" | "bassboost" | "nightcore" | "superslow" | "vaporwave" | "superspeed" | undefined;
    verbose?: boolean | undefined;
    output?: string | undefined;
}, {
    query: string[];
    filter?: "reverse" | "echo" | "slow" | "speed" | "phaser" | "flanger" | "panning" | "vibrato" | "subboost" | "surround" | "bassboost" | "nightcore" | "superslow" | "vaporwave" | "superspeed" | undefined;
    verbose?: boolean | undefined;
    output?: string | undefined;
}>;
/**
 * Downloads and processes the lowest quality audio from a list of YouTube playlists or video URLs.
 *
 * @param query - An array of YouTube playlist URLs or video URLs.
 * @param output - (optional) The output directory for the processed files.
 * @param verbose - (optional) Whether to log verbose output or not.
 * @param filter - (optional) The audio filter to apply. Available options: "echo", "slow", "speed", "phaser", "flanger", "panning", "reverse", "vibrato", "subboost", "surround", "bassboost", "nightcore", "superslow", "vaporwave", "superspeed".
 * @returns A Promise that resolves when the audio processing is complete.
 */
export default function ListAudioLowest({ query, output, verbose, filter, }: z.infer<typeof ZodSchema>): Promise<void>;
export {};
//# sourceMappingURL=ListAudioLowest.d.ts.map