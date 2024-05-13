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
export default function searchVideos({ query }: {
    query: string;
}): Promise<searchVideosType[]>;
//# sourceMappingURL=searchVideos.d.ts.map