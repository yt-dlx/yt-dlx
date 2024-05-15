"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const youtubei_1 = require("youtubei");
async function relatedVideos({ videoId }) {
    try {
        const youtube = new youtubei_1.Client();
        const relatedVideos = await youtube.getVideo(videoId);
        const result = relatedVideos.related.items.map((item) => ({
            id: item.id,
            title: item.title,
            isLive: item.isLive,
            duration: item.duration,
            uploadDate: item.uploadDate,
            thumbnails: item.thumbnails,
        }));
        return result;
    }
    catch (error) {
        throw new Error(colors_1.default.red("@error: ") + error.message);
    }
}
exports.default = relatedVideos;
//# sourceMappingURL=relatedVideos.js.map