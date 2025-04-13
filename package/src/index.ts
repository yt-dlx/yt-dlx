import YouTubeID from "./YouTubeId";
import progbar from "./base/progbar";
import help from "./routes/command/help";
import extract from "./routes/command/extract";
import video_data from "./routes/command/video_data";
import AudioLowest from "./routes/Audio/AudioLowest";
import AudioCustom from "./routes/Audio/AudioCustom";
import VideoLowest from "./routes/Video/VideoLowest";
import VideoCustom from "./routes/Video/VideoCustom";
import AudioHighest from "./routes/Audio/AudioHighest";
import VideoHighest from "./routes/Video/VideoHighest";
import list_formats from "./routes/command/list_formats";
import search_videos from "./routes/command/search_videos";
import playlist_data from "./routes/command/playlist_data";
import related_videos from "./routes/command/related_videos";
import video_transcript from "./routes/command/video_transcript";
import search_playlists from "./routes/command/search_playlists";
import AudioVideoLowest from "./routes/AudioVideo/AudioVideoLowest";
import AudioVideoCustom from "./routes/AudioVideo/AudioVideoCustom";
import AudioVideoHighest from "./routes/AudioVideo/AudioVideoHighest";
var ytdlx = {
  progress_bar: progbar,
  info: { help, extract, list_formats, video_transcript, get_videoId: YouTubeID },
  AudioOnly: { Lowest: AudioLowest, Highest: AudioHighest, Custom: AudioCustom },
  VideoOnly: { Lowest: VideoLowest, Highest: VideoHighest, Custom: VideoCustom },
  AudioVideo: { Lowest: AudioVideoLowest, Highest: AudioVideoHighest, Custom: AudioVideoCustom },
  ytSearch: { Video: { Single: video_data, Multiple: search_videos, Related: related_videos }, Playlist: { Single: playlist_data, Multiple: search_playlists } },
};
export default ytdlx;
