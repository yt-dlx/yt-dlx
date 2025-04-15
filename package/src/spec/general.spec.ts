// ==================================================================================
// ==================================================================================
import { env } from "node:process";
import YouTubeDLX from "..";
import dotenv from "dotenv";
import colors from "colors";
import path from "path";
// ==================================================================================
console.clear();
dotenv.config();
// ==================================================================================
async function Account_Tests() {
  async function HomeFeed() {
    console.log(colors.bold.blue("@info"), "Test For HomeFeed: (1): Fetch home feed with only the cookies");
    var emitter = await YouTubeDLX.Account.HomeFeed({ cookies: env.cookies as string });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For HomeFeed: (2): Fetch home feed with cookies and verbose output enabled");
    var emitter = await YouTubeDLX.Account.HomeFeed({ cookies: env.cookies as string, verbose: true });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For HomeFeed: (3): Fetch home feed with cookies and sorting by 'oldest'");
    var emitter = await YouTubeDLX.Account.HomeFeed({ cookies: env.cookies as string, sort: "oldest" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For HomeFeed: (4): Fetch home feed with cookies and sorting by 'newest'");
    var emitter = await YouTubeDLX.Account.HomeFeed({ cookies: env.cookies as string, sort: "newest" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For HomeFeed: (5): Fetch home feed with cookies and sorting by 'old-to-new'");
    var emitter = await YouTubeDLX.Account.HomeFeed({ cookies: env.cookies as string, sort: "old-to-new" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For HomeFeed: (6): Fetch home feed with cookies and sorting by 'new-to-old'");
    var emitter = await YouTubeDLX.Account.HomeFeed({ cookies: env.cookies as string, sort: "new-to-old" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For HomeFeed: (7): Fetch home feed with all parameters (cookies: env.cookies as string, verbose, and sort)");
    var emitter = await YouTubeDLX.Account.HomeFeed({ cookies: env.cookies as string, verbose: true, sort: "new-to-old" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
  }
  async function SubscriptionsFeed() {
    console.log(colors.bold.blue("@info"), "Test For HomeFeed: (1): Fetch subscriptions feed with only the cookies");
    var emitter = await YouTubeDLX.Account.SubscriptionsFeed({ cookies: env.cookies as string });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For HomeFeed: (2): Fetch subscriptions feed with cookies and verbose output enabled");
    var emitter = await YouTubeDLX.Account.SubscriptionsFeed({ cookies: env.cookies as string, verbose: true });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
  }
  async function UnseenNotifications() {
    console.log(colors.bold.blue("@info"), "Test For UnseenNotifications: (1): Fetch unseen notifications count with only the cookies");
    var emitter = await YouTubeDLX.Account.Unseen_Notifications({ cookies: env.cookies as string });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For UnseenNotifications: (2): Fetch unseen notifications count with cookies and verbose output enabled");
    var emitter = await YouTubeDLX.Account.Unseen_Notifications({ cookies: env.cookies as string, verbose: true });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
  }
  async function WatchHistory() {
    console.log(colors.bold.blue("@info"), "Test For WatchHistory: (1): Fetch watch history with only the cookies");
    var emitter = await YouTubeDLX.Account.History({ cookies: env.cookies as string });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For WatchHistory: (2): Fetch watch history with cookies and verbose output enabled");
    var emitter = await YouTubeDLX.Account.History({ cookies: env.cookies as string, verbose: true });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For WatchHistory: (3): Fetch watch history with cookies and sorting by 'oldest'");
    var emitter = await YouTubeDLX.Account.History({ cookies: env.cookies as string, sort: "oldest" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For WatchHistory: (4): Fetch watch history with cookies and sorting by 'newest'");
    var emitter = await YouTubeDLX.Account.History({ cookies: env.cookies as string, sort: "newest" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For WatchHistory: (5): Fetch watch history with cookies and sorting by 'old-to-new'");
    var emitter = await YouTubeDLX.Account.History({ cookies: env.cookies as string, sort: "old-to-new" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For WatchHistory: (6): Fetch watch history with cookies and sorting by 'new-to-old'");
    var emitter = await YouTubeDLX.Account.History({ cookies: env.cookies as string, sort: "new-to-old" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For WatchHistory: (7): Fetch watch history with all parameters (cookies: env.cookies as string, verbose, and sort)");
    var emitter = await YouTubeDLX.Account.History({ cookies: env.cookies as string, verbose: true, sort: "new-to-old" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
  }
  await HomeFeed();
  await SubscriptionsFeed();
  await UnseenNotifications();
  await WatchHistory();
}
// ==================================================================================
// ==================================================================================
async function Search_Tests() {
  async function AdvanceSearch() {
    console.log(colors.bold.blue("@info"), "Test For Advance_Search: (1): Basic search with only the query");
    var emitter = await YouTubeDLX.Search.Video.Advance_Search({ query: "test video" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For Advance_Search: (2): Search with minimum view count");
    var emitter = await YouTubeDLX.Search.Video.Advance_Search({ query: "test video", minViews: 1000 });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For Advance_Search: (3): Search with maximum view count");
    var emitter = await YouTubeDLX.Search.Video.Advance_Search({ query: "test video", maxViews: 200000 });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For Advance_Search: (4): Search with both minViews and maxViews");
    var emitter = await YouTubeDLX.Search.Video.Advance_Search({ query: "test video", minViews: 500, maxViews: 50000 });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For Advance_Search: (5): Search with ordering by view count");
    var emitter = await YouTubeDLX.Search.Video.Advance_Search({ query: "test video", orderBy: "viewCount" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For Advance_Search: (6): Search with verbose output enabled");
    var emitter = await YouTubeDLX.Search.Video.Advance_Search({ query: "test video", verbose: true });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For Advance_Search: (7): Search with order by date");
    var emitter = await YouTubeDLX.Search.Video.Advance_Search({ query: "test video", orderBy: "date" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For Advance_Search: (8): Search with all parameters (query, minViews, maxViews, orderBy, verbose)");
    var emitter = await YouTubeDLX.Search.Video.Advance_Search({ query: "test video", minViews: 1000, maxViews: 200000, orderBy: "viewCount", verbose: true });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
  }
  async function ChannelData() {
    console.log(colors.bold.blue("@info"), "Test For Channel_Data: (1): Fetch channel data with only the channel link");
    var emitter = await YouTubeDLX.Search.Video.Channel_Data({ channelLink: "https://www.youtube.com/c/testchannel" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
  }
  async function PlaylistData() {
    console.log(colors.bold.blue("@info"), "Test For PlaylistData: (1): Fetch playlist data with only the playlist link");
    var emitter = await YouTubeDLX.Search.Playlist.Single({ playlistLink: "https://www.youtube.com/playlist?list=PLw-VjHDlEOgs6k8xQ6sB9zAqS6vhJh2tV" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For PlaylistData: (2): Fetch playlist data with an invalid playlist link");
    var emitter = await YouTubeDLX.Search.Playlist.Single({ playlistLink: "https://www.youtube.com/playlist?list=INVALID" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
  }
  async function RelatedVideos() {
    console.log(colors.bold.blue("@info"), "Test For RelatedVideos: (1): Fetch related videos with only the video ID");
    var emitter = await YouTubeDLX.Search.Video.Related({ videoId: "dQw4w9WgXcQ" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For RelatedVideos: (2): Fetch related videos with an invalid video ID");
    var emitter = await YouTubeDLX.Search.Video.Related({ videoId: "INVALID_VIDEO_ID" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
  }
  async function SearchChannels() {
    console.log(colors.bold.blue("@info"), "Test For SearchChannels: (1): Search for channels with a valid query");
    var emitter = await YouTubeDLX.Search.Video.Channel({ query: "Tech channels" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For SearchChannels: (2): Search for channels with an invalid query");
    var emitter = await YouTubeDLX.Search.Video.Channel({ query: "INVALID_QUERY" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
  }
  async function SearchPlaylists() {
    console.log(colors.bold.blue("@info"), "Test For SearchPlaylists: (1): Search for playlists with a valid playlist link");
    var emitter = await YouTubeDLX.Search.Playlist.Multiple({ playlistLink: "Top 10 Music Playlists" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For SearchPlaylists: (2): Search for playlists with an invalid playlist link");
    var emitter = await YouTubeDLX.Search.Playlist.Multiple({ playlistLink: "INVALID_PLAYLIST_LINK" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For SearchPlaylists: (3): Search for playlists with a playlist link being the ID of an existing playlist");
    var emitter = await YouTubeDLX.Search.Playlist.Multiple({ playlistLink: "https://www.youtube.com/playlist?list=PLAYLIST_ID" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
  }
  async function SearchVideos() {
    console.log(colors.bold.blue("@info"), "Test For SearchVideos: (1): Search for videos with a valid query");
    var emitter = await YouTubeDLX.Search.Video.Multiple({ query: "Node.js tutorial" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For SearchVideos: (2): Search for videos with an invalid query");
    var emitter = await YouTubeDLX.Search.Video.Multiple({ query: "INVALID_QUERY" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For SearchVideos: (3): Search for videos with a video link (which is not supported)");
    var emitter = await YouTubeDLX.Search.Video.Multiple({ query: "https://www.youtube.com/watch?v=VIDEO_ID" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
  }
  async function VideoData() {
    console.log(colors.bold.blue("@info"), "Test For VideoData: (1): Fetch video data with a valid video link");
    var emitter = await YouTubeDLX.Search.Video.Single({ videoLink: "https://www.youtube.com/watch?v=VIDEO_ID" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For VideoData: (2): Fetch video data with an invalid video link");
    var emitter = await YouTubeDLX.Search.Video.Single({ videoLink: "https://www.youtube.com/watch?v=INVALID_ID" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
  }
  await AdvanceSearch();
  await ChannelData();
  await PlaylistData();
  await RelatedVideos();
  await SearchChannels();
  await SearchPlaylists();
  await SearchVideos();
  await VideoData();
}
// ==================================================================================
// ==================================================================================
async function Info_Tests() {
  async function Extract() {
    console.log(colors.bold.blue("@info"), "Test For Extract: (1): Extract video data with only the query");
    var emitter = await YouTubeDLX.Info.Extract({ query: "test video" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For Extract: (2): Extract video data with verbose output enabled");
    var emitter = await YouTubeDLX.Info.Extract({ query: "test video", verbose: true });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For Extract: (3): Extract video data with Tor enabled");
    var emitter = await YouTubeDLX.Info.Extract({ query: "test video", useTor: true });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For Extract: (4): Extract video data with all parameters (query, verbose, useTor)");
    var emitter = await YouTubeDLX.Info.Extract({ query: "test video", verbose: true, useTor: true });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
  }
  async function Help() {
    console.log(colors.bold.blue("@info"), "Test For Help: (1): Display help message and get the help URL");
    var emitter = await YouTubeDLX.Info.Help();
    console.log(colors.italic.green("@data:"), emitter);
  }
  async function ListFormats() {
    console.log(colors.bold.blue("@info"), "Test For list_formats: (1): List formats with only the query");
    var emitter = await YouTubeDLX.Info.Formats({ query: "test video" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For list_formats: (2): List formats with query and verbose output enabled");
    var emitter = await YouTubeDLX.Info.Formats({ query: "test video", verbose: true });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
  }
  async function LiveVideoData() {
    console.log(colors.bold.blue("@info"), "Test For Live: (1): Fetch live video data with only the video link");
    var emitter = await YouTubeDLX.Info.Live({ videoLink: "https://www.youtube.com/watch?v=test_video_id" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For Live: (2): Fetch live video data with verbose output enabled");
    var emitter = await YouTubeDLX.Info.Live({ videoLink: "https://www.youtube.com/watch?v=test_video_id", verbose: true });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
  }
  async function VideoComments() {
    console.log(colors.bold.blue("@info"), "Test For VideoComments: (1): Fetch video comments with only the query");
    var emitter = await YouTubeDLX.Info.Comments({ query: "Node.js tutorial" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For VideoComments: (2): Fetch video comments with verbose output enabled");
    var emitter = await YouTubeDLX.Info.Comments({ query: "Node.js tutorial", verbose: true });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For VideoComments: (3): Fetch video comments with the filter set to 'newest'");
    var emitter = await YouTubeDLX.Info.Comments({ query: "Node.js tutorial", filter: "newest" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For VideoComments: (4): Fetch video comments with the filter set to 'most_liked'");
    var emitter = await YouTubeDLX.Info.Comments({ query: "Node.js tutorial", filter: "most_liked" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For VideoComments: (5): Fetch video comments with the filter set to 'pinned'");
    var emitter = await YouTubeDLX.Info.Comments({ query: "Node.js tutorial", filter: "pinned" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For VideoComments: (6): Fetch video comments with the filter set to 'longest'");
    var emitter = await YouTubeDLX.Info.Comments({ query: "Node.js tutorial", filter: "longest" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
  }
  async function VideoTranscript() {
    console.log(colors.bold.blue("@info"), "Test For VideoTranscript: (1): Fetch transcript data with only the video link");
    var emitter = await YouTubeDLX.Info.Transcript({ videoLink: "https://www.youtube.com/watch?v=VIDEO_ID" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For VideoTranscript: (2): Fetch transcript data with an invalid video link");
    var emitter = await YouTubeDLX.Info.Transcript({ videoLink: "https://www.youtube.com/watch?v=INVALID_ID" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For VideoTranscript: (3): Fetch transcript data with verbose output enabled");
  }
  await Extract();
  await Help();
  await ListFormats();
  await LiveVideoData();
  await VideoComments();
}
// ==================================================================================
// ==================================================================================
async function Video_Tests() {
  async function VideoCustom() {
    console.log(colors.bold.blue("@info"), "Test For VideoCustom: (1): Process a video with only the query and resolution");
    var emitter = await YouTubeDLX.Video.Custom({ query: "test video", resolution: "720p" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For VideoCustom: (2): Process a video with the query, resolution, and a filter (grayscale)");
    var emitter = await YouTubeDLX.Video.Custom({ query: "test video", resolution: "1080p", filter: "grayscale" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For VideoCustom: (3): Stream a video with the query, resolution, and stream option enabled");
    var emitter = await YouTubeDLX.Video.Custom({ query: "test video", resolution: "480p", stream: true });
    emitter.on("stream", streamData => console.log(colors.italic.green("@stream:"), streamData));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For VideoCustom: (4): Process a video with verbose output enabled");
    var emitter = await YouTubeDLX.Video.Custom({ query: "test video", resolution: "720p", verbose: true });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For VideoCustom: (5): Fetch metadata instead of processing the video");
    var emitter = await YouTubeDLX.Video.Custom({ query: "test video", resolution: "1080p", metadata: true });
    emitter.on("metadata", metadata => console.log(colors.italic.green("@metadata:"), metadata));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For VideoCustom: (6): Process a video with query, resolution, filter, stream, and metadata");
    var emitter = await YouTubeDLX.Video.Custom({ query: "test video", resolution: "720p", filter: "grayscale", stream: true, metadata: true });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For VideoCustom: (7): Process a video with all parameters (query, output, filter, stream, verbose, metadata, resolution)");
    var emitter = await YouTubeDLX.Video.Custom({
      query: "test video",
      output: path.resolve(process.cwd(), "output"),
      resolution: "720p",
      filter: "grayscale",
      stream: true,
      verbose: true,
      metadata: true,
    });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
  }
  async function VideoHighest() {
    console.log(colors.bold.blue("@info"), "Test For VideoHighest: (1): Process the highest quality video with only the query");
    var emitter = await YouTubeDLX.Video.Highest({ query: "test video" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For VideoHighest: (2): Process the highest quality video with the query and a filter (grayscale)");
    var emitter = await YouTubeDLX.Video.Highest({ query: "test video", filter: "grayscale" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For VideoHighest: (3): Stream the highest quality video with the query and stream option enabled");
    var emitter = await YouTubeDLX.Video.Highest({ query: "test video", stream: true });
    emitter.on("stream", streamData => console.log(colors.italic.green("@stream:"), streamData));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For VideoHighest: (4): Process the highest quality video with verbose output enabled");
    var emitter = await YouTubeDLX.Video.Highest({ query: "test video", verbose: true });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For VideoHighest: (5): Fetch metadata instead of processing the video");
    var emitter = await YouTubeDLX.Video.Highest({ query: "test video", metadata: true });
    emitter.on("metadata", metadata => console.log(colors.italic.green("@metadata:"), metadata));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For VideoHighest: (6): Process the highest quality video with query, filter, stream, and metadata");
    var emitter = await YouTubeDLX.Video.Highest({ query: "test video", filter: "grayscale", stream: true, metadata: true });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For VideoHighest: (7): Process the highest quality video with all parameters (query, output, filter, stream, verbose, metadata)");
    var emitter = await YouTubeDLX.Video.Highest({ query: "test video", output: path.resolve(process.cwd(), "output"), filter: "grayscale", stream: true, verbose: true, metadata: true });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
  }
  async function VideoLowest() {
    console.log(colors.bold.blue("@info"), "Test For VideoLowest: (1): Process the lowest quality video with only the query");
    var emitter = await YouTubeDLX.Video.Lowest({ query: "test video" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For VideoLowest: (2): Process the lowest quality video with the query and a filter (grayscale)");
    var emitter = await YouTubeDLX.Video.Lowest({ query: "test video", filter: "grayscale" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For VideoLowest: (3): Stream the lowest quality video with the query and stream option enabled");
    var emitter = await YouTubeDLX.Video.Lowest({ query: "test video", stream: true });
    emitter.on("stream", streamData => console.log(colors.italic.green("@stream:"), streamData));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For VideoLowest: (4): Process the lowest quality video with verbose output enabled");
    var emitter = await YouTubeDLX.Video.Lowest({ query: "test video", verbose: true });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For VideoLowest: (5): Fetch metadata instead of processing the video");
    var emitter = await YouTubeDLX.Video.Lowest({ query: "test video", metadata: true });
    emitter.on("metadata", metadata => console.log(colors.italic.green("@metadata:"), metadata));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For VideoLowest: (6): Process the lowest quality video with query, filter, stream, and metadata");
    var emitter = await YouTubeDLX.Video.Lowest({ query: "test video", filter: "grayscale", stream: true, metadata: true });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For VideoLowest: (7): Process the lowest quality video with all parameters (query, output, filter, stream, verbose, metadata)");
    var emitter = await YouTubeDLX.Video.Lowest({ query: "test video", output: path.resolve(process.cwd(), "output"), filter: "grayscale", stream: true, verbose: true, metadata: true });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
  }
  await VideoCustom();
  await VideoHighest();
  await VideoLowest();
}
// ==================================================================================
// ==================================================================================
async function Audio_Tests() {
  async function AudioCustom() {
    console.log(colors.bold.blue("@info"), "Test For AudioCustom: (1): Download and process audio with only the query and resolution");
    var emitter = await YouTubeDLX.Audio.Custom({ query: "test song", resolution: "high" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For AudioCustom: (2): Download and process audio with query, resolution, and verbose output enabled");
    var emitter = await YouTubeDLX.Audio.Custom({ query: "test song", resolution: "high", verbose: true });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For AudioCustom: (3): Download and process audio with query, resolution, and custom output folder");
    var emitter = await YouTubeDLX.Audio.Custom({ query: "test song", resolution: "high", output: path.resolve(process.cwd(), "output") });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For AudioCustom: (4): Download and stream audio with query, resolution, and stream enabled");
    var emitter = await YouTubeDLX.Audio.Custom({ query: "test song", resolution: "high", stream: true });
    emitter.on("stream", streamData => console.log(colors.italic.green("@stream:"), streamData));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For AudioCustom: (5): Download and process audio with query, resolution, and audio filter applied");
    var emitter = await YouTubeDLX.Audio.Custom({ query: "test song", resolution: "high", filter: "bassboost" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For AudioCustom: (6): Download and process audio with metadata instead of downloading the audio");
    var emitter = await YouTubeDLX.Audio.Custom({ query: "test song", resolution: "high", metadata: true });
    emitter.on("metadata", metadata => console.log(colors.italic.green("@metadata:"), metadata));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For AudioCustom: (7): Download and process audio with all parameters (query, resolution, output, stream, filter, verbose, metadata)");
    var emitter = await YouTubeDLX.Audio.Custom({ query: "test song", resolution: "high", output: path.resolve(process.cwd(), "output"), stream: true, filter: "echo", verbose: true, metadata: true });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
  }
  async function AudioHighest() {
    console.log(colors.bold.blue("@info"), "Test For AudioHighest: (1): Download and process highest quality audio with only the query and filter");
    var emitter = await YouTubeDLX.Audio.Highest({ query: "test song", filter: "bassboost" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For AudioHighest: (2): Download and process highest quality audio with query, filter, and verbose output enabled");
    var emitter = await YouTubeDLX.Audio.Highest({ query: "test song", filter: "bassboost", verbose: true });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For AudioHighest: (3): Download and process highest quality audio with query, filter, and custom output folder");
    var emitter = await YouTubeDLX.Audio.Highest({ query: "test song", filter: "bassboost", output: path.resolve(process.cwd(), "output") });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For AudioHighest: (4): Stream highest quality audio with query and stream enabled");
    var emitter = await YouTubeDLX.Audio.Highest({ query: "test song", stream: true });
    emitter.on("stream", streamData => console.log(colors.italic.green("@stream:"), streamData));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For AudioHighest: (5): Download and process highest quality audio with query, filter, and metadata output enabled");
    var emitter = await YouTubeDLX.Audio.Highest({ query: "test song", filter: "bassboost", metadata: true });
    emitter.on("metadata", metadata => console.log(colors.italic.green("@metadata:"), metadata));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For AudioHighest: (6): Download and process highest quality audio with query, filter, stream, and metadata");
    var emitter = await YouTubeDLX.Audio.Highest({ query: "test song", filter: "bassboost", stream: true, metadata: true });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For AudioHighest: (7): Download and process highest quality audio with all parameters (query, output, filter, stream, verbose, metadata)");
    var emitter = await YouTubeDLX.Audio.Highest({ query: "test song", output: path.resolve(process.cwd(), "output"), filter: "bassboost", stream: true, verbose: true, metadata: true });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
  }
  async function AudioLowest() {
    console.log(colors.bold.blue("@info"), "Test For AudioLowest: (1): Download and process lowest quality audio with only the query and filter");
    var emitter = await YouTubeDLX.Audio.Lowest({ query: "test song", filter: "bassboost" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For AudioLowest: (2): Download and process lowest quality audio with query, filter, and verbose output enabled");
    var emitter = await YouTubeDLX.Audio.Lowest({ query: "test song", filter: "bassboost", verbose: true });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For AudioLowest: (3): Download and process lowest quality audio with query, filter, and custom output folder");
    var emitter = await YouTubeDLX.Audio.Lowest({ query: "test song", filter: "bassboost", output: path.resolve(process.cwd(), "output") });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For AudioLowest: (4): Stream lowest quality audio with query and stream enabled");
    var emitter = await YouTubeDLX.Audio.Lowest({ query: "test song", stream: true });
    emitter.on("stream", streamData => console.log(colors.italic.green("@stream:"), streamData));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For AudioLowest: (5): Download and process lowest quality audio with query, filter, and metadata output enabled");
    var emitter = await YouTubeDLX.Audio.Lowest({ query: "test song", filter: "bassboost", metadata: true });
    emitter.on("metadata", metadata => console.log(colors.italic.green("@metadata:"), metadata));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For AudioLowest: (6): Download and process lowest quality audio with query, filter, stream, and metadata");
    var emitter = await YouTubeDLX.Audio.Lowest({ query: "test song", filter: "bassboost", stream: true, metadata: true });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For AudioLowest: (7): Download and process lowest quality audio with all parameters (query, output, filter, stream, verbose, metadata)");
    var emitter = await YouTubeDLX.Audio.Lowest({ query: "test song", output: path.resolve(process.cwd(), "output"), filter: "bassboost", stream: true, verbose: true, metadata: true });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
  }
  await AudioCustom();
  await AudioHighest();
  await AudioLowest();
}
// ==================================================================================
// ==================================================================================
async function Audio_Video_Tests() {
  async function AudioVideoCustom() {
    console.log(colors.bold.blue("@info"), "Test For AudioVideoCustom: (1): Download and process audio and video with only the query, resolution, and filter");
    var emitter = await YouTubeDLX.Audio_Video.Custom({ query: "test song", resolution: "720p", filter: "grayscale" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For AudioVideoCustom: (2): Download and process audio and video with query, resolution, filter, and verbose output enabled");
    var emitter = await YouTubeDLX.Audio_Video.Custom({ query: "test song", resolution: "720p", filter: "grayscale", verbose: true });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For AudioVideoCustom: (3): Download and process audio and video with query, resolution, and custom output folder");
    var emitter = await YouTubeDLX.Audio_Video.Custom({ query: "test song", resolution: "720p", filter: "grayscale", output: path.resolve(process.cwd(), "output") });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For AudioVideoCustom: (4): Stream audio and video with query, resolution, and stream enabled");
    var emitter = await YouTubeDLX.Audio_Video.Custom({ query: "test song", resolution: "720p", stream: true });
    emitter.on("stream", streamData => console.log(colors.italic.green("@stream:"), streamData));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For AudioVideoCustom: (5): Download and process audio and video with query, resolution, filter, and metadata output enabled");
    var emitter = await YouTubeDLX.Audio_Video.Custom({ query: "test song", resolution: "720p", filter: "grayscale", metadata: true });
    emitter.on("metadata", metadata => console.log(colors.italic.green("@metadata:"), metadata));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For AudioVideoCustom: (6): Download and process audio and video with query, resolution, filter, stream, and metadata");
    var emitter = await YouTubeDLX.Audio_Video.Custom({ query: "test song", resolution: "720p", filter: "grayscale", stream: true, metadata: true });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For AudioVideoCustom: (7): Download and process audio and video with all parameters (query, output, filter, stream, verbose, metadata, resolution)");
    var emitter = await YouTubeDLX.Audio_Video.Custom({
      query: "test song",
      output: path.resolve(process.cwd(), "output"),
      resolution: "720p",
      filter: "grayscale",
      stream: true,
      verbose: true,
      metadata: true,
    });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
  }
  async function AudioVideoHighest() {
    console.log(colors.bold.blue("@info"), "Test For AudioVideoHighest: (1): Download and process highest quality audio and video with only the query and filter");
    var emitter = await YouTubeDLX.Audio_Video.Highest({ query: "test song", filter: "grayscale" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For AudioVideoHighest: (2): Download and process highest quality audio and video with query, filter, and verbose output enabled");
    var emitter = await YouTubeDLX.Audio_Video.Highest({ query: "test song", filter: "grayscale", verbose: true });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For AudioVideoHighest: (3): Download and process highest quality audio and video with query, filter, and custom output folder");
    var emitter = await YouTubeDLX.Audio_Video.Highest({ query: "test song", filter: "grayscale", output: path.resolve(process.cwd(), "output") });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For AudioVideoHighest: (4): Stream highest quality audio and video with query, filter, and stream enabled");
    var emitter = await YouTubeDLX.Audio_Video.Highest({ query: "test song", filter: "grayscale", stream: true });
    emitter.on("stream", streamData => console.log(colors.italic.green("@stream:"), streamData));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For AudioVideoHighest: (5): Download and process highest quality audio and video with query, filter, and metadata output enabled");
    var emitter = await YouTubeDLX.Audio_Video.Highest({ query: "test song", filter: "grayscale", metadata: true });
    emitter.on("metadata", metadata => console.log(colors.italic.green("@metadata:"), metadata));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For AudioVideoHighest: (6): Download and process highest quality audio and video with query, filter, stream, and metadata");
    var emitter = await YouTubeDLX.Audio_Video.Highest({ query: "test song", filter: "grayscale", stream: true, metadata: true });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(
      colors.bold.blue("@info"),
      "Test For AudioVideoHighest: (7): Download and process highest quality audio and video with all parameters (query, output, filter, stream, verbose, metadata)",
    );
    var emitter = await YouTubeDLX.Audio_Video.Highest({ query: "test song", output: path.resolve(process.cwd(), "output"), filter: "grayscale", stream: true, verbose: true, metadata: true });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
  }
  async function AudioVideoLowest() {
    console.log(colors.bold.blue("@info"), "Test For AudioVideoLowest: (1): Download and process lowest quality audio and video with only the query and filter");
    var emitter = await YouTubeDLX.Audio_Video.Lowest({ query: "test song", filter: "grayscale" });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For AudioVideoLowest: (2): Download and process lowest quality audio and video with query, filter, and verbose output enabled");
    var emitter = await YouTubeDLX.Audio_Video.Lowest({ query: "test song", filter: "grayscale", verbose: true });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For AudioVideoLowest: (3): Download and process lowest quality audio and video with query, filter, and custom output folder");
    var emitter = await YouTubeDLX.Audio_Video.Lowest({ query: "test song", filter: "grayscale", output: path.resolve(process.cwd(), "output") });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For AudioVideoLowest: (4): Stream lowest quality audio and video with query, filter, and stream enabled");
    var emitter = await YouTubeDLX.Audio_Video.Lowest({ query: "test song", filter: "grayscale", stream: true });
    emitter.on("stream", streamData => console.log(colors.italic.green("@stream:"), streamData));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For AudioVideoLowest: (5): Download and process lowest quality audio and video with query, filter, and metadata output enabled");
    var emitter = await YouTubeDLX.Audio_Video.Lowest({ query: "test song", filter: "grayscale", metadata: true });
    emitter.on("metadata", metadata => console.log(colors.italic.green("@metadata:"), metadata));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(colors.bold.blue("@info"), "Test For AudioVideoLowest: (6): Download and process lowest quality audio and video with query, filter, stream, and metadata");
    var emitter = await YouTubeDLX.Audio_Video.Lowest({ query: "test song", filter: "grayscale", stream: true, metadata: true });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
    console.log(
      colors.bold.blue("@info"),
      "Test For AudioVideoLowest: (7): Download and process lowest quality audio and video with all parameters (query, output, filter, stream, verbose, metadata)",
    );
    var emitter = await YouTubeDLX.Audio_Video.Lowest({ query: "test song", output: path.resolve(process.cwd(), "output"), filter: "grayscale", stream: true, verbose: true, metadata: true });
    emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
    emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
  }
  await AudioVideoCustom();
  await AudioVideoHighest();
  await AudioVideoLowest();
}
// ==================================================================================
// ==================================================================================
(async () => {
  await Account_Tests();
  await Search_Tests();
  await Info_Tests();
  await Audio_Tests();
  await Video_Tests();
  await Audio_Video_Tests();
})();
