import { singleVideoType } from "../../web";
/**
 * Fetches data for a single YouTube video based on the video ID or link.
 *
 * @param query - The video ID or link.
 * @returns A Promise that resolves with the metadata for the single video.
 * @throws An error if the input is an incorrect video link or if unable to get a response.
 */
export default function video_data({ query, }: {
    query: string;
}): Promise<singleVideoType>;
//# sourceMappingURL=video_data.d.ts.map