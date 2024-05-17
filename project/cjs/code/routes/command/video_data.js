"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const YouTubeId_1 = __importDefault(require("../../web/YouTubeId"));
const web_1 = __importDefault(require("../../web"));
/**
 * Fetches data for a single YouTube video based on the video ID or link.
 *
 * @param query - The video ID or link.
 * @returns A Promise that resolves with the metadata for the single video.
 * @throws An error if the input is an incorrect video link or if unable to get a response.
 */
async function video_data({ query, }) {
    const videoId = await (0, YouTubeId_1.default)(query);
    if (!videoId) {
        throw new Error(colors_1.default.red("@error: ") + "incorrect playlist link");
    }
    else {
        const metaData = await web_1.default.singleVideo({ videoId });
        if (!metaData) {
            throw new Error(colors_1.default.red("@error: ") + "Unable to get response!");
        }
        else
            return metaData;
    }
}
exports.default = video_data;
//# sourceMappingURL=video_data.js.map