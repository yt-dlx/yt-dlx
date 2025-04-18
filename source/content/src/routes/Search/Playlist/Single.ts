import colors from "colors";
import { z, ZodError } from "zod";
import { Client } from "youtubei";
import { EventEmitter } from "events";
import YouTubeID from "../../../utils/YouTubeId";
const ZodSchema = z.object({ playlistLink: z.string().min(2) });
export interface playlistVideosType {
  id: string;
  title: string;
  videoCount: number;
  result: { id: string; title: string; isLive: boolean; duration: number; thumbnails: string[] }[];
}
async function playlistVideos({ playlistId }: { playlistId: string }, emitter: EventEmitter): Promise<playlistVideosType | null> {
  try {
    const youtube = new Client();
    const playlistVideosData: any = await youtube.getPlaylist(playlistId);
    if (!playlistVideosData) {
      emitter.emit("error", `${colors.red("@error: ")} Unable to fetch playlist data.`);
      return null;
    }
    const result = playlistVideosData.videos.items.map((item: any) => ({ id: item.id, title: item.title, isLive: item.isLive, duration: item.duration, thumbnails: item.thumbnails }));
    return { id: playlistVideosData.id, title: playlistVideosData.title, videoCount: playlistVideosData.videoCount, result };
  } catch (error: any) {
    emitter.emit("error", `${colors.red("@error: ")} ${error.message}`);
    return null;
  }
}
/**
 * @shortdesc Retrieves detailed information about a YouTube playlist, including its videos.
 *
 * @description This function fetches comprehensive data for a given YouTube playlist by providing its URL or ID. It returns details about the playlist, such as its ID, title, video count, and a list of videos with their respective IDs, titles, live status, durations, and thumbnails. This function is designed to work with direct playlist links or IDs, unlike `search_playlists()`, which is used for searching playlists by query.
 *
 * @param {object} options - An object containing the necessary options.
 * @param {string} options.playlistLink - The URL or ID of the YouTube playlist. **Required**.
 *
 * @returns {EventEmitter} An EventEmitter that emits the following events:
 * - `"data"`: Emitted with the playlist data object (`playlistVideosType`) containing the playlist's ID, title, video count, and an array of video details. An example of this object is:
 * ```typescript
 * {
 *   id: string;
 *   title: string;
 *   videoCount: number;
 *   result: { id: string; title: string; isLive: boolean; duration: number; thumbnails: string[] }[];
 * }
 * ```
 * - `"error"`: Emitted if there is an error during the process. This can include scenarios such as an invalid playlist link, failure to retrieve playlist data, or unexpected errors during processing.
 *
 * @example
 * // 1. Fetch data for a specific playlist using a playlist URL
 * YouTubeDLX.Search.Playlist.Single({ playlistLink: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9g8eVEzV8j3j2eZOxn2xo3y" })
 *   .on("data", (data) => console.log("Playlist data:", data))
 *   .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 2. Fetch data for a playlist using a playlist ID
 * YouTubeDLX.Search.Playlist.Single({ playlistLink: "PL4cUxeGkcC9g8eVEzV8j3j2eZOxn2xo3y" })
 *   .on("data", (data) => console.log("Playlist data:", data))
 *   .on("error", (error) => console.error("Error:", error));
 */
export default function playlist_data({ playlistLink }: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse({ playlistLink });
      const playlistId = await YouTubeID(playlistLink);
      if (!playlistId) {
        emitter.emit("error", `${colors.red("@error: ")} Incorrect playlist link provided.`);
        return;
      }
      const metaData: playlistVideosType | null = await playlistVideos({ playlistId }, emitter);
      if (!metaData) {
        emitter.emit("error", `${colors.red("@error: ")} Unable to retrieve playlist information.`);
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
