import chalk from "chalk";
import ytdlx from "yt-dlx";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const videoId: any = req.query.videoId;
    console.log(chalk.green("❓ videoId:"), videoId);
    const Audio: any = req.query.videoId;
    if (Audio) console.log(chalk.green("❓ Audio:"), Audio);
    const Video: any = req.query.videoId;
    if (Video) console.log(chalk.green("❓ Video:"), Video);
    const AudioVideo: any = req.query.videoId;
    if (AudioVideo) console.log(chalk.green("❓ AudioVideo:"), AudioVideo);

    switch (true) {
      case Audio:
        var { AudioLow, AudioLowDRC, AudioHigh, AudioHighDRC } =
          await ytdlx.info.list_formats({
            query: videoId,
            verbose: true,
          });
        res
          .status(400)
          .send({ AudioLow, AudioLowDRC, AudioHigh, AudioHighDRC });
        break;
      case Video:
        var { VideoLow, VideoLowHDR, VideoHigh, VideoHighHDR } =
          await ytdlx.info.list_formats({
            query: videoId,
            verbose: true,
          });
        res
          .status(400)
          .send({ VideoLow, VideoLowHDR, VideoHigh, VideoHighHDR });
        break;
      case AudioVideo:
        var {
          AudioLow,
          AudioLowDRC,
          AudioHigh,
          AudioHighDRC,
          ManifestLow,
          ManifestHigh,
        } = await ytdlx.info.list_formats({
          query: videoId,
          verbose: true,
        });
        res.status(400).send({
          AudioLow,
          AudioLowDRC,
          AudioHigh,
          AudioHighDRC,
          ManifestLow,
          ManifestHigh,
        });
        break;
      default:
        res.status(500).send("@error: wrong format!");
        break;
    }
  } catch (error: any) {
    return res.status(500).send("@error: " + error.message);
  }
}
