import colors from "colors";
import { z, ZodError } from "zod";
import { EventEmitter } from "events";
import TubeResponse from "../../interfaces/TubeResponse";
import TubeLogin, { TubeType } from "../../utils/TubeLogin";
import sanitizeContentItem from "../../utils/sanitizeContentItem";
const ZodSchema = z.object({ cookies: z.string(), verbose: z.boolean().optional(), sort: z.enum(["oldest", "newest", "old-to-new", "new-to-old"]).optional() });
/**
 * Fetches the watch history of a user.
 *
 * This function requires valid cookies to authenticate and retrieve the user's watch history, including both regular videos and shorts.
 * It supports optional verbose logging and sorting of the returned history.
 *
 * @param {object} options - An object containing the configuration options for fetching the watch history.
 * @param {string} options.cookies - The user's cookies as a string. This is a mandatory parameter for authentication.
 * @param {boolean} [options.verbose=false] - An optional boolean value that, if set to `true`, enables verbose logging to the console, providing more detailed information about the process.
 * @param {("oldest" | "newest" | "old-to-new" | "new-to-old")} [options.sort] - An optional string specifying how the watch history should be sorted. Available options include:
 * - `"oldest"`: Removes all but the oldest video and short from the history.
 * - `"newest"`: Removes all but the newest video and short from the history.
 * - `"old-to-new"`: Sorts videos and shorts by their video ID in ascending order (oldest first).
 * - `"new-to-old"`: Sorts videos and shorts by their video ID in descending order (newest first).
 *
 * @returns {EventEmitter} An EventEmitter instance that emits events during the history fetching process.
 * The following events can be listened to:
 * - `"data"`: Emitted when the watch history data is successfully fetched and processed. The data is an object with the following structure:
 * ```typescript
 * {
 * status: "success";
 * data: {
 * Shorts: any[]; // Array of watched short video objects
 * Videos: any[]; // Array of watched regular video objects
 * };
 * }
 * ```
 * - `"error"`: Emitted when an error occurs during any stage of the process, including argument validation, cookie initialization, or network requests. The emitted data is the error message or object.
 *
 */
export default function watch_history(options: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse(options);
      const { verbose, cookies, sort } = options;
      if (verbose) console.log(colors.green("@info:"), "Fetching watch history...");
      if (!cookies) {
        emitter.emit("error", `${colors.red("@error:")} cookies not provided!`);
        return;
      }
      const client: TubeType = await TubeLogin(cookies);
      if (!client) {
        emitter.emit("error", `${colors.red("@error:")} Could not initialize Tube client.`);
        return;
      }
      const history = await client.getHistory();
      if (!history) {
        emitter.emit("error", `${colors.red("@error:")} Failed to fetch watch history.`);
        return;
      }
      const result: TubeResponse<{ Shorts: any[]; Videos: any[] }> = { status: "success", data: { Shorts: [], Videos: [] } };
      history.sections?.forEach(section => {
        section.contents?.forEach(content => {
          const sanitized = sanitizeContentItem(content);
          if (sanitized?.type === "ReelShelf") {
            const shorts = sanitized.items?.map((item: any) => ({ title: item?.accessibility_text, videoId: item?.on_tap_endpoint?.payload?.videoId, thumbnails: item?.thumbnail })) || [];
            if (result.data?.Shorts) result.data.Shorts.push(...shorts);
          } else if (sanitized?.type === "Video") {
            const video = { title: sanitized?.title?.text, videoId: sanitized?.videoId, thumbnails: sanitized?.thumbnails, description: sanitized?.description || "" };
            if (result.data?.Videos) result.data.Videos.push(video);
          }
        });
      });
      switch (sort) {
        case "oldest":
          if (result.data?.Shorts && result.data.Shorts.length > 0) result.data.Shorts.splice(0, result.data.Shorts.length - 1);
          if (result.data?.Videos && result.data.Videos.length > 0) result.data.Videos.splice(0, result.data.Videos.length - 1);
          break;
        case "newest":
          if (result.data?.Shorts && result.data.Shorts.length > 1) result.data.Shorts.splice(1);
          if (result.data?.Videos && result.data.Videos.length > 1) result.data.Videos.splice(1);
          break;
        case "old-to-new":
          if (result.data?.Shorts) result.data.Shorts.sort((a, b) => a.videoId.localeCompare(b.videoId));
          if (result.data?.Videos) result.data.Videos.sort((a, b) => a.videoId.localeCompare(b.videoId));
          break;
        case "new-to-old":
          if (result.data?.Shorts) result.data.Shorts.sort((a, b) => b.videoId.localeCompare(a.videoId));
          if (result.data?.Videos) result.data.Videos.sort((a, b) => b.videoId.localeCompare(a.videoId));
          break;
      }
      if (verbose) console.log(colors.green("@info:"), "Watch history fetched!");
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
