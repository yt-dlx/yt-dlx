import web from "../web";
import colors from "colors";
import Engine from "./Engine";
import ctor from "./check/ctor";
import csudo from "./check/csudo";
import cservice from "./check/cservice";
import YouTubeID from "../web/YouTubeId";
import csystemctl from "./check/csystemctl";
import { version } from "../../package.json";
import type EngineOutput from "../interfaces/EngineOutput";
import cip from "./check/cip";

export default async function Agent({
  query,
  useTor,
  verbose,
}: {
  query: string;
  useTor?: boolean;
  verbose?: boolean;
}): Promise<EngineOutput> {
  if (verbose) {
    console.log(
      colors.green("@info:"),
      "using",
      colors.green("yt-dlx"),
      "version",
      colors.green(version)
    );
    console.log(
      colors.green("@info:"),
      "system has",
      colors.green("tor"),
      ctor()
    );
    console.log(
      colors.green("@info:"),
      "system has",
      colors.green("sudo"),
      csudo()
    );
    console.log(
      colors.green("@info:"),
      "system has",
      colors.green("service"),
      cservice()
    );
    console.log(
      colors.green("@info:"),
      "system has",
      colors.green("systemctl"),
      csystemctl()
    );
  }

  var cipResult: any;
  var ipAddress: string;
  if (useTor) {
    cipResult = cip(useTor);
    ipAddress = cipResult.torIP || cipResult.sysIP;
  } else {
    cipResult = cip(false);
    ipAddress = cipResult.sysIP || cipResult.torIP;
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
      ipAddress,
      query: `https://www.youtube.com/watch?v=${TubeBody[0].id}`,
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
      ipAddress,
      query: `https://www.youtube.com/watch?v=${TubeBody.id}`,
    });
    return respEngine;
  }
}
