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
 * @shortdesc Searches for YouTube videos with optional view count and ordering filters.
 *
 * @description This function allows you to search for videos on YouTube using a query string. It provides optional filters to refine your search based on the minimum and maximum number of views a video should have. Additionally, you can enable verbose logging for more detailed output and specify the order in which the search results should be returned.
 *
 * @param {object} options - An object containing the necessary options for searching videos.
 * @param {string} options.query - The search query string (minimum 2 characters) to find videos. **Required**.
 * @param {number} [options.minViews] - An optional number specifying the minimum view count for the videos to be included in the results.
 * @param {number} [options.maxViews] - An optional number specifying the maximum view count for the videos to be included in the results.
 * @param {boolean} [options.verbose=false] - An optional boolean value that, if set to `true`, enables verbose logging to the console.
 * @param {("relevance" | "viewCount" | "rating" | "date")} [options.orderBy="relevance"] - An optional string specifying the order in which the search results should be listed. Available options are:
 * - `"relevance"`: Order results by relevance to the query (default).
 * - `"viewCount"`: Order results by the number of views (most to least).
 * - `"rating"`: Order results by their rating (highest to lowest). Note: This might not always be reliably available.
 * - `"date"`: Order results by upload date (newest to oldest).
 *
 * @returns {EventEmitter} An EventEmitter instance that emits events during the search process.
 * The following events can be listened to:
 * - `"data"`: Emitted when the search results are successfully retrieved. The data is an array of video objects, where each object contains the following properties:
 * - `id`: The ID of the video.
 * - `title`: The title of the video.
 * - `isLive`: A boolean indicating if the video is currently live.
 * - `duration`: The duration of the video in seconds.
 * - `viewCount`: The number of views the video has.
 * - `uploadDate`: The date when the video was uploaded.
 * - `channelid`: The ID of the channel that uploaded the video.
 * - `thumbnails`: An array of thumbnail URLs for the video.
 * - `description`: A short description of the video.
 * - `channelname`: The name of the channel that uploaded the video.
 * - `"error"`: Emitted when an error occurs during the search, such as no videos being found for the given criteria or issues with the search request.
 *
 * @example
 * // 1. Search for videos with a query
 * YouTubeDLX.search_videos({ query: "funny cats" })
 * .on("data", (videos) => console.log("Search Results:", videos))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 2. Search for videos with a query and minimum view count
 * YouTubeDLX.search_videos({ query: "epic fails", minViews: 1000000 })
 * .on("data", (videos) => console.log("Search Results (minViews):", videos))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 3. Search for videos with a query and maximum view count
 * YouTubeDLX.search_videos({ query: "beginner tutorials", maxViews: 50000 })
 * .on("data", (videos) => console.log("Search Results (maxViews):", videos))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 4. Search for videos with a query and a view count range
 * YouTubeDLX.search_videos({ query: "cooking recipes", minViews: 1000, maxViews: 10000 })
 * .on("data", (videos) => console.log("Search Results (view range):", videos))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 5. Search for videos with verbose logging
 * YouTubeDLX.search_videos({ query: "science experiments", verbose: true })
 * .on("data", (videos) => console.log("Search Results (verbose):", videos))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 6. Search for videos ordered by view count
 * YouTubeDLX.search_videos({ query: "most viewed music", orderBy: "viewCount" })
 * .on("data", (videos) => console.log("Search Results (orderBy viewCount):", videos))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 7. Search for videos ordered by rating
 * YouTubeDLX.search_videos({ query: "best movies", orderBy: "rating" })
 * .on("data", (videos) => console.log("Search Results (orderBy rating):", videos))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 8. Search for videos ordered by upload date
 * YouTubeDLX.search_videos({ query: "newest tech", orderBy: "date" })
 * .on("data", (videos) => console.log("Search Results (orderBy date):", videos))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 9. Search with query, minViews, and orderBy
 * YouTubeDLX.search_videos({ query: "live streams", minViews: 500, orderBy: "viewCount" })
 * .on("data", (videos) => console.log("Search Results (minViews, orderBy):", videos))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 10. Search with all options enabled
 * YouTubeDLX.search_videos({ query: "educational videos", minViews: 1000, maxViews: 5000, verbose: true, orderBy: "date" })
 * .on("data", (videos) => console.log("Search Results (all options):", videos))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 11. Search with query and maxViews
 * YouTubeDLX.search_videos({ query: "short films", maxViews: 10000 })
 * .on("data", (videos) => console.log("Search Results (maxViews):", videos))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 12. Search with query and verbose logging with ordering
 * YouTubeDLX.search_videos({ query: "documentaries", verbose: true, orderBy: "rating" })
 * .on("data", (videos) => console.log("Search Results (verbose, orderBy):", videos))
 * .on("error", (error) => console.error("Error:", error));
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
