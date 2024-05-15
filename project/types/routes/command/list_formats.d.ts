/**
 * Lists the available formats and manifest information for a YouTube video.
 *
 * @param query - The YouTube video URL for which to list formats and manifest.
 * @param verbose - (optional) Whether to log verbose output or not.
 * @param onionTor - (optional) Whether to use Tor for the extraction or not.
 * @returns A Promise that resolves after listing the formats and manifest information.
 * @throws An error if unable to get a response from YouTube.
 */
export default function list_formats({ query, verbose, onionTor, }: {
    query: string;
    verbose?: boolean;
    onionTor?: boolean;
}): Promise<any>;
//# sourceMappingURL=list_formats.d.ts.map