import colors from "colors";
import { z, ZodError } from "zod";
import { EventEmitter } from "events";
import TubeResponse from "../../interfaces/TubeResponse";
import TubeLogin, { TubeType } from "../../utils/TubeLogin";
const ZodSchema = z.object({ cookies: z.string(), verbose: z.boolean().optional() });
/**
 * @shortdesc Fetches the number of unseen notifications for a user.
 *
 * @description This function allows you to retrieve the count of unseen notifications for a user on the platform. It requires valid cookies for authentication to access this information. The function supports optional verbose logging to provide more details during the process.
 *
 * The function provides the following configuration options:
 * - **Cookies:** The user's cookies as a string. This is a mandatory parameter required for authenticating the request and accessing the notification count.
 * - **Verbose:** An optional boolean value that, if true, enables detailed logging to the console, providing more information about the steps taken during the notification count fetching process.
 *
 * The function returns an EventEmitter instance that emits events during the notification fetching process:
 * - `"data"`: Emitted when the count of unseen notifications is successfully fetched. The emitted data is an object containing the status and the count of unseen notifications.
 * - `"error"`: Emitted when an error occurs during any stage of the process, such as argument validation, cookie initialization, or network requests. The emitted data is the error message or object.
 *
 * @param {object} options - An object containing the configuration options.
 * @param {string} options.cookies - The user's cookies as a string. **Required**.
 * @param {boolean} [options.verbose=false] - Enable verbose logging.
 *
 * @returns {EventEmitter} An EventEmitter instance for handling events during unseen notifications fetching.
 *
 * @example
 * // 1. Fetch the count of unseen notifications with provided cookies
 * const cookies = "YOUR_COOKIES_HERE";
 * YouTubeDLX.unseen_notifications({ cookies })
 * .on("data", (data) => console.log("Unseen Notifications Count:", data))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 2. Fetch the count of unseen notifications with verbose logging
 * const cookies = "YOUR_COOKIES_HERE";
 * YouTubeDLX.unseen_notifications({ cookies, verbose: true })
 * .on("data", (data) => console.log("Unseen Notifications Count:", data))
 * .on("error", (error) => console.error("Error:", error));
 */
export default function unseen_notifications(options: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse(options);
      const { verbose, cookies } = options;
      if (verbose) console.log(colors.green("@info:"), "Fetching unseen notifications...");
      if (!cookies) {
        emitter.emit("error", `${colors.red("@error:")} cookies not provided!`);
        return;
      }
      const client: TubeType = await TubeLogin(cookies);
      if (!client) {
        emitter.emit("error", `${colors.red("@error:")} Could not initialize Tube client.`);
        return;
      }
      const count = await client.getUnseenNotificationsCount();
      if (count === undefined) {
        emitter.emit("error", `${colors.red("@error:")} Failed to fetch unseen notifications count.`);
        return;
      }
      const result: TubeResponse<{ count: number }> = { status: "success", data: { count: Number(count) || 0 } };
      if (verbose) console.log(colors.green("@info:"), "Unseen notifications fetched!");
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
