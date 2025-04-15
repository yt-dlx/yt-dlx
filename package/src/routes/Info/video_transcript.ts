import colors from "colors";
import { z, ZodError } from "zod";
import { Client } from "youtubei";
import { EventEmitter } from "events";
import YouTubeID from "../../utils/YouTubeId";

const ZodSchema = z.object({
  videoLink: z.string().min(2),
});

export interface CaptionSegment {
  utf8: string;
  tOffsetMs?: number;
  acAsrConf: number;
}

export interface VideoTranscriptType {
  text: string;
  start: number;
  duration: number;
  segments: CaptionSegment[];
}

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
 * Fetches the transcript (captions) for a given YouTube video based on the provided video link.
 *
 * @param {Object} options - The parameters for fetching the video transcript.
 * @param {string} options.videoLink - The URL of the YouTube video for which to fetch the transcript.
 *
 * @returns {EventEmitter} An EventEmitter object that emits the following events:
 * - "data": Contains the transcript data, including text, start time, duration, and segments.
 * - "error": Emits an error message if the video link is incorrect, if no transcript is found, or if fetching the data fails.
 *
 * @example
 * // Example 1: Fetch transcript data with only the video link
 * YouTubeDLX.Info.Transcript({ videoLink: "https://www.youtube.com/watch?v=VIDEO_ID" })
 *   .on("data", (transcriptData) => console.log("Transcript data:", transcriptData))
 *   .on("error", (err) => console.error("Error:", err));
 *
 * @example
 * // Example 2: Fetch transcript data with an invalid video link
 * YouTubeDLX.Info.Transcript({ videoLink: "https://www.youtube.com/watch?v=INVALID_ID" })
 *   .on("data", (transcriptData) => console.log("Transcript data:", transcriptData))
 *   .on("error", (err) => console.error("Error:", err));
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
