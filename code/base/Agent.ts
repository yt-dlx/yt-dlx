import web from "../web";
import colors from "colors";
import Engine from "./Engine";
import { execSync } from "child_process";
import YouTubeID from "../web/YouTubeId";
import type EngineOutput from "../interfaces/EngineOutput";

function sip(): string {
  var op = execSync("curl https://checkip.amazonaws.com --insecure", {
    stdio: "pipe",
  });
  return op.toString().trim();
}
function tip(): string {
  var op = execSync(
    "curl --socks5-hostname 127.0.0.1:9050 https://checkip.amazonaws.com --insecure",
    {
      stdio: "pipe",
    }
  );
  return op.toString().trim();
}
function service(): boolean {
  try {
    execSync("service --version", { stdio: "ignore" });
    execSync("service tor stop", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}
function systemctl(): boolean {
  try {
    execSync("systemctl --version", { stdio: "ignore" });
    execSync("systemctl tor stop", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}
function sudo(): boolean {
  try {
    execSync("sudo --version", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

export default async function Agent({
  query,
  useTor,
  verbose,
}: {
  query: string;
  useTor?: boolean;
  verbose?: boolean;
}): Promise<any> {
  var ipsys: string = "",
    iptor: string = "",
    issystemctl: boolean = false,
    isservice: boolean = false;
  var issudo: boolean = sudo();
  if (useTor) {
    switch (true) {
      case systemctl():
        execSync("systemctl restart tor", { stdio: "inherit" });
        issystemctl = true;
        ipsys = sip();
        iptor = tip();
        break;
      case service():
        execSync("service tor restart", { stdio: "inherit" });
        isservice = true;
        ipsys = sip();
        iptor = tip();
        break;
      default:
        ipsys = sip();
        break;
    }
  } else ipsys = sip();
  if (verbose) {
    switch (useTor) {
      case true:
        console.log(
          colors.green("@info:"),
          "system",
          colors.green("ipAddress"),
          ipsys
        );
        console.log(
          colors.green("@info:"),
          "socks5",
          colors.green("ipAddress"),
          iptor
        );
        break;
      default:
        console.log(
          colors.green("@info:"),
          "system",
          colors.green("ipAddress"),
          ipsys
        );
        break;
    }
    console.log(
      colors.green("@info:"),
      "is sudo",
      colors.green("available"),
      issudo
    );
    console.log(
      colors.green("@info:"),
      "is service",
      colors.green("available"),
      isservice
    );
    console.log(
      colors.green("@info:"),
      "is systemctl",
      colors.green("available"),
      issystemctl
    );
  }
  var TubeBody: any;
  var respEngine: EngineOutput | undefined = undefined;
  var videoId: string | undefined = await YouTubeID(query);
  if (!videoId) {
    TubeBody = await web.searchVideos({ query });
    if (!TubeBody[0]) throw new Error("Unable to get response!");
    console.log(
      colors.green("@info:"),
      "preparing payload for",
      colors.green(TubeBody[0].title)
    );
    respEngine = await Engine({
      sudo: issudo,
      ipAddress: iptor || ipsys,
      query: "https://www.youtube.com/watch?v=" + TubeBody[0].id,
    });
    return respEngine;
  } else {
    TubeBody = await web.singleVideo({ videoId });
    if (!TubeBody) throw new Error("Unable to get response!");
    console.log(
      colors.green("@info:"),
      "preparing payload for",
      colors.green(TubeBody.title)
    );
    respEngine = await Engine({
      sudo: issudo,
      ipAddress: iptor || ipsys,
      query: "https://www.youtube.com/watch?v=" + TubeBody.id,
    });
    return respEngine;
  }
}
