import playlistVideos from "./playlistVideos";
import type { playlistVideosType } from "./playlistVideos";
import relatedVideos from "./relatedVideos";
import type { relatedVideosType } from "./relatedVideos";
import searchPlaylists from "./searchPlaylists";
import type { searchPlaylistsType } from "./searchPlaylists";
import searchVideos from "./searchVideos";
import type { searchVideosType } from "./searchVideos";
import singleVideo from "./singleVideo";
import type { singleVideoType } from "./singleVideo";
export type { singleVideoType, searchVideosType, relatedVideosType, playlistVideosType, searchPlaylistsType, };
declare const web: {
    singleVideo: typeof singleVideo;
    searchVideos: typeof searchVideos;
    relatedVideos: typeof relatedVideos;
    playlistVideos: typeof playlistVideos;
    searchPlaylists: typeof searchPlaylists;
};
export default web;
//# sourceMappingURL=index.d.ts.map