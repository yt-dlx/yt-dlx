import colors from "colors";
import { z, ZodError } from "zod";
import { Client } from "youtubei";
import { EventEmitter } from "events";
import YouTubeID from "../../YouTubeId";
const ZodSchema = z.object({ query: z.string().min(2) });
export interface searchVideosType {
  id: string;
  title: string;
  isLive: boolean;
  duration: number;
  viewCount: number;
  uploadDate: string;
  channelid: string;
  channelname: string;
  description: string;
  thumbnails: string[];
}
async function searchVideos({ query }: { query: string }) {
  try {
    var youtube = new Client();
    var searchVideos = await youtube.search(query, { type: "video" });
    var result: searchVideosType[] = searchVideos.items.map((item: any) => ({
      id: item.id,
      title: item.title,
      isLive: item.isLive,
      duration: item.duration,
      viewCount: item.viewCount,
      channelid: item.channel.id,
      thumbnails: item.thumbnails,
      uploadDate: item.uploadDate,
      description: item.description,
      channelname: item.channel.name,
    }));
    return result;
  } catch (error: any) {
    throw new Error(colors.red("@error: ") + error.message);
  }
}
export default function search_videos({ query }: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse({ query });
      const isID = await YouTubeID(query);
      if (isID) throw new Error(colors.red("@error: ") + "use video_data() for video link!");
      const metaData: searchVideosType[] = await searchVideos({ query });
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
