import colors from "colors";
import { z, ZodError } from "zod";
import { Client } from "youtubei";
import { EventEmitter } from "events";
import YouTubeID from "../../utils/YouTubeId";
const ZodSchema = z.object({ videoLink: z.string().min(2) });
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
async function getVideoTranscript({ videoId }: { videoId: string }, emitter: EventEmitter): Promise<VideoTranscriptType[]> {
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
    emitter.emit("error", `${colors.red("@error: ")} ${error.message}`);
    return [];
  }
}
/**
 * Fetches the transcript for a given Tube (e.g., YouTube) video link.
 *
 * @param {object} options - An object containing the necessary options.
 * @param {string} options.videoLink - The URL of the YouTube video.
 *
 * @returns {EventEmitter} An EventEmitter that emits the following events:
 * - "data": Emitted with an array of transcript objects. Each object contains the text, start time (in seconds), duration (in seconds), and segments of a caption.
 * - "error": Emitted if there is an error during the process, such as an incorrect video link or if the transcript cannot be retrieved.
 *
 * @example
 * // Fetch the transcript for a YouTube video
 * YouTubeDLX.VideoTranscript({ videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" })
 * .on("data", (transcript) => console.log("Transcript:", transcript))
 * .on("error", (err) => console.error("Error:", err));
 */
export default function video_transcript({ videoLink }: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse({ videoLink });
      const vId = await YouTubeID(videoLink);
      if (!vId) {
        emitter.emit("error", `${colors.red("@error: ")} incorrect video link`);
        return;
      }
      const transcriptData: VideoTranscriptType[] = await getVideoTranscript({ videoId: vId }, emitter);
      if (!transcriptData || transcriptData.length === 0) {
        emitter.emit("error", `${colors.red("@error: ")} Unable to get transcript for this video!`);
        return;
      }
      emitter.emit("data", transcriptData);
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
