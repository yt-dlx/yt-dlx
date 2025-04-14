import colors from "colors";
import { z, ZodError } from "zod";
import { Client } from "youtubei";
import { EventEmitter } from "events";
import YouTubeID from "../../utils/YouTubeId";
/**
 * Defines the schema for the input parameters used in the `playlist_data` function.
 *
 * @typedef {object} PlaylistDataOptions
 * @property {string} playlistLink - The URL of the YouTube playlist.
 */
const ZodSchema = z.object({ playlistLink: z.string().min(2) });
/**
 * Represents the structure of a playlist with its videos.
 *
 * @interface playlistVideosType
 * @property {string} id - The ID of the playlist.
 * @property {string} title - The title of the playlist.
 * @property {number} videoCount - The total number of videos in the playlist.
 * @property {Array<{ id: string, title: string, isLive: boolean, duration: number, thumbnails: string[] }>} result - The list of videos in the playlist.
 */
export interface playlistVideosType {
  id: string;
  title: string;
  videoCount: number;
  result: { id: string; title: string; isLive: boolean; duration: number; thumbnails: string[] };
}
/**
 * Fetches the details of all videos in a YouTube playlist.
 *
 * @function playlistVideos
 * @param {object} options - The options object containing the playlist ID.
 * @param {string} options.playlistId - The ID of the playlist.
 * @returns {Promise<playlistVideosType | null>} A promise that resolves with the playlist details and its videos, or null on error.
 *
 * @example
 * const playlist = await playlistVideos({ playlistId: "PL1O3R10uGQ2jpXwhQID8IhX3" });
 */
async function playlistVideos({ playlistId }: { playlistId: string }): Promise<playlistVideosType | null> {
  try {
    const youtube = new Client();
    const playlistVideos: any = await youtube.getPlaylist(playlistId);
    const result = playlistVideos.videos.items.map((item: any) => ({
      id: item.id,
      title: item.title,
      isLive: item.isLive,
      duration: item.duration,
      thumbnails: item.thumbnails,
    }));
    return { id: playlistVideos.id, title: playlistVideos.title, videoCount: playlistVideos.videoCount, result };
  } catch (error: any) {
    console.error(colors.red("@error: ") + error.message);
    return null;
  }
}
/**
 * Fetches playlist data from YouTube based on the playlist URL and emits the formatted data.
 *
 * @function playlist_data
 * @param {PlaylistDataOptions} options - The options object containing the playlist URL.
 * @returns {EventEmitter} The event emitter to handle `data` and `error` events.
 *
 * @example
 * const emitter = playlist_data({ playlistLink: "https://www.youtube.com/playlist?list=..." });
 * emitter.on("data", data => console.log(data));
 * emitter.on("error", error => console.error(error));
 */
export default function playlist_data({ playlistLink }: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse({ playlistLink });
      const playlistId = await YouTubeID(playlistLink);
      if (!playlistId) {
        emitter.emit("error", colors.red("@error: ") + "incorrect playlist link");
        return;
      }
      const metaData: playlistVideosType | null = await playlistVideos({ playlistId });
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
