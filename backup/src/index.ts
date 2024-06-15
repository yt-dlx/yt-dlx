// ============================[ GENERAL ]============================
import help from "./routes/command/help";
import extract from "./routes/command/extract";
import list_formats from "./routes/command/list_formats";
//
// ============================[ YT-SEARCH ]============================
import video_data from "./routes/command/video_data";
import search_videos from "./routes/command/search_videos";
import playlist_data from "./routes/command/playlist_data";
import search_playlists from "./routes/command/search_playlists";
//
// ============================[ AUDIO-ONLY ]============================
import AudioLowest from "./routes/Audio/single/AudioLowest";
import AudioHighest from "./routes/Audio/single/AudioHighest";
import AudioCustom from "./routes/Audio/single/AudioCustom";
import ListAudioLowest from "./routes/Audio/list/ListAudioLowest";
import ListAudioHighest from "./routes/Audio/list/ListAudioHighest";
import ListAudioCustom from "./routes/Audio/list/ListAudioCustom";
//
// ============================[ VIDEO-ONLY ]============================
import VideoLowest from "./routes/Video/single/VideoLowest";
import VideoHighest from "./routes/Video/single/VideoHighest";
import VideoCustom from "./routes/Video/single/VideoCustom";
import ListVideoLowest from "./routes/Video/list/ListVideoLowest";
import ListVideoHighest from "./routes/Video/list/ListVideoHighest";
import ListVideoCustom from "./routes/Video/list/ListVideoCustom";
//
// ============================[ AUDIO-VIDEO ]============================
import AudioVideoHighest from "./routes/AudioVideo/single/AudioVideoHighest";
import AudioVideoLowest from "./routes/AudioVideo/single/AudioVideoLowest";
import AudioVideoCustom from "./routes/AudioVideo/single/AudioVideoCustom";
import ListAudioVideoHighest from "./routes/AudioVideo/list/ListAudioVideoHighest";
import ListAudioVideoLowest from "./routes/AudioVideo/list/ListAudioVideoLowest";
import ListAudioVideoCustom from "./routes/AudioVideo/list/ListAudioVideoCustom";
//
var ytdlx = {
  ytSearch: {
    Video: {
      Single: video_data,
      Multiple: search_videos,
    },
    Playlist: {
      Single: playlist_data,
      Multiple: search_playlists,
    },
  },
  info: {
    help,
    extract,
    list_formats,
  },
  AudioOnly: {
    Single: {
      Lowest: AudioLowest,
      Highest: AudioHighest,
      Custom: AudioCustom,
    },
    List: {
      Lowest: ListAudioLowest,
      Highest: ListAudioHighest,
      Custom: ListAudioCustom,
    },
  },
  VideoOnly: {
    Single: {
      Lowest: VideoLowest,
      Highest: VideoHighest,
      Custom: VideoCustom,
    },
    List: {
      Lowest: ListVideoLowest,
      Highest: ListVideoHighest,
      Custom: ListVideoCustom,
    },
  },
  AudioVideo: {
    Single: {
      Lowest: AudioVideoLowest,
      Highest: AudioVideoHighest,
      Custom: AudioVideoCustom,
    },
    List: {
      Lowest: ListAudioVideoLowest,
      Highest: ListAudioVideoHighest,
      Custom: ListAudioVideoCustom,
    },
  },
};
export default ytdlx;
