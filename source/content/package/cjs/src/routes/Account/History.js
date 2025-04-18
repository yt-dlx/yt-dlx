"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = watch_history;
const colors_1 = __importDefault(require("colors"));
const zod_1 = require("zod");
const events_1 = require("events");
const TubeLogin_1 = __importDefault(require("../../utils/TubeLogin"));
const sanitizeContentItem_1 = __importDefault(require("../../utils/sanitizeContentItem"));
const ZodSchema = zod_1.z.object({ cookies: zod_1.z.string(), verbose: zod_1.z.boolean().optional(), sort: zod_1.z.enum(["oldest", "newest", "old-to-new", "new-to-old"]).optional() });
/**
 * @shortdesc Fetches the user's watch history, including videos and shorts, with optional sorting.
 *
 * @description This function allows you to retrieve a user's watch history from the platform. It requires valid cookies for authentication and can fetch both regular videos and short videos from the history. The function supports optional verbose logging to provide more details during the process. Additionally, it offers various sorting options to organize the fetched history according to your needs.
 *
 * The function provides the following configuration options:
 * - **Cookies:** The user's cookies as a string. This is a mandatory parameter required for authenticating the request and accessing the watch history.
 * - **Verbose:** An optional boolean value that, if true, enables detailed logging to the console, providing more information about the steps taken during the history fetching process.
 * - **Sort:** An optional string specifying how the watch history should be sorted. Available options include:
 * - `"oldest"`: Keeps only the oldest viewed video and the oldest viewed short in the history.
 * - `"newest"`: Keeps only the newest viewed video and the newest viewed short in the history.
 * - `"old-to-new"`: Sorts both videos and shorts by their video ID in ascending order, effectively showing the oldest watched items first.
 * - `"new-to-old"`: Sorts both videos and shorts by their video ID in descending order, showing the newest watched items first.
 *
 * The function returns an EventEmitter instance that emits events during the history fetching process:
 * - `"data"`: Emitted when the watch history data is successfully fetched and processed. The emitted data is an object containing the status and the fetched history, separated into `Shorts` and `Videos` arrays.
 * - `"error"`: Emitted when an error occurs during any stage of the process, such as argument validation, cookie initialization, or network requests. The emitted data is the error message or object.
 *
 * @param {object} options - An object containing the configuration options.
 * @param {string} options.cookies - The user's cookies as a string. **Required**.
 * @param {boolean} [options.verbose=false] - Enable verbose logging.
 * @param {("oldest" | "newest" | "old-to-new" | "new-to-old")} [options.sort] - Specify how the watch history should be sorted.
 *
 * @returns {EventEmitter} An EventEmitter instance for handling events during watch history fetching.
 *
 * @example
 * // 1. Fetch watch history with provided cookies
 * const cookies = "YOUR_COOKIES_HERE";
 * YouTubeDLX.Account.History({ cookies })
 * .on("data", (data) => console.log("Watch History:", data))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 2. Fetch watch history with verbose logging
 * const cookies = "YOUR_COOKIES_HERE";
 * YouTubeDLX.Account.History({ cookies, verbose: true })
 * .on("data", (data) => console.log("Watch History:", data))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 3. Fetch watch history and sort by oldest
 * const cookies = "YOUR_COOKIES_HERE";
 * YouTubeDLX.Account.History({ cookies, sort: "oldest" })
 * .on("data", (data) => console.log("Oldest Watched:", data))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 4. Fetch watch history and keep only the newest watched items
 * const cookies = "YOUR_COOKIES_HERE";
 * YouTubeDLX.Account.History({ cookies, sort: "newest" })
 * .on("data", (data) => console.log("Newest Watched:", data))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 5. Fetch watch history and sort from oldest to newest
 * const cookies = "YOUR_COOKIES_HERE";
 * YouTubeDLX.Account.History({ cookies, sort: "old-to-new" })
 * .on("data", (data) => console.log("Watch History (Old to New):", data))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 6. Fetch watch history and sort from newest to oldest
 * const cookies = "YOUR_COOKIES_HERE";
 * YouTubeDLX.Account.History({ cookies, sort: "new-to-old" })
 * .on("data", (data) => console.log("Watch History (New to Old):", data))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 7. Fetch watch history with verbose logging and sort by oldest
 * const cookies = "YOUR_COOKIES_HERE";
 * YouTubeDLX.Account.History({ cookies, verbose: true, sort: "oldest" })
 * .on("data", (data) => console.log("Oldest Watched (Verbose):", data))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 8. Fetch watch history with verbose logging and keep only the newest watched items
 * const cookies = "YOUR_COOKIES_HERE";
 * YouTubeDLX.Account.History({ cookies, verbose: true, sort: "newest" })
 * .on("data", (data) => console.log("Newest Watched (Verbose):", data))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 9. Fetch watch history with verbose logging and sort from oldest to newest
 * const cookies = "YOUR_COOKIES_HERE";
 * YouTubeDLX.Account.History({ cookies, verbose: true, sort: "old-to-new" })
 * .on("data", (data) => console.log("Watch History (Old to New, Verbose):", data))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 10. Fetch watch history with verbose logging and sort from newest to oldest
 * const cookies = "YOUR_COOKIES_HERE";
 * YouTubeDLX.Account.History({ cookies, verbose: true, sort: "new-to-old" })
 * .on("data", (data) => console.log("Watch History (New to Old, Verbose):", data))
 * .on("error", (error) => console.error("Error:", error));
 */
function watch_history(options) {
    const emitter = new events_1.EventEmitter();
    (async () => {
        try {
            ZodSchema.parse(options);
            const { verbose, cookies, sort } = options;
            if (verbose)
                console.log(colors_1.default.green("@info:"), "Fetching watch history...");
            if (!cookies) {
                emitter.emit("error", `${colors_1.default.red("@error:")} cookies not provided!`);
                return;
            }
            const client = await (0, TubeLogin_1.default)(cookies);
            if (!client) {
                emitter.emit("error", `${colors_1.default.red("@error:")} Could not initialize Tube client.`);
                return;
            }
            const history = await client.getHistory();
            if (!history) {
                emitter.emit("error", `${colors_1.default.red("@error:")} Failed to fetch watch history.`);
                return;
            }
            const result = { status: "success", data: { Shorts: [], Videos: [] } };
            history.sections?.forEach(section => {
                section.contents?.forEach(content => {
                    const sanitized = (0, sanitizeContentItem_1.default)(content);
                    if (sanitized?.type === "ReelShelf") {
                        const shorts = sanitized.items?.map((item) => ({ title: item?.accessibility_text, videoId: item?.on_tap_endpoint?.payload?.videoId, thumbnails: item?.thumbnail })) || [];
                        if (result.data?.Shorts)
                            result.data.Shorts.push(...shorts);
                    }
                    else if (sanitized?.type === "Video") {
                        const video = { title: sanitized?.title?.text, videoId: sanitized?.videoId, thumbnails: sanitized?.thumbnails, description: sanitized?.description || "" };
                        if (result.data?.Videos)
                            result.data.Videos.push(video);
                    }
                });
            });
            switch (sort) {
                case "oldest":
                    if (result.data?.Shorts && result.data.Shorts.length > 0)
                        result.data.Shorts.splice(0, result.data.Shorts.length - 1);
                    if (result.data?.Videos && result.data.Videos.length > 0)
                        result.data.Videos.splice(0, result.data.Videos.length - 1);
                    break;
                case "newest":
                    if (result.data?.Shorts && result.data.Shorts.length > 1)
                        result.data.Shorts.splice(1);
                    if (result.data?.Videos && result.data.Videos.length > 1)
                        result.data.Videos.splice(1);
                    break;
                case "old-to-new":
                    if (result.data?.Shorts)
                        result.data.Shorts.sort((a, b) => a.videoId.localeCompare(b.videoId));
                    if (result.data?.Videos)
                        result.data.Videos.sort((a, b) => a.videoId.localeCompare(b.videoId));
                    break;
                case "new-to-old":
                    if (result.data?.Shorts)
                        result.data.Shorts.sort((a, b) => b.videoId.localeCompare(a.videoId));
                    if (result.data?.Videos)
                        result.data.Videos.sort((a, b) => b.videoId.localeCompare(a.videoId));
                    break;
            }
            if (verbose)
                console.log(colors_1.default.green("@info:"), "Watch history fetched!");
            emitter.emit("data", result);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError)
                emitter.emit("error", `${colors_1.default.red("@error:")} Argument validation failed: ${error.errors.map(e => `${e.path.join(".")}: ${e.message}`).join(", ")}`);
            else if (error instanceof Error)
                emitter.emit("error", `${colors_1.default.red("@error:")} ${error.message}`);
            else
                emitter.emit("error", `${colors_1.default.red("@error:")} An unexpected error occurred: ${String(error)}`);
        }
        finally {
            console.log(colors_1.default.green("@info:"), "❣️ Thank you for using yt-dlx. Consider 🌟starring the GitHub repo https://github.com/yt-dlx.");
        }
    })();
    return emitter;
}
//# sourceMappingURL=History.js.map