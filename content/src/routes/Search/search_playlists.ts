import colors from "colors";
import { Client } from "youtubei";
import { z, ZodError } from "zod";
import { EventEmitter } from "events";
import YouTubeID from "../../utils/YouTubeId";
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
 * Searches for Tube (e.g., YouTube) playlists based on a given query. Note that this function uses the input as a search term, not a direct playlist link. For fetching data from a specific playlist link, use `playlist_data()`.
 *
 * @param {object} options - An object containing the necessary options.
 * @param {string} options.playlistLink - The search query to find playlists.
 *
 * @returns {EventEmitter} An EventEmitter that emits the following events:
 * - "data": Emitted with the first playlist object found matching the search query. This object contains details like the playlist ID, title, video count, and thumbnails.
 * - "error": Emitted if there is an error during the process, such as no playlists found for the query or if the input looks like a playlist link (in which case it suggests using `playlist_data()`).
 *
 * @example
 * // Search for YouTube playlists with the query "workout music"
 * YouTubeDLX.SearchPlaylists({ playlistLink: "workout music" })
 * .on("data", (playlist) => console.log("Found playlist:", playlist))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Search for playlists related to "cooking recipes"
 * YouTubeDLX.SearchPlaylists({ playlistLink: "cooking recipes" })
 * .on("data", (playlist) => console.log("Found playlist:", playlist))
 * .on("error", (err) => console.error("Error:", err));
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
