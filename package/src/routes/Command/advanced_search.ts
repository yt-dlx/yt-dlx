import colors from "colors";
import { z, ZodError } from "zod";
import { Client } from "youtubei";
import { EventEmitter } from "events";
const ZodSchema = z.object({
  query: z.string().min(2),
  minViews: z.number().optional(),
  maxViews: z.number().optional(),
  orderBy: z.enum(["relevance", "viewCount", "rating", "date"]).optional(),
  verbose: z.boolean().optional(),
});
export default function advanced_search({ query, minViews, maxViews, orderBy, verbose }: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse({ query, minViews, maxViews, orderBy, verbose });
      const youtube = new Client();
      const searchResults = await youtube.search(query, { type: "video" });
      let videos = searchResults.items.map((item: any) => ({
        id: item.id,
        title: item.title,
        isLive: item.isLive,
        duration: item.duration,
        viewCount: item.viewCount,
        uploadDate: item.uploadDate,
        channelid: item.channel.id,
        thumbnails: item.thumbnails,
        description: item.description,
        channelname: item.channel.name,
      }));
      if (minViews !== undefined) videos = videos.filter(video => video.viewCount >= minViews);
      if (maxViews !== undefined) videos = videos.filter(video => video.viewCount <= maxViews);
      if (orderBy) {
        if (orderBy === "viewCount") videos.sort((a, b) => b.viewCount - a.viewCount);
        else if (orderBy === "date") videos.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
      }
      if (videos.length === 0) {
        emitter.emit("error", colors.red("@error: ") + "No videos found with the given criteria");
        return;
      }
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
      console.log(colors.green("@info:"), "❣️ Thank you for using yt-dlx. Consider starring our GitHub repo https://github.com/yt-dlx.");
    }
  })().catch(err => emitter.emit("error", err.message));
  return emitter;
}
