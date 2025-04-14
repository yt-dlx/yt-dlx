import colors from "colors";
import { z, ZodError } from "zod";
import { Client } from "youtubei";
import { EventEmitter } from "events";
import YouTubeID from "../../utils/YouTubeId";
const ZodSchema = z.object({ videoLink: z.string().min(2), verbose: z.boolean().optional() });
export default function live_video_data({ videoLink, verbose }: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse({ videoLink, verbose });
      const vId = await YouTubeID(videoLink);
      if (!vId) {
        emitter.emit("error", colors.red("@error: ") + "incorrect video link");
        return;
      }
      const youtube = new Client();
      const videoData: any = await youtube.getVideo(vId);
      if (!videoData) {
        emitter.emit("error", colors.red("@error: ") + "Unable to fetch video data");
        return;
      }
      if (!videoData.isLiveContent) {
        emitter.emit("error", colors.red("@error: ") + "Video is not live");
        return;
      }
      const liveData = {
        id: videoData.id,
        title: videoData.title,
        channel: videoData.channel,
        liveViewers: videoData.liveViewers || null,
      };
      emitter.emit("data", liveData);
    } catch (error: unknown) {
      switch (true) {
        case error instanceof ZodError:
          emitter.emit("error", error.errors);
          break;
        default:
          emitter.emit("error", (error as Error).message);
          break;
      }
    } finally {
      console.log(colors.green("@info:"), "❣️ Thank you for using yt-dlx. Consider 🌟starring the GitHub repo https://github.com/yt-dlx.");
    }
  })().catch(err => emitter.emit("error", err.message));
  return emitter;
}
