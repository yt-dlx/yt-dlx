/**
 * Extracts metadata information from a YouTube video.
 *
 * @param query - The YouTube video URL to extract metadata from.
 * @param verbose - (optional) Whether to log verbose output or not.
 * @param useTor - (optional) Whether to use Tor for the download or not.
 * @returns A Promise that resolves with an object containing metadata information about the video.
 */
export default function extract({ query, verbose, }: {
    query: string;
    verbose?: boolean;
}): Promise<{
    AudioLowF: import("../../interfaces/AudioFormat").default;
    AudioHighF: import("../../interfaces/AudioFormat").default;
    VideoLowF: import("../../interfaces/VideoFormat").default;
    VideoHighF: import("../../interfaces/VideoFormat").default;
    AudioLowDRC: import("../../interfaces/AudioFormat").default[];
    AudioHighDRC: import("../../interfaces/AudioFormat").default[];
    AudioLow: import("../../interfaces/AudioFormat").default[];
    AudioHigh: import("../../interfaces/AudioFormat").default[];
    VideoLowHDR: import("../../interfaces/VideoFormat").default[];
    VideoHighHDR: import("../../interfaces/VideoFormat").default[];
    VideoLow: import("../../interfaces/VideoFormat").default[];
    VideoHigh: import("../../interfaces/VideoFormat").default[];
    ManifestLow: import("../../interfaces/ManifestFormat").default[];
    ManifestHigh: import("../../interfaces/ManifestFormat").default[];
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