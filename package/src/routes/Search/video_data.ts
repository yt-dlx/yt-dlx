import colors from "colors";
import { z, ZodError } from "zod";
import { Client } from "youtubei";
import { EventEmitter } from "events";
import YouTubeID from "../../utils/YouTubeId";
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
export async function singleVideo({ videoId }: { videoId: string }, emitter: EventEmitter): Promise<singleVideoType | null> {
  try {
    const youtube = new Client();
    const singleVideoData: any = await youtube.getVideo(videoId);
    if (!singleVideoData) {
      emitter.emit("error", `${colors.red("@error: ")} Unable to fetch video data.`);
      return null;
    }
    return {
      id: singleVideoData.id,
      title: singleVideoData.title,
      thumbnails: singleVideoData.thumbnails,
      uploadDate: singleVideoData.uploadDate,
      description: singleVideoData.description,
      duration: singleVideoData.duration,
      isLive: singleVideoData.isLiveContent,
      viewCount: singleVideoData.viewCount,
      channelid: singleVideoData.channel?.id,
      channelname: singleVideoData.channel?.name,
      tags: singleVideoData.tags,
      likeCount: singleVideoData.likeCount,
    };
  } catch (error: any) {
    emitter.emit("error", `${colors.red("@error: ")} ${error.message}`);
    return null;
  }
}
export default function video_data({ videoLink }: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse({ videoLink });
      const vId = await YouTubeID(videoLink);
      if (!vId) {
        emitter.emit("error", `${colors.red("@error: ")} Incorrect video link provided.`);
        return;
      }
      const metaData: singleVideoType | null = await singleVideo({ videoId: vId }, emitter);
      if (!metaData) {
        emitter.emit("error", `${colors.red("@error: ")} Unable to retrieve video information.`);
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
