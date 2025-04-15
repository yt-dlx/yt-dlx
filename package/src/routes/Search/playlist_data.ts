import colors from "colors";
import { z, ZodError } from "zod";
import { Client } from "youtubei";
import { EventEmitter } from "events";
import YouTubeID from "../../utils/YouTubeId";
const ZodSchema = z.object({ playlistLink: z.string().min(2) });
export interface playlistVideosType {
  id: string;
  title: string;
  videoCount: number;
  result: { id: string; title: string; isLive: boolean; duration: number; thumbnails: string[] };
}
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
 * Fetches playlist data from YouTube based on the provided playlist link.
 *
 * @param {Object} options - The parameters for fetching playlist data.
 * @param {string} options.playlistLink - The URL of the YouTube playlist.
 *
 * @returns {EventEmitter} An EventEmitter object that emits the following events:
 * - "data": Contains the playlist metadata, including video details like ID, title, duration, and more.
 * - "error": Emits an error message if the playlist is invalid or if fetching the data fails.
 *
 * @example
 * // Example 1: Fetch playlist data with only the playlist link
 * YouTubeDLX.Search.Playlist.Single({ playlistLink: "https://www.youtube.com/playlist?list=PLw-VjHDlEOgs6k8xQ6sB9zAqS6vhJh2tV" }).on("data", (playlistData) => console.log("Playlist data:", playlistData)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 2: Fetch playlist data with an invalid playlist link
 * YouTubeDLX.Search.Playlist.Single({ playlistLink: "https://www.youtube.com/playlist?list=INVALID" }).on("data", (playlistData) => console.log("Playlist data:", playlistData)).on("error", (err) => console.error("Error:", err));
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
