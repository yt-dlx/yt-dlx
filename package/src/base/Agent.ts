import web from "../web";
import colors from "colors";
import Engine from "./Engine";
import { execSync } from "child_process";
import YouTubeID from "../YouTubeId";
import type EngineOutput from "../interfaces/EngineOutput";
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
    console.log(colors.red("@error:"), "TOR can't be used on your system!");
    useTor = false;
  } else if (useTor) await restartTor();
  if (verbose && useTor) console.log(colors.green("@info:"), "Using Tor for request anonymization");
  let TubeBody: any;
  let respEngine: EngineOutput | undefined = undefined;
  const videoId: string | undefined = await YouTubeID(query);
  if (!videoId) {
    const searchResult = await web.searchVideos({ query });
    const video = searchResult[0];
    if (!video) throw new Error("Unable to find a video!");
    console.log(colors.green("@info:"), "preparing payload for", video.title);
    respEngine = await Engine({ query: `https://www.youtube.com/watch?v=${video.id}`, useTor });
    return respEngine;
  } else {
    TubeBody = await web.singleVideo({ videoId });
    if (!TubeBody) throw new Error("Unable to get response!");
    console.log(colors.green("@info:"), "preparing payload for", TubeBody.title);
    respEngine = await Engine({ query: `https://www.youtube.com/watch?v=${TubeBody.id}`, useTor });
    return respEngine;
  }
}
