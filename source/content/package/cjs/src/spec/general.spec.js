"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_process_1 = require("node:process");
const dotenv_1 = __importDefault(require("dotenv"));
const colors_1 = __importDefault(require("colors"));
const __1 = __importDefault(require(".."));
console.clear();
dotenv_1.default.config();
async function Account_Tests() {
    async function HomeFeed() {
        console.log(colors_1.default.bold.blue("@info"), "HomeFeed: (1): Fetch home feed with only the cookies");
        __1.default.Account.HomeFeed({ cookies: node_process_1.env.YouTubeDLX_COOKIES })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "HomeFeed: (2): Fetch home feed with cookies and verbose output enabled");
        __1.default.Account.HomeFeed({ cookies: node_process_1.env.YouTubeDLX_COOKIES, verbose: true })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "HomeFeed: (3): Fetch home feed with cookies and sorting by 'oldest'");
        __1.default.Account.HomeFeed({ cookies: node_process_1.env.YouTubeDLX_COOKIES, sort: "oldest" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "HomeFeed: (4): Fetch home feed with cookies and sorting by 'newest'");
        __1.default.Account.HomeFeed({ cookies: node_process_1.env.YouTubeDLX_COOKIES, sort: "newest" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "HomeFeed: (5): Fetch home feed with cookies and sorting by 'old-to-new'");
        __1.default.Account.HomeFeed({ cookies: node_process_1.env.YouTubeDLX_COOKIES, sort: "old-to-new" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "HomeFeed: (6): Fetch home feed with cookies and sorting by 'new-to-old'");
        __1.default.Account.HomeFeed({ cookies: node_process_1.env.YouTubeDLX_COOKIES, sort: "new-to-old" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "HomeFeed: (7): Fetch home feed with all parameters");
        __1.default.Account.HomeFeed({ cookies: node_process_1.env.YouTubeDLX_COOKIES, verbose: true, sort: "new-to-old" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
    }
    async function SubscriptionsFeed() {
        console.log(colors_1.default.bold.blue("@info"), "SubscriptionsFeed: (1): Fetch subscriptions feed with only the cookies");
        __1.default.Account.SubscriptionsFeed({ cookies: node_process_1.env.YouTubeDLX_COOKIES })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "SubscriptionsFeed: (2): Fetch subscriptions feed with cookies and verbose output enabled");
        __1.default.Account.SubscriptionsFeed({ cookies: node_process_1.env.YouTubeDLX_COOKIES, verbose: true })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
    }
    async function UnseenNotifications() {
        console.log(colors_1.default.bold.blue("@info"), "UnseenNotifications: (1): Fetch unseen notifications count with only the cookies");
        __1.default.Account.UnseenNotifications({ cookies: node_process_1.env.YouTubeDLX_COOKIES })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "UnseenNotifications: (2): Fetch unseen notifications count with cookies and verbose output enabled");
        __1.default.Account.UnseenNotifications({ cookies: node_process_1.env.YouTubeDLX_COOKIES, verbose: true })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
    }
    async function WatchHistory() {
        console.log(colors_1.default.bold.blue("@info"), "WatchHistory: (1): Fetch watch history with only the cookies");
        __1.default.Account.History({ cookies: node_process_1.env.YouTubeDLX_COOKIES })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "WatchHistory: (2): Fetch watch history with cookies and verbose output enabled");
        __1.default.Account.History({ cookies: node_process_1.env.YouTubeDLX_COOKIES, verbose: true })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "WatchHistory: (3): Fetch watch history with cookies and sorting by 'oldest'");
        __1.default.Account.History({ cookies: node_process_1.env.YouTubeDLX_COOKIES, sort: "oldest" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "WatchHistory: (4): Fetch watch history with cookies and sorting by 'newest'");
        __1.default.Account.History({ cookies: node_process_1.env.YouTubeDLX_COOKIES, sort: "newest" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "WatchHistory: (5): Fetch watch history with cookies and sorting by 'old-to-new'");
        __1.default.Account.History({ cookies: node_process_1.env.YouTubeDLX_COOKIES, sort: "old-to-new" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "WatchHistory: (6): Fetch watch history with cookies and sorting by 'new-to-old'");
        __1.default.Account.History({ cookies: node_process_1.env.YouTubeDLX_COOKIES, sort: "new-to-old" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "WatchHistory: (7): Fetch watch history with all parameters");
        __1.default.Account.History({ cookies: node_process_1.env.YouTubeDLX_COOKIES, verbose: true, sort: "new-to-old" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
    }
    await HomeFeed();
    await SubscriptionsFeed();
    await UnseenNotifications();
    await WatchHistory();
}
async function Search_Tests() {
    async function ChannelData() {
        console.log(colors_1.default.bold.blue("@info"), "ChannelData: (1): Fetch channel data with only the channel link");
        __1.default.Search.Channel.Single({ channelLink: "https://www.youtube.com/c/testchannel" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
    }
    async function PlaylistData() {
        console.log(colors_1.default.bold.blue("@info"), "PlaylistData: (1): Fetch playlist data with only the playlist link");
        __1.default.Search.Playlist.Single({ playlistLink: "https://www.youtube.com/playlist?list=PLw-VjHDlEOgs6k8xQ6sB9zAqS6vhJh2tV" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "PlaylistData: (2): Fetch playlist data with an invalid playlist link");
        __1.default.Search.Playlist.Single({ playlistLink: "https://www.youtube.com/playlist?list=INVALID" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
    }
    async function RelatedVideos() {
        console.log(colors_1.default.bold.blue("@info"), "RelatedVideos: (1): Fetch related videos with only the video ID");
        __1.default.Misc.Video.Related({ videoId: "dQw4w9WgXcQ" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "RelatedVideos: (2): Fetch related videos with an invalid video ID");
        __1.default.Misc.Video.Related({ videoId: "INVALID_yOiO2Zi0IRw" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
    }
    async function SearchChannels() {
        console.log(colors_1.default.bold.blue("@info"), "SearchChannels: (1): Search for channels with a valid query");
        __1.default.Search.Channel.Multiple({ query: "Tech channels" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "SearchChannels: (2): Search for channels with an invalid query");
        __1.default.Search.Channel.Multiple({ query: "INVALID_QUERY" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
    }
    async function SearchPlaylists() {
        console.log(colors_1.default.bold.blue("@info"), "SearchPlaylists: (1): Search for playlists with a valid query");
        __1.default.Search.Playlist.Multiple({ playlistLink: "Top 10 Music Playlists" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "SearchPlaylists: (2): Search for playlists with an invalid query");
        __1.default.Search.Playlist.Multiple({ playlistLink: "INVALID_PLAYLIST_LINK" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "SearchPlaylists: (3): Search for playlists with a playlist ID");
        __1.default.Search.Playlist.Multiple({ playlistLink: "https://www.youtube.com/playlist?list=PLAYLIST_ID" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
    }
    async function SearchVideos() {
        console.log(colors_1.default.bold.blue("@info"), "SearchVideos: (1): Search for videos with a valid query");
        __1.default.Search.Video.Multiple({ query: "Node.js tutorial" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "SearchVideos: (2): Search for videos with an invalid query");
        __1.default.Search.Video.Multiple({ query: "INVALID_QUERY" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "SearchVideos: (3): Search for videos with a video link (not supported)");
        __1.default.Search.Video.Multiple({ query: "https://www.youtube.com/watch?v=yOiO2Zi0IRw" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
    }
    async function VideoData() {
        console.log(colors_1.default.bold.blue("@info"), "VideoData: (1): Fetch video data with a valid video link");
        __1.default.Search.Video.Single({ videoLink: "https://www.youtube.com/watch?v=yOiO2Zi0IRw" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "VideoData: (2): Fetch video data with an invalid video link");
        __1.default.Search.Video.Single({ videoLink: "https://www.youtube.com/watch?v=INVALID_ID" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
    }
    await ChannelData();
    await PlaylistData();
    await RelatedVideos();
    await SearchChannels();
    await SearchPlaylists();
    await SearchVideos();
    await VideoData();
}
async function Info_Tests() {
    async function Extract() {
        console.log(colors_1.default.bold.blue("@info"), "Extract: (1): Extract video data with only the query");
        __1.default.Misc.Video.Extract({ query: "test video" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "Extract: (2): Extract video data with verbose output enabled");
        __1.default.Misc.Video.Extract({ query: "test video", verbose: true })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "Extract: (3): Extract video data with Tor enabled");
        __1.default.Misc.Video.Extract({ query: "test video", useTor: true })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "Extract: (4): Extract video data with all parameters");
        __1.default.Misc.Video.Extract({ query: "test video", verbose: true, useTor: true })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
    }
    async function Help() {
        console.log(colors_1.default.bold.blue("@info"), "Help: (1): Display help message and get the help URL");
        const HelpData = await __1.default.Misc.System.Help();
        console.log(colors_1.default.italic.green("@data:"), HelpData);
    }
    async function ListFormats() {
        console.log(colors_1.default.bold.blue("@info"), "ListFormats: (1): List formats with only the query");
        __1.default.Misc.Video.Formats({ query: "test video" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "ListFormats: (2): List formats with query and verbose output enabled");
        __1.default.Misc.Video.Formats({ query: "test video", verbose: true })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
    }
    async function VideoComments() {
        console.log(colors_1.default.bold.blue("@info"), "VideoComments: (1): Fetch all video comments with only the query");
        __1.default.Misc.Video.Comments({ query: "Node.js tutorial" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "VideoComments: (2): Fetch all video comments with verbose output enabled");
        __1.default.Misc.Video.Comments({ query: "Node.js tutorial", verbose: true })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "VideoComments: (3): Fetch video comments with an invalid (too short) query");
        __1.default.Misc.Video.Comments({ query: "a" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "VideoComments: (4): Fetch video comments with a query that returns no videos");
        __1.default.Misc.Video.Comments({ query: "asdhfkjashdfkjh", verbose: true })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "VideoComments: (5): Fetch video comments for a video likely to have no comments");
        __1.default.Misc.Video.Comments({ query: "silent ASMR no comments", verbose: true })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
    }
    async function VideoTranscript() {
        console.log(colors_1.default.bold.blue("@info"), "VideoTranscript: (1): Fetch transcript data with only the video link");
        __1.default.Misc.Video.Transcript({ videoLink: "https://www.youtube.com/watch?v=yOiO2Zi0IRw" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "VideoTranscript: (2): Fetch transcript data with an invalid video link");
        __1.default.Misc.Video.Transcript({ videoLink: "https://www.youtube.com/watch?v=INVALID_ID" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
    }
    await Help();
    await Extract();
    await ListFormats();
    await VideoComments();
    await VideoTranscript();
}
async function Video_Tests() {
    async function VideoCustom() {
        console.log(colors_1.default.bold.blue("@info"), "VideoCustom: (1): Process a video with only the query and resolution");
        __1.default.Video.Custom({ query: "test video", resolution: "720p" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "VideoCustom: (2): Process a video with the query, resolution, and a filter");
        __1.default.Video.Custom({ query: "test video", resolution: "1080p", filter: "grayscale" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "VideoCustom: (3): Stream a video with the query, resolution, and stream option enabled");
        __1.default.Video.Custom({ query: "test video", resolution: "480p", stream: true })
            .on("stream", streamData => console.log(colors_1.default.italic.green("@stream:"), streamData))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "VideoCustom: (4): Process a video with verbose output enabled");
        __1.default.Video.Custom({ query: "test video", resolution: "720p", verbose: true })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "VideoCustom: (5): Fetch metadata instead of processing the video");
        __1.default.Video.Custom({ query: "test video", resolution: "1080p", metadata: true })
            .on("metadata", metadata => console.log(colors_1.default.italic.green("@metadata:"), metadata))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "VideoCustom: (6): Process a video with query, resolution, filter, stream, and metadata");
        __1.default.Video.Custom({ query: "test video", resolution: "720p", filter: "grayscale", stream: true, metadata: true })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "VideoCustom: (7): Process a video with all parameters");
        __1.default.Video.Custom({
            query: "test video",
            output: "output",
            resolution: "720p",
            filter: "grayscale",
            stream: true,
            verbose: true,
            metadata: true,
        })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
    }
    async function VideoHighest() {
        console.log(colors_1.default.bold.blue("@info"), "VideoHighest: (1): Process the highest quality video with only the query");
        __1.default.Video.Highest({ query: "test video" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "VideoHighest: (2): Process the highest quality video with the query and a filter");
        __1.default.Video.Highest({ query: "test video", filter: "grayscale" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "VideoHighest: (3): Stream the highest quality video with the query and stream option enabled");
        __1.default.Video.Highest({ query: "test video", stream: true })
            .on("stream", streamData => console.log(colors_1.default.italic.green("@stream:"), streamData))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "VideoHighest: (4): Process the highest quality video with verbose output enabled");
        __1.default.Video.Highest({ query: "test video", verbose: true })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "VideoHighest: (5): Fetch metadata instead of processing the video");
        __1.default.Video.Highest({ query: "test video", metadata: true })
            .on("metadata", metadata => console.log(colors_1.default.italic.green("@metadata:"), metadata))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "VideoHighest: (6): Process the highest quality video with query, filter, stream, and metadata");
        __1.default.Video.Highest({ query: "test video", filter: "grayscale", stream: true, metadata: true })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "VideoHighest: (7): Process the highest quality video with all parameters");
        __1.default.Video.Highest({ query: "test video", output: "output", filter: "grayscale", stream: true, verbose: true, metadata: true })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
    }
    async function VideoLowest() {
        console.log(colors_1.default.bold.blue("@info"), "VideoLowest: (1): Process the lowest quality video with only the query");
        __1.default.Video.Lowest({ query: "test video" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "VideoLowest: (2): Process the lowest quality video with the query and a filter");
        __1.default.Video.Lowest({ query: "test video", filter: "grayscale" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "VideoLowest: (3): Stream the lowest quality video with the query and stream option enabled");
        __1.default.Video.Lowest({ query: "test video", stream: true })
            .on("stream", streamData => console.log(colors_1.default.italic.green("@stream:"), streamData))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "VideoLowest: (4): Process the lowest quality video with verbose output enabled");
        __1.default.Video.Lowest({ query: "test video", verbose: true })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "VideoLowest: (5): Fetch metadata instead of processing the video");
        __1.default.Video.Lowest({ query: "test video", metadata: true })
            .on("metadata", metadata => console.log(colors_1.default.italic.green("@metadata:"), metadata))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "VideoLowest: (6): Process the lowest quality video with query, filter, stream, and metadata");
        __1.default.Video.Lowest({ query: "test video", filter: "grayscale", stream: true, metadata: true })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "VideoLowest: (7): Process the lowest quality video with all parameters");
        __1.default.Video.Lowest({ query: "test video", output: "output", filter: "grayscale", stream: true, verbose: true, metadata: true })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
    }
    await VideoCustom();
    await VideoHighest();
    await VideoLowest();
}
async function Audio_Tests() {
    async function AudioCustom() {
        console.log(colors_1.default.bold.blue("@info"), "AudioCustom: (1): Download and process audio with only the query and resolution");
        __1.default.Audio.Custom({ query: "test song", resolution: "high" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "AudioCustom: (2): Download and process audio with query, resolution, and verbose output enabled");
        __1.default.Audio.Custom({ query: "test song", resolution: "high", verbose: true })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "AudioCustom: (3): Download and process audio with query, resolution, and custom output folder");
        __1.default.Audio.Custom({ query: "test song", resolution: "high", output: "output" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "AudioCustom: (4): Download and stream audio with query, resolution, and stream enabled");
        __1.default.Audio.Custom({ query: "test song", resolution: "high", stream: true })
            .on("stream", streamData => console.log(colors_1.default.italic.green("@stream:"), streamData))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "AudioCustom: (5): Download and process audio with query, resolution, and audio filter applied");
        __1.default.Audio.Custom({ query: "test song", resolution: "high", filter: "bassboost" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "AudioCustom: (6): Download and process audio with metadata instead of downloading the audio");
        __1.default.Audio.Custom({ query: "test song", resolution: "high", metadata: true })
            .on("metadata", metadata => console.log(colors_1.default.italic.green("@metadata:"), metadata))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "AudioCustom: (7): Download and process audio with all parameters");
        __1.default.Audio.Custom({ query: "test song", resolution: "high", output: "output", stream: true, filter: "echo", verbose: true, metadata: true })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
    }
    async function AudioHighest() {
        console.log(colors_1.default.bold.blue("@info"), "AudioHighest: (1): Download and process highest quality audio with only the query and filter");
        __1.default.Audio.Highest({ query: "test song", filter: "bassboost" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "AudioHighest: (2): Download and process highest quality audio with query, filter, and verbose output enabled");
        __1.default.Audio.Highest({ query: "test song", filter: "bassboost", verbose: true })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "AudioHighest: (3): Download and process highest quality audio with query, filter, and custom output folder");
        __1.default.Audio.Highest({ query: "test song", filter: "bassboost", output: "output" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "AudioHighest: (4): Stream highest quality audio with query and stream enabled");
        __1.default.Audio.Highest({ query: "test song", stream: true })
            .on("stream", streamData => console.log(colors_1.default.italic.green("@stream:"), streamData))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "AudioHighest: (5): Download and process highest quality audio with query, filter, and metadata output enabled");
        __1.default.Audio.Highest({ query: "test song", filter: "bassboost", metadata: true })
            .on("metadata", metadata => console.log(colors_1.default.italic.green("@metadata:"), metadata))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "AudioHighest: (6): Download and process highest quality audio with query, filter, stream, and metadata");
        __1.default.Audio.Highest({ query: "test song", filter: "bassboost", stream: true, metadata: true })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "AudioHighest: (7): Download and process highest quality audio with all parameters");
        __1.default.Audio.Highest({ query: "test song", output: "output", filter: "bassboost", stream: true, verbose: true, metadata: true })
            .on("data", data => console.log(colors_1.default.italic.green("@data"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error"), error));
    }
    async function AudioLowest() {
        console.log(colors_1.default.bold.blue("@info"), "AudioLowest: (1): Download and process lowest quality audio with only the query and filter");
        __1.default.Audio.Lowest({ query: "test song", filter: "bassboost" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "AudioLowest: (2): Download and process lowest quality audio with query, filter, and verbose output enabled");
        __1.default.Audio.Lowest({ query: "test song", filter: "bassboost", verbose: true })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "AudioLowest: (3): Download and process lowest quality audio with query, filter, and custom output folder");
        __1.default.Audio.Lowest({ query: "test song", filter: "bassboost", output: "output" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "AudioLowest: (4): Stream lowest quality audio with query and stream enabled");
        __1.default.Audio.Lowest({ query: "test song", stream: true })
            .on("stream", streamData => console.log(colors_1.default.italic.green("@stream:"), streamData))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "AudioLowest: (5): Download and process lowest quality audio with query, filter, and metadata output enabled");
        __1.default.Audio.Lowest({ query: "test song", filter: "bassboost", metadata: true })
            .on("metadata", metadata => console.log(colors_1.default.italic.green("@metadata:"), metadata))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "AudioLowest: (6): Download and process lowest quality audio with query, filter, stream, and metadata");
        __1.default.Audio.Lowest({ query: "test song", filter: "bassboost", stream: true, metadata: true })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "AudioLowest: (7): Download and process lowest quality audio with all parameters");
        __1.default.Audio.Lowest({ query: "test song", output: "output", filter: "bassboost", stream: true, verbose: true, metadata: true })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
    }
    await AudioCustom();
    await AudioHighest();
    await AudioLowest();
}
async function Audio_Video_Tests() {
    async function AudioVideoCustom() {
        console.log(colors_1.default.bold.blue("@info"), "AudioVideoCustom: (1): Download and process audio and video with only the query, resolution, and filter");
        __1.default.Audio_Video.Custom({ query: "test song", resolution: "720p", filter: "grayscale" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "AudioVideoCustom: (2): Download and process audio and video with query, resolution, filter, and verbose output enabled");
        __1.default.Audio_Video.Custom({ query: "test song", resolution: "720p", filter: "grayscale", verbose: true })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "AudioVideoCustom: (3): Download and process audio and video with query, resolution, and custom output folder");
        __1.default.Audio_Video.Custom({ query: "test song", resolution: "720p", filter: "grayscale", output: "output" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "AudioVideoCustom: (4): Stream audio and video with query, resolution, and stream enabled");
        __1.default.Audio_Video.Custom({ query: "test song", resolution: "720p", stream: true })
            .on("stream", streamData => console.log(colors_1.default.italic.green("@stream:"), streamData))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "AudioVideoCustom: (5): Download and process audio and video with query, resolution, filter, and metadata output enabled");
        __1.default.Audio_Video.Custom({ query: "test song", resolution: "720p", filter: "grayscale", metadata: true })
            .on("metadata", metadata => console.log(colors_1.default.italic.green("@metadata:"), metadata))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "AudioVideoCustom: (6): Download and process audio and video with query, resolution, filter, stream, and metadata");
        __1.default.Audio_Video.Custom({ query: "test song", resolution: "720p", filter: "grayscale", stream: true, metadata: true })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "AudioVideoCustom: (7): Download and process audio and video with all parameters");
        __1.default.Audio_Video.Custom({ query: "test song", output: "output", resolution: "720p", filter: "grayscale", stream: true, verbose: true, metadata: true })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
    }
    async function AudioVideoHighest() {
        console.log(colors_1.default.bold.blue("@info"), "AudioVideoHighest: (1): Download and process highest quality audio and video with only the query and filter");
        __1.default.Audio_Video.Highest({ query: "test song", filter: "grayscale" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "AudioVideoHighest: (2): Download and process highest quality audio and video with query, filter, and verbose output enabled");
        __1.default.Audio_Video.Highest({ query: "test song", filter: "grayscale", verbose: true })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "AudioVideoHighest: (3): Download and process highest quality audio and video with query, filter, and custom output folder");
        __1.default.Audio_Video.Highest({ query: "test song", filter: "grayscale", output: "output" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "AudioVideoHighest: (4): Stream highest quality audio and video with query, filter, and stream enabled");
        __1.default.Audio_Video.Highest({ query: "test song", filter: "grayscale", stream: true })
            .on("stream", streamData => console.log(colors_1.default.italic.green("@stream:"), streamData))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "AudioVideoHighest: (5): Download and process highest quality audio and video with query, filter, and metadata output enabled");
        __1.default.Audio_Video.Highest({ query: "test song", filter: "grayscale", metadata: true })
            .on("metadata", metadata => console.log(colors_1.default.italic.green("@metadata:"), metadata))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "AudioVideoHighest: (6): Download and process highest quality audio and video with query, filter, stream, and metadata");
        __1.default.Audio_Video.Highest({ query: "test song", filter: "grayscale", stream: true, metadata: true })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "AudioVideoHighest: (7): Download and process highest quality audio and video with all parameters");
        __1.default.Audio_Video.Highest({ query: "test song", output: "output", filter: "grayscale", stream: true, verbose: true, metadata: true })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
    }
    async function AudioVideoLowest() {
        console.log(colors_1.default.bold.blue("@info"), "AudioVideoLowest: (1): Download and process lowest quality audio and video with only the query and filter");
        __1.default.Audio_Video.Lowest({ query: "test song", filter: "grayscale" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "AudioVideoLowest: (2): Download and process lowest quality audio and video with query, filter, and verbose output enabled");
        __1.default.Audio_Video.Lowest({ query: "test song", filter: "grayscale", verbose: true })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "AudioVideoLowest: (3): Download and process lowest quality audio and video with query, filter, and custom output folder");
        __1.default.Audio_Video.Lowest({ query: "test song", filter: "grayscale", output: "output" })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "AudioVideoLowest: (4): Stream lowest quality audio and video with query, filter, and stream enabled");
        __1.default.Audio_Video.Lowest({ query: "test song", filter: "grayscale", stream: true })
            .on("stream", streamData => console.log(colors_1.default.italic.green("@stream:"), streamData))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "AudioVideoLowest: (5): Download and process lowest quality audio and video with query, filter, and metadata output enabled");
        __1.default.Audio_Video.Lowest({ query: "test song", filter: "grayscale", metadata: true })
            .on("metadata", metadata => console.log(colors_1.default.italic.green("@metadata:"), metadata))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "AudioVideoLowest: (6): Download and process lowest quality audio and video with query, filter, stream, and metadata");
        __1.default.Audio_Video.Lowest({ query: "test song", filter: "grayscale", stream: true, metadata: true })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
        console.log(colors_1.default.bold.blue("@info"), "AudioVideoLowest: (7): Download and process lowest quality audio and video with all parameters");
        __1.default.Audio_Video.Lowest({ query: "test song", output: "output", filter: "grayscale", stream: true, verbose: true, metadata: true })
            .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
            .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
    }
    await AudioVideoCustom();
    await AudioVideoHighest();
    await AudioVideoLowest();
}
(async () => {
    await Account_Tests();
    await Search_Tests();
    await Info_Tests();
    await Audio_Tests();
    await Video_Tests();
    await Audio_Video_Tests();
})();
//# sourceMappingURL=general.spec.js.map