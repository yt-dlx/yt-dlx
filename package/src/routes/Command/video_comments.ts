import colors from "colors";
import { z, ZodError } from "zod";
import { EventEmitter } from "events";
import Tuber from "../../utils/Agent";
const ZodSchema = z.object({
  query: z.string().min(2),
  useTor: z.boolean().optional(),
  verbose: z.boolean().optional(),
  filter: z.enum(["newest", "oldest", "top", "most_liked", "pinned", "verified", "replies", "uploader", "favorited", "longest", "shortest"]).optional(),
});
/**
 * Fetches and processes YouTube video comments based on the provided search query and filters.
 *
 * @param {Object} options - The parameters for fetching video comments.
 * @param {string} options.query - The search query string for the video comments.
 * @param {boolean} [options.useTor] - Flag to use Tor for anonymity. Optional.
 * @param {boolean} [options.verbose] - Flag to enable verbose output. Optional.
 * @param {"newest" | "oldest" | "top" | "most_liked" | "pinned" | "verified" | "replies" | "uploader" | "favorited" | "longest" | "shortest"} [options.filter] - The filter to apply on the comments. Optional.
 *
 * @returns {EventEmitter} An EventEmitter object that emits the following events:
 * - "data": Contains the processed list of video comments.
 * - "error": Emits an error message if fetching the comments or processing fails.
 *
 * @example
 * // Example 1: Fetch video comments with only the query
 * YouTubeDLX.Info.Comments({ query: "Node.js tutorial" }).on("data", (comments) => console.log("Comments:", comments)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 2: Fetch video comments with verbose output enabled
 * YouTubeDLX.Info.Comments({ query: "Node.js tutorial", verbose: true }).on("data", (comments) => console.log("Comments:", comments)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 3: Fetch video comments with the filter set to "newest"
 * YouTubeDLX.Info.Comments({ query: "Node.js tutorial", filter: "newest" }).on("data", (comments) => console.log("Newest comments:", comments)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 4: Fetch video comments with the filter set to "top" (most liked)
 * YouTubeDLX.Info.Comments({ query: "Node.js tutorial", filter: "most_liked" }).on("data", (comments) => console.log("Top comments:", comments)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 5: Fetch video comments with the filter set to "pinned"
 * YouTubeDLX.Info.Comments({ query: "Node.js tutorial", filter: "pinned" }).on("data", (comments) => console.log("Pinned comments:", comments)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 6: Fetch video comments with the filter set to "longest"
 * YouTubeDLX.Info.Comments({ query: "Node.js tutorial", filter: "longest" }).on("data", (comments) => console.log("Longest comments:", comments)).on("error", (err) => console.error("Error:", err));
 */
export default function video_comments({ query, useTor, verbose, filter }: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse({ query, useTor, verbose, filter });
      const response = await Tuber({ query, useTor, mode: "comments" });
      const comments = response.comments;
      let processed = response.comments;
      switch (filter) {
        case "newest":
          processed = comments.sort((a: { timestamp: number }, b: { timestamp: number }) => b.timestamp - a.timestamp);
          break;
        case "oldest":
          processed = comments.sort((a: { timestamp: number }, b: { timestamp: number }) => a.timestamp - b.timestamp);
          break;
        case "top":
        case "most_liked":
          processed = comments.sort((a: { like_count: number }, b: { like_count: number }) => b.like_count - a.like_count);
          break;
        case "pinned":
          processed = comments.filter((c: { is_pinned: any }) => c.is_pinned);
          break;
        case "verified":
          processed = comments.filter((c: { author_is_verified: any }) => c.author_is_verified);
          break;
        case "replies":
          processed = comments.filter((c: { parent: string }) => c.parent !== "");
          break;
        case "uploader":
          processed = comments.filter((c: { author_is_uploader: any }) => c.author_is_uploader);
          break;
        case "favorited":
          processed = comments.filter((c: { is_favorited: any }) => c.is_favorited);
          break;
        case "longest":
          processed = comments.sort((a: { text: string | any[] }, b: { text: string | any[] }) => b.text.length - a.text.length);
          break;
        case "shortest":
          processed = comments.sort((a: { text: string | any[] }, b: { text: string | any[] }) => a.text.length - b.text.length);
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
