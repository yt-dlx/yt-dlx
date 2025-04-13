import colors from "colors";
import { z, ZodError } from "zod";
import { EventEmitter } from "events";
import { Client } from "youtubei";

/**
 * Defines the schema for the input parameters used in the `related_videos` function.
 *
 * @typedef {object} RelatedVideosOptions
 * @property {string} videoId - The ID of the YouTube video.
 */
const ZodSchema = z.object({ videoId: z.string().min(2) });

/**
 * Represents the structure of a related video with its details.
 *
 * @interface relatedVideosType
 * @property {string} id - The ID of the related video.
 * @property {string} title - The title of the related video.
 * @property {boolean} isLive - Indicates whether the related video is live.
 * @property {number} duration - The duration of the related video.
 * @property {string} uploadDate - The upload date of the related video.
 * @property {string[]} thumbnails - The list of thumbnail URLs for the related video.
 */
export interface relatedVideosType {
  id: string;
  title: string;
  isLive: boolean;
  duration: number;
  uploadDate: string;
  thumbnails: string[];
}

/**
 * Fetches the related videos for a given YouTube video ID.
 *
 * @function relatedVideos
 * @param {object} options - The options object containing the video ID.
 * @param {string} options.videoId - The ID of the YouTube video.
 * @returns {Promise<relatedVideosType[]>} A promise that resolves with a list of related videos.
 *
 * @example
 * const videos = await relatedVideos({ videoId: "dQw4w9WgXcQ" });
 */
async function relatedVideos({ videoId }: { videoId: string }) {
  try {
    var youtube = new Client();
    var relatedVideos: any = await youtube.getVideo(videoId);
    var result: relatedVideosType[] = relatedVideos.related.items.map((item: any) => ({
      id: item.id,
      title: item.title,
      isLive: item.isLive,
      duration: item.duration,
      uploadDate: item.uploadDate,
      thumbnails: item.thumbnails,
    }));
    return result;
  } catch (error: any) {
    throw new Error(colors.red("@error: ") + error.message);
  }
}

/**
 * Fetches the related videos for a given YouTube video ID and emits the data.
 *
 * @function related_videos
 * @param {RelatedVideosOptions} options - The options object containing the video ID.
 * @returns {EventEmitter} The event emitter to handle `data`, `error` events.
 *
 * @example
 * const emitter = related_videos({ videoId: "dQw4w9WgXcQ" });
 * emitter.on("data", data => console.log(data));
 * emitter.on("error", error => console.error(error));
 */
export default function related_videos({ videoId }: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse({ videoId });

      const videos = await relatedVideos({ videoId });
      if (!videos || videos.length === 0) throw new Error("No related videos found");

      emitter.emit("data", videos);
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
