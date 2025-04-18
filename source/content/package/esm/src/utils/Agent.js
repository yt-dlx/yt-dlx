import colors from "colors";
import Engine from "./Engine";
import { Client } from "youtubei";
import YouTubeID from "./YouTubeId";
export async function VideoInfo({ videoId }) {
    try {
        const youtube = new Client();
        const VideoInfoData = await youtube.getVideo(videoId);
        if (!VideoInfoData)
            throw new Error(`${colors.red("@error: ")} Unable to fetch video data for id: ${videoId}`);
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
        throw new Error(`${colors.red("@error: ")} Error fetching video data: ${error.message}`);
    }
}
export default async function Agent({ query, useTor = false, verbose = false }) {
    if (verbose && useTor)
        console.log(colors.green("@info:"), "Using Tor for request anonymization");
    let url;
    const videoId = await YouTubeID(query);
    const youtube = new Client();
    if (!videoId) {
        try {
            const searchResults = await youtube.search(query, { type: "video" });
            if (searchResults.items.length === 0)
                throw new Error(`${colors.red("@error: ")} Unable to find a video for query: ${query}`);
            const video = searchResults.items[0];
            console.log(colors.green("@info:"), "preparing payload for", video.title);
            url = `https://www.youtube.com/watch?v=${video.id}`;
        }
        catch (error) {
            throw new Error(`${colors.red("@error: ")} Error during video search: ${error.message}`);
        }
    }
    else {
        const TubeBody = await VideoInfo({ videoId });
        if (!TubeBody)
            throw new Error(`${colors.red("@error: ")} Unable to get video data for id: ${videoId}`);
        console.log(colors.green("@info:"), "preparing payload for", TubeBody.title);
        url = `https://www.youtube.com/watch?v=${TubeBody.id}`;
    }
    return await Engine({ query: url, useTor, verbose });
}
//# sourceMappingURL=Agent.js.map