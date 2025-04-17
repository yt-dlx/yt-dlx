import path from "path";
import colors from "colors";
import { Client } from "youtubei";
import { z, ZodError } from "zod";
import Tuber from "../../../utils/Agent";
import { EventEmitter } from "events";
import { Innertube, UniversalCache } from "youtubei.js";
import { CommentType } from "../../../interfaces/CommentType";
import type EngineOutput from "../../../interfaces/EngineOutput";
const ZodSchema = z.object({ query: z.string().min(2), useTor: z.boolean().optional(), verbose: z.boolean().optional() });
interface CaptionSegment {
  utf8: string;
  tOffsetMs?: number;
  acAsrConf: number;
}
interface VideoTranscriptType {
  text: string;
  start: number;
  duration: number;
  segments: CaptionSegment[];
}
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
async function fetchCommentsByVideoId(videoId: string, verbose: boolean): Promise<CommentType[] | null> {
  try {
    if (verbose) console.log(colors.green("@info:"), `Fetching comments for video ID: ${videoId}`);
    const youtubeInnertube = await Innertube.create({
      user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      cache: new UniversalCache(true, path.join(process.cwd(), "YouTubeDLX")),
    });
    const response = await youtubeInnertube.getComments(videoId);
    const comments: CommentType[] = response.contents
      .map(thread => {
        const comment = thread?.comment;
        if (!comment || !comment.content?.text || !comment.published_time || !comment.author?.name) return null;
        return {
          comment_id: comment.comment_id || "",
          is_pinned: comment.is_pinned || false,
          comment: comment.content.text,
          published_time: comment.published_time,
          author_is_channel_owner: comment.author_is_channel_owner || false,
          creator_thumbnail_url: comment.creator_thumbnail_url || "",
          like_count: comment.like_count || 0,
          is_member: comment.is_member || false,
          author: comment.author.name,
          is_hearted: comment.is_hearted || false,
          is_liked: comment.is_liked || false,
          is_disliked: comment.is_disliked || false,
          reply_count: comment.reply_count || 0,
          hasReplies: thread.has_replies || false,
        } as CommentType;
      })
      .filter((item): item is CommentType => item !== null);
    if (comments.length === 0) {
      if (verbose) console.log(colors.red("@error:"), "No comments found for the video");
      return null;
    }
    if (verbose) console.log(colors.green("@info:"), "Video comments fetched!");
    return comments;
  } catch (error: any) {
    if (verbose) console.error(colors.red("@error: ") + error.message);
    return null;
  }
}
async function fetchVideoTranscript(videoId: string, verbose: boolean): Promise<VideoTranscriptType[] | null> {
  try {
    if (verbose) console.log(colors.green("@info:"), `Fetching transcript for video ID: ${videoId}`);
    const youtube = new Client();
    const captions = await youtube.getVideoTranscript(videoId);
    if (!captions) {
      if (verbose) console.log(colors.red("@error:"), "No transcript found for the video");
      return null;
    }
    const transcript = captions.map(caption => ({
      text: caption.text,
      start: caption.start,
      duration: caption.duration,
      segments: caption.segments.map(segment => ({
        utf8: segment.utf8,
        tOffsetMs: segment.tOffsetMs,
        acAsrConf: segment.acAsrConf,
      })),
    }));
    if (verbose) console.log(colors.green("@info:"), "Video transcript fetched!");
    return transcript;
  } catch (error: any) {
    if (verbose) console.error(colors.red("@error: ") + error.message);
    return null;
  }
}
/**
 * @shortdesc Extracts comprehensive information (metadata, formats, comments, transcript) for a video.
 *
 * @description This function takes a search query to find a YouTube video and retrieves a wide range of information about it. This includes various available audio and video formats at different qualities, detailed metadata such as title, uploader, view count, like count, upload date, duration, and more. Additionally, it fetches the video's comments and transcript. The function supports optional verbose logging to provide detailed output during the process and the option to route requests through the Tor network for enhanced anonymity.
 *
 * @param {object} options - Configuration options for extracting video information.
 * @param {string} options.query - The search query string (minimum 2 characters) to find the desired video. **Required**.
 * @param {boolean} [options.verbose=false] - Enables verbose logging to the console if set to `true`.
 * @param {boolean} [options.useTor=false] - Routes the request through the Tor network if set to `true`. Requires Tor to be running locally.
 *
 * @returns {EventEmitter} An EventEmitter instance that emits events during the extraction process.
 * The following events can be listened to:
 * - `"data"`: Emitted when the video metadata, formats, comments, and transcript are successfully extracted. The data is an object containing the following properties:
 * - `AudioLowF`: Information about the lowest quality audio format.
 * - `AudioHighF`: Information about the highest quality audio format.
 * - `VideoLowF`: Information about the lowest quality video format.
 * - `VideoHighF`: Information about the highest quality video format.
 * - `AudioLowDRC`: Information about the lowest quality audio format with dynamic range compression.
 * - `AudioHighDRC`: Information about the highest quality audio format with dynamic range compression.
 * - `AudioLow`: Information about a low quality audio format.
 * - `AudioHigh`: Information about a high quality audio format.
 * - `VideoLowHDR`: Information about a low quality HDR video format (if available).
 * - `VideoHighHDR`: Information about a high quality HDR video format (if available).
 * - `VideoLow`: Information about a low quality video format.
 * - `VideoHigh`: Information about a high quality video format.
 * - `ManifestLow`: URL for a low quality manifest (if available).
 * - `ManifestHigh`: URL for a high quality manifest (if available).
 * - `meta_data`: An object containing detailed video metadata, including:
 * - `id`: Video ID.
 * - `original_url`: Original URL of the video.
 * - `webpage_url`: Webpage URL of the video.
 * - `title`: Title of the video.
 * - `view_count`: Number of views.
 * - `like_count`: Number of likes.
 * - `view_count_formatted`: Formatted view count (e.g., "1.2M").
 * - `like_count_formatted`: Formatted like count (e.g., "10K").
 * - `uploader`: Name of the uploader.
 * - `uploader_id`: ID of the uploader.
 * - `uploader_url`: URL of the uploader's channel.
 * - `thumbnail`: URL of the video thumbnail.
 * - `categories`: Array of video categories.
 * - `time`: Duration of the video in seconds.
 * - `duration`: Object containing the video duration in hours, minutes, seconds, and a formatted string.
 * - `age_limit`: Age limit for the video.
 * - `live_status`: Live status of the video (e.g., "not_live").
 * - `description`: Short description of the video.
 * - `full_description`: Full description of the video.
 * - `upload_date`: Formatted upload date.
 * - `upload_ago`: Number of days since upload.
 * - `upload_ago_formatted`: Object containing years, months, days since upload, and a formatted string.
 * - `comment_count`: Number of comments.
 * - `comment_count_formatted`: Formatted comment count (e.g., "500").
 * - `channel_id`: ID of the channel.
 * - `channel_name`: Name of the channel.
 * - `channel_url`: URL of the channel.
 * - `channel_follower_count`: Number of channel followers.
 * - `channel_follower_count_formatted`: Formatted channel follower count (e.g., "2M").
 * - `comments`: An array of comment objects (`CommentType`).
 * - `transcript`: An array of transcript segments (`VideoTranscriptType`).
 * - `"error"`: Emitted when an error occurs during argument validation, network requests, or data processing.
 *
 * @example
 * // Define the structure for CommentType
 * interface CommentType {
 * comment_id: string;
 * is_pinned: boolean;
 * comment: string;
 * published_time: string;
 * author_is_channel_owner: boolean;
 * creator_thumbnail_url: string;
 * like_count: number;
 * is_member: boolean;
 * author: string;
 * is_hearted: boolean;
 * is_liked: boolean;
 * is_disliked: boolean;
 * reply_count: number;
 * hasReplies: boolean;
 * }
 *
 * @example
 * // Define the structure for VideoTranscriptType
 * interface VideoTranscriptType {
 * text: string;
 * start: number;
 * duration: number;
 * segments: {
 * utf8: string;
 * tOffsetMs?: number;
 * acAsrConf: number;
 * }[];
 * }
 *
 * @example
 * // 1. Extract all information for a video based on a query
 * YouTubeDLX.extract({ query: "latest tech review" })
 * .on("data", (data) => console.log("Extracted Data:", data))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 2. Extract information with verbose logging
 * YouTubeDLX.extract({ query: "cooking tutorial", verbose: true })
 * .on("data", (data) => console.log("Extracted Data:", data))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 3. Extract information using Tor
 * YouTubeDLX.extract({ query: "anonymous video search", useTor: true })
 * .on("data", (data) => console.log("Extracted Data:", data))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 4. Extract information with verbose logging and Tor
 * YouTubeDLX.extract({ query: "private educational video", verbose: true, useTor: true })
 * .on("data", (data) => console.log("Extracted Data:", data))
 * .on("error", (error) => console.error("Error:", error));
 */
export default function extract(options: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      const { query, useTor, verbose } = ZodSchema.parse(options);
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
      const commentsPromise = fetchCommentsByVideoId(metaBody.metaData.id, verbose ?? false);
      const transcriptPromise = fetchVideoTranscript(metaBody.metaData.id, verbose ?? false);
      const [comments, transcript] = await Promise.all([commentsPromise, transcriptPromise]);
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
        comments,
        transcript,
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
