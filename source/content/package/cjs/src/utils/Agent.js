"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoInfo = VideoInfo;
exports.default = Agent;
const colors_1 = __importDefault(require("colors"));
const Engine_1 = __importDefault(require("./Engine"));
const youtubei_1 = require("youtubei");
const YouTubeId_1 = __importDefault(require("./YouTubeId"));
async function VideoInfo({ videoId }) {
    try {
        const youtube = new youtubei_1.Client();
        const VideoInfoData = await youtube.getVideo(videoId);
        if (!VideoInfoData)
            throw new Error(`${colors_1.default.red("@error: ")} Unable to fetch video data for id: ${videoId}`);
        return {
            id: VideoInfoData.id,
            title: VideoInfoData.title,
            thumbnails: VideoInfoData.thumbnails,
            uploadDate: VideoInfoData.uploadDate,
            description: VideoInfoData.description,
            duration: VideoInfoData.duration,
            isLive: VideoInfoData.isLiveContent,
            viewCount: VideoInfoData.viewCount,
            channelid: VideoInfoData.channel?.id,
            channelname: VideoInfoData.channel?.name,
            tags: VideoInfoData.tags,
            likeCount: VideoInfoData.likeCount,
        };
    }
    catch (error) {
        throw new Error(`${colors_1.default.red("@error: ")} Error fetching video data: ${error.message}`);
    }
}
async function Agent({ query, useTor = false, verbose = false }) {
    if (verbose && useTor)
        console.log(colors_1.default.green("@info:"), "Using Tor for request anonymization");
    let url;
    const videoId = await (0, YouTubeId_1.default)(query);
    const youtube = new youtubei_1.Client();
    if (!videoId) {
        try {
            const searchResults = await youtube.search(query, { type: "video" });
            if (searchResults.items.length === 0)
                throw new Error(`${colors_1.default.red("@error: ")} Unable to find a video for query: ${query}`);
            const video = searchResults.items[0];
            console.log(colors_1.default.green("@info:"), "preparing payload for", video.title);
            url = `https://www.youtube.com/watch?v=${video.id}`;
        }
        catch (error) {
            throw new Error(`${colors_1.default.red("@error: ")} Error during video search: ${error.message}`);
        }
    }
    else {
        const TubeBody = await VideoInfo({ videoId });
        if (!TubeBody)
            throw new Error(`${colors_1.default.red("@error: ")} Unable to get video data for id: ${videoId}`);
        console.log(colors_1.default.green("@info:"), "preparing payload for", TubeBody.title);
        url = `https://www.youtube.com/watch?v=${TubeBody.id}`;
    }
    return await (0, Engine_1.default)({ query: url, useTor, verbose });
}
//# sourceMappingURL=Agent.js.map