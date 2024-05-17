import chalk from "chalk";
import ytdlx from "yt-dlx";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const videoId: any = req.query.videoId;
    console.log(chalk.greenBright.bold("❓ videoId:"), chalk.italic(videoId));
    const result = await ytdlx.AudioOnly.Single.Highest({
      stream: true,
      verbose: true,
      onionTor: true,
      query: videoId,
    });
    if (result && result.filename && result.ffmpeg) {
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${result.filename}"`
      );
      if (!res.writableEnded) result.ffmpeg.pipe(res, { end: true });
      else console.error("@error: no res so cannot pipe.");
    } else return res.status(400).send("@error: try again!");
  } catch (error: any) {
    return res.status(500).send("@error: " + error.message);
  }
}
