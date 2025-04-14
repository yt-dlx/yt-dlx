import colors from "colors";
import { z, ZodError } from "zod";
import { Client } from "youtubei";
import { EventEmitter } from "events";
/**
 * Zod Schema for validating advanced search parameters.
 *
 * @typedef {object} AdvancedSearchParams
 * @property {string} query - The search query to find videos on YouTube (must be at least 2 characters).
 * @property {number} [minViews] - Optional: The minimum view count a video must have.
 * @property {number} [maxViews] - Optional: The maximum view count a video can have.
 * @property {("relevance" | "viewCount" | "rating" | "date")} [orderBy] - Optional: The criterion to sort results by.
 *         Valid values are "relevance", "viewCount", "rating", or "date".
 * @property {boolean} [verbose] - Optional: Whether verbose logging is enabled.
 */
const ZodSchema = z.object({
  query: z.string().min(2),
  minViews: z.number().optional(),
  maxViews: z.number().optional(),
  orderBy: z.enum(["relevance", "viewCount", "rating", "date"]).optional(),
  verbose: z.boolean().optional(),
});
/**
 * Performs an advanced search for YouTube videos with filters and emits the results.
 *
 * This function uses the Zod schema (AdvancedSearchParams) to validate the input parameters.
 * The schema requires a minimum-length string for the query and allows optional filters for views and sorting.
 *
 * @function advanced_search
 * @param {AdvancedSearchParams} options - The options object containing search parameters.
 * @param {string} options.query - The search query.
 * @param {number} [options.minViews] - Minimum view count filter.
 * @param {number} [options.maxViews] - Maximum view count filter.
 * @param {("relevance" | "viewCount" | "rating" | "date")} [options.orderBy] - Sorting order.
 * @param {boolean} [options.verbose] - Optional verbose logging.
 * @returns {EventEmitter} The event emitter to handle `data` and `error` events.
 *
 * @example
 * const emitter = advanced_search({ query: "JavaScript tutorials", minViews: 1000, orderBy: "viewCount" });
 * emitter.on("data", data => console.log(data));
 * emitter.on("error", error => console.error(error));
 */
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
