import progbar from "./base/progbar";
import help from "./routes/command/help";
import extract from "./routes/command/extract";
import list_formats from "./routes/command/list_formats";
import video_data from "./routes/command/video_data";
import search_videos from "./routes/command/search_videos";
import playlist_data from "./routes/command/playlist_data";
import search_playlists from "./routes/command/search_playlists";
import AudioLowest from "./routes/Audio/AudioLowest";
import AudioHighest from "./routes/Audio/AudioHighest";
import AudioCustom from "./routes/Audio/AudioCustom";
import VideoLowest from "./routes/Video/VideoLowest";
import VideoHighest from "./routes/Video/VideoHighest";
import VideoCustom from "./routes/Video/VideoCustom";
import AudioVideoHighest from "./routes/AudioVideo/AudioVideoHighest";
import AudioVideoLowest from "./routes/AudioVideo/AudioVideoLowest";
import AudioVideoCustom from "./routes/AudioVideo/AudioVideoCustom";
var ytdlx = {
  progbar,
  info: { help, extract, list_formats },
  AudioOnly: { Lowest: AudioLowest, Highest: AudioHighest, Custom: AudioCustom },
  VideoOnly: { Lowest: VideoLowest, Highest: VideoHighest, Custom: VideoCustom },
  AudioVideo: { Lowest: AudioVideoLowest, Highest: AudioVideoHighest, Custom: AudioVideoCustom },
  ytSearch: { Video: { Single: video_data, Multiple: search_videos }, Playlist: { Single: playlist_data, Multiple: search_playlists } },
};
export default ytdlx;
