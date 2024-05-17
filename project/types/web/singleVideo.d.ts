export interface singleVideoType {
    id: string;
    title: string;
    thumbnails: string[];
    uploadDate: string;
    description: string;
    duration: number;
    isLive: boolean;
    viewCount: number;
    channelid: string;
    channelname: string;
    tags: string;
    likeCount: number;
}
export default function singleVideo({ videoId }: {
    videoId: string;
}): Promise<{
    id: any;
    title: any;
    thumbnails: any;
    uploadDate: any;
    description: any;
    duration: any;
    isLive: any;
    viewCount: any;
    channelid: any;
    channelname: any;
    tags: any;
    likeCount: any;
}>;
//# sourceMappingURL=singleVideo.d.ts.map