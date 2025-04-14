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
