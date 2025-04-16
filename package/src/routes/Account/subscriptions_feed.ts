import colors from "colors";
import { z, ZodError } from "zod";
import { EventEmitter } from "events";
import TubeResponse from "../../interfaces/TubeResponse";
import TubeLogin, { TubeType } from "../../utils/TubeLogin";
import sanitizeContentItem from "../../utils/sanitizeContentItem";
const ZodSchema = z.object({ cookies: z.string(), verbose: z.boolean().optional() });
/**
 * Fetches the subscriptions feed from Tube (e.g., YouTube).
 *
 * @param {object} options - An object containing the necessary options.
 * @param {string} options.cookies - The cookie string or path to the cookies file required for authentication.
 * @param {boolean} [options.verbose=false] - If true, enables verbose logging to the console.
 *
 * @returns {EventEmitter} An EventEmitter that emits the following events:
 * - "data": Emitted with the fetched and processed subscriptions feed data. The data is an object with the structure:
 * ```typescript
 * {
 * status: "success" | "error",
 * data?: {
 * contents: Array<any>; // Array of sanitized subscription feed items
 * };
 * error?: any;
 * }
 * ```
 * - "error": Emitted if there is an error during the process, with an error message or object.
 *
 * @example
 * // 1: Fetch subscriptions feed with cookies string
 * YouTubeDLX.Account.SubscriptionsFeed({ cookies: "COOKIE_STRING" })
 * .on("data", (feed) => console.log("Subscriptions feed:", feed))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 2: Fetch subscriptions feed with path to cookies file
 * YouTubeDLX.Account.SubscriptionsFeed({ cookies: "path/to/cookies.txt" })
 * .on("data", (feed) => console.log("Subscriptions feed:", feed))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 3: Fetch subscriptions feed with verbose logging
 * YouTubeDLX.Account.SubscriptionsFeed({ cookies: "COOKIE_STRING", verbose: true })
 * .on("data", (feed) => console.log("Subscriptions feed:", feed))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 4: Fetch subscriptions feed from cookies file with verbose logging
 * YouTubeDLX.Account.SubscriptionsFeed({ cookies: "path/to/cookies.txt", verbose: true })
 * .on("data", (feed) => console.log("Subscriptions feed:", feed))
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
