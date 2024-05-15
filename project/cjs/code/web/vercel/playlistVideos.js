"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const youtubei_1 = require("youtubei");
async function playlistVideos({ playlistId, }) {
    try {
        const youtube = new youtubei_1.Client();
        const playlistVideos = await youtube.getPlaylist(playlistId);
        const result = playlistVideos.videos.items.map((item) => ({
            id: item.id,
            title: item.title,
            isLive: item.isLive,
            duration: item.duration,
            thumbnails: item.thumbnails,
        }));
        return {
            id: playlistVideos.id,
            title: playlistVideos.title,
            videoCount: playlistVideos.videoCount,
            result,
        };
    }
    catch (error) {
        throw new Error(colors_1.default.red("@error: ") + error.message);
    }
}
exports.default = playlistVideos;
//# sourceMappingURL=playlistVideos.js.map