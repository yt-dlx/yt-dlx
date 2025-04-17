import progbar from "./utils/progbar";
import help from "./routes/Misc/Help";
import YouTubeID from "./utils/YouTubeId";
import extract from "./routes/Misc/Extract";
import AudioLowest from "./routes/Audio/Lowest";
import AudioCustom from "./routes/Audio/Custom";
import VideoLowest from "./routes/Video/Lowest";
import VideoCustom from "./routes/Video/Custom";
import list_formats from "./routes/Misc/Formats";
import AudioHighest from "./routes/Audio/Highest";
import VideoHighest from "./routes/Video/Highest";
import home_feed from "./routes/Account/HomeFeed";
import video_comments from "./routes/Misc/Comments";
import video_data from "./routes/Search/video_data";
import watch_history from "./routes/Account/History";
import video_transcript from "./routes/Misc/Transcript";
import channel_data from "./routes/Search/channel_data";
import search_videos from "./routes/Search/search_videos";
import playlist_data from "./routes/Search/playlist_data";
import AudioVideoCustom from "./routes/Audio_Video/Custom";
import AudioVideoLowest from "./routes/Audio_Video/Lowest";
import AudioVideoHighest from "./routes/Audio_Video/Highest";
import related_videos from "./routes/Search/related_videos";
import search_channels from "./routes/Search/search_channels";
import search_playlists from "./routes/Search/search_playlists";
import subscriptions_feed from "./routes/Account/SubscriptionsFeed";
import unseen_notifications from "./routes/Account/UnseenNotifications";
var YouTubeDLX = {
  Audio: {
    Custom: AudioCustom, // YouTubeDLX.Audio.Custom
    Lowest: AudioLowest, // YouTubeDLX.Audio.Lowest
    Highest: AudioHighest, // YouTubeDLX.Audio.Highest
  },
  Video: {
    Custom: VideoCustom, // YouTubeDLX.Video.Custom
    Lowest: VideoLowest, // YouTubeDLX.Video.Lowest
    Highest: VideoHighest, // YouTubeDLX.Video.Highest
  },
  Audio_Video: {
    Custom: AudioVideoCustom, // YouTubeDLX.Audio_Video.Custom
    Lowest: AudioVideoLowest, // YouTubeDLX.Audio_Video.Lowest
    Highest: AudioVideoHighest, // YouTubeDLX.Audio_Video.Highest
  },
  Search: {
    Channel: {
      Single: channel_data, // YouTubeDLX.Search.Channel.Single
      Multiple: search_channels, // YouTubeDLX.Search.Channel.Multiple
    },
    Playlist: {
      Single: playlist_data, // YouTubeDLX.Search.Playlist.Single
      Multiple: search_playlists, // YouTubeDLX.Search.Playlist.Multiple
    },
    Video: {
      Single: video_data, // YouTubeDLX.Search.Video.Single
      Multiple: search_videos, // YouTubeDLX.Search.Video.Multiple
    },
  },
  Account: {
    HomeFeed: home_feed, // YouTubeDLX.Account.HomeFeed
    History: watch_history, // YouTubeDLX.Account.History
    SubscriptionsFeed: subscriptions_feed, // YouTubeDLX.Account.SubscriptionsFeed
    UnseenNotifications: unseen_notifications, // YouTubeDLX.Account.UnseenNotifications
  },
  Misc: {
    System: {
      Help: help, // YouTubeDLX.Misc.System.Help
      ProgressBar: progbar, // YouTubeDLX.Misc.System.ProgressBar
    },
    Video: {
      GetId: YouTubeID, // YouTubeDLX.Misc.Video.GetId
      Extract: extract, // YouTubeDLX.Misc.Video.Extract
      Formats: list_formats, // YouTubeDLX.Misc.Video.Formats
      Related: related_videos, // YouTubeDLX.Misc.Video.Related
      Comments: video_comments, // YouTubeDLX.Video.Misc.Comments
      Transcript: video_transcript, // YouTubeDLX.Misc.Video.Transcript
    },
  },
};
export default YouTubeDLX;
