import colors from "colors";
import { z, ZodError } from "zod";
import { EventEmitter } from "events";
import relatedVideos from "../../web/relatedVideos";
const ZodSchema = z.object({ videoId: z.string().min(2) });
export default function related_videos({ videoId }: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse({ videoId });
      const videos = await relatedVideos({ videoId });
      if (!videos || videos.length === 0) throw new Error("No related videos found");
      emitter.emit("data", videos);
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
  })().catch(error => emitter.emit("error", error.message));
  return emitter;
}
