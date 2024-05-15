import { z } from "zod";
declare const ZodSchema: z.ZodObject<{
    output: z.ZodOptional<z.ZodString>;
    verbose: z.ZodOptional<z.ZodBoolean>;
    onionTor: z.ZodOptional<z.ZodBoolean>;
    query: z.ZodArray<z.ZodString, "many">;
    filter: z.ZodOptional<z.ZodEnum<["invert", "rotate90", "rotate270", "grayscale", "rotate180", "flipVertical", "flipHorizontal"]>>;
}, "strip", z.ZodTypeAny, {
    query: string[];
    onionTor?: boolean | undefined;
    filter?: "invert" | "rotate90" | "rotate270" | "grayscale" | "rotate180" | "flipVertical" | "flipHorizontal" | undefined;
    verbose?: boolean | undefined;
    output?: string | undefined;
}, {
    query: string[];
    onionTor?: boolean | undefined;
    filter?: "invert" | "rotate90" | "rotate270" | "grayscale" | "rotate180" | "flipVertical" | "flipHorizontal" | undefined;
    verbose?: boolean | undefined;
    output?: string | undefined;
}>;
/**
 * Downloads videos from YouTube based on a list of video URLs with the highest available resolution.
 *
 * @param query - An array of YouTube video URLs to process.
 * @param verbose - (optional) Whether to log verbose output or not.
 * @param output - (optional) The output directory for the processed files.
 * @param filter - (optional) The video filter to apply. Available options: "invert", "rotate90", "rotate270", "grayscale", "rotate180", "flipVertical", "flipHorizontal".
 * @param onionTor - (optional) Whether to use Tor for the download or not.
 * @returns A Promise that resolves when all videos have been processed.
 */
export default function ListVideoHighest({ query, verbose, output, filter, onionTor, }: z.infer<typeof ZodSchema>): Promise<void>;
export {};
//# sourceMappingURL=ListVideoHighest.d.ts.map