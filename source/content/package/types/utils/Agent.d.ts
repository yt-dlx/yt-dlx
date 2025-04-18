export declare function VideoInfo({ videoId }: {
    videoId: string;
}): Promise<VideoInfoType | null>;
export interface VideoInfoType {
    id: string;
    title: string;
    thumbnails: string[];
    uploadDate: string;
    description: string;
    duration: number;
    isLive: boolean;
    viewCount: number;
    channelid: string | undefined;
    channelname: string | undefined;
    tags: string[] | undefined;
    likeCount: number | undefined;
}
export interface searchVideosType {
    id: string;
    title: string;
    isLive: boolean;
    duration: number;
    viewCount: number;
    uploadDate: string;
    channelid: string;
    channelname: string;
    description: string;
    thumbnails: string[];
}
export default function Agent({ query, useTor, verbose }: {
    query: string;
    useTor?: boolean;
    verbose?: boolean;
}): Promise<any>;
//# sourceMappingURL=Agent.d.ts.map