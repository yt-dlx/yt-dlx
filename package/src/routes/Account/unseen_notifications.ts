import colors from "colors";
import { z, ZodError } from "zod";
import { EventEmitter } from "events";
import TubeResponse from "../../interfaces/TubeResponse";
import TubeLogin, { TubeType } from "../../utils/TubeLogin";
const ZodSchema = z.object({ cookiesPath: z.string(), verbose: z.boolean().optional() });
/**
 * Fetches the count of unseen notifications for the user based on the provided parameters.
 *
 * @param {Object} options - The options for fetching unseen notifications count.
 * @param {string} options.cookiesPath - The path to the cookies file for authentication.
 * @param {boolean} [options.verbose] - Flag to enable verbose output. Optional.
 *
 * @returns {EventEmitter} An EventEmitter object that emits the following events:
 * - "data": Contains the fetched unseen notifications count.
 * - "error": Emits an error message if the fetching fails.
 *
 * @example
 * // Example 1: Fetch unseen notifications count with only the cookiesPath
 * YouTubeDLX.Account.Unseen_Notifications({ cookiesPath: "path/to/cookies" }).on("data", (notifications) => console.log("Unseen notifications count:", notifications)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 2: Fetch unseen notifications count with cookiesPath and verbose output enabled
 * YouTubeDLX.Account.Unseen_Notifications({ cookiesPath: "path/to/cookies", verbose: true }).on("data", (notifications) => console.log("Unseen notifications count:", notifications)).on("error", (err) => console.error("Error:", err));
 */
export default function unseen_notifications(options: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse(options);
      const { verbose, cookiesPath } = options;
      if (verbose) console.log(colors.green("@info:"), "Fetching unseen notifications...");
      if (!cookiesPath) {
        emitter.emit("error", `${colors.red("@error:")} incorrect "cookiesPath" provided!`);
        return;
      }
      const client: TubeType = await TubeLogin(cookiesPath);
      const count = await client.getUnseenNotificationsCount();
      const result: TubeResponse<{ count: number }> = { status: "success", data: { count: Number(count) || 0 } };
      if (verbose) console.log(colors.green("@info:"), "Unseen notifications fetched:", JSON.stringify(result, null, 2));
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
