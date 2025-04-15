import colors from "colors";
import { z, ZodError } from "zod";
import { EventEmitter } from "events";
import TubeResponse from "../../interfaces/TubeResponse";
import TubeLogin, { TubeType } from "../../utils/TubeLogin";
import sanitizeContentItem from "../../utils/sanitizeContentItem";
const ZodSchema = z.object({ cookies: z.string(), verbose: z.boolean().optional() });
/**
 * Fetches the subscriptions feed for the user based on the provided parameters.
 *
 * @param {Object} options - The options for fetching the subscriptions feed.
 * @param {string} options.cookies - YouTube authentication cookies string.
 * @param {boolean} [options.verbose] - Flag to enable verbose output. Optional.
 *
 * @returns {EventEmitter} An EventEmitter object that emits the following events:
 * - "data": Contains the fetched subscriptions feed data.
 * - "error": Emits an error message if the fetching fails.
 *
 * @example
 * // Example 1: Fetch subscriptions feed with cookies string
 * await YouTubeDLX.Account.SubscriptionsFeed({ cookies: "COOKIE_STRING" })
 *   .on("data", (feed) => console.log("Subscriptions feed:", feed))
 *   .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 2: Fetch subscriptions feed with cookies string and verbose output enabled
 * await YouTubeDLX.Account.SubscriptionsFeed({ cookies: "COOKIE_STRING", verbose: true })
 *   .on("data", (feed) => console.log("Subscriptions feed:", feed))
 *   .on("error", (err) => console.error("Error:", err));
 */
export default async function subscriptions_feed(options: z.infer<typeof ZodSchema>): Promise<EventEmitter<[never]>> {
  const emitter = new EventEmitter();
  return new Promise(async (resolve, reject) => {
    try {
      ZodSchema.parse(options);
      const { verbose, cookies } = options;
      if (verbose) console.log(colors.green("@info:"), "Fetching subscriptions feed...");
      if (!cookies) {
        emitter.emit("error", `${colors.red("@error:")} cookies not provided!`);
        return;
      }
      const client: TubeType = await TubeLogin(cookies);
      const feed = await client.getSubscriptionsFeed();
      const contents = (feed as any).contents?.map(sanitizeContentItem) || [];
      const result: TubeResponse<{ contents: any[] }> = { status: "success", data: { contents } };
      if (verbose) console.log(colors.green("@info:"), "Subscriptions feed fetched!");
      emitter.emit("data", result);
      resolve(emitter);
    } catch (error) {
      if (error instanceof ZodError) emitter.emit("error", error.errors);
      else if (error instanceof Error) emitter.emit("error", error.message);
      else emitter.emit("error", String(error));
      reject(error);
    } finally {
      console.log(colors.green("@info:"), "❣️ Thank you for using yt-dlx. Consider 🌟starring the GitHub repo https://github.com/yt-dlx.");
    }
  });
}
