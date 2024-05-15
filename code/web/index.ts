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

export type {
  singleVideoType,
  searchVideosType,
  relatedVideosType,
  playlistVideosType,
  searchPlaylistsType,
};

const web = {
  singleVideo,
  searchVideos,
  relatedVideos,
  playlistVideos,
  searchPlaylists,
};
export default web;
