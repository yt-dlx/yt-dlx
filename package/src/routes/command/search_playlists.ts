import colors from "colors";
import { z, ZodError } from "zod";
import { EventEmitter } from "events";
import YouTubeID from "../../web/YouTubeId";
import web, { searchPlaylistsType } from "../../web";
const ZodSchema = z.object({ playlistLink: z.string().min(2) });
export default function search_playlists({ playlistLink }: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse({ playlistLink });
      const isID = await YouTubeID(playlistLink);
      if (isID) throw new Error(colors.red("@error: ") + "use playlist_data() for playlist link!");
      const metaDataArray: searchPlaylistsType[] = await web.searchPlaylists({ query: playlistLink });
      if (!metaDataArray.length) throw new Error(colors.red("@error: ") + "No playlists found!");
      const metaData: searchPlaylistsType = metaDataArray[0];
      if (!metaData) throw new Error(colors.red("@error: ") + "Unable to get response!");
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
