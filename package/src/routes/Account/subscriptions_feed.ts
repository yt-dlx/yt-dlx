import colors from "colors";
import { z, ZodError } from "zod";
import { EventEmitter } from "events";
import TubeResponse from "../../interfaces/TubeResponse";
import TubeLogin, { TubeType } from "../../utils/TubeLogin";
import sanitizeContentItem from "../../utils/sanitizeContentItem";
const ZodSchema = z.object({ cookies: z.string(), verbose: z.boolean().optional() });

/**
 * Fetches the subscriptions feed of a user.
 *
 * This function requires valid cookies to authenticate and retrieve the personalized subscriptions feed.
 * It supports optional verbose logging.
 *
 * @param {object} options - An object containing the configuration options for fetching the subscriptions feed.
 * @param {string} options.cookies - The user's cookies as a string. This is a mandatory parameter for authentication.
 * @param {boolean} [options.verbose=false] - An optional boolean value that, if set to `true`, enables verbose logging to the console, providing more detailed information about the process.
 *
 * @returns {EventEmitter} An EventEmitter instance that emits events during the feed fetching process.
 * The following events can be listened to:
 * - `"data"`: Emitted when the subscriptions feed data is successfully fetched and processed. The data is an object with the following structure:
 * ```typescript
 * {
 * status: "success";
 * data: {
 * contents: any[]; // Array of sanitized content items from the subscriptions feed
 * };
 * }
 * ```
 * - `"error"`: Emitted when an error occurs during any stage of the process, including argument validation, cookie initialization, or network requests. The emitted data is the error message or object.
 *
 * @example
 * // 1: Fetch the subscriptions feed with provided cookies.
 * YouTubeDLX.subscriptions_feed({ cookies: "YOUR_COOKIES_HERE" })
 * .on("data", (data) => console.log("Subscriptions Feed:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 2: Fetch the subscriptions feed with verbose logging.
 * YouTubeDLX.subscriptions_feed({ cookies: "YOUR_COOKIES_HERE", verbose: true })
 * .on("data", (data) => console.log("Subscriptions Feed (Verbose):", data))
 * .on("error", (err) => console.error("Error:", err));
 */
export default function subscriptions_feed(options: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse(options);
      const { verbose, cookies } = options;
      if (verbose) console.log(colors.green("@info:"), "Fetching subscriptions feed...");
      if (!cookies) {
        emitter.emit("error", `${colors.red("@error:")} cookies not provided!`);
        return;
      }
      const client: TubeType = await TubeLogin(cookies);
      if (!client) {
        emitter.emit("error", `${colors.red("@error:")} Could not initialize Tube client.`);
        return;
      }
      const feed = await client.getSubscriptionsFeed();
      if (!feed) {
        emitter.emit("error", `${colors.red("@error:")} Failed to fetch subscriptions feed.`);
        return;
      }
      const contents = (feed as any).contents?.map(sanitizeContentItem) || [];
      const result: TubeResponse<{ contents: any[] }> = { status: "success", data: { contents } };
      if (verbose) console.log(colors.green("@info:"), "Subscriptions feed fetched!");
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
