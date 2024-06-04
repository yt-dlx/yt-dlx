import { z } from "zod";
declare var ZodSchema: z.ZodObject<{
    output: z.ZodOptional<z.ZodString>;
    useTor: z.ZodOptional<z.ZodBoolean>;
    verbose: z.ZodOptional<z.ZodBoolean>;
    query: z.ZodArray<z.ZodString, "many">;
    resolution: z.ZodEnum<["high", "medium", "low", "ultralow"]>;
    filter: z.ZodOptional<z.ZodEnum<["echo", "slow", "speed", "phaser", "flanger", "panning", "reverse", "vibrato", "subboost", "surround", "bassboost", "nightcore", "superslow", "vaporwave", "superspeed"]>>;
}, "strip", z.ZodTypeAny, {
    query: string[];
    resolution: "high" | "medium" | "low" | "ultralow";
    useTor?: boolean | undefined;
    verbose?: boolean | undefined;
    output?: string | undefined;
    filter?: "echo" | "slow" | "speed" | "phaser" | "flanger" | "panning" | "reverse" | "vibrato" | "subboost" | "surround" | "bassboost" | "nightcore" | "superslow" | "vaporwave" | "superspeed" | undefined;
}, {
    query: string[];
    resolution: "high" | "medium" | "low" | "ultralow";
    useTor?: boolean | undefined;
    verbose?: boolean | undefined;
    output?: string | undefined;
    filter?: "echo" | "slow" | "speed" | "phaser" | "flanger" | "panning" | "reverse" | "vibrato" | "subboost" | "surround" | "bassboost" | "nightcore" | "superslow" | "vaporwave" | "superspeed" | undefined;
}>;
/**
 * Customizes audio from a list of YouTube playlists or video URLs.
 *
 * @param query - An array of YouTube playlist URLs or video URLs.
 * @param output - (optional) The output directory for the processed files.
 * @param filter - (optional) The audio filter to apply. Available options: "echo", "slow", "speed", "phaser", "flanger", "panning", "reverse", "vibrato", "subboost", "surround", "bassboost", "nightcore", "superslow", "vaporwave", "superspeed".
 * @param verbose - (optional) Whether to log verbose output or not.
 * @param useTor - (optional) Whether to use Tor for the download or not.
 * @param resolution - The desired audio resolution. Available options: "high", "medium", "low", "ultralow".
 * @returns A Promise that resolves when the audio processing is complete.
 */
export default function ListAudioCustom({ query, output, useTor, filter, verbose, resolution, }: z.infer<typeof ZodSchema>): Promise<void>;
export {};
//# sourceMappingURL=ListAudioCustom.d.ts.map