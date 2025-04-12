import colors from "colors";
import { Client } from "youtubei";
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
export default async function searchVideos({ query }: { query: string }) {
  try {
    var youtube = new Client();
    var searchVideos = await youtube.search(query, { type: "video" });
    var result: searchVideosType[] = searchVideos.items.map((item: any) => ({
      id: item.id,
      title: item.title,
      isLive: item.isLive,
      duration: item.duration,
      viewCount: item.viewCount,
      channelid: item.channel.id,
      thumbnails: item.thumbnails,
      uploadDate: item.uploadDate,
      description: item.description,
      channelname: item.channel.name,
    }));
    return result;
  } catch (error: any) {
    throw new Error(colors.red("@error: ") + error.message);
  }
}
