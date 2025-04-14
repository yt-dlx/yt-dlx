import colors from "colors";
import { z, ZodError } from "zod";
import { EventEmitter } from "events";
import TubeResponse from "../../interfaces/TubeResponse";
import TubeLogin, { TubeType } from "../../utils/TubeLogin";
/**
 * Zod schema for validating input parameters for fetching unseen notifications.
 *
 * @typedef {object} UnseenNotificationsParams
 * @property {string} cookiesPath - Path to the cookies file for authentication.
 * @property {boolean} [verbose] - Optional flag to enable verbose logging.
 */
const ZodSchema = z.object({ cookiesPath: z.string(), verbose: z.boolean().optional() });
/**
 * Fetches the count of unseen notifications from YouTube and emits the result.
 *
 * This function validates input parameters using a Zod schema, authenticates with YouTube using the provided cookies path,
 * and emits sanitized notification count data via an EventEmitter. It supports verbose logging for debugging.
 *
 * @function Unseen_Notifications
 * @param {object} options - Parameters for fetching unseen notifications.
 * @param {string} options.cookiesPath - Path to the cookies file for authentication.
 * @param {boolean} [options.verbose] - Whether to enable verbose logging.
 * @returns {EventEmitter} The event emitter to handle `data` and `error` events.
 *
 * @example
 * const emitter = Unseen_Notifications({ cookiesPath: "./cookies.txt", verbose: true });
 * emitter.on("data", data => console.log(data));
 * emitter.on("error", error => console.error(error));
 */
export default function Unseen_Notifications(options: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse(options);
      const { verbose, cookiesPath } = options;
      if (verbose) console.log(colors.green("@info:"), "Fetching unseen notifications...");
      if (!cookiesPath) {
        emitter.emit("error", `${colors.red("@error:")} incorrect 'cookiesPath' provided!`);
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
