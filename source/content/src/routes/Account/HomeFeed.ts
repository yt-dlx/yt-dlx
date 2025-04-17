import colors from "colors";
import { z, ZodError } from "zod";
import { EventEmitter } from "events";
import TubeResponse from "../../interfaces/TubeResponse";
import TubeLogin, { TubeType } from "../../utils/TubeLogin";
import sanitizeContentItem from "../../utils/sanitizeContentItem";
const ZodSchema = z.object({ cookies: z.string(), verbose: z.boolean().optional(), sort: z.enum(["oldest", "newest", "old-to-new", "new-to-old"]).optional() });
/**
 * @shortdesc Fetches the user's personalized home feed, including videos and shorts, with optional sorting.
 *
 * @description This function allows you to retrieve a user's personalized home feed from the platform. It requires valid cookies for authentication to access the feed. The feed typically includes a mix of regular videos and short videos tailored to the user's preferences. The function supports optional verbose logging to provide more details during the process. Additionally, it offers various sorting options to organize the fetched feed according to your needs.
 *
 * The function provides the following configuration options:
 * - **Cookies:** The user's cookies as a string. This is a mandatory parameter required for authenticating the request and accessing the home feed.
 * - **Verbose:** An optional boolean value that, if true, enables detailed logging to the console, providing more information about the steps taken during the feed fetching process.
 * - **Sort:** An optional string specifying how the home feed should be sorted. Available options include:
 * - `"oldest"`: Keeps only the oldest video and the oldest short from the feed.
 * - `"newest"`: Keeps only the newest video and the newest short from the feed.
 * - `"old-to-new"`: Sorts both videos and shorts by their video ID in ascending order, effectively showing the oldest items first.
 * - `"new-to-old"`: Sorts both videos and shorts by their video ID in descending order, showing the newest items first.
 *
 * The function returns an EventEmitter instance that emits events during the feed fetching process:
 * - `"data"`: Emitted when the home feed data is successfully fetched and processed. The emitted data is an object containing the status and the fetched feed, separated into `Shorts` and `Videos` arrays.
 * - `"error"`: Emitted when an error occurs during any stage of the process, such as argument validation, cookie initialization, or network requests. The emitted data is the error message or object.
 *
 * @param {object} options - An object containing the configuration options.
 * @param {string} options.cookies - The user's cookies as a string. **Required**.
 * @param {boolean} [options.verbose=false] - Enable verbose logging.
 * @param {("oldest" | "newest" | "old-to-new" | "new-to-old")} [options.sort] - Specify how the home feed should be sorted.
 *
 * @returns {EventEmitter} An EventEmitter instance for handling events during home feed fetching.
 *
 * @example
 * // 1. Fetch home feed with provided cookies
 * const cookies = "YOUR_COOKIES_HERE";
 * YouTubeDLX.home_feed({ cookies })
 * .on("data", (data) => console.log("Home Feed:", data))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 2. Fetch home feed with verbose logging
 * const cookies = "YOUR_COOKIES_HERE";
 * YouTubeDLX.home_feed({ cookies, verbose: true })
 * .on("data", (data) => console.log("Home Feed:", data))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 3. Fetch home feed and sort by oldest
 * const cookies = "YOUR_COOKIES_HERE";
 * YouTubeDLX.home_feed({ cookies, sort: "oldest" })
 * .on("data", (data) => console.log("Oldest in Home Feed:", data))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 4. Fetch home feed and keep only the newest items
 * const cookies = "YOUR_COOKIES_HERE";
 * YouTubeDLX.home_feed({ cookies, sort: "newest" })
 * .on("data", (data) => console.log("Newest in Home Feed:", data))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 5. Fetch home feed and sort from oldest to newest
 * const cookies = "YOUR_COOKIES_HERE";
 * YouTubeDLX.home_feed({ cookies, sort: "old-to-new" })
 * .on("data", (data) => console.log("Home Feed (Old to New):", data))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 6. Fetch home feed and sort from newest to oldest
 * const cookies = "YOUR_COOKIES_HERE";
 * YouTubeDLX.home_feed({ cookies, sort: "new-to-old" })
 * .on("data", (data) => console.log("Home Feed (New to Old):", data))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 7. Fetch home feed with verbose logging and sort by oldest
 * const cookies = "YOUR_COOKIES_HERE";
 * YouTubeDLX.home_feed({ cookies, verbose: true, sort: "oldest" })
 * .on("data", (data) => console.log("Oldest in Home Feed (Verbose):", data))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 8. Fetch home feed with verbose logging and keep only the newest items
 * const cookies = "YOUR_COOKIES_HERE";
 * YouTubeDLX.home_feed({ cookies, verbose: true, sort: "newest" })
 * .on("data", (data) => console.log("Newest in Home Feed (Verbose):", data))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 9. Fetch home feed with verbose logging and sort from oldest to newest
 * const cookies = "YOUR_COOKIES_HERE";
 * YouTubeDLX.home_feed({ cookies, verbose: true, sort: "old-to-new" })
 * .on("data", (data) => console.log("Home Feed (Old to New, Verbose):", data))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 10. Fetch home feed with verbose logging and sort from newest to oldest
 * const cookies = "YOUR_COOKIES_HERE";
 * YouTubeDLX.home_feed({ cookies, verbose: true, sort: "new-to-old" })
 * .on("data", (data) => console.log("Home Feed (New to Old, Verbose):", data))
 * .on("error", (error) => console.error("Error:", error));
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
