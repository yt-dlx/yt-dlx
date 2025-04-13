import colors from "colors";
import { Client } from "youtubei";
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
export default async function videoTranscript({ videoId }: { videoId: string }): Promise<VideoTranscriptType[]> {
  try {
    const youtube = new Client();
    const captions = await youtube.getVideoTranscript(videoId);
    if (!captions) return [];
    return captions.map(caption => ({
      text: caption.text,
      start: caption.start,
      duration: caption.duration,
      segments: caption.segments.map(segment => ({ utf8: segment.utf8, tOffsetMs: segment.tOffsetMs, acAsrConf: segment.acAsrConf })),
    }));
  } catch (error: any) {
    throw new Error(colors.red("@error: ") + error.message);
  }
}
