import { z } from "zod";
declare const ZodSchema: z.ZodObject<{
    output: z.ZodOptional<z.ZodString>;
    verbose: z.ZodOptional<z.ZodBoolean>;
    query: z.ZodArray<z.ZodString, "many">;
    resolution: z.ZodEnum<["high", "medium", "low", "ultralow"]>;
    filter: z.ZodOptional<z.ZodEnum<["echo", "slow", "speed", "phaser", "flanger", "panning", "reverse", "vibrato", "subboost", "surround", "bassboost", "nightcore", "superslow", "vaporwave", "superspeed"]>>;
}, "strip", z.ZodTypeAny, {
    query: string[];
    resolution: "high" | "medium" | "low" | "ultralow";
    filter?: "reverse" | "echo" | "slow" | "speed" | "phaser" | "flanger" | "panning" | "vibrato" | "subboost" | "surround" | "bassboost" | "nightcore" | "superslow" | "vaporwave" | "superspeed" | undefined;
    verbose?: boolean | undefined;
    output?: string | undefined;
}, {
    query: string[];
    resolution: "high" | "medium" | "low" | "ultralow";
    filter?: "reverse" | "echo" | "slow" | "speed" | "phaser" | "flanger" | "panning" | "vibrato" | "subboost" | "surround" | "bassboost" | "nightcore" | "superslow" | "vaporwave" | "superspeed" | undefined;
    verbose?: boolean | undefined;
    output?: string | undefined;
}>;
/**
 * Customizes audio from a list of YouTube playlists or video URLs.
 *
 * @param query - An array of YouTube playlist URLs or video URLs.
 * @param output - (optional) The output directory for the processed files.
 * @param filter - (optional) The audio filter to apply. Available options: "echo", "slow", "speed", "phaser", "flanger", "panning", "reverse", "vibrato", "subboost", "surround", "bassboost", "nightcore", "superslow", "vaporwave", "superspeed".
 * @param verbose - (optional) Whether to log verbose output or not.
 * @param resolution - The desired audio resolution. Available options: "high", "medium", "low", "ultralow".
 * @returns A Promise that resolves when the audio processing is complete.
 */
export default function ListAudioCustom({ query, output, filter, verbose, resolution, }: z.infer<typeof ZodSchema>): Promise<void>;
export {};
//# sourceMappingURL=ListAudioCustom.d.ts.map