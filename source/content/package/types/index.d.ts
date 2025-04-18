import YouTubeID from "./utils/YouTubeId";
import help from "./routes/Misc/System/Help";
import AudioLowest from "./routes/Audio/Lowest";
import AudioCustom from "./routes/Audio/Custom";
import VideoLowest from "./routes/Video/Lowest";
import VideoCustom from "./routes/Video/Custom";
import extract from "./routes/Misc/Video/Extract";
import AudioHighest from "./routes/Audio/Highest";
import VideoHighest from "./routes/Video/Highest";
import home_feed from "./routes/Account/HomeFeed";
import watch_history from "./routes/Account/History";
import video_data from "./routes/Search/Video/SIngle";
import list_formats from "./routes/Misc/Video/Formats";
import related_videos from "./routes/Misc/Video/Related";
import video_comments from "./routes/Misc/Video/Comments";
import channel_data from "./routes/Search/Channel/Single";
import AudioVideoCustom from "./routes/Audio_Video/Custom";
import AudioVideoLowest from "./routes/Audio_Video/Lowest";
import search_videos from "./routes/Search/Video/Multiple";
import playlist_data from "./routes/Search/Playlist/Single";
import AudioVideoHighest from "./routes/Audio_Video/Highest";
import video_transcript from "./routes/Misc/Video/Transcript";
import search_channels from "./routes/Search/Channel/Multiple";
import search_playlists from "./routes/Search/Playlist/Multiple";
import subscriptions_feed from "./routes/Account/SubscriptionsFeed";
import unseen_notifications from "./routes/Account/UnseenNotifications";
declare var YouTubeDLX: {
    Audio: {
        Custom: typeof AudioCustom;
        Lowest: typeof AudioLowest;
        Highest: typeof AudioHighest;
    };
    Video: {
        Custom: typeof VideoCustom;
        Lowest: typeof VideoLowest;
        Highest: typeof VideoHighest;
    };
    Audio_Video: {
        Custom: typeof AudioVideoCustom;
        Lowest: typeof AudioVideoLowest;
        Highest: typeof AudioVideoHighest;
    };
    Search: {
        Channel: {
            Single: typeof channel_data;
            Multiple: typeof search_channels;
        };
        Playlist: {
            Single: typeof playlist_data;
            Multiple: typeof search_playlists;
        };
        Video: {
            Single: typeof video_data;
            Multiple: typeof search_videos;
        };
    };
    Account: {
        HomeFeed: typeof home_feed;
        History: typeof watch_history;
        SubscriptionsFeed: typeof subscriptions_feed;
        UnseenNotifications: typeof unseen_notifications;
    };
    Misc: {
        System: {
            Help: typeof help;
            ProgressBar: ({ percent, timemark, baseTime }: {
                percent: any;
                timemark: any;
                baseTime: any;
            }) => void;
        };
        Video: {
            GetId: typeof YouTubeID;
            Extract: typeof extract;
            Formats: typeof list_formats;
            Related: typeof related_videos;
            Comments: typeof video_comments;
            Transcript: typeof video_transcript;
        };
    };
};
export default YouTubeDLX;
//# sourceMappingURL=index.d.ts.map