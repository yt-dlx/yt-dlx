"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const YouTubeId_1 = __importDefault(require("../../web/YouTubeId"));
const web_1 = __importDefault(require("../../web"));
/**
 * Searches for YouTube videos based on the query.
 *
 * @param query - The search query for videos.
 * @returns A Promise that resolves with the search results for videos.
 * @throws An error if the input is a video link (use video_data instead) or if unable to get a response.
 */
async function search_videos({ query, }) {
    const isID = await (0, YouTubeId_1.default)(query);
    if (isID) {
        throw new Error(colors_1.default.red("@error: ") + "use video_data() for video link!");
    }
    else {
        const metaData = await web_1.default.searchVideos({ query });
        if (!metaData) {
            throw new Error(colors_1.default.red("@error: ") + "Unable to get response!");
        }
        else
            return metaData;
    }
}
exports.default = search_videos;
//# sourceMappingURL=search_videos.js.map