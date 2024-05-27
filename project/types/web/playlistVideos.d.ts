export interface playlistVideosType {
    id: string;
    title: string;
    videoCount: number;
    result: {
        id: string;
        title: string;
        isLive: boolean;
        duration: number;
        thumbnails: string[];
    };
}
export default function playlistVideos({ playlistId, }: {
    playlistId: string;
}): Promise<{
    id: any;
    title: any;
    videoCount: any;
    result: any;
}>;
//# sourceMappingURL=playlistVideos.d.ts.map