import colors from "colors";
import { z, ZodError } from "zod";
import { EventEmitter } from "events";
import TubeResponse from "../../interfaces/TubeResponse";
import TubeLogin, { TubeType } from "../../utils/TubeLogin";
const ZodSchema = z.object({ cookies: z.string(), verbose: z.boolean().optional() });
/**
 * Fetches the count of unseen notifications for a user.
 *
 * This function requires valid cookies to authenticate and retrieve the number of unseen notifications.
 * It supports optional verbose logging.
 *
 * @param {object} options - An object containing the configuration options for fetching unseen notifications.
 * @param {string} options.cookies - The user's cookies as a string. This is a mandatory parameter for authentication.
 * @param {boolean} [options.verbose=false] - An optional boolean value that, if set to `true`, enables verbose logging to the console, providing more detailed information about the process.
 *
 * @returns {EventEmitter} An EventEmitter instance that emits events during the notification fetching process.
 * The following events can be listened to:
 * - `"data"`: Emitted when the count of unseen notifications is successfully fetched. The data is an object with the following structure:
 * ```typescript
 * {
 * status: "success";
 * data: {
 * count: number; // The number of unseen notifications
 * };
 * }
 * ```
 * - `"error"`: Emitted when an error occurs during any stage of the process, including argument validation, cookie initialization, or network requests. The emitted data is the error message or object.
 *
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
