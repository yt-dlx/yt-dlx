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
export async function singleVideo({ videoId }: { videoId: string }): Promise<singleVideoType | null> {
  try {
    const youtube = new Client();
    const singleVideo: any = await youtube.getVideo(videoId);
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
    console.error(colors.red("@error: ") + error.message);
    return null;
  }
}
/**
 * Fetches detailed information about a single YouTube video based on the provided video link.
 *
 * @param {Object} options - The parameters for fetching video data.
 * @param {string} options.videoLink - The URL of the YouTube video.
 *
 * @returns {EventEmitter} An EventEmitter object that emits the following events:
 * - "data": Contains the detailed video data including ID, title, view count, duration, etc.
 * - "error": Emits an error message if the video link is incorrect or if fetching the data fails.
 *
 * @example
 * // Example 1: Fetch video data with only the video link
 * YouTubeDLX.Search.Video.Single({ videoLink: "https://www.youtube.com/watch?v=VIDEO_ID" }).on("data", (videoData) => console.log("Video data:", videoData)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 2: Fetch video data with an invalid video link
 * YouTubeDLX.Search.Video.Single({ videoLink: "https://www.youtube.com/watch?v=INVALID_ID" }).on("data", (videoData) => console.log("Video data:", videoData)).on("error", (err) => console.error("Error:", err));
 */
export default async function video_data({ videoLink }: z.infer<typeof ZodSchema>): Promise<EventEmitter<[never]>> {
  const emitter = new EventEmitter();
  return new Promise(async (resolve, reject) => {
    try {
      ZodSchema.parse({ videoLink });
      const vId = await YouTubeID(videoLink);
      if (!vId) {
        emitter.emit("error", colors.red("@error: ") + "incorrect video link");
        return;
      }
      const metaData: singleVideoType | null = await singleVideo({ videoId: vId });
      if (!metaData) {
        emitter.emit("error", colors.red("@error: ") + "Unable to get response!");
        return;
      }
      emitter.emit("data", metaData);
      resolve(emitter);
    } catch (error) {
      if (error instanceof ZodError) emitter.emit("error", error.errors);
      else if (error instanceof Error) emitter.emit("error", error.message);
      else emitter.emit("error", String(error));
      reject(error);
    } finally {
      console.log(colors.green("@info:"), "❣️ Thank you for using yt-dlx. Consider 🌟starring the GitHub repo https://github.com/yt-dlx.");
    }
  });
}
