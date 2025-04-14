import colors from "colors";
import { z, ZodError } from "zod";
import { Client } from "youtubei";
import { EventEmitter } from "events";
import YouTubeID from "../../YouTubeId";
/**
 * Defines the schema for the input parameters used in the `video_transcript` function.
 *
 * @typedef {object} VideoDataOptions
 * @property {string} videoLink - The URL of the video.
 */
const ZodSchema = z.object({ videoLink: z.string().min(2) });
/**
 * Represents a caption segment with its text and offset.
 *
 * @interface CaptionSegment
 * @property {string} utf8 - The UTF-8 encoded caption text.
 * @property {number} [tOffsetMs] - The timestamp offset of the caption in milliseconds.
 * @property {number} acAsrConf - The ASR (Automatic Speech Recognition) confidence score for the caption.
 */
export interface CaptionSegment {
  utf8: string;
  tOffsetMs?: number;
  acAsrConf: number;
}
/**
 * Represents the structure of a video transcript, including its text, start time, duration, and caption segments.
 *
 * @interface VideoTranscriptType
 * @property {string} text - The text of the transcript.
 * @property {number} start - The start time of the transcript in seconds.
 * @property {number} duration - The duration of the transcript segment in seconds.
 * @property {CaptionSegment[]} segments - The list of caption segments for this part of the transcript.
 */
export interface VideoTranscriptType {
  text: string;
  start: number;
  duration: number;
  segments: CaptionSegment[];
}
/**
 * Fetches the transcript of a YouTube video based on its video ID.
 *
 * @function getVideoTranscript
 * @param {object} options - The options object containing the video ID.
 * @param {string} options.videoId - The ID of the video for which to fetch the transcript.
 * @returns {Promise<VideoTranscriptType[]>} A promise that resolves with the video transcript data.
 *
 * @example
 * const transcript = await getVideoTranscript({ videoId: "dQw4w9WgXcQ" });
 */
async function getVideoTranscript({ videoId }: { videoId: string }): Promise<VideoTranscriptType[]> {
  try {
    const youtube = new Client();
    const captions = await youtube.getVideoTranscript(videoId);
    if (!captions) return [];
    return captions.map(caption => ({
      text: caption.text,
      start: caption.start,
      duration: caption.duration,
      segments: caption.segments.map(segment => ({
        utf8: segment.utf8,
        tOffsetMs: segment.tOffsetMs,
        acAsrConf: segment.acAsrConf,
      })),
    }));
  } catch (error: any) {
    console.error(colors.red("@error: ") + error.message);
    return [];
  }
}
/**
 * Fetches the transcript data for a given YouTube video link and emits the data.
 *
 * @function video_transcript
 * @param {object} options - The options object containing the video URL.
 * @param {string} options.videoLink - The YouTube video URL to fetch the transcript for.
 * @returns {EventEmitter} The event emitter to handle `data` and `error` events.
 *
 * @example
 * const emitter = video_transcript({ videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" });
 * emitter.on("data", data => console.log(data));
 * emitter.on("error", error => console.error(error));
 */
export default function video_transcript({ videoLink }: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse({ videoLink });
      const vId = await YouTubeID(videoLink);
      if (!vId) {
        emitter.emit("error", colors.red("@error: ") + "incorrect video link");
        return;
      }
      const transcriptData: VideoTranscriptType[] = await getVideoTranscript({ videoId: vId });
      if (!transcriptData || transcriptData.length === 0) {
        emitter.emit("error", colors.red("@error: ") + "Unable to get response!");
        return;
      }
      emitter.emit("data", transcriptData);
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
