import help from "./routes/command/help";
import extract from "./routes/command/extract";
import list_formats from "./routes/command/list_formats";
import video_data from "./routes/command/video_data";
import search_videos from "./routes/command/search_videos";
import playlist_data from "./routes/command/playlist_data";
import search_playlists from "./routes/command/search_playlists";
import AudioLowest from "./routes/Audio/single/AudioLowest";
import AudioHighest from "./routes/Audio/single/AudioHighest";
import AudioCustom from "./routes/Audio/single/AudioCustom";
import ListAudioLowest from "./routes/Audio/list/ListAudioLowest";
import ListAudioHighest from "./routes/Audio/list/ListAudioHighest";
import ListAudioCustom from "./routes/Audio/list/ListAudioCustom";
import VideoLowest from "./routes/Video/single/VideoLowest";
import VideoHighest from "./routes/Video/single/VideoHighest";
import VideoCustom from "./routes/Video/single/VideoCustom";
import ListVideoLowest from "./routes/Video/list/ListVideoLowest";
import ListVideoHighest from "./routes/Video/list/ListVideoHighest";
import ListVideoCustom from "./routes/Video/list/ListVideoCustom";
import AudioVideoHighest from "./routes/AudioVideo/single/AudioVideoHighest";
import AudioVideoLowest from "./routes/AudioVideo/single/AudioVideoLowest";
import AudioVideoCustom from "./routes/AudioVideo/single/AudioVideoCustom";
import ListAudioVideoHighest from "./routes/AudioVideo/list/ListAudioVideoHighest";
import ListAudioVideoLowest from "./routes/AudioVideo/list/ListAudioVideoLowest";
import ListAudioVideoCustom from "./routes/AudioVideo/list/ListAudioVideoCustom";
declare const ytdlx: {
    ytSearch: {
        Video: {
            Single: typeof video_data;
            Multiple: typeof search_videos;
        };
        Playlist: {
            Single: typeof playlist_data;
            Multiple: typeof search_playlists;
        };
    };
    info: {
        help: typeof help;
        extract: typeof extract;
        list_formats: typeof list_formats;
    };
    AudioOnly: {
        Single: {
            Lowest: typeof AudioLowest;
            Highest: typeof AudioHighest;
            Custom: typeof AudioCustom;
        };
        List: {
            Lowest: typeof ListAudioLowest;
            Highest: typeof ListAudioHighest;
            Custom: typeof ListAudioCustom;
        };
    };
    VideoOnly: {
        Single: {
            Lowest: typeof VideoLowest;
            Highest: typeof VideoHighest;
            Custom: typeof VideoCustom;
        };
        List: {
            Lowest: typeof ListVideoLowest;
            Highest: typeof ListVideoHighest;
            Custom: typeof ListVideoCustom;
        };
    };
    AudioVideo: {
        Single: {
            Lowest: typeof AudioVideoLowest;
            Highest: typeof AudioVideoHighest;
            Custom: typeof AudioVideoCustom;
        };
        List: {
            Lowest: typeof ListAudioVideoLowest;
            Highest: typeof ListAudioVideoHighest;
            Custom: typeof ListAudioVideoCustom;
        };
    };
};
export default ytdlx;
//# sourceMappingURL=index.d.ts.map