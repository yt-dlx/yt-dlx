"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const YouTubeId_1 = __importDefault(require("../../web/YouTubeId"));
const web_1 = __importDefault(require("../../web"));
/**
 * Searches for YouTube playlists based on the query.
 *
 * @param query - The search query for playlists.
 * @returns A Promise that resolves with the search results for playlists.
 * @throws An error if the input is a playlist link (use playlist_data instead) or if unable to get a response.
 */
async function search_playlists({ query, }) {
    const isID = await (0, YouTubeId_1.default)(query);
    if (isID) {
        throw new Error(colors_1.default.red("@error: ") + "use playlist_data() for playlist link!");
    }
    else {
        const metaData = await web_1.default.searchPlaylists({ query });
        if (!metaData) {
            throw new Error(colors_1.default.red("@error: ") + "Unable to get response!");
        }
        else
            return metaData;
    }
}
exports.default = search_playlists;
//# sourceMappingURL=search_playlists.js.map