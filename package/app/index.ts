import progbar from "./utils/progbar";
import help from "./routes/command/help";
import YouTubeID from "./utils/YouTubeId";
import TubeLogin from "./utils/TubeLogin";
import extract from "./routes/command/extract";
import video_data from "./routes/command/video_data";
import AudioLowest from "./routes/Audio/AudioLowest";
import AudioCustom from "./routes/Audio/AudioCustom";
import VideoLowest from "./routes/Video/VideoLowest";
import VideoCustom from "./routes/Video/VideoCustom";
import AudioHighest from "./routes/Audio/AudioHighest";
import VideoHighest from "./routes/Video/VideoHighest";
import list_formats from "./routes/command/list_formats";
import channel_data from "./routes/command/channel_data";
import search_videos from "./routes/command/search_videos";
import playlist_data from "./routes/command/playlist_data";
import related_videos from "./routes/command/related_videos";
import live_video_data from "./routes/command/live_video_data";
import advanced_search from "./routes/command/advanced_search";
import search_channels from "./routes/command/search_channels";
import video_transcript from "./routes/command/video_transcript";
import search_playlists from "./routes/command/search_playlists";
import AudioVideoLowest from "./routes/AudioVideo/AudioVideoLowest";
import AudioVideoCustom from "./routes/AudioVideo/AudioVideoCustom";
import AudioVideoHighest from "./routes/AudioVideo/AudioVideoHighest";
/**
 * @module ytdlx
 * @description Main module for ytdlx library.
 */
var ytdlx = {
  TubeLogin,
  Progress_Bar: progbar,
  Audio: { Lowest: AudioLowest, Highest: AudioHighest, Custom: AudioCustom },
  Video: { Lowest: VideoLowest, Highest: VideoHighest, Custom: VideoCustom },
  Info: { help, extract, list_formats, video_transcript, get_videoId: YouTubeID },
  Audio_Video: { Lowest: AudioVideoLowest, Highest: AudioVideoHighest, Custom: AudioVideoCustom },
  Search: {
    Playlist: { Single: playlist_data, Multiple: search_playlists },
    Video: {
      Single: video_data,
      Live: live_video_data,
      Multiple: search_videos,
      Related: related_videos,
      Channel: search_channels,
      Channel_Data: channel_data,
      Transcript: video_transcript,
      Advance_Search: advanced_search,
    },
  },
};
/**
 * @description Exported ytdlx module.
 * @exports ytdlx
 */
export default ytdlx;
