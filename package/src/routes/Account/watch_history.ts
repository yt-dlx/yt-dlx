import colors from "colors";
import { z, ZodError } from "zod";
import { EventEmitter } from "events";
import TubeResponse from "../../interfaces/TubeResponse";
import TubeLogin, { TubeType } from "../../utils/TubeLogin";
import sanitizeContentItem from "../../utils/sanitizeContentItem";
const ZodSchema = z.object({ cookies: z.string(), verbose: z.boolean().optional(), sort: z.enum(["oldest", "newest", "old-to-new", "new-to-old"]).optional() });
/**
 * Fetches the watch history from Tube (e.g., YouTube).
 *
 * @param {object} options - An object containing the necessary options.
 * @param {string} options.cookies - The cookie string or path to the cookies file required for authentication.
 * @param {boolean} [options.verbose=false] - If true, enables verbose logging to the console.
 * @param {("oldest" | "newest" | "old-to-new" | "new-to-old")} [options.sort] - Optional sorting order for the watch history.
 * - "oldest": Keeps only the oldest item in both Shorts and Videos.
 * - "newest": Keeps only the newest item in both Shorts and Videos.
 * - "old-to-new": Sorts Shorts and Videos by video ID in ascending order.
 * - "new-to-old": Sorts Shorts and Videos by video ID in descending order.
 *
 * @returns {EventEmitter} An EventEmitter that emits the following events:
 * - "data": Emitted with the fetched and processed watch history data. The data is an object with the structure:
 * ```typescript
 * {
 * status: "success" | "error",
 * data?: {
 * Shorts: Array<{ title?: string; videoId?: string; thumbnails?: any[] }>;
 * Videos: Array<{ title?: string; videoId?: string; thumbnails?: any[]; description?: string }>;
 * };
 * error?: any;
 * }
 * ```
 * - "error": Emitted if there is an error during the process, with an error message or object.
 *
 * @example
 * // 1: Fetch watch history with cookies string
 * YouTubeDLX.Account.WatchHistory({ cookies: "COOKIE_STRING" })
 * .on("data", (history) => console.log("Watch history:", history))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 2: Fetch watch history with path to cookies file
 * YouTubeDLX.Account.WatchHistory({ cookies: "path/to/cookies.txt" })
 * .on("data", (history) => console.log("Watch history:", history))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 3: Fetch watch history with verbose logging
 * YouTubeDLX.Account.WatchHistory({ cookies: "COOKIE_STRING", verbose: true })
 * .on("data", (history) => console.log("Watch history:", history))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 4: Fetch watch history and sort by oldest
 * YouTubeDLX.Account.WatchHistory({ cookies: "COOKIE_STRING", sort: "oldest" })
 * .on("data", (history) => console.log("Watch history (oldest):", history))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 5: Fetch watch history and sort by newest
 * YouTubeDLX.Account.WatchHistory({ cookies: "COOKIE_STRING", sort: "newest" })
 * .on("data", (history) => console.log("Watch history (newest):", history))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 6: Fetch watch history and sort by old-to-new
 * YouTubeDLX.Account.WatchHistory({ cookies: "COOKIE_STRING", sort: "old-to-new" })
 * .on("data", (history) => console.log("Watch history (old-to-new):", history))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 7: Fetch watch history and sort by new-to-old
 * YouTubeDLX.Account.WatchHistory({ cookies: "COOKIE_STRING", sort: "new-to-old" })
 * .on("data", (history) => console.log("Watch history (new-to-old):", history))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 8: Fetch watch history with verbose logging and sort by oldest
 * YouTubeDLX.Account.WatchHistory({ cookies: "COOKIE_STRING", verbose: true, sort: "oldest" })
 * .on("data", (history) => console.log("Watch history (verbose, oldest):", history))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 9: Fetch watch history from cookies file and sort by newest
 * YouTubeDLX.Account.WatchHistory({ cookies: "path/to/cookies.txt", sort: "newest" })
 * .on("data", (history) => console.log("Watch history (file, newest):", history))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 10: Fetch watch history with verbose logging and sort by new-to-old
 * YouTubeDLX.Account.WatchHistory({ cookies: "COOKIE_STRING", verbose: true, sort: "new-to-old" })
 * .on("data", (history) => console.log("Watch history (verbose, new-to-old):", history))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 11: Fetch watch history from cookies file with verbose logging and sort by old-to-new
 * YouTubeDLX.Account.WatchHistory({ cookies: "path/to/cookies.txt", verbose: true, sort: "old-to-new" })
 * .on("data", (history) => console.log("Watch history (file, verbose, old-to-new):", history))
 * .on("error", (err) => console.error("Error:", err));
 */
export default function watch_history(options: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse(options);
      const { verbose, cookies, sort } = options;
      if (verbose) console.log(colors.green("@info:"), "Fetching watch history...");
      if (!cookies) {
        emitter.emit("error", `${colors.red("@error:")} cookies not provided!`);
        return;
      }
      const client: TubeType = await TubeLogin(cookies);
      if (!client) {
        emitter.emit("error", `${colors.red("@error:")} Could not initialize Tube client.`);
        return;
      }
      const history = await client.getHistory();
      if (!history) {
        emitter.emit("error", `${colors.red("@error:")} Failed to fetch watch history.`);
        return;
      }
      const result: TubeResponse<{ Shorts: any[]; Videos: any[] }> = { status: "success", data: { Shorts: [], Videos: [] } };
      history.sections?.forEach(section => {
        section.contents?.forEach(content => {
          const sanitized = sanitizeContentItem(content);
          if (sanitized?.type === "ReelShelf") {
            const shorts = sanitized.items?.map((item: any) => ({ title: item?.accessibility_text, videoId: item?.on_tap_endpoint?.payload?.videoId, thumbnails: item?.thumbnail })) || [];
            if (result.data?.Shorts) result.data.Shorts.push(...shorts);
          } else if (sanitized?.type === "Video") {
            const video = { title: sanitized?.title?.text, videoId: sanitized?.videoId, thumbnails: sanitized?.thumbnails, description: sanitized?.description || "" };
            if (result.data?.Videos) result.data.Videos.push(video);
          }
        });
      });
      switch (sort) {
        case "oldest":
          if (result.data?.Shorts && result.data.Shorts.length > 0) result.data.Shorts.splice(0, result.data.Shorts.length - 1);
          if (result.data?.Videos && result.data.Videos.length > 0) result.data.Videos.splice(0, result.data.Videos.length - 1);
          break;
        case "newest":
          if (result.data?.Shorts && result.data.Shorts.length > 1) result.data.Shorts.splice(1);
          if (result.data?.Videos && result.data.Videos.length > 1) result.data.Videos.splice(1);
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
      if (verbose) console.log(colors.green("@info:"), "Watch history fetched!");
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
