import colors from "colors";
import { Client } from "youtubei";
import { z, ZodError } from "zod";
import { EventEmitter } from "events";
import YouTubeID from "../../YouTubeId";
const ZodSchema = z.object({ videoLink: z.string().min(2) });
export interface singleVideoType {
  id: string;
  title: string;
  thumbnails: string[];
  uploadDate: string;
  description: string;
  duration: number;
  isLive: boolean;
  viewCount: number;
  channelid: string;
  channelname: string;
  tags: string;
  likeCount: number;
}
async function singleVideo({ videoId }: { videoId: string }) {
  try {
    var youtube = new Client();
    var singleVideo: any = await youtube.getVideo(videoId);
    return {
      id: singleVideo.id,
      title: singleVideo.title,
      thumbnails: singleVideo.thumbnails,
      uploadDate: singleVideo.uploadDate,
      description: singleVideo.description,
      duration: singleVideo.duration,
      isLive: singleVideo.isLiveContent,
      viewCount: singleVideo.viewCount,
      channelid: singleVideo.channel.id,
      channelname: singleVideo.channel.name,
      tags: singleVideo.tags,
      likeCount: singleVideo.likeCount,
    };
  } catch (error: any) {
    throw new Error(colors.red("@error: ") + error.message);
  }
}
export default function video_data({ videoLink }: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse({ videoLink });
      const vId = await YouTubeID(videoLink);
      if (!vId) throw new Error(colors.red("@error: ") + "incorrect video link");
      const metaData: singleVideoType = await singleVideo({ videoId: vId });
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
