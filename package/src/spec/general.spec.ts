// ==================================================================================
// ==================================================================================
console.clear();
import YouTubeDLX from "..";
import colors from "colors";
import * as path from "path";
// ==================================================================================
// ==================================================================================
async function Account_Tests() {
  async function HomeFeed() {
    console.log(colors.blue("@info"), "Test For HomeFeed: (1): Fetch home feed with only the cookiesPath");
    YouTubeDLX.Account.HomeFeed({ cookiesPath: path.resolve(process.cwd(), "./cookies.txt") })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For HomeFeed: (2): Fetch home feed with cookiesPath and verbose output enabled");
    YouTubeDLX.Account.HomeFeed({ cookiesPath: path.resolve(process.cwd(), "./cookies.txt"), verbose: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For HomeFeed: (3): Fetch home feed with cookiesPath and sorting by 'oldest'");
    YouTubeDLX.Account.HomeFeed({ cookiesPath: "path/to/cookies", sort: "oldest" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For HomeFeed: (4): Fetch home feed with cookiesPath and sorting by 'newest'");
    YouTubeDLX.Account.HomeFeed({ cookiesPath: path.resolve(process.cwd(), "./cookies.txt"), sort: "newest" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For HomeFeed: (5): Fetch home feed with cookiesPath and sorting by 'old-to-new'");
    YouTubeDLX.Account.HomeFeed({ cookiesPath: path.resolve(process.cwd(), "./cookies.txt"), sort: "old-to-new" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For HomeFeed: (6): Fetch home feed with cookiesPath and sorting by 'new-to-old'");
    YouTubeDLX.Account.HomeFeed({ cookiesPath: path.resolve(process.cwd(), "./cookies.txt"), sort: "new-to-old" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For HomeFeed: (7): Fetch home feed with all parameters (cookiesPath, verbose, and sort)");
    YouTubeDLX.Account.HomeFeed({ cookiesPath: path.resolve(process.cwd(), "./cookies.txt"), verbose: true, sort: "new-to-old" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
  }
  async function SubscriptionsFeed() {
    console.log(colors.blue("@info"), "Test For HomeFeed: (1): Fetch subscriptions feed with only the cookiesPath");
    YouTubeDLX.Account.SubscriptionsFeed({ cookiesPath: path.resolve(process.cwd(), "./cookies.txt") })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For HomeFeed: (2): Fetch subscriptions feed with cookiesPath and verbose output enabled");
    YouTubeDLX.Account.SubscriptionsFeed({ cookiesPath: path.resolve(process.cwd(), "./cookies.txt"), verbose: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
  }
  async function UnseenNotifications() {
    console.log(colors.blue("@info"), "Test For UnseenNotifications: (1): Fetch unseen notifications count with only the cookiesPath");
    YouTubeDLX.Account.Unseen_Notifications({ cookiesPath: path.resolve(process.cwd(), "./cookies.txt") })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For UnseenNotifications: (2): Fetch unseen notifications count with cookiesPath and verbose output enabled");
    YouTubeDLX.Account.Unseen_Notifications({ cookiesPath: path.resolve(process.cwd(), "./cookies.txt"), verbose: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
  }
  async function WatchHistory() {
    console.log(colors.blue("@info"), "Test For WatchHistory: (1): Fetch watch history with only the cookiesPath");
    YouTubeDLX.Account.History({ cookiesPath: path.resolve(process.cwd(), "./cookies.txt") })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For WatchHistory: (2): Fetch watch history with cookiesPath and verbose output enabled");
    YouTubeDLX.Account.History({ cookiesPath: path.resolve(process.cwd(), "./cookies.txt"), verbose: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For WatchHistory: (3): Fetch watch history with cookiesPath and sorting by 'oldest'");
    YouTubeDLX.Account.History({ cookiesPath: path.resolve(process.cwd(), "./cookies.txt"), sort: "oldest" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For WatchHistory: (4): Fetch watch history with cookiesPath and sorting by 'newest'");
    YouTubeDLX.Account.History({ cookiesPath: path.resolve(process.cwd(), "./cookies.txt"), sort: "newest" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For WatchHistory: (5): Fetch watch history with cookiesPath and sorting by 'old-to-new'");
    YouTubeDLX.Account.History({ cookiesPath: path.resolve(process.cwd(), "./cookies.txt"), sort: "old-to-new" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For WatchHistory: (6): Fetch watch history with cookiesPath and sorting by 'new-to-old'");
    YouTubeDLX.Account.History({ cookiesPath: path.resolve(process.cwd(), "./cookies.txt"), sort: "new-to-old" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For WatchHistory: (7): Fetch watch history with all parameters (cookiesPath, verbose, and sort)");
    YouTubeDLX.Account.History({ cookiesPath: path.resolve(process.cwd(), "./cookies.txt"), verbose: true, sort: "new-to-old" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
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
    console.log(colors.blue("@info"), "Test For Advance_Search: (1): Basic search with only the query");
    YouTubeDLX.Search.Video.Advance_Search({ query: "test video" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For Advance_Search: (2): Search with minimum view count");
    YouTubeDLX.Search.Video.Advance_Search({ query: "test video", minViews: 1000 })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For Advance_Search: (3): Search with maximum view count");
    YouTubeDLX.Search.Video.Advance_Search({ query: "test video", maxViews: 200000 })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For Advance_Search: (4): Search with both minViews and maxViews");
    YouTubeDLX.Search.Video.Advance_Search({ query: "test video", minViews: 500, maxViews: 50000 })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For Advance_Search: (5): Search with ordering by view count");
    YouTubeDLX.Search.Video.Advance_Search({ query: "test video", orderBy: "viewCount" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For Advance_Search: (6): Search with verbose output enabled");
    YouTubeDLX.Search.Video.Advance_Search({ query: "test video", verbose: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For Advance_Search: (7): Search with order by date");
    YouTubeDLX.Search.Video.Advance_Search({ query: "test video", orderBy: "date" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For Advance_Search: (8): Search with all parameters (query, minViews, maxViews, orderBy, verbose)");
    YouTubeDLX.Search.Video.Advance_Search({ query: "test video", minViews: 1000, maxViews: 200000, orderBy: "viewCount", verbose: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
  }
  async function ChannelData() {
    console.log(colors.blue("@info"), "Test For Channel_Data: (1): Fetch channel data with only the channel link");
    YouTubeDLX.Search.Video.Channel_Data({ channelLink: "https://www.youtube.com/c/testchannel" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
  }
  async function PlaylistData() {
    console.log(colors.blue("@info"), "Test For PlaylistData: (1): Fetch playlist data with only the playlist link");
    YouTubeDLX.Search.Playlist.Single({ playlistLink: "https://www.youtube.com/playlist?list=PLw-VjHDlEOgs6k8xQ6sB9zAqS6vhJh2tV" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For PlaylistData: (2): Fetch playlist data with an invalid playlist link");
    YouTubeDLX.Search.Playlist.Single({ playlistLink: "https://www.youtube.com/playlist?list=INVALID" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
  }
  async function RelatedVideos() {
    console.log(colors.blue("@info"), "Test For RelatedVideos: (1): Fetch related videos with only the video ID");
    YouTubeDLX.Search.Video.Related({ videoId: "dQw4w9WgXcQ" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For RelatedVideos: (2): Fetch related videos with an invalid video ID");
    YouTubeDLX.Search.Video.Related({ videoId: "INVALID_VIDEO_ID" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
  }
  async function SearchChannels() {
    console.log(colors.blue("@info"), "Test For SearchChannels: (1): Search for channels with a valid query");
    YouTubeDLX.Search.Video.Channel({ query: "Tech channels" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For SearchChannels: (2): Search for channels with an invalid query");
    YouTubeDLX.Search.Video.Channel({ query: "INVALID_QUERY" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
  }
  async function SearchPlaylists() {
    console.log(colors.blue("@info"), "Test For SearchPlaylists: (1): Search for playlists with a valid playlist link");
    YouTubeDLX.Search.Playlist.Multiple({ playlistLink: "Top 10 Music Playlists" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For SearchPlaylists: (2): Search for playlists with an invalid playlist link");
    YouTubeDLX.Search.Playlist.Multiple({ playlistLink: "INVALID_PLAYLIST_LINK" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For SearchPlaylists: (3): Search for playlists with a playlist link being the ID of an existing playlist");
    YouTubeDLX.Search.Playlist.Multiple({ playlistLink: "https://www.youtube.com/playlist?list=PLAYLIST_ID" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
  }
  async function SearchVideos() {
    console.log(colors.blue("@info"), "Test For SearchVideos: (1): Search for videos with a valid query");
    YouTubeDLX.Search.Video.Multiple({ query: "Node.js tutorial" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For SearchVideos: (2): Search for videos with an invalid query");
    YouTubeDLX.Search.Video.Multiple({ query: "INVALID_QUERY" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For SearchVideos: (3): Search for videos with a video link (which is not supported)");
    YouTubeDLX.Search.Video.Multiple({ query: "https://www.youtube.com/watch?v=VIDEO_ID" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
  }
  async function VideoData() {
    console.log(colors.blue("@info"), "Test For VideoData: (1): Fetch video data with a valid video link");
    YouTubeDLX.Search.Video.Single({ videoLink: "https://www.youtube.com/watch?v=VIDEO_ID" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoData: (2): Fetch video data with an invalid video link");
    YouTubeDLX.Search.Video.Single({ videoLink: "https://www.youtube.com/watch?v=INVALID_ID" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
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
    console.log(colors.blue("@info"), "Test For Extract: (1): Extract video data with only the query");
    YouTubeDLX.Info.Extract({ query: "test video" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For Extract: (2): Extract video data with verbose output enabled");
    YouTubeDLX.Info.Extract({ query: "test video", verbose: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For Extract: (3): Extract video data with Tor enabled");
    YouTubeDLX.Info.Extract({ query: "test video", useTor: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For Extract: (4): Extract video data with all parameters (query, verbose, useTor)");
    YouTubeDLX.Info.Extract({ query: "test video", verbose: true, useTor: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
  }
  async function Help() {
    console.log(colors.blue("@info"), "Test For Help: (1): Display help message and get the help URL");
    const helpUrl = await YouTubeDLX.Info.Help();
    console.log(colors.green("@data:"), helpUrl);
  }
  async function ListFormats() {
    console.log(colors.blue("@info"), "Test For list_formats: (1): List formats with only the query");
    YouTubeDLX.Info.Formats({ query: "test video" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For list_formats: (2): List formats with query and verbose output enabled");
    YouTubeDLX.Info.Formats({ query: "test video", verbose: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
  }
  async function LiveVideoData() {
    console.log(colors.blue("@info"), "Test For Live: (1): Fetch live video data with only the video link");
    YouTubeDLX.Info.Live({ videoLink: "https://www.youtube.com/watch?v=test_video_id" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For Live: (2): Fetch live video data with verbose output enabled");
    YouTubeDLX.Info.Live({ videoLink: "https://www.youtube.com/watch?v=test_video_id", verbose: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
  }
  async function VideoComments() {
    console.log(colors.blue("@info"), "Test For VideoComments: (1): Fetch video comments with only the query");
    YouTubeDLX.Info.Comments({ query: "Node.js tutorial" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoComments: (2): Fetch video comments with verbose output enabled");
    YouTubeDLX.Info.Comments({ query: "Node.js tutorial", verbose: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoComments: (3): Fetch video comments with the filter set to 'newest'");
    YouTubeDLX.Info.Comments({ query: "Node.js tutorial", filter: "newest" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoComments: (4): Fetch video comments with the filter set to 'most_liked'");
    YouTubeDLX.Info.Comments({ query: "Node.js tutorial", filter: "most_liked" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoComments: (5): Fetch video comments with the filter set to 'pinned'");
    YouTubeDLX.Info.Comments({ query: "Node.js tutorial", filter: "pinned" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoComments: (6): Fetch video comments with the filter set to 'longest'");
    YouTubeDLX.Info.Comments({ query: "Node.js tutorial", filter: "longest" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
  }
  async function VideoTranscript() {
    console.log(colors.blue("@info"), "Test For VideoTranscript: (1): Fetch transcript data with only the video link");
    YouTubeDLX.Info.Transcript({ videoLink: "https://www.youtube.com/watch?v=VIDEO_ID" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoTranscript: (2): Fetch transcript data with an invalid video link");
    YouTubeDLX.Info.Transcript({ videoLink: "https://www.youtube.com/watch?v=INVALID_ID" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoTranscript: (3): Fetch transcript data with verbose output enabled");
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
    console.log(colors.blue("@info"), "Test For VideoCustom: (1): Process a video with only the query and resolution");
    YouTubeDLX.Video.Custom({ query: "test video", resolution: "720p" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoCustom: (2): Process a video with the query, resolution, and a filter (grayscale)");
    YouTubeDLX.Video.Custom({ query: "test video", resolution: "1080p", filter: "grayscale" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoCustom: (3): Stream a video with the query, resolution, and stream option enabled");
    YouTubeDLX.Video.Custom({ query: "test video", resolution: "480p", stream: true })
      .on("stream", streamData => console.log(colors.green("@stream:"), streamData))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoCustom: (4): Process a video with verbose output enabled");
    YouTubeDLX.Video.Custom({ query: "test video", resolution: "720p", verbose: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoCustom: (5): Fetch metadata instead of processing the video");
    YouTubeDLX.Video.Custom({ query: "test video", resolution: "1080p", metadata: true })
      .on("metadata", metadata => console.log(colors.green("@metadata:"), metadata))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoCustom: (6): Process a video with query, resolution, filter, stream, and metadata");
    YouTubeDLX.Video.Custom({ query: "test video", resolution: "720p", filter: "grayscale", stream: true, metadata: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoCustom: (7): Process a video with all parameters (query, output, filter, stream, verbose, metadata, resolution)");
    YouTubeDLX.Video.Custom({ query: "test video", output: path.resolve(process.cwd(), "./output"), resolution: "720p", filter: "grayscale", stream: true, verbose: true, metadata: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
  }
  async function VideoHighest() {
    console.log(colors.blue("@info"), "Test For VideoHighest: (1): Process the highest quality video with only the query");
    YouTubeDLX.Video.Highest({ query: "test video" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoHighest: (2): Process the highest quality video with the query and a filter (grayscale)");
    YouTubeDLX.Video.Highest({ query: "test video", filter: "grayscale" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoHighest: (3): Stream the highest quality video with the query and stream option enabled");
    YouTubeDLX.Video.Highest({ query: "test video", stream: true })
      .on("stream", streamData => console.log(colors.green("@stream:"), streamData))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoHighest: (4): Process the highest quality video with verbose output enabled");
    YouTubeDLX.Video.Highest({ query: "test video", verbose: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoHighest: (5): Fetch metadata instead of processing the video");
    YouTubeDLX.Video.Highest({ query: "test video", metadata: true })
      .on("metadata", metadata => console.log(colors.green("@metadata:"), metadata))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoHighest: (6): Process the highest quality video with query, filter, stream, and metadata");
    YouTubeDLX.Video.Highest({ query: "test video", filter: "grayscale", stream: true, metadata: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoHighest: (7): Process the highest quality video with all parameters (query, output, filter, stream, verbose, metadata)");
    YouTubeDLX.Video.Highest({ query: "test video", output: path.resolve(process.cwd(), "./output"), filter: "grayscale", stream: true, verbose: true, metadata: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
  }
  async function VideoLowest() {
    console.log(colors.blue("@info"), "Test For VideoLowest: (1): Process the lowest quality video with only the query");
    YouTubeDLX.Video.Lowest({ query: "test video" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoLowest: (2): Process the lowest quality video with the query and a filter (grayscale)");
    YouTubeDLX.Video.Lowest({ query: "test video", filter: "grayscale" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoLowest: (3): Stream the lowest quality video with the query and stream option enabled");
    YouTubeDLX.Video.Lowest({ query: "test video", stream: true })
      .on("stream", streamData => console.log(colors.green("@stream:"), streamData))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoLowest: (4): Process the lowest quality video with verbose output enabled");
    YouTubeDLX.Video.Lowest({ query: "test video", verbose: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoLowest: (5): Fetch metadata instead of processing the video");
    YouTubeDLX.Video.Lowest({ query: "test video", metadata: true })
      .on("metadata", metadata => console.log(colors.green("@metadata:"), metadata))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoLowest: (6): Process the lowest quality video with query, filter, stream, and metadata");
    YouTubeDLX.Video.Lowest({ query: "test video", filter: "grayscale", stream: true, metadata: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoLowest: (7): Process the lowest quality video with all parameters (query, output, filter, stream, verbose, metadata)");
    YouTubeDLX.Video.Lowest({ query: "test video", output: path.resolve(process.cwd(), "./output"), filter: "grayscale", stream: true, verbose: true, metadata: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
  }
  await VideoCustom();
  await VideoHighest();
  await VideoLowest();
}
// ==================================================================================
// ==================================================================================
async function Audio_Tests() {
  async function AudioCustom() {
    console.log(colors.blue("@info"), "Test For AudioCustom: (1): Download and process audio with only the query and resolution");
    YouTubeDLX.Audio.Custom({ query: "test song", resolution: "high" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioCustom: (2): Download and process audio with query, resolution, and verbose output enabled");
    YouTubeDLX.Audio.Custom({ query: "test song", resolution: "high", verbose: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioCustom: (3): Download and process audio with query, resolution, and custom output folder");
    YouTubeDLX.Audio.Custom({ query: "test song", resolution: "high", output: path.resolve(process.cwd(), "./output") })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioCustom: (4): Download and stream audio with query, resolution, and stream enabled");
    YouTubeDLX.Audio.Custom({ query: "test song", resolution: "high", stream: true })
      .on("stream", streamData => console.log(colors.green("@stream:"), streamData))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioCustom: (5): Download and process audio with query, resolution, and audio filter applied");
    YouTubeDLX.Audio.Custom({ query: "test song", resolution: "high", filter: "bassboost" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioCustom: (6): Download and process audio with metadata instead of downloading the audio");
    YouTubeDLX.Audio.Custom({ query: "test song", resolution: "high", metadata: true })
      .on("metadata", metadata => console.log(colors.green("@metadata:"), metadata))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioCustom: (7): Download and process audio with all parameters (query, resolution, output, stream, filter, verbose, metadata)");
    YouTubeDLX.Audio.Custom({ query: "test song", resolution: "high", output: path.resolve(process.cwd(), "./output"), stream: true, filter: "echo", verbose: true, metadata: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
  }
  async function AudioHighest() {
    console.log(colors.blue("@info"), "Test For AudioHighest: (1): Download and process highest quality audio with only the query and filter");
    YouTubeDLX.Audio.Highest({ query: "test song", filter: "bassboost" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioHighest: (2): Download and process highest quality audio with query, filter, and verbose output enabled");
    YouTubeDLX.Audio.Highest({ query: "test song", filter: "bassboost", verbose: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioHighest: (3): Download and process highest quality audio with query, filter, and custom output folder");
    YouTubeDLX.Audio.Highest({ query: "test song", filter: "bassboost", output: path.resolve(process.cwd(), "./output") })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioHighest: (4): Stream highest quality audio with query and stream enabled");
    YouTubeDLX.Audio.Highest({ query: "test song", stream: true })
      .on("stream", streamData => console.log(colors.green("@stream:"), streamData))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioHighest: (5): Download and process highest quality audio with query, filter, and metadata output enabled");
    YouTubeDLX.Audio.Highest({ query: "test song", filter: "bassboost", metadata: true })
      .on("metadata", metadata => console.log(colors.green("@metadata:"), metadata))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioHighest: (6): Download and process highest quality audio with query, filter, stream, and metadata");
    YouTubeDLX.Audio.Highest({ query: "test song", filter: "bassboost", stream: true, metadata: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioHighest: (7): Download and process highest quality audio with all parameters (query, output, filter, stream, verbose, metadata)");
    YouTubeDLX.Audio.Highest({ query: "test song", output: path.resolve(process.cwd(), "./output"), filter: "bassboost", stream: true, verbose: true, metadata: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
  }
  async function AudioLowest() {
    console.log(colors.blue("@info"), "Test For AudioLowest: (1): Download and process lowest quality audio with only the query and filter");
    YouTubeDLX.Audio.Lowest({ query: "test song", filter: "bassboost" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioLowest: (2): Download and process lowest quality audio with query, filter, and verbose output enabled");
    YouTubeDLX.Audio.Lowest({ query: "test song", filter: "bassboost", verbose: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioLowest: (3): Download and process lowest quality audio with query, filter, and custom output folder");
    YouTubeDLX.Audio.Lowest({ query: "test song", filter: "bassboost", output: path.resolve(process.cwd(), "./output") })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioLowest: (4): Stream lowest quality audio with query and stream enabled");
    YouTubeDLX.Audio.Lowest({ query: "test song", stream: true })
      .on("stream", streamData => console.log(colors.green("@stream:"), streamData))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioLowest: (5): Download and process lowest quality audio with query, filter, and metadata output enabled");
    YouTubeDLX.Audio.Lowest({ query: "test song", filter: "bassboost", metadata: true })
      .on("metadata", metadata => console.log(colors.green("@metadata:"), metadata))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioLowest: (6): Download and process lowest quality audio with query, filter, stream, and metadata");
    YouTubeDLX.Audio.Lowest({ query: "test song", filter: "bassboost", stream: true, metadata: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioLowest: (7): Download and process lowest quality audio with all parameters (query, output, filter, stream, verbose, metadata)");
    YouTubeDLX.Audio.Lowest({ query: "test song", output: path.resolve(process.cwd(), "./output"), filter: "bassboost", stream: true, verbose: true, metadata: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
  }
  await AudioCustom();
  await AudioHighest();
  await AudioLowest();
}
// ==================================================================================
// ==================================================================================
async function Audio_Video_Tests() {
  async function AudioVideoCustom() {
    console.log(colors.blue("@info"), "Test For AudioVideoCustom: (1): Download and process audio and video with only the query, resolution, and filter");
    YouTubeDLX.Audio_Video.Custom({ query: "test song", resolution: "720p", filter: "grayscale" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioVideoCustom: (2): Download and process audio and video with query, resolution, filter, and verbose output enabled");
    YouTubeDLX.Audio_Video.Custom({ query: "test song", resolution: "720p", filter: "grayscale", verbose: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioVideoCustom: (3): Download and process audio and video with query, resolution, and custom output folder");
    YouTubeDLX.Audio_Video.Custom({ query: "test song", resolution: "720p", filter: "grayscale", output: path.resolve(process.cwd(), "./output") })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioVideoCustom: (4): Stream audio and video with query, resolution, and stream enabled");
    YouTubeDLX.Audio_Video.Custom({ query: "test song", resolution: "720p", stream: true })
      .on("stream", streamData => console.log(colors.green("@stream:"), streamData))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioVideoCustom: (5): Download and process audio and video with query, resolution, filter, and metadata output enabled");
    YouTubeDLX.Audio_Video.Custom({ query: "test song", resolution: "720p", filter: "grayscale", metadata: true })
      .on("metadata", metadata => console.log(colors.green("@metadata:"), metadata))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioVideoCustom: (6): Download and process audio and video with query, resolution, filter, stream, and metadata");
    YouTubeDLX.Audio_Video.Custom({ query: "test song", resolution: "720p", filter: "grayscale", stream: true, metadata: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioVideoCustom: (7): Download and process audio and video with all parameters (query, output, filter, stream, verbose, metadata, resolution)");
    YouTubeDLX.Audio_Video.Custom({ query: "test song", output: path.resolve(process.cwd(), "./output"), resolution: "720p", filter: "grayscale", stream: true, verbose: true, metadata: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
  }
  async function AudioVideoHighest() {
    console.log(colors.blue("@info"), "Test For AudioVideoHighest: (1): Download and process highest quality audio and video with only the query and filter");
    YouTubeDLX.Audio_Video.Highest({ query: "test song", filter: "grayscale" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioVideoHighest: (2): Download and process highest quality audio and video with query, filter, and verbose output enabled");
    YouTubeDLX.Audio_Video.Highest({ query: "test song", filter: "grayscale", verbose: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioVideoHighest: (3): Download and process highest quality audio and video with query, filter, and custom output folder");
    YouTubeDLX.Audio_Video.Highest({ query: "test song", filter: "grayscale", output: path.resolve(process.cwd(), "./output") })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioVideoHighest: (4): Stream highest quality audio and video with query, filter, and stream enabled");
    YouTubeDLX.Audio_Video.Highest({ query: "test song", filter: "grayscale", stream: true })
      .on("stream", streamData => console.log(colors.green("@stream:"), streamData))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioVideoHighest: (5): Download and process highest quality audio and video with query, filter, and metadata output enabled");
    YouTubeDLX.Audio_Video.Highest({ query: "test song", filter: "grayscale", metadata: true })
      .on("metadata", metadata => console.log(colors.green("@metadata:"), metadata))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioVideoHighest: (6): Download and process highest quality audio and video with query, filter, stream, and metadata");
    YouTubeDLX.Audio_Video.Highest({ query: "test song", filter: "grayscale", stream: true, metadata: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioVideoHighest: (7): Download and process highest quality audio and video with all parameters (query, output, filter, stream, verbose, metadata)");
    YouTubeDLX.Audio_Video.Highest({ query: "test song", output: path.resolve(process.cwd(), "./output"), filter: "grayscale", stream: true, verbose: true, metadata: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
  }
  async function AudioVideoLowest() {
    console.log(colors.blue("@info"), "Test For AudioVideoLowest: (1): Download and process lowest quality audio and video with only the query and filter");
    YouTubeDLX.Audio_Video.Lowest({ query: "test song", filter: "grayscale" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioVideoLowest: (2): Download and process lowest quality audio and video with query, filter, and verbose output enabled");
    YouTubeDLX.Audio_Video.Lowest({ query: "test song", filter: "grayscale", verbose: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioVideoLowest: (3): Download and process lowest quality audio and video with query, filter, and custom output folder");
    YouTubeDLX.Audio_Video.Lowest({ query: "test song", filter: "grayscale", output: path.resolve(process.cwd(), "./output") })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioVideoLowest: (4): Stream lowest quality audio and video with query, filter, and stream enabled");
    YouTubeDLX.Audio_Video.Lowest({ query: "test song", filter: "grayscale", stream: true })
      .on("stream", streamData => console.log(colors.green("@stream:"), streamData))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioVideoLowest: (5): Download and process lowest quality audio and video with query, filter, and metadata output enabled");
    YouTubeDLX.Audio_Video.Lowest({ query: "test song", filter: "grayscale", metadata: true })
      .on("metadata", metadata => console.log(colors.green("@metadata:"), metadata))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioVideoLowest: (6): Download and process lowest quality audio and video with query, filter, stream, and metadata");
    YouTubeDLX.Audio_Video.Lowest({ query: "test song", filter: "grayscale", stream: true, metadata: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioVideoLowest: (7): Download and process lowest quality audio and video with all parameters (query, output, filter, stream, verbose, metadata)");
    YouTubeDLX.Audio_Video.Lowest({ query: "test song", output: path.resolve(process.cwd(), "./output"), filter: "grayscale", stream: true, verbose: true, metadata: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
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
