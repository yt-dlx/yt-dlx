import colors from "colors";
import { z, ZodError } from "zod";
import { EventEmitter } from "events";
import extractText from "../../../utils/extractText";
import TubeResponse from "../../../interfaces/TubeResponse";
import sanitizeRenderer from "../../../utils/sanitizeRenderer";
import TubeLogin, { TubeType } from "../../../utils/TubeLogin";
import sanitizeContentItem from "../../../utils/sanitizeContentItem";
/**
 * Zod schema for validating input parameters for fetching the library.
 *
 * @typedef {object} LibraryParams
 * @property {string} cookiesPath - Path to the cookies file for authentication.
 * @property {boolean} [verbose] - Optional flag to enable verbose logging.
 */
const ZodSchema = z.object({ cookiesPath: z.string(), verbose: z.boolean().optional() });
/**
 * Fetches the user's library from YouTube and emits the result.
 *
 * This function validates input parameters using a Zod schema, authenticates with YouTube using the provided cookies path,
 * and emits sanitized library data via an EventEmitter. It supports verbose logging for debugging.
 *
 * @function Library
 * @param {object} options - Parameters for fetching the library.
 * @param {string} options.cookiesPath - Path to the cookies file for authentication.
 * @param {boolean} [options.verbose] - Whether to enable verbose logging.
 * @returns {EventEmitter} The event emitter to handle `data` and `error` events.
 *
 * @example
 * const emitter = Library({ cookiesPath: "./cookies.txt", verbose: true });
 * emitter.on("data", data => console.log(data));
 * emitter.on("error", error => console.error(error));
 */
export default function Library(options: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse(options);
      const { verbose, cookiesPath } = options;
      if (verbose) console.log(colors.green("@info:"), "Fetching library...");
      if (!cookiesPath) {
        emitter.emit("error", `${colors.red("@error:")} incorrect 'cookiesPath' provided!`);
        return;
      }
      const client: TubeType = await TubeLogin(cookiesPath);
      const library = await client.getLibrary();
      const result: TubeResponse<{ header: any; sections: any[] }> = {
        status: "success",
        data: {
          header: {
            type: library.header?.type || "",
            pageTitle: library.header?.page_title || "",
            content: {
              type: library.header?.content?.type || "",
              banner: library.header?.content?.banner || null,
              title: extractText(library.header?.content?.title),
              heroImage: library.header?.content?.hero_image || null,
              image: sanitizeRenderer(library.header?.content?.image),
              description: library.header?.content?.description || null,
              actions: sanitizeRenderer(library.header?.content?.actions),
              attributation: library.header?.content?.attributation || null,
              metadata: sanitizeRenderer(library.header?.content?.metadata),
              animatedImage: library.header?.content?.animated_image || null,
            },
          },
          sections:
            library.sections?.map((section: any) => ({
              type: section.type,
              header: sanitizeRenderer(section.header?.[0]),
              contents: section.contents?.map(sanitizeContentItem) || [],
            })) || [],
        },
      };
      if (verbose) console.log(colors.green("@info:"), "Library fetched:", JSON.stringify(result, null, 2));
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
