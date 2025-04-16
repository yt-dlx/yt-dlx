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
 * Searches for Tube (e.g., YouTube) videos based on a given query with optional filters for view count and ordering.
 *
 * @param {object} options - An object containing the necessary options.
 * @param {string} options.query - The search query to find videos.
 * @param {number} [options.minViews] - Optional filter to include videos with at least this many views.
 * @param {number} [options.maxViews] - Optional filter to include videos with at most this many views.
 * @param {boolean} [options.verbose=false] - If true, enables verbose logging to the console.
 * @param {("relevance" | "viewCount" | "rating" | "date")} [options.orderBy="relevance"] - Optional parameter to order the search results. Defaults to "relevance". Note that "rating" might not be reliably available.
 *
 * @returns {EventEmitter} An EventEmitter that emits the following events:
 * - "data": Emitted with an array of video objects. Each object contains details like the video ID, title, live status, duration, view count, upload date, channel ID, thumbnails, description, and channel name.
 * - "error": Emitted if there is an error during the process, such as no videos found matching the criteria.
 *
 * @example
 * // 1: Search for videos with a query
 * YouTubeDLX.SearchVideos({ query: "funny cat videos" })
 * .on("data", (videos) => console.log("Found videos:", videos))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 2: Search for videos with a minimum view count
 * YouTubeDLX.SearchVideos({ query: "popular music", minViews: 1000000 })
 * .on("data", (videos) => console.log("Found videos:", videos))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 3: Search for videos with a maximum view count
 * YouTubeDLX.SearchVideos({ query: "niche tutorial", maxViews: 50000 })
 * .on("data", (videos) => console.log("Found videos:", videos))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 4: Search for videos ordered by view count
 * YouTubeDLX.SearchVideos({ query: "trending news", orderBy: "viewCount" })
 * .on("data", (videos) => console.log("Found videos:", videos))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 5: Search for videos ordered by upload date
 * YouTubeDLX.SearchVideos({ query: "new releases", orderBy: "date" })
 * .on("data", (videos) => console.log("Found videos:", videos))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 6: Search for videos with verbose logging
 * YouTubeDLX.SearchVideos({ query: "interesting facts", verbose: true })
 * .on("data", (videos) => console.log("Found videos:", videos))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 7: Search for videos with a query and view count range
 * YouTubeDLX.SearchVideos({ query: "car reviews", minViews: 10000, maxViews: 1000000 })
 * .on("data", (videos) => console.log("Found videos:", videos))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 8: Search for videos with a query and order by relevance (default)
 * YouTubeDLX.SearchVideos({ query: "how to bake a cake", orderBy: "relevance" })
 * .on("data", (videos) => console.log("Found videos:", videos))
 * .on("error", (err) => console.error("Error:", err));
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
        channelid: item.channel?.id,
        thumbnails: item.thumbnails,
        description: item.description,
        channelname: item.channel?.name,
      }));
      if (minViews !== undefined) videos = videos.filter(video => video.viewCount >= minViews);
      if (maxViews !== undefined) videos = videos.filter(video => video.viewCount <= maxViews);
      if (orderBy) {
        if (orderBy === "viewCount") videos.sort((a, b) => b.viewCount - a.viewCount);
        else if (orderBy === "date") videos.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
      }
      if (videos.length === 0) {
        emitter.emit("error", `${colors.red("@error: ")} No videos found with the given criteria.`);
        return;
      }
      emitter.emit("data", videos);
    } catch (error) {
      if (error instanceof ZodError) emitter.emit("error", `${colors.red("@error:")} Argument validation failed: ${error.errors.map(e => `${e.path.join(".")}: ${e.message}`).join(", ")}`);
      else if (error instanceof Error) emitter.emit("error", `${colors.red("@error:")} ${error.message}`);
      else emitter.emit("error", `${colors.red("@error:")} An unexpected error occurred: ${String(error)}`);
    } finally {
      console.log(colors.green("@info:"), "❣️ Thank you for using yt-dlx. Consider 🌟starring the GitHub repo https://github.com/yt-dlx.");
    }
  })();
  return emitter;
}
