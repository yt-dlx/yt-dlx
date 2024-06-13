import chalk from "chalk";
import ytdlx from "yt-dlx";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const videoId: any = req.query.videoId;
    console.log(chalk.green("❓ videoId:"), videoId);
    var metaTube = await ytdlx.info.list_formats({
      query: videoId,
      verbose: true,
    });
    console.log(metaTube);
    return res.status(400).send(metaTube);
  } catch (error: any) {
    return res.status(500).send("@error: " + error.message);
  }
}
