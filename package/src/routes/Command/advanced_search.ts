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
/**
 * Performs an advanced YouTube search based on the provided parameters.
 *
 * @param {Object} options - The parameters for the search.
 * @param {string} options.query - The search query string. Minimum length of 2 characters.
 * @param {number} [options.minViews] - The minimum view count to filter videos. Optional.
 * @param {number} [options.maxViews] - The maximum view count to filter videos. Optional.
 * @param {"relevance" | "viewCount" | "rating" | "date"} [options.orderBy] - The order in which to sort the results. Optional.
 * @param {boolean} [options.verbose] - Flag to enable verbose output. Optional.
 *
 * @returns {EventEmitter} An EventEmitter object that emits the following events:
 * - "data": Contains the filtered and sorted video results.
 * - "error": Emits an error message if the search or filtering fails.
 *
 * @example
 * // Example 1: Basic search with only the query
 * YouTubeDLX.Search.Video.Advance_Search({ query: "Node.js tutorial" }).on("data", (videos) => console.log("Search results:", videos)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 2: Search with minimum view count
 * YouTubeDLX.Search.Video.Advance_Search({ query: "Node.js tutorial", minViews: 1000 }).on("data", (videos) => console.log("Search results:", videos)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 3: Search with maximum view count
 * YouTubeDLX.Search.Video.Advance_Search({ query: "Node.js tutorial", maxViews: 100000 }).on("data", (videos) => console.log("Search results:", videos)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 4: Search with both minViews and maxViews
 * YouTubeDLX.Search.Video.Advance_Search({ query: "Node.js tutorial", minViews: 500, maxViews: 50000 }).on("data", (videos) => console.log("Search results:", videos)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 5: Search with ordering by view count
 * YouTubeDLX.Search.Video.Advance_Search({ query: "Node.js tutorial", orderBy: "viewCount" }).on("data", (videos) => console.log("Search results:", videos)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 6: Search with verbose output enabled
 * YouTubeDLX.Search.Video.Advance_Search({ query: "Node.js tutorial", verbose: true }).on("data", (videos) => console.log("Search results:", videos)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 7: Search with order by date
 * YouTubeDLX.Search.Video.Advance_Search({ query: "Node.js tutorial", orderBy: "date" }).on("data", (videos) => console.log("Search results:", videos)).on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 8: Search with all parameters (query, minViews, maxViews, orderBy, verbose)
 * YouTubeDLX.Search.Video.Advance_Search({ query: "Node.js tutorial", minViews: 1000, maxViews: 100000, orderBy: "viewCount", verbose: true }).on("data", (videos) => console.log("Search results:", videos)).on("error", (err) => console.error("Error:", err));
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
