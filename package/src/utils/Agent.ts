import colors from "colors";
import Engine from "./Engine";
import comEngine from "./comEngine";
import { execSync } from "child_process";
import YouTubeID from "../utils/YouTubeId";
import { singleVideo } from "../routes/Command/video_data";
import { searchVideos } from "../routes/Command/search_videos";
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
export default async function Agent({ query, useTor, verbose, mode = "video" }: { query: string; useTor?: boolean; verbose?: boolean; mode?: "video" | "comments" }): Promise<any> {
  if (useTor && process.platform === "win32") {
    console.log(colors.red("@error:"), "TOR can't be used on your system!");
    useTor = false;
  } else if (useTor) await restartTor();
  if (verbose && useTor) console.log(colors.green("@info:"), "Using Tor for request anonymization");
  let url: string;
  const videoId: string | undefined = await YouTubeID(query);
  if (!videoId) {
    const searchResult = await searchVideos({ query });
    const video = searchResult[0];
    if (!video) throw new Error("Unable to find a video!");
    console.log(colors.green("@info:"), "preparing payload for", video.title);
    url = `https://www.youtube.com/watch?v=${video.id}`;
  } else {
    const TubeBody = await singleVideo({ videoId });
    if (!TubeBody) throw new Error("Unable to get response!");
    console.log(colors.green("@info:"), "preparing payload for", TubeBody.title);
    url = `https://www.youtube.com/watch?v=${TubeBody.id}`;
  }
  if (mode === "comments") return await comEngine({ query: url, useTor });
  else return await Engine({ query: url, useTor });
}
