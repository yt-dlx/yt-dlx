import colors from "colors";
import { z, ZodError } from "zod";
import { Client } from "youtubei";
import { EventEmitter } from "events";
import YouTubeID from "../../YouTubeId";
const ZodSchema = z.object({ playlistLink: z.string().min(2) });
export interface playlistVideosType {
  id: string;
  title: string;
  videoCount: number;
  result: { id: string; title: string; isLive: boolean; duration: number; thumbnails: string[] };
}
async function playlistVideos({ playlistId }: { playlistId: string }) {
  try {
    var youtube = new Client();
    var playlistVideos: any = await youtube.getPlaylist(playlistId);
    var result = playlistVideos.videos.items.map((item: any) => ({ id: item.id, title: item.title, isLive: item.isLive, duration: item.duration, thumbnails: item.thumbnails }));
    return { id: playlistVideos.id, title: playlistVideos.title, videoCount: playlistVideos.videoCount, result };
  } catch (error: any) {
    throw new Error(colors.red("@error: ") + error.message);
  }
}
export default function playlist_data({ playlistLink }: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse({ playlistLink });
      const playlistId = await YouTubeID(playlistLink);
      if (!playlistId) throw new Error(colors.red("@error: ") + "incorrect playlist link");
      const metaData: playlistVideosType = await playlistVideos({ playlistId });
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
