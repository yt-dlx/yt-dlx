import progbar from "./utils/progbar";
import help from "./routes/Info/help";
import YouTubeID from "./utils/YouTubeId";
import extract from "./routes/Info/extract";
import home_feed from "./routes/Account/home_feed";
import video_data from "./routes/Search/video_data";
import AudioLowest from "./routes/Audio/AudioLowest";
import AudioCustom from "./routes/Audio/AudioCustom";
import VideoLowest from "./routes/Video/VideoLowest";
import VideoCustom from "./routes/Video/VideoCustom";
import AudioHighest from "./routes/Audio/AudioHighest";
import VideoHighest from "./routes/Video/VideoHighest";
import list_formats from "./routes/Info/list_formats";
import channel_data from "./routes/Search/channel_data";
import search_videos from "./routes/Search/search_videos";
import playlist_data from "./routes/Search/playlist_data";
import video_comments from "./routes/Info/video_comments";
import watch_history from "./routes/Account/watch_history";
import related_videos from "./routes/Search/related_videos";
import live_video_data from "./routes/Info/live_video_data";
import search_channels from "./routes/Search/search_channels";
import video_transcript from "./routes/Info/video_transcript";
import search_playlists from "./routes/Search/search_playlists";
import AudioVideoLowest from "./routes/AudioVideo/AudioVideoLowest";
import AudioVideoCustom from "./routes/AudioVideo/AudioVideoCustom";
import subscriptions_feed from "./routes/Account/subscriptions_feed";
import AudioVideoHighest from "./routes/AudioVideo/AudioVideoHighest";
import unseen_notifications from "./routes/Account/unseen_notifications";
var YouTubeDLX = {
  Progress_Bar: progbar,
  Account: { History: watch_history, HomeFeed: home_feed, SubscriptionsFeed: subscriptions_feed, Unseen_Notifications: unseen_notifications },
  Audio: { Lowest: AudioLowest, Highest: AudioHighest, Custom: AudioCustom },
  Video: { Lowest: VideoLowest, Highest: VideoHighest, Custom: VideoCustom },
  Info: {
    Help: help,
    Extract: extract,
    Formats: list_formats,
    Live: live_video_data,
    GetVideoId: YouTubeID,
    Comments: video_comments,
    Transcript: video_transcript,
  },
  Audio_Video: { Lowest: AudioVideoLowest, Highest: AudioVideoHighest, Custom: AudioVideoCustom },
  Search: {
    Playlist: { Single: playlist_data, Multiple: search_playlists },
    Video: {
      Single: video_data,
      Multiple: search_videos,
      Related: related_videos,
      Channel: search_channels,
      Channel_Data: channel_data,
    },
  },
};
export default YouTubeDLX;
