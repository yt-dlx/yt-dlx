import colors from "colors";
import { z, ZodError } from "zod";
import { EventEmitter } from "events";
import extractText from "../../../utils/extractText";
import TubeResponse from "../../../interfaces/TubeResponse";
import TubeLogin, { TubeType } from "../../../utils/TubeLogin";
import sanitizeContentItem from "../../../utils/sanitizeContentItem";
/**
 * Zod schema for validating input parameters for fetching the home feed.
 *
 * @typedef {object} HomeFeedParams
 * @property {string} cookiesPath - Path to the cookies file for authentication.
 * @property {boolean} [verbose] - Optional flag to enable verbose logging.
 */
const ZodSchema = z.object({ cookiesPath: z.string(), verbose: z.boolean().optional() });
/**
 * Sanitizes a feed filter chip bar object to a standardized format.
 *
 * @function sanitizeFeedFilterChipBar
 * @param {any} chipBar - The raw chip bar object from YouTube.
 * @returns {any} The sanitized chip bar object.
 */
function sanitizeFeedFilterChipBar(chipBar: any): any {
  return {
    type: chipBar?.type || "",
    contents:
      chipBar?.contents?.map((chip: any) => ({
        text: extractText(chip.text),
        isSelected: chip.isSelected || false,
      })) || [],
  };
}
/**
 * Fetches the home feed from YouTube and emits the result.
 *
 * This function validates input parameters using a Zod schema, authenticates with YouTube using the provided cookies path,
 * and emits sanitized home feed data via an EventEmitter. It supports verbose logging for debugging.
 *
 * @function Home_Feed
 * @param {object} options - Parameters for fetching the home feed.
 * @param {string} options.cookiesPath - Path to the cookies file for authentication.
 * @param {boolean} [options.verbose] - Whether to enable verbose logging.
 * @returns {EventEmitter} The event emitter to handle `data` and `error` events.
 *
 * @example
 * const emitter = Home_Feed({ cookiesPath: "./cookies.txt", verbose: true });
 * emitter.on("data", data => console.log(data));
 * emitter.on("error", error => console.error(error));
 */
export default function Home_Feed(options: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse(options);
      const { verbose, cookiesPath } = options;
      if (verbose) console.log(colors.green("@info:"), "Fetching home feed...");
      if (!cookiesPath) {
        emitter.emit("error", `${colors.red("@error:")} incorrect 'cookiesPath' provided!`);
        return;
      }
      const client: TubeType = await TubeLogin(cookiesPath);
      const homeFeed = await client.getHomeFeed();
      const result: TubeResponse<{ header: any; contents: any }> = {
        status: "success",
        data: {
          header: {
            type: homeFeed.header?.type || "",
            title: extractText(homeFeed.header?.title),
          },
          contents: {
            type: homeFeed.contents?.type || "",
            targetId: (homeFeed.contents as any)?.target_id || "",
            header: sanitizeFeedFilterChipBar((homeFeed.contents as any)?.header),
            contents: (homeFeed.contents as any)?.contents?.map(sanitizeContentItem) || [],
          },
        },
      };
      if (verbose) console.log(colors.green("@info:"), "Home feed fetched:", JSON.stringify(result, null, 2));
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
