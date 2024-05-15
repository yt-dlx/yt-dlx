export interface sizeFormat {
    (filesize: number): string | number;
}
export declare const sizeFormat: sizeFormat;
export interface AudioFormat {
    filesize: number;
    filesizeP: string | number;
    asr: number;
    format_note: string;
    tbr: number;
    url: string;
    ext: string;
    acodec: string;
    container: string;
    resolution: string;
    audio_ext: string;
    abr: number;
    format: string;
}
export interface VideoFormat {
    filesize: number;
    filesizeP: string | number;
    format_note: string;
    fps: number;
    height: number;
    width: number;
    tbr: number;
    url: string;
    ext: string;
    vcodec: string;
    dynamic_range: string;
    container: string;
    resolution: string;
    aspect_ratio: number;
    video_ext: string;
    vbr: number;
    format: string;
}
export interface ManifestFormat {
    url: string;
    manifest_url: string;
    tbr: number;
    ext: string;
    fps: number;
    width: number;
    height: number;
    vcodec: string;
    dynamic_range: string;
    aspect_ratio: number;
    video_ext: string;
    vbr: number;
    format: string;
}
export interface VideoInfo {
    id: string;
    title: string;
    channel: string;
    uploader: string;
    duration: number;
    thumbnail: string;
    age_limit: number;
    channel_id: string;
    categories: string[];
    display_id: string;
    description: string;
    channel_url: string;
    webpage_url: string;
    live_status: boolean;
    view_count: number;
    like_count: number;
    comment_count: number;
    channel_follower_count: number;
    upload_date: string;
    uploader_id: string;
    original_url: string;
    uploader_url: string;
    duration_string: string;
}
export interface EngineOutput {
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
export default function Engine({ query, ipAddress, onionTor, }: {
    query: string;
    ipAddress: string;
    onionTor: boolean | undefined;
}): Promise<EngineOutput>;
//# sourceMappingURL=Engine.d.ts.map