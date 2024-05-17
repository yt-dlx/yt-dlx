import VideoInfo from "./VideoInfo";
import AudioFormat from "./AudioFormat";
import VideoFormat from "./VideoFormat";
import ManifestFormat from "./ManifestFormat";

export default interface EngineOutput {
  metaData: VideoInfo;
  AudioLowF: AudioFormat;
  AudioHighF: AudioFormat;
  VideoLowF: VideoFormat;
  VideoHighF: VideoFormat;
  AudioLowDRC: AudioFormat[];
  AudioHighDRC: AudioFormat[];
  AudioLow: AudioFormat[];
  AudioHigh: AudioFormat[];
  VideoLowHDR: VideoFormat[];
  VideoHighHDR: VideoFormat[];
  VideoLow: VideoFormat[];
  VideoHigh: VideoFormat[];
  ManifestLow: ManifestFormat[];
  ManifestHigh: ManifestFormat[];
}
