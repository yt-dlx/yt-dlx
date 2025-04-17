import colors from "colors";
import { z, ZodError } from "zod";
import { EventEmitter } from "events";
import TubeResponse from "../../interfaces/TubeResponse";
import TubeLogin, { TubeType } from "../../utils/TubeLogin";
import sanitizeContentItem from "../../utils/sanitizeContentItem";
const ZodSchema = z.object({ cookies: z.string(), verbose: z.boolean().optional() });
/**
 * @shortdesc Fetches the user's personalized subscriptions feed.
 *
 * @description This function allows you to retrieve a user's subscriptions feed from the platform. It requires valid cookies for authentication to access the feed, which contains the latest videos from the channels the user is subscribed to. The function supports optional verbose logging to provide more details during the process.
 *
 * The function provides the following configuration options:
 * - **Cookies:** The user's cookies as a string. This is a mandatory parameter required for authenticating the request and accessing the subscriptions feed.
 * - **Verbose:** An optional boolean value that, if true, enables detailed logging to the console, providing more information about the steps taken during the feed fetching process.
 *
 * The function returns an EventEmitter instance that emits events during the feed fetching process:
 * - `"data"`: Emitted when the subscriptions feed data is successfully fetched and processed. The emitted data is an object containing the status and the fetched feed contents as an array of sanitized items.
 * - `"error"`: Emitted when an error occurs during any stage of the process, such as argument validation, cookie initialization, or network requests. The emitted data is the error message or object.
 *
 * @param {object} options - An object containing the configuration options.
 * @param {string} options.cookies - The user's cookies as a string. **Required**.
 * @param {boolean} [options.verbose=false] - Enable verbose logging.
 *
 * @returns {EventEmitter} An EventEmitter instance for handling events during subscriptions feed fetching.
 *
 * @example
 * // 1. Fetch subscriptions feed with provided cookies
 * const cookies = "YOUR_COOKIES_HERE";
 * YouTubeDLX.subscriptions_feed({ cookies })
 * .on("data", (data) => console.log("Subscriptions Feed:", data))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 2. Fetch subscriptions feed with verbose logging
 * const cookies = "YOUR_COOKIES_HERE";
 * YouTubeDLX.subscriptions_feed({ cookies, verbose: true })
 * .on("data", (data) => console.log("Subscriptions Feed:", data))
 * .on("error", (error) => console.error("Error:", error));
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
