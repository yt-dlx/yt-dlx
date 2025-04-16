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
