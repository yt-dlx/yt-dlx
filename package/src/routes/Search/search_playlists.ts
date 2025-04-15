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
async function searchPlaylists({ query }: { query: string }): Promise<searchPlaylistsType[]> {
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
    console.error(colors.red("@error: ") + error.message);
    return [];
  }
}
/**
 * Searches for playlists based on the provided playlist link or query.
 *
 * @param {Object} options - The parameters for searching playlists.
 * @param {string} options.playlistLink - The URL or name of the YouTube playlist.
 *
 * @returns {EventEmitter} An EventEmitter object that emits the following events:
 * - "data": Contains the playlist details like ID, title, video count, and thumbnails.
 * - "error": Emits an error message if no playlists are found, if the provided link is a playlist ID, or if fetching the data fails.
 *
 * @example
 * // Example 1: Search for playlists with only the playlist link
 * YouTubeDLX.Search.Playlist.Multiple({ playlistLink: "Top 10 Music Playlists" }).on("data", (playlistData) => console.log("Playlist data:", playlistData)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 2: Search for playlists with an invalid playlist link
 * YouTubeDLX.Search.Playlist.Multiple({ playlistLink: "INVALID_PLAYLIST_LINK" }).on("data", (playlistData) => console.log("Playlist data:", playlistData)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 3: Search for playlists with a playlist link being the ID of an existing playlist
 * YouTubeDLX.Search.Playlist.Multiple({ playlistLink: "https://www.youtube.com/playlist?list=PLAYLIST_ID" }).on("data", (playlistData) => console.log("Playlist data:", playlistData)).on("error", (err) => console.error("Error:", err));
 */
export default function search_playlists({ playlistLink }: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse({ playlistLink });
      const isID = await YouTubeID(playlistLink);
      if (isID) {
        emitter.emit("error", colors.red("@error: ") + "use playlist_data() for playlist link!");
        return;
      }
      const metaDataArray: searchPlaylistsType[] = await searchPlaylists({ query: playlistLink });
      if (!metaDataArray.length) {
        emitter.emit("error", colors.red("@error: ") + "No playlists found!");
        return;
      }
      const metaData: searchPlaylistsType = metaDataArray[0];
      if (!metaData) {
        emitter.emit("error", colors.red("@error: ") + "Unable to get response!");
        return;
      }
      emitter.emit("data", metaData);
    } catch (error) {
      if (error instanceof ZodError) emitter.emit("error", error.errors);
      else if (error instanceof Error) emitter.emit("error", error.message);
      else emitter.emit("error", String(error));
    } finally {
      console.log(colors.green("@info:"), "❣️ Thank you for using yt-dlx. Consider 🌟starring the GitHub repo https://github.com/yt-dlx.");
    }
  })();
  return emitter;
}
