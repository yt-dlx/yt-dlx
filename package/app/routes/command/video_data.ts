import colors from "colors";
import { z, ZodError } from "zod";
import { Client } from "youtubei";
import { EventEmitter } from "events";
import YouTubeID from "../../utils/YouTubeId";
/**
 * Defines the schema for the input parameters used in the `video_data` function.
 *
 * @typedef {object} VideoDataOptions
 * @property {string} videoLink - The URL of the video.
 */
const ZodSchema = z.object({ videoLink: z.string().min(2) });
/**
 * Represents the structure of a YouTube video with its details.
 *
 * @interface singleVideoType
 * @property {string} id - The ID of the video.
 * @property {string} title - The title of the video.
 * @property {string[]} thumbnails - The list of thumbnail URLs for the video.
 * @property {string} uploadDate - The upload date of the video.
 * @property {string} description - The description of the video.
 * @property {number} duration - The duration of the video in seconds.
 * @property {boolean} isLive - Indicates whether the video is live.
 * @property {number} viewCount - The number of views the video has received.
 * @property {string} channelid - The ID of the channel that uploaded the video.
 * @property {string} channelname - The name of the channel that uploaded the video.
 * @property {string} tags - The tags associated with the video.
 * @property {number} likeCount - The number of likes the video has received.
 */
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
/**
 * Fetches the details of a single YouTube video based on its video ID.
 *
 * @function singleVideo
 * @param {object} options - The options object containing the video ID.
 * @param {string} options.videoId - The ID of the video.
 * @returns {Promise<singleVideoType | null>} A promise that resolves with the video details or null on failure.
 *
 * @example
 * const video = await singleVideo({ videoId: "dQw4w9WgXcQ" });
 */
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
 * Fetches the details of a YouTube video using its URL, validates the input, and emits the video data.
 *
 * @function video_data
 * @param {VideoDataOptions} options - The options object containing the video URL.
 * @returns {EventEmitter} The event emitter to handle `data` and `error` events.
 *
 * @example
 * const emitter = video_data({ videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" });
 * emitter.on("data", data => console.log(data));
 * emitter.on("error", error => console.error(error));
 */
export default function video_data({ videoLink }: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
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
