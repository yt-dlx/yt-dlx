import web from "../web";
import colors from "colors";
import retor from "./retor";
import Engine from "./Engine";
import YouTubeID from "../web/YouTubeId";
import { version } from "../../package.json";
import type { EngineOutput } from "./Engine";

export default async function Agent({
  query,
  verbose,
  onionTor,
}: {
  query: string;
  verbose?: boolean;
  onionTor?: boolean;
}): Promise<EngineOutput> {
  verbose;
  console.log(
    colors.green("@info:"),
    "using",
    colors.green("yt-dlx"),
    "version",
    colors.green(version)
  );
  let TubeBody: any;
  let ipAddress: any;
  if (onionTor) {
    const { sysip, torip } = await retor();
    if (!torip) ipAddress = sysip;
    else ipAddress = torip;
    console.log(
      colors.green("@info:"),
      "system",
      colors.green("ipAddress"),
      sysip
    );
    console.log(
      colors.green("@info:"),
      "socks5",
      colors.green("ipAddress"),
      torip
    );
  }
  let respEngine: EngineOutput | undefined = undefined;
  let videoId: string | undefined = await YouTubeID(query);
  if (!videoId) {
    TubeBody = await web.searchVideos({ query });
    if (!TubeBody[0]) throw new Error("Unable to get response!");
    console.log(
      colors.green("@info:"),
      `preparing payload for`,
      colors.green(TubeBody[0].title)
    );
    respEngine = await Engine({
      onionTor,
      ipAddress,
      query: `https://www.youtube.com/watch?v=${TubeBody[0].id}`,
    });
    return respEngine;
  } else {
    TubeBody = await web.singleVideo({ videoId });
    if (!TubeBody) throw new Error("Unable to get response!");
    console.log(
      colors.green("@info:"),
      `preparing payload for`,
      colors.green(TubeBody.title)
    );
    respEngine = await Engine({
      onionTor,
      ipAddress,
      query: `https://www.youtube.com/watch?v=${TubeBody.id}`,
    });
    return respEngine;
  }
}
