"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const youtubei_1 = require("youtubei");
async function searchVideos({ query }) {
    try {
        const youtube = new youtubei_1.Client();
        const searchVideos = await youtube.search(query, { type: "video" });
        const result = searchVideos.items.map((item) => ({
            id: item.id,
            title: item.title,
            isLive: item.isLive,
            duration: item.duration,
            viewCount: item.viewCount,
            uploadDate: item.uploadDate,
            channelid: item.channel.id,
            channelname: item.channel.name,
            description: item.description,
            thumbnails: item.thumbnails,
        }));
        return result;
    }
    catch (error) {
        throw new Error(colors_1.default.red("@error: ") + error.message);
    }
}
exports.default = searchVideos;
//# sourceMappingURL=searchVideos.js.map