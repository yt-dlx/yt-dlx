import chalk from "chalk";
import ytdlx from "yt-dlx";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    var query = await req.body.query;
    console.log(chalk.greenBright.bold("❓ query:"), chalk.italic(query));
    var TubeBody = await ytdlx.info.list_formats({
      query,
      verbose: true,
      onionTor: true,
    });
    if (TubeBody) return res.status(200).json(TubeBody);
    else return res.status(400).send("@error: try again!");
  } catch (error: any) {
    return res.status(500).send("@error: " + error.message);
  }
}
