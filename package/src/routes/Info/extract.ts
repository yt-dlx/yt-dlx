import colors from "colors";
import { z, ZodError } from "zod";
import Tuber from "../../utils/Agent";
import { EventEmitter } from "events";
import type EngineOutput from "../../interfaces/EngineOutput";
function calculateUploadAgo(days: number) {
  const years = Math.floor(days / 365);
  const months = Math.floor((days % 365) / 30);
  const remainingDays = days % 30;
  const formattedString = `${years > 0 ? years + " years, " : ""}${months > 0 ? months + " months, " : ""}${remainingDays} days`;
  return { years, months, days: remainingDays, formatted: formattedString };
}
function calculateVideoDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  const formattedString = `${hours > 0 ? hours + " hours, " : ""}${minutes > 0 ? minutes + " minutes, " : ""}${remainingSeconds} seconds`;
  return { hours, minutes, seconds: remainingSeconds, formatted: formattedString };
}
function formatCount(count: number) {
  const abbreviations = ["K", "M", "B", "T"];
  for (let i = abbreviations.length - 1; i >= 0; i--) {
    const size = Math.pow(10, (i + 1) * 3);
    if (size <= count) {
      const formattedCount = Math.round((count / size) * 10) / 10;
      return `${formattedCount}${abbreviations[i]}`;
    }
  }
  return `${count}`;
}
const ZodSchema = z.object({ query: z.string().min(2), useTor: z.boolean().optional(), verbose: z.boolean().optional() });
/**
 * Extracts metadata and available download formats for a given Tube (e.g., YouTube) video query.
 *
 * @param {object} options - An object containing the necessary options.
 * @param {string} options.query - The URL or search query for the video.
 * @param {boolean} [options.useTor=false] - If true, uses the Tor network for the request.
 * @param {boolean} [options.verbose=false] - If true, enables verbose logging to the console.
 *
 * @returns {EventEmitter} An EventEmitter that emits the following events:
 * - "data": Emitted with the extracted metadata and format information. The data is an object containing various audio and video format URLs, along with detailed metadata about the video.
 * - "error": Emitted if there is an error during the process.
 *
 * @example
 * // 1: Extract metadata for a given video query
 * YouTubeDLX.Extract({ query: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" })
 * .on("data", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 2: Extract metadata for a search query
 * YouTubeDLX.Extract({ query: "video title" })
 * .on("data", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 3: Extract metadata using Tor
 * YouTubeDLX.Extract({ query: "video url", useTor: true })
 * .on("data", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 4: Extract metadata with verbose logging
 * YouTubeDLX.Extract({ query: "another query", verbose: true })
 * .on("data", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 5: Extract metadata using Tor with verbose logging
 * YouTubeDLX.Extract({ query: "yet another video", useTor: true, verbose: true })
 * .on("data", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // 6: Extract metadata for a short query (should still work if the engine handles it)
 * YouTubeDLX.Extract({ query: "short" })
 * .on("data", (data) => console.log("Metadata:", data))
 * .on("error", (err) => console.error("Error:", err));
 */
export default function extract({ query, verbose, useTor }: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse({ query, verbose });
      const metaBody: EngineOutput = await Tuber({ query, verbose, useTor });
      if (!metaBody) {
        emitter.emit("error", `${colors.red("@error:")} Unable to get response!`);
        return;
      }
      if (!metaBody.metaData) {
        emitter.emit("error", `${colors.red("@error:")} Metadata not found in the response!`);
        return;
      }
      let uploadDate: Date | undefined;
      try {
        if (metaBody.metaData.upload_date) {
          uploadDate = new Date(metaBody.metaData.upload_date.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"));
        }
      } catch (error) {
        emitter.emit("error", `${colors.red("@error:")} Failed to parse upload date: ${error instanceof Error ? error.message : String(error)}`);
      }
      const currentDate = new Date();
      const daysAgo = uploadDate ? Math.floor((currentDate.getTime() - uploadDate.getTime()) / (1000 * 60 * 60 * 24)) : 0;
      const prettyDate = uploadDate?.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) || "N/A";
      const uploadAgoObject = calculateUploadAgo(daysAgo);
      const videoTimeInSeconds = metaBody.metaData.duration;
      const videoDuration = calculateVideoDuration(videoTimeInSeconds);
      const viewCountFormatted = metaBody.metaData.view_count !== undefined ? formatCount(metaBody.metaData.view_count) : "N/A";
      const likeCountFormatted = metaBody.metaData.like_count !== undefined ? formatCount(metaBody.metaData.like_count) : "N/A";
      const commentCountFormatted = metaBody.metaData.comment_count !== undefined ? formatCount(metaBody.metaData.comment_count) : "N/A";
      const channelFollowerCountFormatted = metaBody.metaData.channel_follower_count !== undefined ? formatCount(metaBody.metaData.channel_follower_count) : "N/A";
      const payload = {
        AudioLowF: metaBody.AudioLowF,
        AudioHighF: metaBody.AudioHighF,
        VideoLowF: metaBody.VideoLowF,
        VideoHighF: metaBody.VideoHighF,
        AudioLowDRC: metaBody.AudioLowDRC,
        AudioHighDRC: metaBody.AudioHighDRC,
        AudioLow: metaBody.AudioLow,
        AudioHigh: metaBody.AudioHigh,
        VideoLowHDR: metaBody.VideoLowHDR,
        VideoHighHDR: metaBody.VideoHighHDR,
        VideoLow: metaBody.VideoLow,
        VideoHigh: metaBody.VideoHigh,
        ManifestLow: metaBody.ManifestLow,
        ManifestHigh: metaBody.ManifestHigh,
        meta_data: {
          id: metaBody.metaData.id,
          original_url: metaBody.metaData.original_url,
          webpage_url: metaBody.metaData.webpage_url,
          title: metaBody.metaData.title,
          view_count: metaBody.metaData.view_count,
          like_count: metaBody.metaData.like_count,
          view_count_formatted: viewCountFormatted,
          like_count_formatted: likeCountFormatted,
          uploader: metaBody.metaData.uploader,
          uploader_id: metaBody.metaData.uploader_id,
          uploader_url: metaBody.metaData.uploader_url,
          thumbnail: metaBody.metaData.thumbnail,
          categories: metaBody.metaData.categories,
          time: videoTimeInSeconds,
          duration: videoDuration,
          age_limit: metaBody.metaData.age_limit,
          live_status: metaBody.metaData.live_status,
          description: metaBody.metaData.description,
          full_description: metaBody.metaData.description,
          upload_date: prettyDate,
          upload_ago: daysAgo,
          upload_ago_formatted: uploadAgoObject,
          comment_count: metaBody.metaData.comment_count,
          comment_count_formatted: commentCountFormatted,
          channel_id: metaBody.metaData.channel_id,
          channel_name: metaBody.metaData.channel,
          channel_url: metaBody.metaData.channel_url,
          channel_follower_count: metaBody.metaData.channel_follower_count,
          channel_follower_count_formatted: channelFollowerCountFormatted,
        },
      };
      emitter.emit("data", payload);
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
