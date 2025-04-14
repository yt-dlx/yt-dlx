import colors from "colors";
import { z, ZodError } from "zod";
import { Client } from "youtubei";
import { EventEmitter } from "events";
import YouTubeID from "../../utils/YouTubeId";
/**
 * Zod schema for validating the input parameters for the video_comments function.
 *
 * @typedef {object} VideoCommentsOptions
 * @property {string} videoLink - The URL of the video (must be at least 2 characters long).
 * @property {boolean} [verbose] - Optional flag to enable verbose logging.
 */
const ZodSchema = z.object({ videoLink: z.string().min(2), verbose: z.boolean().optional() });
/**
 * Fetches comments for a given YouTube video and emits them.
 *
 * Since the youtubei Client does not provide a dedicated method such as `getVideoComments`,
 * this function retrieves the video data using `getVideo` and checks for a hypothetical
 * `comments` property. If the property is not present, it emits an error indicating that
 * video comments functionality is not supported.
 *
 * @function video_comments
 * @param {VideoCommentsOptions} options - The options object containing video parameters.
 * @param {string} options.videoLink - The URL of the video.
 * @param {boolean} [options.verbose] - Optional flag to enable verbose logging.
 * @returns {EventEmitter} The event emitter to handle `data` and `error` events.
 *
 * @example
 * const emitter = video_comments({ videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", verbose: true });
 * emitter.on("data", data => console.log(data));
 * emitter.on("error", error => console.error(error));
 */
export default function video_comments({ videoLink, verbose }: z.infer<typeof ZodSchema>): EventEmitter {
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
      if (!videoData.comments) {
        emitter.emit("error", colors.red("@error: ") + "Video comments functionality is not supported by youtubei");
        return;
      }
      emitter.emit("data", videoData.comments);
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
      console.log(colors.green("@info:"), "❣️ Thank you for using yt-dlx. Consider starring our GitHub repo https://github.com/yt-dlx.");
    }
  })().catch(err => emitter.emit("error", err.message));
  return emitter;
}
