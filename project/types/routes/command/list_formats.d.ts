/**
 * Lists the available formats and manifest information for a YouTube video.
 *
 * @param query - The YouTube video URL for which to list formats and manifest.
 * @param verbose - (optional) Whether to log verbose output or not.
 * @param useTor - (optional) Whether to use Tor for the download or not.
 * @returns A Promise that resolves after listing the formats and manifest information.
 * @throws An error if unable to get a response from YouTube.
 */
export default function list_formats({ query, verbose, }: {
    query: string;
    verbose?: boolean;
}): Promise<any>;
//# sourceMappingURL=list_formats.d.ts.map