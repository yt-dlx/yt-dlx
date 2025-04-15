import colors from "colors";
import { z, ZodError } from "zod";
import { EventEmitter } from "events";
import TubeResponse from "../../interfaces/TubeResponse";
import TubeLogin, { TubeType } from "../../utils/TubeLogin";
import sanitizeContentItem from "../../utils/sanitizeContentItem";
const ZodSchema = z.object({ cookiesPath: z.string(), verbose: z.boolean().optional(), sort: z.enum(["oldest", "newest", "old-to-new", "new-to-old"]).optional() });
/**
 * Fetches the watch history for the user based on the provided parameters.
 *
 * @param {Object} options - The options for fetching the watch history.
 * @param {string} options.cookiesPath - The path to the cookies file for authentication.
 * @param {boolean} [options.verbose] - Flag to enable verbose output. Optional.
 * @param {"oldest" | "newest" | "old-to-new" | "new-to-old"} [options.sort] - The sorting order for the history. Optional.
 *
 * @returns {EventEmitter} An EventEmitter object that emits the following events:
 * - "data": Contains the fetched watch history data.
 * - "error": Emits an error message if the fetching fails.
 *
 * @example
 * // Example 1: Fetch watch history with only the cookiesPath
 * YouTubeDLX.Account.History({ cookiesPath: "path/to/cookies" }).on("data", (history) => console.log("Watch history:", history)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 2: Fetch watch history with cookiesPath and verbose output enabled
 * YouTubeDLX.Account.History({ cookiesPath: "path/to/cookies", verbose: true }).on("data", (history) => console.log("Watch history:", history)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 3: Fetch watch history with cookiesPath and sorting by "oldest"
 * YouTubeDLX.Account.History({ cookiesPath: "path/to/cookies", sort: "oldest" }).on("data", (history) => console.log("Watch history:", history)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 4: Fetch watch history with cookiesPath and sorting by "newest"
 * YouTubeDLX.Account.History({ cookiesPath: "path/to/cookies", sort: "newest" }).on("data", (history) => console.log("Watch history:", history)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 5: Fetch watch history with cookiesPath and sorting by "old-to-new"
 * YouTubeDLX.Account.History({ cookiesPath: "path/to/cookies", sort: "old-to-new" }).on("data", (history) => console.log("Watch history:", history)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 6: Fetch watch history with cookiesPath and sorting by "new-to-old"
 * YouTubeDLX.Account.History({ cookiesPath: "path/to/cookies", sort: "new-to-old" }).on("data", (history) => console.log("Watch history:", history)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 7: Fetch watch history with all parameters (cookiesPath, verbose, and sort)
 * YouTubeDLX.Account.History({ cookiesPath: "path/to/cookies", verbose: true, sort: "new-to-old" }).on("data", (history) => console.log("Watch history:", history)).on("error", (err) => console.error("Error:", err));
 */
export default function watch_history(options: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse(options);
      const { verbose, cookiesPath, sort } = options;
      if (verbose) console.log(colors.green("@info:"), "Fetching watch history...");
      if (!cookiesPath) {
        emitter.emit("error", `${colors.red("@error:")} incorrect "cookiesPath" provided!`);
        return;
      }
      const client: TubeType = await TubeLogin(cookiesPath);
      const history = await client.getHistory();
      const result: TubeResponse<{ Shorts: any[]; Videos: any[] }> = { status: "success", data: { Shorts: [], Videos: [] } };
      history.sections?.forEach(section => {
        section.contents?.forEach(content => {
          const sanitized = sanitizeContentItem(content);
          if (sanitized.type === "ReelShelf") {
            const shorts = sanitized.items?.map((item: any) => ({ title: item.accessibility_text, videoId: item.on_tap_endpoint.payload.videoId, thumbnails: item.thumbnail })) || [];
            result.data?.Shorts.push(...shorts);
          } else if (sanitized.type === "Video") {
            const video = { title: sanitized.title.text, videoId: sanitized.videoId, thumbnails: sanitized.thumbnails, description: sanitized.description || "" };
            result.data?.Videos.push(video);
          }
        });
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
          result.data?.Shorts.sort((a, b) => b.videoId.localeCompare(a.videoId));
          result.data?.Videos.sort((a, b) => b.videoId.localeCompare(a.videoId));
          break;
      }
      if (verbose) console.log(colors.green("@info:"), "Watch history fetched:", JSON.stringify(result, null, 2));
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
