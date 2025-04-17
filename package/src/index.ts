import progbar from "./utils/progbar";
import help from "./routes/Info/help";
import YouTubeID from "./utils/YouTubeId";
import extract from "./routes/Info/extract";
import AudioLowest from "./routes/Audio/Lowest";
import AudioCustom from "./routes/Audio/Custom";
import VideoLowest from "./routes/Video/Lowest";
import VideoCustom from "./routes/Video/Custom";
import AudioHighest from "./routes/Audio/Highest";
import VideoHighest from "./routes/Video/Highest";
import home_feed from "./routes/Account/home_feed";
import video_data from "./routes/Search/video_data";
import list_formats from "./routes/Info/list_formats";
import channel_data from "./routes/Search/channel_data";
import search_videos from "./routes/Search/search_videos";
import playlist_data from "./routes/Search/playlist_data";
import video_comments from "./routes/Info/video_comments";
import AudioVideoCustom from "./routes/AudioVideo/Custom";
import AudioVideoLowest from "./routes/AudioVideo/Lowest";
import watch_history from "./routes/Account/watch_history";
import AudioVideoHighest from "./routes/AudioVideo/Highest";
import related_videos from "./routes/Search/related_videos";
import search_channels from "./routes/Search/search_channels";
import video_transcript from "./routes/Info/video_transcript";
import search_playlists from "./routes/Search/search_playlists";
import subscriptions_feed from "./routes/Account/subscriptions_feed";
import unseen_notifications from "./routes/Account/unseen_notifications";
var YouTubeDLX = {
  Audio: { Lowest: AudioLowest, Highest: AudioHighest, Custom: AudioCustom },
  Video: { Lowest: VideoLowest, Highest: VideoHighest, Custom: VideoCustom },
  Audio_Video: { Lowest: AudioVideoLowest, Highest: AudioVideoHighest, Custom: AudioVideoCustom },
  Search: {
    Channel: { Single: channel_data, Multiple: search_channels },
    Playlist: { Single: playlist_data, Multiple: search_playlists },
    Video: { Single: video_data, Multiple: search_videos, Related: related_videos },
  },
  Account: { History: watch_history, HomeFeed: home_feed, SubscriptionsFeed: subscriptions_feed, Unseen_Notifications: unseen_notifications },
  Info: { Help: help, ProgressBar: progbar, Extract: extract, Formats: list_formats, GetVideoId: YouTubeID, Comments: video_comments, Transcript: video_transcript },
};
export default YouTubeDLX;
