import colors from "colors";
import Engine from "./Engine";
import { Client } from "youtubei";
import { execSync } from "child_process";
import YouTubeID from "./YouTubeId";
export async function VideoInfo({ videoId }: { videoId: string }): Promise<VideoInfoType | null> {
  try {
    const youtube = new Client();
    const VideoInfoData: any = await youtube.getVideo(videoId);
    if (!VideoInfoData) throw new Error(`${colors.red("@error: ")} Unable to fetch video data for id: ${videoId}`);
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
  } catch (error: any) {
    throw new Error(`${colors.red("@error: ")} Error fetching video data: ${error.message}`);
  }
}
export interface VideoInfoType {
  id: string;
  title: string;
  thumbnails: string[];
  uploadDate: string;
  description: string;
  duration: number;
  isLive: boolean;
  viewCount: number;
  channelid: string | undefined;
  channelname: string | undefined;
  tags: string[] | undefined;
  likeCount: number | undefined;
}
export interface searchVideosType {
  id: string;
  title: string;
  isLive: boolean;
  duration: number;
  viewCount: number;
  uploadDate: string;
  channelid: string;
  channelname: string;
  description: string;
  thumbnails: string[];
}
async function systemctlAvailable(): Promise<boolean> {
  try {
    execSync("systemctl --version", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}
async function serviceAvailable(): Promise<boolean> {
  try {
    execSync("service --version", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}
async function restartTor(): Promise<boolean> {
  const hasService = await serviceAvailable();
  if (hasService) {
    try {
      execSync("service tor restart", { stdio: "ignore" });
      console.log(colors.green("@info:"), "Tor restarted successfully using service");
      return true;
    } catch {
      console.log(colors.yellow("@warn:"), "Failed to restart Tor using service");
    }
  }
  const hasSystemctl = await systemctlAvailable();
  if (hasSystemctl) {
    try {
      execSync("systemctl restart tor", { stdio: "ignore" });
      console.log(colors.green("@info:"), "Tor restarted successfully using systemctl");
      return true;
    } catch {
      console.log(colors.yellow("@warn:"), "Failed to restart Tor using systemctl");
    }
  }
  console.log(colors.red("@error:"), "Unable to restart Tor with either service or systemctl");
  return false;
}
export default async function Agent({ query, useTor, verbose }: { query: string; useTor?: boolean; verbose?: boolean }): Promise<any> {
  if (useTor && process.platform === "win32") {
    console.log(colors.red("@error:"), "TOR can't be used on your system! [URGENT]: Please Contact The Developer!");
    useTor = false;
  } else if (useTor) await restartTor();
  if (verbose && useTor) console.log(colors.green("@info:"), "Using Tor for request anonymization");
  let url: string;
  const videoId: string | undefined = await YouTubeID(query);
  const youtube = new Client();
  if (!videoId) {
    try {
      const searchResults = await youtube.search(query, { type: "video" });
      if (searchResults.items.length === 0) throw new Error(`${colors.red("@error: ")} Unable to find a video for query: ${query}`);
      const video = searchResults.items[0];
      console.log(colors.green("@info:"), "preparing payload for", video.title);
      url = `https://www.youtube.com/watch?v=$${video.id}`;
    } catch (error: any) {
      throw new Error(`${colors.red("@error: ")} Error during video search: ${error.message}`);
    }
  } else {
    const TubeBody = await VideoInfo({ videoId });
    if (!TubeBody) throw new Error(`${colors.red("@error: ")} Unable to get video data for id: ${videoId}`);
    console.log(colors.green("@info:"), "preparing payload for", TubeBody.title);
    url = `https://www.youtube.com/watch?v=$${TubeBody.id}`;
  }
  return await Engine({ query: url, useTor });
}
