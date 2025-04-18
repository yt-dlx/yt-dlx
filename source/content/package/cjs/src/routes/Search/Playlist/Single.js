"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = playlist_data;
const colors_1 = __importDefault(require("colors"));
const zod_1 = require("zod");
const youtubei_1 = require("youtubei");
const events_1 = require("events");
const YouTubeId_1 = __importDefault(require("../../../utils/YouTubeId"));
const ZodSchema = zod_1.z.object({ playlistLink: zod_1.z.string().min(2) });
async function playlistVideos({ playlistId }, emitter) {
    try {
        const youtube = new youtubei_1.Client();
        const playlistVideosData = await youtube.getPlaylist(playlistId);
        if (!playlistVideosData) {
            emitter.emit("error", `${colors_1.default.red("@error: ")} Unable to fetch playlist data.`);
            return null;
        }
        const result = playlistVideosData.videos.items.map((item) => ({ id: item.id, title: item.title, isLive: item.isLive, duration: item.duration, thumbnails: item.thumbnails }));
        return { id: playlistVideosData.id, title: playlistVideosData.title, videoCount: playlistVideosData.videoCount, result };
    }
    catch (error) {
        emitter.emit("error", `${colors_1.default.red("@error: ")} ${error.message}`);
        return null;
    }
}
/**
 * @shortdesc Fetches data for a YouTube playlist.
 *
 * @description This function retrieves details about a YouTube playlist, including its title, video count, and a list of videos within the playlist. It requires a valid YouTube playlist link as input.
 *
 * The function takes the playlist link, extracts the playlist ID, and then uses the YouTube API (via the youtubei library) to fetch the playlist information and the list of videos it contains.
 *
 * It supports the following configuration options:
 * - **playlistLink:** A string containing the URL of the YouTube playlist. This is a mandatory parameter. The function will attempt to extract the playlist ID from this link.
 *
 * The function returns an EventEmitter instance that emits events during the process:
 * - `"data"`: Emitted when the playlist data is successfully fetched and processed. The emitted data is an object containing the playlist's ID, title, video count, and an array of video objects (each with id, title, isLive, duration, and thumbnails).
 * - `"error"`: Emitted when an error occurs at any stage, such as argument validation, failure to extract the playlist ID from the link, or failure to fetch data from the YouTube API. The emitted data is the error message.
 *
 * @param {object} options - An object containing the configuration options.
 * @param {string} options.playlistLink - The URL of the YouTube playlist. **Required**.
 *
 * @returns {EventEmitter} An EventEmitter instance for handling events during playlist data fetching.
 *
 * @example
 * // 1. Fetch data for a valid playlist link
 * const playlistLink = "https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID_HERE";
 * YouTubeDLX.Search.Playlist.Single({ playlistLink })
 * .on("data", (data) => console.log("Playlist Data:", data))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 2. Missing required 'playlistLink' parameter (will result in a Zod error)
 * YouTubeDLX.Search.Playlist.Single({} as any)
 * .on("error", (error) => console.error("Expected Error (missing playlistLink):", error));
 *
 * @example
 * // 3. Invalid playlist link provided (fails YouTubeID extraction)
 * const invalidLink = "https://www.youtube.com/watch?v=SOME_VIDEO_ID"; // Not a playlist link
 * YouTubeDLX.Search.Playlist.Single({ playlistLink: invalidLink })
 * .on("error", (error) => console.error("Expected Error (incorrect playlist link):", error));
 *
 * @example
 * // 4. Playlist data fetching fails (e.g., playlist is private or doesn't exist)
 * // Note: This scenario depends on the youtubei library's behavior for inaccessible/non-existent playlists.
 * // The error emitted would likely be: "@error: Unable to fetch playlist data." or an error from youtubei.
 * const nonExistentPlaylistLink = "https://www.youtube.com/playlist?list=NON_EXISTENT_PLAYLIST_ID_12345";
 * YouTubeDLX.Search.Playlist.Single({ playlistLink: nonExistentPlaylistLink })
 * .on("error", (error) => console.error("Expected Error (unable to retrieve playlist information):", error));
 *
 */
function playlist_data({ playlistLink }) {
    const emitter = new events_1.EventEmitter();
    (async () => {
        try {
            ZodSchema.parse({ playlistLink });
            const playlistId = await (0, YouTubeId_1.default)(playlistLink);
            if (!playlistId) {
                emitter.emit("error", `${colors_1.default.red("@error: ")} Incorrect playlist link provided.`);
                return;
            }
            const metaData = await playlistVideos({ playlistId }, emitter);
            if (!metaData) {
                emitter.emit("error", `${colors_1.default.red("@error: ")} Unable to retrieve playlist information.`);
                return;
            }
            emitter.emit("data", metaData);
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
//# sourceMappingURL=Single.js.map