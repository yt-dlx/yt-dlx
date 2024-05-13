import chalk from "chalk";
import ytdlx from "yt-dlx";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    var TubeBody;
    var query = await req.body.query;
    var videoId = await req.body.videoId;
    if (videoId) {
      console.log(chalk.greenBright.bold("❓ videoId:"), chalk.italic(videoId));
      TubeBody = await ytdlx.ytSearch.Video.Single({
        query: `https://youtu.be/${videoId}`,
      });
      if (TubeBody) return res.status(200).json(TubeBody);
      else return res.status(400).send("@error: try again!");
    } else {
      console.log(chalk.greenBright.bold("❓ query:"), chalk.italic(query));
      TubeBody = await ytdlx.ytSearch.Video.Multiple({
        query,
      });
      if (TubeBody) return res.status(200).json(TubeBody);
      else return res.status(400).send("@error: try again!");
    }
  } catch (error: any) {
    return res.status(500).send("@error: " + error.message);
  }
}
