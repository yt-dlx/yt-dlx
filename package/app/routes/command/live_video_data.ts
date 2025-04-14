import colors from "colors";
import { z, ZodError } from "zod";
import { Client } from "youtubei";
import { EventEmitter } from "events";
import YouTubeID from "../../YouTubeId";
/**
 * Zod schema for validating live video data input parameters.
 *
 * @typedef {object} LiveVideoDataOptions
 * @property {string} videoLink - The URL of the video. Must be at least 2 characters long.
 * @property {boolean} [verbose] - Optional flag to enable verbose logging.
 */
const ZodSchema = z.object({ videoLink: z.string().min(2), verbose: z.boolean().optional() });
/**
 * Fetches live video data for a given YouTube video link and emits the live details.
 *
 * @function live_video_data
 * @param {LiveVideoDataOptions} options - The options object containing input parameters.
 * @param {string} options.videoLink - The URL of the video.
 * @param {boolean} [options.verbose] - Optional flag to enable verbose logging.
 * @returns {EventEmitter} The event emitter to handle `data` and `error` events.
 *
 * @example
 * const emitter = live_video_data({ videoLink: "https://www.youtube.com/watch?v=...", verbose: true });
 * emitter.on("data", data => console.log(data));
 * emitter.on("error", error => console.error(error));
 */
export default function live_video_data({ videoLink, verbose }: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
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
  })().catch(err => emitter.emit("error", err.message));
  return emitter;
}
