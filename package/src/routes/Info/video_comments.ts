import path from "path";
import colors from "colors";
import { z, ZodError } from "zod";
import { Client } from "youtubei";
import { EventEmitter } from "events";
import { Innertube, UniversalCache } from "youtubei.js";
const ZodSchema = z.object({
  query: z.string().min(2),
  verbose: z.boolean().optional(),
  sort: z.enum(["newest", "oldest", "most-liked", "least-liked", "pinned-first", "replies-first", "longest"]).optional(),
});
export interface CommentType {
  comment_id: string;
  is_pinned: boolean;
  comment: string;
  published_time: string;
  author_is_channel_owner: boolean;
  creator_thumbnail_url: string;
  like_count: number;
  is_member: boolean;
  author: string;
  is_hearted: boolean;
  is_liked: boolean;
  is_disliked: boolean;
  reply_count: number;
  hasReplies: boolean;
}
async function fetchVideoComments({ query, sort, verbose }: z.infer<typeof ZodSchema>): Promise<CommentType[]> {
  try {
    if (verbose) console.log(colors.green("@info:"), `Searching for videos with query: ${query}`);
    const youtubeClient = new Client();
    const searchResults = await youtubeClient.search(query, { type: "video" });
    const video = searchResults.items[0];
    if (!video || !video.id) {
      if (verbose) console.log(colors.red("@error:"), "No videos found for the given query");
      return [];
    }
    const videoId = video.id;
    if (verbose) console.log(colors.green("@info:"), `Fetching comments for video ID: ${videoId}`);
    const youtubeInnertube = await Innertube.create({
      user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      cache: new UniversalCache(true, path.join(process.cwd(), "YouTubeDLX")),
    });
    const response = await youtubeInnertube.getComments(videoId);
    let comments: CommentType[] = response.contents
      .map(thread => {
        const comment = thread?.comment;
        if (!comment || !comment.content?.text || !comment.published_time || !comment.author?.name) return null;
        return {
          comment_id: comment.comment_id || "",
          is_pinned: comment.is_pinned || false,
          comment: comment.content.text,
          published_time: comment.published_time,
          author_is_channel_owner: comment.author_is_channel_owner || false,
          creator_thumbnail_url: comment.creator_thumbnail_url || "",
          like_count: comment.like_count || 0,
          is_member: comment.is_member || false,
          author: comment.author.name,
          is_hearted: comment.is_hearted || false,
          is_liked: comment.is_liked || false,
          is_disliked: comment.is_disliked || false,
          reply_count: comment.reply_count || 0,
          hasReplies: thread.has_replies || false,
        } as CommentType;
      })
      .filter((item): item is CommentType => item !== null);
    switch (sort) {
      case "newest":
        comments.sort((a, b) => new Date(b.published_time).getTime() - new Date(a.published_time).getTime());
        break;
      case "oldest":
        comments.sort((a, b) => new Date(a.published_time).getTime() - new Date(b.published_time).getTime());
        break;
      case "most-liked":
        comments.sort((a, b) => b.like_count - a.like_count);
        break;
      case "least-liked":
        comments.sort((a, b) => a.like_count - b.like_count);
        break;
      case "pinned-first":
        comments.sort((a, b) => (b.is_pinned ? 1 : 0) - (a.is_pinned ? 1 : 0));
        break;
      case "replies-first":
        comments.sort((a, b) => (b.hasReplies ? 1 : 0) - (a.hasReplies ? 1 : 0));
        break;
      case "longest":
        comments.sort((a, b) => b.comment.length - a.comment.length);
        break;
    }
    if (verbose) console.log(colors.green("@info:"), "Video comments fetched!");
    return comments;
  } catch (error: any) {
    console.error(colors.red("@error: ") + error.message);
    return [];
  }
}
/**
 * Fetches comments for a YouTube video based on a search query.
 *
 * @param {Object} options - The parameters for fetching comments.
 * @param {string} options.query - The search query to find a video (minimum 2 characters).
 * @param {"newest" | "oldest" | "most-liked" | "least-liked" | "pinned-first" | "replies-first" | "longest"} [options.sort] - The sorting order for the comments. Optional.
 * @param {boolean} [options.verbose] - Flag to enable verbose output. Optional.
 *
 * @returns {EventEmitter} An EventEmitter object that emits the following events:
 * - "data": Contains the list of comments with details such as comment ID, text, author, like count, and more.
 * - "error": Emits an error message if no videos or comments are found or if fetching the data fails.
 *
 * @example
 * // 1: Fetch comments for a video found by query, sorted by newest
 * YouTubeDLX.Info.Comments({ query: "Node.js tutorial", sort: "newest" })
 *   .on("data", (comments) => console.log("Comments found:", comments))
 *   .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 2: Fetch comments with verbose output
 * YouTubeDLX.Info.Comments({ query: "Node.js tutorial", verbose: true })
 *   .on("data", (comments) => console.log("Comments found:", comments))
 *   .on("error", (err) => console.error("Error:", err));
 */
export default function video_comments(options: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse(options);
      const { query, sort, verbose } = options;
      const comments = await fetchVideoComments({ query, sort, verbose });
      if (!comments || comments.length === 0) {
        emitter.emit("error", colors.red("@error: ") + "No videos or comments found for the query");
        return;
      }
      emitter.emit("data", comments);
    } catch (error) {
      if (error instanceof ZodError) emitter.emit("error", error.errors);
      else if (error instanceof Error) emitter.emit("error", error.message);
      else emitter.emit("error", String(error));
    } finally {
      console.log(colors.green("@info:"), "❣️ Thank you for using yt-dlx. Consider 🌟starring the GitHub repo https://github.com/yt-dlx.");
    }
  })();
  return emitter;
}
