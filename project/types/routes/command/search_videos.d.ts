import { searchVideosType } from "../../web";
/**
 * Searches for YouTube videos based on the query.
 *
 * @param query - The search query for videos.
 * @returns A Promise that resolves with the search results for videos.
 * @throws An error if the input is a video link (use video_data instead) or if unable to get a response.
 */
export default function search_videos({ query, }: {
    query: string;
}): Promise<searchVideosType[]>;
//# sourceMappingURL=search_videos.d.ts.map