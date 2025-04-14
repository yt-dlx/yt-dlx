import colors from "colors";
import { z, ZodError } from "zod";
import { EventEmitter } from "events";
import comEngine from "../../utils/comEngine";
/**
 * Defines the schema for the input parameters used in the `video_comments` function.
 *
 * @typedef {object} VideoCommentsOptions
 * @property {string} query - The YouTube video URL or query string
 * @property {boolean} [useTor] - Whether to use Tor for anonymization
 * @property {boolean} [verbose] - Whether to enable verbose logging
 * @property {'newest'|'oldest'|'top'|'most_liked'|'pinned'|'verified'|'replies'|'uploader'|'favorited'|'longest'|'shortest'} [filter] - Filter/sort mode
 */
const ZodSchema = z.object({
  query: z.string().min(2),
  useTor: z.boolean().optional(),
  verbose: z.boolean().optional(),
  filter: z.enum(["newest", "oldest", "top", "most_liked", "pinned", "verified", "replies", "uploader", "favorited", "longest", "shortest"]).optional(),
});
/**
 * Fetches and filters YouTube video comments with various sorting options
 *
 * @function video_comments
 * @param {VideoCommentsOptions} options - Configuration options
 * @returns {EventEmitter} Event emitter for handling data/error events
 *
 * @example
 * const emitter = video_comments({
 *   query: "https://youtu.be/VIDEO_ID",
 *   filter: 'top'
 * });
 * emitter.on('data', comments => console.log(comments));
 */
export default function video_comments({ query, useTor, verbose, filter }: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse({ query, useTor, verbose, filter });
      const { comments } = await comEngine({ query, useTor: useTor || false });
      let processed = comments;
      switch (filter) {
        case "newest":
          processed = comments.sort((a, b) => b.timestamp - a.timestamp);
          break;
        case "oldest":
          processed = comments.sort((a, b) => a.timestamp - b.timestamp);
          break;
        case "top":
        case "most_liked":
          processed = comments.sort((a, b) => b.like_count - a.like_count);
          break;
        case "pinned":
          processed = comments.filter(c => c.is_pinned);
          break;
        case "verified":
          processed = comments.filter(c => c.author_is_verified);
          break;
        case "replies":
          processed = comments.filter(c => c.parent !== "");
          break;
        case "uploader":
          processed = comments.filter(c => c.author_is_uploader);
          break;
        case "favorited":
          processed = comments.filter(c => c.is_favorited);
          break;
        case "longest":
          processed = comments.sort((a, b) => b.text.length - a.text.length);
          break;
        case "shortest":
          processed = comments.sort((a, b) => a.text.length - b.text.length);
          break;
      }
      emitter.emit("data", processed);
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
