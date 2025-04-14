import colors from "colors";
import { z, ZodError } from "zod";
import { EventEmitter } from "events";
import extractText from "../../utils/extractText";
import TubeResponse from "../../interfaces/TubeResponse";
import sanitizeRenderer from "../../utils/sanitizeRenderer";
import TubeLogin, { TubeType } from "../../utils/TubeLogin";
/**
 * Zod schema for validating input parameters for fetching comments.
 *
 * @typedef {object} CommentsParams
 * @property {string} videoId - The ID of the video to fetch comments for (minimum 1 character).
 * @property {string} [cookiesPath] - path to the cookies file for authentication.
 * @property {boolean} [verbose] - Optional flag to enable verbose logging.
 */
const ZodSchema = z.object({ cookiesPath: z.string(), videoId: z.string().min(1), verbose: z.boolean().optional() });
/**
 * Sanitizes a comment thread object to a standardized format.
 *
 * @function sanitizeCommentThread
 * @param {any} thread - The raw comment thread object from YouTube.
 * @returns {any} The sanitized comment thread object.
 */
function sanitizeCommentThread(thread: any): any {
  return {
    type: thread.type,
    comment:
      thread.comment?.map((c: any) => ({
        commentId: c.commentId || "",
        contentText: extractText(c.contentText),
        authorText: extractText(c.authorText),
        authorThumbnail: c.authorThumbnail?.thumbnails?.map((t: any) => ({ url: t.url, width: t.width, height: t.height })) || [],
      })) || [],
    commentRepliesData: thread.comment_replies_data ? { replies: thread.comment_replies_data.replies?.map(sanitizeCommentThread) || [] } : null,
    isModeratedElqComment: thread.is_moderated_elq_comment || false,
    hasReplies: thread.has_replies || false,
  };
}
/**
 * Sanitizes a custom emoji object to a standardized format.
 *
 * @function sanitizeCustomEmoji
 * @param {any} emoji - The raw custom emoji object from YouTube.
 * @returns {any} The sanitized custom emoji object.
 */
function sanitizeCustomEmoji(emoji: any): any {
  return {
    emojiId: emoji.emojiId || "",
    shortcuts: emoji.shortcuts || [],
    image: { thumbnails: emoji.image?.thumbnails?.map((t: any) => ({ url: t.url, width: t.width, height: t.height })) || [] },
  };
}
/**
 * Fetches comments for a specific YouTube video and emits the result.
 *
 * This function validates input parameters using a Zod schema, authenticates with YouTube using the provided cookies path,
 * and emits sanitized comment data via an EventEmitter. It supports verbose logging for debugging.
 *
 * @function Comments
 * @param {object} options - Parameters for fetching comments.
 * @param {string} options.videoId - The ID of the video to fetch comments for.
 * @param {boolean} [options.verbose] - Whether to enable verbose logging.
 * @param {string} [options.cookiesPath] - Path to the cookies file for authentication.
 * @returns {EventEmitter} The event emitter to handle `data` and `error` events.
 *
 * @example
 * const emitter = Comments({ videoId: "kJi_cNVStMo", verbose: true, cookiesPath: "./cookies.txt" });
 * emitter.on("data", data => console.log(data));
 * emitter.on("error", error => console.error(error));
 */
export default function Comments(options: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse(options);
      const { videoId, verbose, cookiesPath } = options;
      if (verbose) console.log(colors.green("@info:"), `Fetching comments for video ${videoId}...`);
      if (!cookiesPath) {
        emitter.emit("error", `${colors.red("@error:")} incorrect 'cookiesPath' provided!`);
        return;
      }
      const client: TubeType = await TubeLogin(cookiesPath);
      const comments = await client.getComments(videoId);
      const result: TubeResponse<{ header: any; contents: any[] }> = {
        status: "success",
        data: {
          header: {
            type: comments.header?.type || "",
            title: extractText(comments.header?.title),
            count: extractText(comments.header?.count),
            commentsCount: extractText(comments.header?.comments_count),
            createRenderer: {
              type: comments.header?.create_renderer?.type || "",
              avatarSize: (comments.header?.create_renderer as any)?.avatar_size || "",
              placeholder: extractText((comments.header?.create_renderer as any)?.placeholder),
              submitButton: sanitizeRenderer((comments.header?.create_renderer as any)?.submit_button?.[0]),
              cancelButton: sanitizeRenderer((comments.header?.create_renderer as any)?.cancel_button?.[0]),
              authorThumbnail: (comments.header?.create_renderer as any)?.author_thumbnail?.map((t: any) => ({ url: t.url, width: t.width, height: t.height })) || [],
            },
            sortMenu: {
              type: comments.header?.sort_menu?.type || "",
              label: comments.header?.sort_menu?.label || "",
              title: comments.header?.sort_menu?.title || "",
              tooltip: comments.header?.sort_menu?.tooltip || "",
              iconType: comments.header?.sort_menu?.icon_type || "",
              subMenuItems: comments.header?.sort_menu?.sub_menu_items?.map((item: any) => ({ title: item.title, selected: item.selected })) || [],
            },
            customEmojis: comments.header?.custom_emojis?.map(sanitizeCustomEmoji) || [],
          },
          contents: comments.contents?.map(sanitizeCommentThread) || [],
        },
      };
      if (verbose) console.log(colors.green("@info:"), "Comments fetched:", JSON.stringify(result, null, 2));
      emitter.emit("data", result);
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
