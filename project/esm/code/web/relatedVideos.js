import colors from "colors";
import { Client } from "youtubei";
export default async function relatedVideos({ videoId }) {
    try {
        const youtube = new Client();
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
        throw new Error(colors.red("@error: ") + error.message);
    }
}
//# sourceMappingURL=relatedVideos.js.map