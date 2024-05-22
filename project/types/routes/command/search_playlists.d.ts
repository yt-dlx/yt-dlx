import { searchPlaylistsType } from "../../web";
/**
 * Searches for YouTube playlists based on the query.
 *
 * @param query - The search query for playlists.
 * @returns A Promise that resolves with the search results for playlists.
 * @throws An error if the input is a playlist link (use playlist_data instead) or if unable to get a response.
 */
export default function search_playlists({ query, }: {
    query: string;
}): Promise<searchPlaylistsType[]>;
//# sourceMappingURL=search_playlists.d.ts.map