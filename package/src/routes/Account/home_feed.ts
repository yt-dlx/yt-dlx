import colors from "colors";
import { z, ZodError } from "zod";
import { EventEmitter } from "events";
import TubeResponse from "../../interfaces/TubeResponse";
import TubeLogin, { TubeType } from "../../utils/TubeLogin";
import sanitizeContentItem from "../../utils/sanitizeContentItem";
const ZodSchema = z.object({ cookies: z.string(), verbose: z.boolean().optional(), sort: z.enum(["oldest", "newest", "old-to-new", "new-to-old"]).optional() });
/**
 * Fetches the home feed from Tube (e.g., YouTube).
 *
 * @param {object} options - An object containing the necessary options.
 * @param {string} options.cookies - The cookie string or path to the cookies file required for authentication.
 * @param {boolean} [options.verbose=false] - If true, enables verbose logging to the console.
 * @param {("oldest" | "newest" | "old-to-new" | "new-to-old")} [options.sort] - Optional sorting order for the feed.
 * - "oldest": Keeps only the oldest item in both Shorts and Videos.
 * - "newest": Keeps only the newest item in both Shorts and Videos.
 * - "old-to-new": Sorts Shorts and Videos by video ID in ascending order.
 * - "new-to-old": Sorts Shorts and Videos by video ID in descending order.
 *
 * @returns {EventEmitter} An EventEmitter that emits the following events:
 * - "data": Emitted with the fetched and processed home feed data. The data is an object with the structure:
 * ```typescript
 * {
 * status: "success" | "error",
 * data?: {
 * Shorts: Array<{ title: string; videoId: string; thumbnails: any[] }>;
 * Videos: Array<{
 * type: string;
 * title: string;
 * videoId: string;
 * description: string;
 * thumbnails: any[];
 * authorId: string;
 * authorName: string;
 * authorThumbnails: any[];
 * authorBadges: any[];
 * authorUrl: string;
 * viewCount: string;
 * shortViewCount: string;
 * }>;
 * };
 * error?: any;
 * }
 * ```
 * - "error": Emitted if there is an error during the process, with an error message or object.
 *
 * @example
 * // 1: Fetch home feed with cookies string
 * YouTubeDLX.Account.HomeFeed({ cookies: "COOKIE_STRING" })
 * .on("data", (feed) => console.log("Home feed:", feed))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 2: Fetch home feed with path to cookies file
 * YouTubeDLX.Account.HomeFeed({ cookies: "path/to/cookies.txt" })
 * .on("data", (feed) => console.log("Home feed:", feed))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 3: Fetch home feed with verbose logging
 * YouTubeDLX.Account.HomeFeed({ cookies: "COOKIE_STRING", verbose: true })
 * .on("data", (feed) => console.log("Home feed:", feed))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 4: Fetch home feed and sort by oldest
 * YouTubeDLX.Account.HomeFeed({ cookies: "COOKIE_STRING", sort: "oldest" })
 * .on("data", (feed) => console.log("Home feed (oldest):", feed))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 5: Fetch home feed and sort by newest
 * YouTubeDLX.Account.HomeFeed({ cookies: "COOKIE_STRING", sort: "newest" })
 * .on("data", (feed) => console.log("Home feed (newest):", feed))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 6: Fetch home feed and sort by old-to-new
 * YouTubeDLX.Account.HomeFeed({ cookies: "COOKIE_STRING", sort: "old-to-new" })
 * .on("data", (feed) => console.log("Home feed (old-to-new):", feed))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 7: Fetch home feed and sort by new-to-old
 * YouTubeDLX.Account.HomeFeed({ cookies: "COOKIE_STRING", sort: "new-to-old" })
 * .on("data", (feed) => console.log("Home feed (new-to-old):", feed))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 8: Fetch home feed with verbose logging and sort by oldest
 * YouTubeDLX.Account.HomeFeed({ cookies: "COOKIE_STRING", verbose: true, sort: "oldest" })
 * .on("data", (feed) => console.log("Home feed (verbose, oldest):", feed))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 9: Fetch home feed with verbose logging and sort by newest
 * YouTubeDLX.Account.HomeFeed({ cookies: "COOKIE_STRING", verbose: true, sort: "newest" })
 * .on("data", (feed) => console.log("Home feed (verbose, newest):", feed))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 10: Fetch home feed with verbose logging and sort by old-to-new
 * YouTubeDLX.Account.HomeFeed({ cookies: "COOKIE_STRING", verbose: true, sort: "old-to-new" })
 * .on("data", (feed) => console.log("Home feed (verbose, old-to-new):", feed))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 11: Fetch home feed with verbose logging and sort by new-to-old
 * YouTubeDLX.Account.HomeFeed({ cookies: "COOKIE_STRING", verbose: true, sort: "new-to-old" })
 * .on("data", (feed) => console.log("Home feed (verbose, new-to-old):", feed))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 12: Fetch home feed from cookies file and sort by oldest
 * YouTubeDLX.Account.HomeFeed({ cookies: "path/to/cookies.txt", sort: "oldest" })
 * .on("data", (feed) => console.log("Home feed (file, oldest):", feed))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 13: Fetch home feed from cookies file with verbose logging and sort by newest
 * YouTubeDLX.Account.HomeFeed({ cookies: "path/to/cookies.txt", verbose: true, sort: "newest" })
 * .on("data", (feed) => console.log("Home feed (file, verbose, newest):", feed))
 * .on("error", (err) => console.error("Error:", err));
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
