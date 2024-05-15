import colors from "colors";
import { Client } from "youtubei";
export default async function playlistVideos({ playlistId, }) {
    try {
        const youtube = new Client();
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
        throw new Error(colors.red("@error: ") + error.message);
    }
}
//# sourceMappingURL=playlistVideos.js.map