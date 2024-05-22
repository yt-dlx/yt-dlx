import colors from "colors";
import { Client } from "youtubei";
export default async function searchPlaylists({ query }) {
    try {
        const youtube = new Client();
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
        throw new Error(colors.red("@error: ") + error.message);
    }
}
//# sourceMappingURL=searchPlaylists.js.map