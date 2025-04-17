import path from "path";
import colors from "colors";
import { z, ZodError } from "zod";
import { Client } from "youtubei";
import { EventEmitter } from "events";
import { Innertube, UniversalCache } from "youtubei.js";
const ZodSchema = z.object({ query: z.string().min(2), verbose: z.boolean().optional() });
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
async function fetchVideoComments({ query, verbose }: z.infer<typeof ZodSchema>): Promise<CommentType[] | null> {
  try {
    if (verbose) console.log(colors.green("@info:"), `Searching for videos with query: ${query}`);
    const youtubeClient = new Client();
    const searchResults = await youtubeClient.search(query, { type: "video" });
    const video = searchResults.items[0];
    if (!video || !video.id) {
      if (verbose) console.log(colors.red("@error:"), "No videos found for the given query");
      return null;
    }
    const videoId = video.id;
    if (verbose) console.log(colors.green("@info:"), `Workspaceing comments for video ID: ${videoId}`);
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
    if (comments.length === 0) {
      if (verbose) console.log(colors.red("@error:"), "No comments found for the video");
      return null;
    }
    if (verbose) console.log(colors.green("@info:"), "Video comments fetched!");
    return comments;
  } catch (error: any) {
    console.error(colors.red("@error: ") + error.message);
    return null;
  }
}
/**
 * Fetches comments for a YouTube video.
 *
 * @param {object} options - Options for fetching comments.
 * @param {string} options.query - Video search query.
 * @param {boolean} [options.verbose=false] - Enable verbose logging.
 *
 * @returns {EventEmitter} Emits 'data' with an array of comments or 'error'.
 *
 */
export default function video_comments(options: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse(options);
      const { query, verbose } = options;
      const comments = await fetchVideoComments({ query, verbose });
      if (!comments) {
        emitter.emit("error", `${colors.red("@error:")} No videos or comments found for the query`);
        return;
      }
      emitter.emit("data", comments);
    } catch (error) {
      if (error instanceof ZodError) emitter.emit("error", `${colors.red("@error:")} Argument validation failed: ${error.errors.map(e => `${e.path.join(".")}: ${e.message}`).join(", ")}`);
      else if (error instanceof Error) emitter.emit("error", `${colors.red("@error:")} ${error.message}`);
      else emitter.emit("error", `${colors.red("@error:")} An unexpected error occurred: ${String(error)}`);
    } finally {
      console.log(colors.green("@info:"), "❣️ Thank you for using yt-dlx. Consider 🌟starring the GitHub repo https://github.com/yt-dlx.");
    }
  })();
  return emitter;
}
