export interface searchPlaylistsType {
    id: string;
    title: string;
    videoCount: number;
    thumbnails: string[];
}
export default function searchPlaylists({ query }: {
    query: string;
}): Promise<searchPlaylistsType[]>;
//# sourceMappingURL=searchPlaylists.d.ts.map