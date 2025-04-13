/* eslint-disable @typescript-eslint/no-explicit-any */
import ytdlx from "yt-dlx";
import { NextRequest, NextResponse } from "next/server";
const ytdlxPromise = (instance: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    instance.on("data", (data: any) => resolve(data));
    instance.on("metadata", (metadata: any) => resolve(metadata));
    instance.on("error", (error: any) => reject(error.message || error));
  });
};
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const action = searchParams.get("action");
  const videoId = searchParams.get("videoId");
  const videoLink = searchParams.get("videoLink");
  const resolution = searchParams.get("resolution");
  const playlistLink = searchParams.get("playlistLink");
  try {
    switch (action) {
      case "AudioOnlyCustomData": {
        if (!query) return NextResponse.json({ error: "Missing query parameter." }, { status: 400 });
        if (!["high", "medium", "low", "ultralow"].includes(resolution || "")) {
          return NextResponse.json({ error: "Invalid or missing resolution parameter." }, { status: 400 });
        }
        const instance = ytdlx.AudioOnly.Custom({ useTor: true, metadata: true, verbose: true, query, resolution: resolution as "high" | "medium" | "low" | "ultralow" });
        const data = await ytdlxPromise(instance);
        console.log("AudioOnlyCustomData started:", query);
        return NextResponse.json(data);
      }
      case "AudioOnlyHighestData": {
        if (!query) return NextResponse.json({ error: "Missing query parameter." }, { status: 400 });
        const instance = ytdlx.AudioOnly.Highest({ useTor: true, metadata: true, verbose: true, query });
        const data = await ytdlxPromise(instance);
        console.log("AudioOnlyHighestData started:", query);
        return NextResponse.json(data);
      }
      case "AudioOnlyLowestData": {
        if (!query) return NextResponse.json({ error: "Missing query parameter." }, { status: 400 });
        const instance = ytdlx.AudioOnly.Lowest({ useTor: true, metadata: true, verbose: true, query });
        const data = await ytdlxPromise(instance);
        console.log("AudioOnlyLowestData started:", query);
        return NextResponse.json(data);
      }
      case "VideoOnlyCustomData": {
        if (!query) return NextResponse.json({ error: "Missing query parameter." }, { status: 400 });
        const validResolutions = ["144p", "240p", "360p", "480p", "720p", "1080p", "1440p", "2160p", "3072p", "4320p", "6480p", "8640p", "12000p"];
        if (!validResolutions.includes(resolution || "")) {
          return NextResponse.json({ error: "Invalid or missing resolution parameter." }, { status: 400 });
        }
        const instance = ytdlx.VideoOnly.Custom({ useTor: true, metadata: true, verbose: true, query, resolution: resolution as any });
        const data = await ytdlxPromise(instance);
        console.log("VideoOnlyCustomData started:", query);
        return NextResponse.json(data);
      }
      case "VideoOnlyHighestData": {
        if (!query) return NextResponse.json({ error: "Missing query parameter." }, { status: 400 });
        const instance = ytdlx.VideoOnly.Highest({ useTor: true, metadata: true, verbose: true, query });
        const data = await ytdlxPromise(instance);
        console.log("VideoOnlyHighestData started:", query);
        return NextResponse.json(data);
      }
      case "VideoOnlyLowestData": {
        if (!query) return NextResponse.json({ error: "Missing query parameter." }, { status: 400 });
        const instance = ytdlx.VideoOnly.Lowest({ useTor: true, metadata: true, verbose: true, query });
        const data = await ytdlxPromise(instance);
        console.log("VideoOnlyLowestData started:", query);
        return NextResponse.json(data);
      }
      case "AudioVideoHighestData": {
        if (!query) return NextResponse.json({ error: "Missing query parameter." }, { status: 400 });
        const instance = ytdlx.AudioVideo.Highest({ useTor: true, metadata: true, verbose: true, query });
        const data = await ytdlxPromise(instance);
        console.log("AudioVideoHighestData started:", query);
        return NextResponse.json(data);
      }
      case "AudioVideoCustomData": {
        if (!query) return NextResponse.json({ error: "Missing query parameter." }, { status: 400 });
        const validResolutions = ["144p", "240p", "360p", "480p", "720p", "1080p", "1440p", "2160p", "3072p", "4320p", "6480p", "8640p", "12000p"];
        if (!validResolutions.includes(resolution || "")) {
          return NextResponse.json({ error: "Invalid or missing resolution parameter." }, { status: 400 });
        }
        const instance = ytdlx.AudioVideo.Custom({ useTor: true, metadata: true, verbose: true, query, resolution: resolution as any });
        const data = await ytdlxPromise(instance);
        console.log("AudioVideoCustomData started:", query);
        return NextResponse.json(data);
      }
      case "AudioVideoLowestData": {
        if (!query) return NextResponse.json({ error: "Missing query parameter." }, { status: 400 });
        const instance = ytdlx.AudioVideo.Lowest({ useTor: true, metadata: true, verbose: true, query });
        const data = await ytdlxPromise(instance);
        console.log("AudioVideoLowestData started:", query);
        return NextResponse.json(data);
      }
      case "SearchMultipleVideos": {
        if (!query) return NextResponse.json({ error: "Missing query parameter." }, { status: 400 });
        const instance = ytdlx.ytSearch.Video.Multiple({ query });
        const data = await ytdlxPromise(instance);
        console.log("SearchMultipleVideos started:", query);
        return NextResponse.json(data);
      }
      case "SearchSingleVideo": {
        if (!videoLink) return NextResponse.json({ error: "Missing videoLink parameter." }, { status: 400 });
        const instance = ytdlx.ytSearch.Video.Single({ videoLink });
        const data = await ytdlxPromise(instance);
        console.log("SearchSingleVideo started:", videoLink);
        return NextResponse.json(data);
      }
      case "SearchRelatedVideos": {
        if (!videoId) return NextResponse.json({ error: "Missing videoId parameter." }, { status: 400 });
        const instance = ytdlx.ytSearch.Video.Related({ videoId });
        const data = await ytdlxPromise(instance);
        console.log("SearchRelatedVideos started:", videoId);
        return NextResponse.json(data);
      }
      case "SearchMultiplePlaylists": {
        if (!playlistLink) return NextResponse.json({ error: "Missing playlistLink parameter." }, { status: 400 });
        const instance = ytdlx.ytSearch.Playlist.Multiple({ playlistLink });
        const data = await ytdlxPromise(instance);
        console.log("SearchMultiplePlaylists started:", playlistLink);
        return NextResponse.json(data);
      }
      case "SearchSinglePlaylist": {
        if (!playlistLink) return NextResponse.json({ error: "Missing playlistLink parameter." }, { status: 400 });
        const instance = ytdlx.ytSearch.Playlist.Single({ playlistLink });
        const data = await ytdlxPromise(instance);
        console.log("SearchSinglePlaylist started:", playlistLink);
        return NextResponse.json(data);
      }
      case "ExtractVideoData": {
        if (!query) return NextResponse.json({ error: "Missing query parameter." }, { status: 400 });
        const instance = ytdlx.info.extract({ query, verbose: true });
        const data = await ytdlxPromise(instance);
        if (!data) throw new Error("Unable to get video data.");
        let videoUrl = null;
        if (data.AudioHighF && typeof data.AudioHighF === "object" && data.AudioHighF.url) videoUrl = data.AudioHighF.url;
        else if (data.VideoHighF && typeof data.VideoHighF === "object" && data.VideoHighF.url) videoUrl = data.VideoHighF.url;
        else if (data.meta_data && data.meta_data.webpage_url) videoUrl = `https://www.youtube.com/embed/${data.meta_data.id}`;
        if (!videoUrl) throw new Error("No playable URL found in video data.");
        return NextResponse.json({ url: videoUrl, ...data.meta_data });
      }
      case "ListVideoFormats": {
        if (!query) return NextResponse.json({ error: "Missing query parameter." }, { status: 400 });
        const instance = ytdlx.info.list_formats({ query });
        const data = await ytdlxPromise(instance);
        console.log("ListVideoFormats started:", query);
        return NextResponse.json(data);
      }
      default:
        return NextResponse.json({ error: "Invalid action." }, { status: 400 });
    }
  } catch (err: any) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: err.message || "Something went wrong." }, { status: 500 });
  }
}
