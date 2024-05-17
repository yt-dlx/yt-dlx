import colors from "colors";
import { Client } from "youtubei";
export default async function searchVideos({ query }) {
    try {
        const youtube = new Client();
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
        throw new Error(colors.red("@error: ") + error.message);
    }
}
//# sourceMappingURL=searchVideos.js.map