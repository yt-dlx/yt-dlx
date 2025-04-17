import colors from "colors";
import { z, ZodError } from "zod";
import { EventEmitter } from "events";
import TubeResponse from "../../interfaces/TubeResponse";
import TubeLogin, { TubeType } from "../../utils/TubeLogin";
import sanitizeContentItem from "../../utils/sanitizeContentItem";
const ZodSchema = z.object({ cookies: z.string(), verbose: z.boolean().optional(), sort: z.enum(["oldest", "newest", "old-to-new", "new-to-old"]).optional() });
/**
 * Fetches the home feed of a user.
 *
 * This function requires valid cookies to authenticate and retrieve the personalized home feed.
 * It supports optional verbose logging and sorting of the returned feed.
 *
 * @param {object} options - An object containing the configuration options for fetching the home feed.
 * @param {string} options.cookies - The user's cookies as a string. This is a mandatory parameter for authentication.
 * @param {boolean} [options.verbose=false] - An optional boolean value that, if set to `true`, enables verbose logging to the console, providing more detailed information about the process.
 * @param {("oldest" | "newest" | "old-to-new" | "new-to-old")} [options.sort] - An optional string specifying how the home feed should be sorted. Available options include:
 * - `"oldest"`: Removes all but the oldest video and short from the feed.
 * - `"newest"`: Removes all but the newest video and short from the feed.
 * - `"old-to-new"`: Sorts videos and shorts by their video ID in ascending order (oldest first).
 * - `"new-to-old"`: Sorts videos and shorts by their video ID in descending order (newest first).
 *
 * @returns {EventEmitter} An EventEmitter instance that emits events during the feed fetching process.
 * The following events can be listened to:
 * - `"data"`: Emitted when the home feed data is successfully fetched and processed. The data is an object with the following structure:
 * ```typescript
 * {
 * status: "success";
 * data: {
 * Shorts: any[]; // Array of short video objects
 * Videos: any[]; // Array of regular video objects
 * };
 * }
 * ```
 * - `"error"`: Emitted when an error occurs during any stage of the process, including argument validation, cookie initialization, or network requests. The emitted data is the error message or object.
 *
 */
export default function home_feed(options: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse(options);
      const { verbose, cookies, sort } = options;
      if (verbose) console.log(colors.green("@info:"), "Fetching home feed...");
      if (!cookies) {
        emitter.emit("error", `${colors.red("@error:")} cookies not provided!`);
        return;
      }
      const client: TubeType = await TubeLogin(cookies);
      if (!client) {
        emitter.emit("error", `${colors.red("@error:")} Could not initialize Tube client.`);
        return;
      }
      const homeFeed = await client.getHomeFeed();
      if (!homeFeed) {
        emitter.emit("error", `${colors.red("@error:")} Failed to fetch home feed.`);
        return;
      }
      const result: TubeResponse<{ Shorts: any[]; Videos: any[] }> = { status: "success", data: { Shorts: [], Videos: [] } };
      homeFeed.contents?.contents?.forEach((section: any) => {
        if (section?.type === "RichItem" && section?.content?.type === "Video") {
          const sanitized = sanitizeContentItem(section);
          if (sanitized?.content) {
            result.data?.Videos.push({
              type: sanitized.content.type || "",
              title: sanitized.content.title?.text || "",
              videoId: sanitized.content.video_id || "",
              description: sanitized.content.description_snippet?.text || "",
              thumbnails: sanitized.content.thumbnails || [],
              authorId: sanitized.content.author?.id || "",
              authorName: sanitized.content.author?.name || "",
              authorThumbnails: sanitized.content.author.thumbnails || [],
              authorBadges: sanitized.content.author.badges || [],
              authorUrl: sanitized.content.author.url || "",
              viewCount: sanitized.content.view_count?.text || "",
              shortViewCount: sanitized.content.short_view_count?.text || "",
            });
          }
        } else if (section?.type === "RichSection" && section?.content?.type === "RichShelf") {
          section.content.contents?.forEach((item: any) => {
            if (item?.content?.type === "ShortsLockupView") {
              const short = { title: item.content.accessibility_text || "", videoId: item.content.on_tap_endpoint?.payload?.videoId, thumbnails: item.content.thumbnail || [] };
              result.data?.Shorts.push(short);
            }
          });
        }
      });
      switch (sort) {
        case "oldest":
          if (result.data?.Shorts) result.data.Shorts.splice(0, result.data.Shorts.length - 1);
          if (result.data?.Videos) result.data.Videos.splice(0, result.data.Videos.length - 1);
          break;
        case "newest":
          if (result.data?.Shorts) result.data.Shorts.splice(1);
          if (result.data?.Videos) result.data.Videos.splice(1);
          break;
        case "old-to-new":
          if (result.data?.Shorts) result.data.Shorts.sort((a, b) => a.videoId.localeCompare(b.videoId));
          if (result.data?.Videos) result.data.Videos.sort((a, b) => a.videoId.localeCompare(b.videoId));
          break;
        case "new-to-old":
          if (result.data?.Shorts) result.data.Shorts.sort((a, b) => b.videoId.localeCompare(a.videoId));
          if (result.data?.Videos) result.data.Videos.sort((a, b) => b.videoId.localeCompare(a.videoId));
          break;
      }
      if (verbose) console.log(colors.green("@info:"), "Home feed fetched!");
      emitter.emit("data", result);
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
