import { z } from "zod";
declare const ZodSchema: z.ZodObject<{
    output: z.ZodOptional<z.ZodString>;
    useTor: z.ZodOptional<z.ZodBoolean>;
    verbose: z.ZodOptional<z.ZodBoolean>;
    query: z.ZodArray<z.ZodString, "many">;
    resolution: z.ZodEnum<["144p", "240p", "360p", "480p", "720p", "1080p", "1440p", "2160p", "3072p", "4320p", "6480p", "8640p", "12000p"]>;
    filter: z.ZodOptional<z.ZodEnum<["invert", "rotate90", "rotate270", "grayscale", "rotate180", "flipVertical", "flipHorizontal"]>>;
}, "strip", z.ZodTypeAny, {
    query: string[];
    resolution: "144p" | "240p" | "360p" | "480p" | "720p" | "1080p" | "1440p" | "2160p" | "3072p" | "4320p" | "6480p" | "8640p" | "12000p";
    useTor?: boolean | undefined;
    verbose?: boolean | undefined;
    output?: string | undefined;
    filter?: "invert" | "rotate90" | "rotate270" | "grayscale" | "rotate180" | "flipVertical" | "flipHorizontal" | undefined;
}, {
    query: string[];
    resolution: "144p" | "240p" | "360p" | "480p" | "720p" | "1080p" | "1440p" | "2160p" | "3072p" | "4320p" | "6480p" | "8640p" | "12000p";
    useTor?: boolean | undefined;
    verbose?: boolean | undefined;
    output?: string | undefined;
    filter?: "invert" | "rotate90" | "rotate270" | "grayscale" | "rotate180" | "flipVertical" | "flipHorizontal" | undefined;
}>;
/**
 * Downloads videos from YouTube based on a list of video URLs with the lowest available resolution.
 *
 * @param query - An array of YouTube video URLs to process.
 * @param resolution - The desired resolution of the downloaded videos.
 * @param verbose - (optional) Whether to log verbose output or not.
 * @param output - (optional) The output directory for the processed files.
 * @param filter - (optional) The video filter to apply. Available options: "invert", "rotate90", "rotate270", "grayscale", "rotate180", "flipVertical", "flipHorizontal".
 * @returns A Promise that resolves when all videos have been processed.
 */
export default function ListVideoCustom({ query, resolution, verbose, output, useTor, filter, }: z.infer<typeof ZodSchema>): Promise<void>;
export {};
//# sourceMappingURL=ListVideoCustom.d.ts.map