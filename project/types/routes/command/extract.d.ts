/**
 * Extracts metadata information from a YouTube video.
 *
 * @param query - The YouTube video URL to extract metadata from.
 * @param verbose - (optional) Whether to log verbose output or not.
 * @param onionTor - (optional) Whether to use Tor for the extraction or not.
 * @returns A Promise that resolves with an object containing metadata information about the video.
 */
export default function extract({ query, verbose, onionTor, }: {
    query: string;
    verbose?: boolean;
    onionTor?: boolean;
}): Promise<{
    ipAddress: string;
    AudioLowF: import("../../base/Engine").AudioFormat;
    AudioHighF: import("../../base/Engine").AudioFormat;
    VideoLowF: import("../../base/Engine").VideoFormat;
    VideoHighF: import("../../base/Engine").VideoFormat;
    AudioLowDRC: import("../../base/Engine").AudioFormat[];
    AudioHighDRC: import("../../base/Engine").AudioFormat[];
    AudioLow: import("../../base/Engine").AudioFormat[];
    AudioHigh: import("../../base/Engine").AudioFormat[];
    VideoLowHDR: import("../../base/Engine").VideoFormat[];
    VideoHighHDR: import("../../base/Engine").VideoFormat[];
    VideoLow: import("../../base/Engine").VideoFormat[];
    VideoHigh: import("../../base/Engine").VideoFormat[];
    ManifestLow: import("../../base/Engine").ManifestFormat[];
    ManifestHigh: import("../../base/Engine").ManifestFormat[];
    meta_data: {
        id: string;
        original_url: string;
        webpage_url: string;
        title: string;
        view_count: number;
        like_count: number;
        view_count_formatted: string;
        like_count_formatted: string;
        uploader: string;
        uploader_id: string;
        uploader_url: string;
        thumbnail: string;
        categories: string[];
        time: number;
        duration: {
            hours: number;
            minutes: number;
            seconds: number;
            formatted: string;
        };
        age_limit: number;
        live_status: boolean;
        description: string;
        full_description: string;
        upload_date: string;
        upload_ago: number;
        upload_ago_formatted: {
            years: number;
            months: number;
            days: number;
            formatted: string;
        };
        comment_count: number;
        comment_count_formatted: string;
        channel_id: string;
        channel_name: string;
        channel_url: string;
        channel_follower_count: number;
        channel_follower_count_formatted: string;
    };
} | {
    message: string;
    status: number;
}>;
//# sourceMappingURL=extract.d.ts.map