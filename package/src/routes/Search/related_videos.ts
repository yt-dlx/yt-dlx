import colors from "colors";
import { z, ZodError } from "zod";
import { Client } from "youtubei";
import { EventEmitter } from "events";
const ZodSchema = z.object({ videoId: z.string().min(2) });
export interface relatedVideosType {
  id: string;
  title: string;
  isLive: boolean;
  duration: number;
  uploadDate: string;
  thumbnails: string[];
}
async function relatedVideos({ videoId }: { videoId: string }): Promise<relatedVideosType[] | null> {
  try {
    const youtube = new Client();
    const relatedVideos: any = await youtube.getVideo(videoId);
    const result: relatedVideosType[] = relatedVideos.related.items.map((item: any) => ({
      id: item.id,
      title: item.title,
      isLive: item.isLive,
      duration: item.duration,
      uploadDate: item.uploadDate,
      thumbnails: item.thumbnails,
    }));
    return result;
  } catch (error: any) {
    return null;
  }
}
/**
 * Fetches related videos for a given video based on the provided video ID.
 *
 * @param {Object} options - The parameters for fetching related videos.
 * @param {string} options.videoId - The ID of the YouTube video to fetch related videos for.
 *
 * @returns {EventEmitter} An EventEmitter object that emits the following events:
 * - "data": Contains the list of related videos with details like video ID, title, duration, upload date, and thumbnails.
 * - "error": Emits an error message if no related videos are found or if fetching the data fails.
 *
 * @example
 * // Example 1: Fetch related videos with only the video ID
 * YouTubeDLX.Search.Video.Related({ videoId: "dQw4w9WgXcQ" }).on("data", (relatedVideos) => console.log("Related videos:", relatedVideos)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 2: Fetch related videos with an invalid video ID
 * YouTubeDLX.Search.Video.Related({ videoId: "INVALID_VIDEO_ID" }).on("data", (relatedVideos) => console.log("Related videos:", relatedVideos)).on("error", (err) => console.error("Error:", err));
 */
export default function related_videos({ videoId }: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse({ videoId });
      const videos = await relatedVideos({ videoId });
      if (!videos || videos.length === 0) {
        emitter.emit("error", "No related videos found");
        return;
      }
      emitter.emit("data", videos);
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
