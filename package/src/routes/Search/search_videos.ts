import colors from "colors";
import { z, ZodError } from "zod";
import { Client } from "youtubei";
import { EventEmitter } from "events";
import YouTubeID from "../../utils/YouTubeId";
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
 * Searches for YouTube videos based on the provided query and returns the video details.
 *
 * @param {Object} options - The parameters for searching videos.
 * @param {string} options.query - The search query string for the YouTube videos.
 *
 * @returns {EventEmitter} An EventEmitter object that emits the following events:
 * - "data": Contains the list of videos with details such as ID, title, view count, channel, description, etc.
 * - "error": Emits an error message if no videos are found or if fetching the data fails.
 *
 * @example
 * // Example 1: Search for videos with only the query
 * await YouTubeDLX.Search.Video.Multiple({ query: "Node.js tutorial" }).on("data", (videoData) => console.log("Video data:", videoData)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 2: Search for videos with an invalid query
 * await YouTubeDLX.Search.Video.Multiple({ query: "INVALID_QUERY" }).on("data", (videoData) => console.log("Video data:", videoData)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 3: Search for videos with a video link (which is not supported)
 * await YouTubeDLX.Search.Video.Multiple({ query: "https://www.youtube.com/watch?v=VIDEO_ID" }).on("data", (videoData) => console.log("Video data:", videoData)).on("error", (err) => console.error("Error:", err));
 */
export default async function search_videos({ query }: z.infer<typeof ZodSchema>): Promise<EventEmitter<[never]>> {
  const emitter = new EventEmitter();
  return new Promise(async (resolve, reject) => {
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
