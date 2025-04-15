import colors from "colors";
import { z, ZodError } from "zod";
import { EventEmitter } from "events";
import TubeResponse from "../../interfaces/TubeResponse";
import TubeLogin, { TubeType } from "../../utils/TubeLogin";
import sanitizeContentItem from "../../utils/sanitizeContentItem";
const ZodSchema = z.object({ cookiesPath: z.string(), verbose: z.boolean().optional(), sort: z.enum(["oldest", "newest", "old-to-new", "new-to-old"]).optional() });
/**
 * Fetches the home feed for the user based on the provided parameters.
 *
 * @param {Object} options - The options for fetching the home feed.
 * @param {string} options.cookiesPath - The path to the cookies file for authentication.
 * @param {boolean} [options.verbose] - Flag to enable verbose output. Optional.
 * @param {"oldest" | "newest" | "old-to-new" | "new-to-old"} [options.sort] - The sorting order for the feed. Optional.
 *
 * @returns {EventEmitter} An EventEmitter object that emits the following events:
 * - "data": Contains the fetched home feed data.
 * - "error": Emits an error message if the fetching fails.
 *
 * @example
 * // Example 1: Fetch home feed with only the cookiesPath
 * home_feed({ cookiesPath: "path/to/cookies" }).on("data", (feed) => console.log("Home feed:", feed)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 2: Fetch home feed with cookiesPath and verbose output enabled
 * home_feed({ cookiesPath: "path/to/cookies", verbose: true }).on("data", (feed) => console.log("Home feed:", feed)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 3: Fetch home feed with cookiesPath and sorting by "oldest"
 * home_feed({ cookiesPath: "path/to/cookies", sort: "oldest" }).on("data", (feed) => console.log("Home feed:", feed)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 4: Fetch home feed with cookiesPath and sorting by "newest"
 * home_feed({ cookiesPath: "path/to/cookies", sort: "newest" }).on("data", (feed) => console.log("Home feed:", feed)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 5: Fetch home feed with cookiesPath and sorting by "old-to-new"
 * home_feed({ cookiesPath: "path/to/cookies", sort: "old-to-new" }).on("data", (feed) => console.log("Home feed:", feed)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 6: Fetch home feed with cookiesPath and sorting by "new-to-old"
 * home_feed({ cookiesPath: "path/to/cookies", sort: "new-to-old" }).on("data", (feed) => console.log("Home feed:", feed)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 7: Fetch home feed with all parameters (cookiesPath, verbose, and sort)
 * home_feed({ cookiesPath: "path/to/cookies", verbose: true, sort: "new-to-old" }).on("data", (feed) => console.log("Home feed:", feed)).on("error", (err) => console.error("Error:", err));
 */
export default function home_feed(options: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse(options);
      const { verbose, cookiesPath, sort } = options;
      if (verbose) console.log(colors.green("@info:"), "Fetching home feed...");
      if (!cookiesPath) {
        emitter.emit("error", `${colors.red("@error:")} incorrect "cookiesPath" provided!`);
        return;
      }
      const client: TubeType = await TubeLogin(cookiesPath);
      const homeFeed = await client.getHomeFeed();
      const result: TubeResponse<{ Shorts: any[]; Videos: any[] }> = { status: "success", data: { Shorts: [], Videos: [] } };
      homeFeed.contents?.contents?.forEach((section: any) => {
        if (section.type === "RichItem" && section.content?.type === "Video") {
          const sanitized = sanitizeContentItem(section);
          result.data?.Videos.push({
            type: sanitized?.content?.type || "",
            title: sanitized?.content?.title?.text || "",
            videoId: sanitized?.content?.video_id || "",
            description: sanitized?.content?.description_snippet?.text || "",
            thumbnails: sanitized?.content?.thumbnails || [],
            authorId: sanitized?.content?.author?.id || "",
            authorName: sanitized?.content?.author?.name || "",
            authorThumbnails: sanitized?.content?.author?.thumbnails || [],
            authorBadges: sanitized?.content?.author?.badges || [],
            authorUrl: sanitized?.content?.author?.url || "",
            viewCount: sanitized?.content?.view_count?.text || "",
            shortViewCount: sanitized?.content?.short_view_count?.text || "",
          });
        } else if (section.type === "RichSection" && section.content?.type === "RichShelf") {
          section.content.contents?.forEach((item: any) => {
            if (item.content?.type === "ShortsLockupView") {
              const short = { title: item?.content?.accessibility_text || "", videoId: item?.content?.on_tap_endpoint?.payload?.videoId, thumbnails: item?.content?.thumbnail || [] };
              result.data?.Shorts.push(short);
            }
          });
        }
      });
      switch (sort) {
        case "oldest":
          result.data?.Shorts.splice(0, result.data?.Shorts.length - 1);
          result.data?.Videos.splice(0, result.data?.Videos.length - 1);
          break;
        case "newest":
          result.data?.Shorts.splice(1);
          result.data?.Videos.splice(1);
          break;
        case "old-to-new":
          result.data?.Shorts.sort((a, b) => a.videoId.localeCompare(b.videoId));
          result.data?.Videos.sort((a, b) => a.videoId.localeCompare(b.videoId));
          break;
        case "new-to-old":
          result.data?.Shorts.sort((a, b) => b.videoId.localeCompare(b.videoId));
          result.data?.Videos.sort((a, b) => b.videoId.localeCompare(b.videoId));
          break;
      }
      if (verbose) console.log(colors.green("@info:"), "Home feed fetched:", JSON.stringify(result, null, 2));
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
      console.log(colors.green("@info:"), "❣️ Thank you for using yt-dlx...");
    }
  })().catch(err => emitter.emit("error", err.message));
  return emitter;
}
