import colors from "colors";
import { Client } from "youtubei";
export default async function singleVideo({ videoId }) {
    try {
        const youtube = new Client();
        const singleVideo = await youtube.getVideo(videoId);
        return {
            id: singleVideo.id,
            title: singleVideo.title,
            thumbnails: singleVideo.thumbnails,
            uploadDate: singleVideo.uploadDate,
            description: singleVideo.description,
            duration: singleVideo.duration,
            isLive: singleVideo.isLiveContent,
            viewCount: singleVideo.viewCount,
            channelid: singleVideo.channel.id,
            channelname: singleVideo.channel.name,
            tags: singleVideo.tags,
            likeCount: singleVideo.likeCount,
        };
    }
    catch (error) {
        throw new Error(colors.red("@error: ") + error.message);
    }
}
//# sourceMappingURL=singleVideo.js.map