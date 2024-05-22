import type VideoInfo from "./VideoInfo";
import type AudioFormat from "./AudioFormat";
import type VideoFormat from "./VideoFormat";
import type ManifestFormat from "./ManifestFormat";
export default interface EngineOutput {
    ipAddress: string;
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
//# sourceMappingURL=EngineOutput.d.ts.map