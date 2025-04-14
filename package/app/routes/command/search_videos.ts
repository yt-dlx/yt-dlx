import colors from "colors";
import { z, ZodError } from "zod";
import { Client } from "youtubei";
import { EventEmitter } from "events";
import YouTubeID from "../../utils/YouTubeId";
/**
 * Defines the schema for the input parameters used in the `search_videos` function.
 *
 * @typedef {object} SearchVideosOptions
 * @property {string} query - The search query to find videos on YouTube.
 */
const ZodSchema = z.object({ query: z.string().min(2) });
/**
 * Represents the structure of a YouTube video search result.
 *
 * @interface searchVideosType
 * @property {string} id - The ID of the video.
 * @property {string} title - The title of the video.
 * @property {boolean} isLive - Indicates whether the video is live.
 * @property {number} duration - The duration of the video in seconds.
 * @property {number} viewCount - The number of views the video has received.
 * @property {string} uploadDate - The date the video was uploaded.
 * @property {string} channelid - The ID of the channel that uploaded the video.
 * @property {string} channelname - The name of the channel that uploaded the video.
 * @property {string} description - The description of the video.
 * @property {string[]} thumbnails - The list of thumbnail URLs for the video.
 */
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
/**
 * Searches for videos on YouTube based on the provided query.
 *
 * @function searchVideos
 * @param {object} options - The options object containing the search query.
 * @param {string} options.query - The search query to find videos on YouTube.
 * @returns {Promise<searchVideosType[]>} A promise that resolves with a list of video details matching the search query.
 *
 * @example
 * const videos = await searchVideos({ query: "JavaScript tutorials" });
 */
export async function searchVideos({ query }: { query: string }): Promise<searchVideosType[]> {
  try {
    const youtube = new Client();
    const searchResults = await youtube.search(query, { type: "video" });
    const result: searchVideosType[] = searchResults.items.map((item: any) => ({
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
    console.error(colors.red("@error: ") + error.message);
    return [];
  }
}
/**
 * Searches for YouTube videos based on a given query string and emits the video data.
 *
 * @function search_videos
 * @param {SearchVideosOptions} options - The options object containing the search query.
 * @returns {EventEmitter} The event emitter to handle `data` and `error` events.
 *
 * @example
 * const emitter = search_videos({ query: "JavaScript tutorials" });
 * emitter.on("data", data => console.log(data));
 * emitter.on("error", error => console.error(error));
 */
export default function search_videos({ query }: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse({ query });
      const isID = await YouTubeID(query);
      if (isID) {
        emitter.emit("error", colors.red("@error: ") + "use video_data() for video link!");
        return;
      }
      const metaData: searchVideosType[] = await searchVideos({ query });
      if (!metaData || metaData.length === 0) {
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
