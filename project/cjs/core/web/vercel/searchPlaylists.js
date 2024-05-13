"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const youtubei_1 = require("youtubei");
async function searchPlaylists({ query }) {
    try {
        const youtube = new youtubei_1.Client();
        const searchPlaylists = await youtube.search(query, { type: "playlist" });
        const result = searchPlaylists.items.map((item) => ({
            id: item.id,
            title: item.title,
            videoCount: item.videoCount,
            thumbnails: item.thumbnails,
        }));
        return result;
    }
    catch (error) {
        throw new Error(colors_1.default.red("@error: ") + error.message);
    }
}
exports.default = searchPlaylists;
//# sourceMappingURL=searchPlaylists.js.map