import colors from "colors";
import { z, ZodError } from "zod";
import { Client } from "youtubei";
import { EventEmitter } from "events";
const ZodSchema = z.object({
  query: z.string().min(2),
  minViews: z.number().optional(),
  maxViews: z.number().optional(),
  verbose: z.boolean().optional(),
  orderBy: z.enum(["relevance", "viewCount", "rating", "date"]).optional(),
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
 * // 1: Basic search with only the query
 * YouTubeDLX.Search.Video.Single({ query: "Node.js tutorial" })
 *   .on("data", (videos) => console.log("Search results:", videos))
 *   .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 2: Search with minimum view count
 * YouTubeDLX.Search.Video.Single({ query: "Node.js tutorial", minViews: 1000 })
 *   .on("data", (videos) => console.log("Search results:", videos))
 *   .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 3: Search with maximum view count
 * YouTubeDLX.Search.Video.Single({ query: "Node.js tutorial", maxViews: 100000 })
 *   .on("data", (videos) => console.log("Search results:", videos))
 *   .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 4: Search with both minViews and maxViews
 * YouTubeDLX.Search.Video.Single({ query: "Node.js tutorial", minViews: 500, maxViews: 50000 })
 *   .on("data", (videos) => console.log("Search results:", videos))
 *   .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 5: Search with ordering by view count
 * YouTubeDLX.Search.Video.Single({ query: "Node.js tutorial", orderBy: "viewCount" })
 *   .on("data", (videos) => console.log("Search results:", videos))
 *   .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 6: Search with verbose output enabled
 * YouTubeDLX.Search.Video.Single({ query: "Node.js tutorial", verbose: true })
 *   .on("data", (videos) => console.log("Search results:", videos))
 *   .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 7: Search with order by date
 * YouTubeDLX.Search.Video.Single({ query: "Node.js tutorial", orderBy: "date" })
 *   .on("data", (videos) => console.log("Search results:", videos))
 *   .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 8: Search with all parameters (query, minViews, maxViews, orderBy, verbose)
 * YouTubeDLX.Search.Video.Single({ query: "Node.js tutorial", minViews: 1000, maxViews: 100000, orderBy: "viewCount", verbose: true })
 *   .on("data", (videos) => console.log("Search results:", videos))
 *   .on("error", (err) => console.error("Error:", err));
 */
export default function search_videos({ query, minViews, maxViews, orderBy, verbose }: z.infer<typeof ZodSchema>): EventEmitter {
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
    } catch (error) {
      if (error instanceof ZodError) emitter.emit("error", error.errors);
      else if (error instanceof Error) emitter.emit("error", error.message);
      else emitter.emit("error", String(error));
    } finally {
      console.log(colors.green("@info:"), "❣️ Thank you for using yt-dlx. Consider 🌟starring the GitHub repo https://github.com/yt-dlx.");
    }
  })();
  return emitter;
}
