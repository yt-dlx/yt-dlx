import { playlistVideosType } from "../../web";
/**
 * Extracts metadata for videos in a YouTube playlist.
 *
 * @param query - The YouTube playlist URL or ID for which to extract metadata.
 * @returns A Promise that resolves with the metadata of videos in the playlist.
 * @throws An error if the playlist link is incorrect or if unable to get a response.
 */
export default function playlist_data({ query, }: {
    query: string;
}): Promise<playlistVideosType>;
//# sourceMappingURL=playlist_data.d.ts.map