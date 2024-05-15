import { z } from "zod";
declare const ZodSchema: z.ZodObject<{
    output: z.ZodOptional<z.ZodString>;
    verbose: z.ZodOptional<z.ZodBoolean>;
    onionTor: z.ZodOptional<z.ZodBoolean>;
    query: z.ZodArray<z.ZodString, "many">;
    resolution: z.ZodEnum<["144p", "240p", "360p", "480p", "720p", "1080p", "1440p", "2160p", "3072p", "4320p", "6480p", "8640p", "12000p"]>;
    filter: z.ZodOptional<z.ZodEnum<["invert", "rotate90", "rotate270", "grayscale", "rotate180", "flipVertical", "flipHorizontal"]>>;
}, "strip", z.ZodTypeAny, {
    query: string[];
    resolution: "144p" | "240p" | "360p" | "480p" | "720p" | "1080p" | "1440p" | "2160p" | "3072p" | "4320p" | "6480p" | "8640p" | "12000p";
    onionTor?: boolean | undefined;
    filter?: "invert" | "rotate90" | "rotate270" | "grayscale" | "rotate180" | "flipVertical" | "flipHorizontal" | undefined;
    verbose?: boolean | undefined;
    output?: string | undefined;
}, {
    query: string[];
    resolution: "144p" | "240p" | "360p" | "480p" | "720p" | "1080p" | "1440p" | "2160p" | "3072p" | "4320p" | "6480p" | "8640p" | "12000p";
    onionTor?: boolean | undefined;
    filter?: "invert" | "rotate90" | "rotate270" | "grayscale" | "rotate180" | "flipVertical" | "flipHorizontal" | undefined;
    verbose?: boolean | undefined;
    output?: string | undefined;
}>;
/**
 * Downloads and processes audio and video from a list of YouTube playlists or video URLs with customization options.
 *
 * @param query - An array of YouTube playlist URLs or video URLs.
 * @param resolution - The desired video resolution. Available options: "144p", "240p", "360p", "480p", "720p", "1080p", "1440p", "2160p", "3072p", "4320p", "6480p", "8640p", "12000p".
 * @param verbose - (optional) Whether to log verbose output or not.
 * @param output - (optional) The output directory for the processed files.
 * @param filter - (optional) The video filter to apply. Available options: "invert", "rotate90", "rotate270", "grayscale", "rotate180", "flipVertical", "flipHorizontal".
 * @param onionTor - (optional) Whether to use Tor for the download or not.
 * @returns A Promise that resolves when the audio and video processing is complete.
 */
export default function ListAudioVideoCustom({ query, resolution, verbose, output, filter, onionTor, }: z.infer<typeof ZodSchema>): Promise<void>;
export {};
//# sourceMappingURL=ListAudioVideoCustom.d.ts.map