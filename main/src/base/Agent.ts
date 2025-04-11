import web from "../web";
import colors from "colors";
import Engine from "./Engine";
import retry from "async-retry";
import ytSearch from "yt-search";
import { execSync } from "child_process";
import YouTubeID from "../web/YouTubeId";
import type EngineOutput from "../interfaces/EngineOutput";

const reOpts = { retries: 3, minTimeout: 1000, maxTimeout: 5000, factor: 2 };

async function sip(): Promise<string> {
  return await retry(async () => {
    const op = execSync("curl https://checkip.amazonaws.com --insecure", { stdio: "pipe" });
    return op.toString().trim();
  }, reOpts);
}

async function getTorIp(port: number): Promise<string> {
  return await retry(async () => {
    const op = execSync(`curl --socks5-hostname 127.0.0.1:${port} https://checkip.amazonaws.com --insecure`, { stdio: "pipe" });
    return op.toString().trim();
  }, reOpts);
}

async function isTorWorking(port: number): Promise<boolean> {
  try {
    await getTorIp(port);
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

async function systemctlAvailable(): Promise<boolean> {
  try {
    execSync("systemctl --version", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

async function restartTor(): Promise<boolean> {
  const ports = [9050, 9150];
  const hasService = await serviceAvailable();
  if (hasService) {
    try {
      execSync("service tor restart", { stdio: "ignore" });
      for (const port of ports) {
        if (await isTorWorking(port)) {
          console.log(colors.green("@info:"), "Tor restarted successfully using service");
          return true;
        }
      }
      console.log(colors.yellow("@warn:"), "Tor restart with service succeeded but Tor is not working");
    } catch {
      console.log(colors.yellow("@warn:"), "Failed to restart Tor using service");
    }
  }
  const hasSystemctl = await systemctlAvailable();
  if (hasSystemctl) {
    try {
      execSync("systemctl restart tor", { stdio: "ignore" });
      for (const port of ports) {
        if (await isTorWorking(port)) {
          console.log(colors.green("@info:"), "Tor restarted successfully using systemctl");
          return true;
        }
      }
      console.log(colors.yellow("@warn:"), "Tor restart with systemctl succeeded but Tor is not working");
    } catch {
      console.log(colors.yellow("@warn:"), "Failed to restart Tor using systemctl");
    }
  }
  console.log(colors.red("@error:"), "Unable to restart Tor with either service or systemctl");
  return false;
}

async function findTorPort(): Promise<{ ip: string; port: number } | null> {
  const ports = [9050, 9150];
  for (const port of ports) {
    try {
      const ip = await getTorIp(port);
      if (ip) return { ip, port };
    } catch {}
  }
  const restarted = await restartTor();
  if (restarted) {
    for (const port of ports) {
      try {
        const ip = await getTorIp(port);
        if (ip) return { ip, port };
      } catch {}
    }
  }
  return null;
}

async function sudo(): Promise<boolean> {
  return await retry(async () => {
    try {
      execSync("sudo --version", { stdio: "ignore" });
      return true;
    } catch {
      return false;
    }
  }, reOpts);
}

export default async function Agent({ query, useTor, verbose }: { query: string; useTor?: boolean; verbose?: boolean }): Promise<any> {
  let iptor: string | null = null;
  let torPort: number | null = null;
  const ipsys: string = await sip();
  if (useTor) {
    const torInfo = await findTorPort();
    if (torInfo) {
      iptor = torInfo.ip;
      torPort = torInfo.port;
    } else {
      console.log(colors.yellow("@warn:"), "Unable to get working Tor port, falling back to system IP");
    }
  }
  if (verbose) {
    console.log(colors.green("@info:"), "system ipAddress", ipsys);
    if (useTor && iptor) {
      console.log(colors.green("@info:"), `socks5 ipAddress ${iptor} (port ${torPort})`);
    } else if (useTor) {
      console.log(colors.red("@error:"), "TOR can't be used on your system!");
    }
    console.log(colors.green("@info:"), "is sudo available", await sudo());
  }
  let TubeBody: any;
  let respEngine: EngineOutput | undefined = undefined;
  const videoId: string | undefined = await YouTubeID(query);
  if (!videoId) {
    const searchResult = await ytSearch(query);
    const video = searchResult.videos[0];
    if (!video) throw new Error("Unable to find a video!");
    console.log(colors.green("@info:"), "preparing payload for", video.title);
    respEngine = await Engine({ sudo: await sudo(), ipAddress: iptor || ipsys, query: `https://www.youtube.com/watch?v=${video.videoId}` });
    return respEngine;
  } else {
    TubeBody = await web.singleVideo({ videoId });
    if (!TubeBody) throw new Error("Unable to get response!");
    console.log(colors.green("@info:"), "preparing payload for", TubeBody.title);
    respEngine = await Engine({ sudo: await sudo(), ipAddress: iptor || ipsys, query: `https://www.youtube.com/watch?v=${TubeBody.id}` });
    return respEngine;
  }
}
