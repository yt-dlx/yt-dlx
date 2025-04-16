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
