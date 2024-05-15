import playlistVideos from "./vercel/playlistVideos";
import type { playlistVideosType } from "./vercel/playlistVideos";
import relatedVideos from "./vercel/relatedVideos";
import type { relatedVideosType } from "./vercel/relatedVideos";
import searchPlaylists from "./vercel/searchPlaylists";
import type { searchPlaylistsType } from "./vercel/searchPlaylists";
import searchVideos from "./vercel/searchVideos";
import type { searchVideosType } from "./vercel/searchVideos";
import singleVideo from "./vercel/singleVideo";
import type { singleVideoType } from "./vercel/singleVideo";
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