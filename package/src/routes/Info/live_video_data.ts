import colors from "colors";
import { z, ZodError } from "zod";
import { Client } from "youtubei";
import { EventEmitter } from "events";
import YouTubeID from "../../utils/YouTubeId";
const ZodSchema = z.object({ videoLink: z.string().min(2), verbose: z.boolean().optional() });
/**
 * Fetches live video data from YouTube based on the provided video link.
 *
 * @param {Object} options - The parameters for fetching live video data.
 * @param {string} options.videoLink - The URL of the YouTube live video.
 * @param {boolean} [options.verbose] - Flag to enable verbose output. Optional.
 *
 * @returns {EventEmitter} An EventEmitter object that emits the following events:
 * - "data": Contains the live video data, such as video ID, title, channel, and live viewers.
 * - "error": Emits an error message if the video is not live or if fetching the data fails.
 *
 * @example
 * // Example 1: Fetch live video data with only the video link
 * await YouTubeDLX.Info.Live({ videoLink: "https://www.youtube.com/watch?v=VIDEO_ID" }).on("data", (liveData) => console.log("Live video data:", liveData)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 2: Fetch live video data with verbose output enabled
 * await YouTubeDLX.Info.Live({ videoLink: "https://www.youtube.com/watch?v=VIDEO_ID", verbose: true }).on("data", (liveData) => console.log("Live video data:", liveData)).on("error", (err) => console.error("Error:", err));
 */
export default async function live_video_data({ videoLink, verbose }: z.infer<typeof ZodSchema>): Promise<EventEmitter<[never]>> {
  const emitter = new EventEmitter();
  return new Promise(async (resolve, reject) => {
    try {
      ZodSchema.parse({ videoLink, verbose });
      const vId = await YouTubeID(videoLink);
      if (!vId) {
        emitter.emit("error", colors.red("@error: ") + "incorrect video link");
        return;
      }
      const youtube = new Client();
      const videoData: any = await youtube.getVideo(vId);
      if (!videoData) {
        emitter.emit("error", colors.red("@error: ") + "Unable to fetch video data");
        return;
      }
      if (!videoData.isLiveContent) {
        emitter.emit("error", colors.red("@error: ") + "Video is not live");
        return;
      }
      const liveData = {
        id: videoData.id,
        title: videoData.title,
        channel: videoData.channel,
        liveViewers: videoData.liveViewers || null,
      };
      emitter.emit("data", liveData);
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
