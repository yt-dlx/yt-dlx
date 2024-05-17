"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const YouTubeId_1 = __importDefault(require("../../web/YouTubeId"));
const web_1 = __importDefault(require("../../web"));
/**
 * Extracts metadata for videos in a YouTube playlist.
 *
 * @param query - The YouTube playlist URL or ID for which to extract metadata.
 * @returns A Promise that resolves with the metadata of videos in the playlist.
 * @throws An error if the playlist link is incorrect or if unable to get a response.
 */
async function playlist_data({ query, }) {
    const playlistId = await (0, YouTubeId_1.default)(query);
    if (!playlistId) {
        throw new Error(colors_1.default.red("@error: ") + "incorrect playlist link");
    }
    else {
        const metaData = await web_1.default.playlistVideos({ playlistId });
        if (!metaData) {
            throw new Error(colors_1.default.red("@error: ") + "Unable to get response!");
        }
        else
            return metaData;
    }
}
exports.default = playlist_data;
//# sourceMappingURL=playlist_data.js.map