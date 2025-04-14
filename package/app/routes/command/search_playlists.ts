import colors from "colors";
import { Client } from "youtubei";
import { z, ZodError } from "zod";
import { EventEmitter } from "events";
import YouTubeID from "../../YouTubeId";
/**
 * Defines the schema for the input parameters used in the `search_playlists` function.
 *
 * @typedef {object} SearchPlaylistsOptions
 * @property {string} playlistLink - The link to search for playlists.
 */
const ZodSchema = z.object({ playlistLink: z.string().min(2) });
/**
 * Represents the structure of a YouTube playlist search result.
 *
 * @interface searchPlaylistsType
 * @property {string} id - The ID of the playlist.
 * @property {string} title - The title of the playlist.
 * @property {number} videoCount - The number of videos in the playlist.
 * @property {string[]} thumbnails - The list of thumbnail URLs for the playlist.
 */
export interface searchPlaylistsType {
  id: string;
  title: string;
  videoCount: number;
  thumbnails: string[];
}
/**
 * Searches for YouTube playlists based on a query string.
 *
 * @function searchPlaylists
 * @param {object} options - The options object containing the search query.
 * @param {string} options.query - The search query.
 * @returns {Promise<searchPlaylistsType[]>} A promise that resolves with a list of playlists matching the search query.
 *
 * @example
 * const playlists = await searchPlaylists({ query: "JavaScript tutorials" });
 */
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
 * Searches for playlists using a given query string, validates the input, and emits the first playlist found.
 *
 * @function search_playlists
 * @param {SearchPlaylistsOptions} options - The options object containing the playlist link to search for.
 * @returns {EventEmitter} The event emitter to handle `data` and `error` events.
 *
 * @example
 * const emitter = search_playlists({ playlistLink: "JavaScript tutorials" });
 * emitter.on("data", data => console.log(data));
 * emitter.on("error", error => console.error(error));
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
    } catch (error: unknown) {
      switch (true) {
        case error instanceof ZodError:
          emitter.emit("error", error.errors);
          break;
        default:
          emitter.emit("error", (error as Error).message);
          break;
      }
    } finally {
      console.log(colors.green("@info:"), "❣️ Thank you for using yt-dlx. Consider 🌟starring the GitHub repo https://github.com/yt-dlx.");
    }
  })().catch(error => emitter.emit("error", error.message));

  return emitter;
}
