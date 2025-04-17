import colors from "colors";
import { Client } from "youtubei";
import { z, ZodError } from "zod";
import { EventEmitter } from "events";
import YouTubeID from "../../../utils/YouTubeId";
const ZodSchema = z.object({ playlistLink: z.string().min(2) });
export interface searchPlaylistsType {
  id: string;
  title: string;
  videoCount: number;
  thumbnails: string[];
}
async function searchPlaylists({ query }: { query: string }, emitter: EventEmitter): Promise<searchPlaylistsType[]> {
  try {
    const youtube = new Client();
    const searchPlaylists = await youtube.search(query, { type: "playlist" });
    const result: searchPlaylistsType[] = searchPlaylists.items.map((item: any) => ({
      id: item.id,
      title: item.title,
      videoCount: item.videoCount,
      thumbnails: item.thumbnails,
    }));
    return result;
  } catch (error: any) {
    emitter.emit("error", `${colors.red("@error: ")} ${error.message}`);
    return [];
  }
}
/**
 * @shortdesc Searches for YouTube playlists using a query.
 *
 * @description This function allows you to search for YouTube playlists by providing a search query. It returns the first playlist found that matches the query, containing information such as its ID, title, the number of videos it contains, and thumbnails. Please note that this function is for searching playlists and not for fetching detailed information from a specific playlist URL. If you have a direct playlist link, use the `playlist_data()` function instead.
 *
 * @param {object} options - An object containing the necessary options.
 * @param {string} options.playlistLink - The search query to find playlists. **Required**.
 *
 * @returns {EventEmitter} An EventEmitter that emits the following events:
 * - `"data"`: Emitted with the first playlist object (`searchPlaylistsType`) found matching the search query. This object contains details like the playlist ID, title, video count, and thumbnails.
 * - `"error"`: Emitted if there is an error during the process. This can include scenarios where no playlists are found for the query, if the input looks like a direct playlist link (in which case it will suggest using `playlist_data()`), or other unexpected errors.
 *
 * @example
 * // Define the structure for searchPlaylistsType
 * interface searchPlaylistsType {
 * id: string;
 * title: string;
 * videoCount: number;
 * thumbnails: string[];
 * }
 *
 * @example
 * // Search for playlists with the query "workout routines"
 * YouTubeDLX.search_playlists({ playlistLink: "workout routines" })
 * .on("data", (playlist: searchPlaylistsType) => console.log("Found Playlist:", playlist))
 * .on("error", (error) => console.error("Error:", error));
 */
export default function search_playlists({ playlistLink }: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse({ playlistLink });
      const isID = await YouTubeID(playlistLink);
      if (isID) {
        emitter.emit("error", `${colors.red("@error: ")} Use playlist_data() for playlist link!`);
        return;
      }
      const metaDataArray: searchPlaylistsType[] = await searchPlaylists({ query: playlistLink }, emitter);
      if (!metaDataArray.length) {
        emitter.emit("error", `${colors.red("@error: ")} No playlists found for the provided query.`);
        return;
      }
      const metaData: searchPlaylistsType = metaDataArray[0];
      if (!metaData) {
        emitter.emit("error", `${colors.red("@error: ")} Unable to get playlist data.`);
        return;
      }
      emitter.emit("data", metaData);
    } catch (error) {
      if (error instanceof ZodError) emitter.emit("error", `${colors.red("@error:")} Argument validation failed: ${error.errors.map(e => `${e.path.join(".")}: ${e.message}`).join(", ")}`);
      else if (error instanceof Error) emitter.emit("error", `${colors.red("@error:")} ${error.message}`);
      else emitter.emit("error", `${colors.red("@error:")} An unexpected error occurred: ${String(error)}`);
    } finally {
      console.log(colors.green("@info:"), "❣️ Thank you for using yt-dlx. Consider 🌟starring the GitHub repo https://github.com/yt-dlx.");
    }
  })();
  return emitter;
}
