"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const progbar_1 = __importDefault(require("./utils/progbar"));
const YouTubeId_1 = __importDefault(require("./utils/YouTubeId"));
const Help_1 = __importDefault(require("./routes/Misc/System/Help"));
const Lowest_1 = __importDefault(require("./routes/Audio/Lowest"));
const Custom_1 = __importDefault(require("./routes/Audio/Custom"));
const Lowest_2 = __importDefault(require("./routes/Video/Lowest"));
const Custom_2 = __importDefault(require("./routes/Video/Custom"));
const Extract_1 = __importDefault(require("./routes/Misc/Video/Extract"));
const Highest_1 = __importDefault(require("./routes/Audio/Highest"));
const Highest_2 = __importDefault(require("./routes/Video/Highest"));
const HomeFeed_1 = __importDefault(require("./routes/Account/HomeFeed"));
const History_1 = __importDefault(require("./routes/Account/History"));
const SIngle_1 = __importDefault(require("./routes/Search/Video/SIngle"));
const Formats_1 = __importDefault(require("./routes/Misc/Video/Formats"));
const Related_1 = __importDefault(require("./routes/Misc/Video/Related"));
const Comments_1 = __importDefault(require("./routes/Misc/Video/Comments"));
const Single_1 = __importDefault(require("./routes/Search/Channel/Single"));
const Custom_3 = __importDefault(require("./routes/Audio_Video/Custom"));
const Lowest_3 = __importDefault(require("./routes/Audio_Video/Lowest"));
const Multiple_1 = __importDefault(require("./routes/Search/Video/Multiple"));
const Single_2 = __importDefault(require("./routes/Search/Playlist/Single"));
const Highest_3 = __importDefault(require("./routes/Audio_Video/Highest"));
const Transcript_1 = __importDefault(require("./routes/Misc/Video/Transcript"));
const Multiple_2 = __importDefault(require("./routes/Search/Channel/Multiple"));
const Multiple_3 = __importDefault(require("./routes/Search/Playlist/Multiple"));
const SubscriptionsFeed_1 = __importDefault(require("./routes/Account/SubscriptionsFeed"));
const UnseenNotifications_1 = __importDefault(require("./routes/Account/UnseenNotifications"));
var YouTubeDLX = {
    Audio: {
        Custom: Custom_1.default, // YouTubeDLX.Audio.Custom
        Lowest: Lowest_1.default, // YouTubeDLX.Audio.Lowest
        Highest: Highest_1.default, // YouTubeDLX.Audio.Highest
    },
    Video: {
        Custom: Custom_2.default, // YouTubeDLX.Video.Custom
        Lowest: Lowest_2.default, // YouTubeDLX.Video.Lowest
        Highest: Highest_2.default, // YouTubeDLX.Video.Highest
    },
    Audio_Video: {
        Custom: Custom_3.default, // YouTubeDLX.Audio_Video.Custom
        Lowest: Lowest_3.default, // YouTubeDLX.Audio_Video.Lowest
        Highest: Highest_3.default, // YouTubeDLX.Audio_Video.Highest
    },
    Search: {
        Channel: {
            Single: Single_1.default, // YouTubeDLX.Search.Channel.Single
            Multiple: Multiple_2.default, // YouTubeDLX.Search.Channel.Multiple
        },
        Playlist: {
            Single: Single_2.default, // YouTubeDLX.Search.Playlist.Single
            Multiple: Multiple_3.default, // YouTubeDLX.Search.Playlist.Multiple
        },
        Video: {
            Single: SIngle_1.default, // YouTubeDLX.Search.Video.Single
            Multiple: Multiple_1.default, // YouTubeDLX.Search.Video.Multiple
        },
    },
    Account: {
        HomeFeed: HomeFeed_1.default, // YouTubeDLX.Account.HomeFeed
        History: History_1.default, // YouTubeDLX.Account.History
        SubscriptionsFeed: SubscriptionsFeed_1.default, // YouTubeDLX.Account.SubscriptionsFeed
        UnseenNotifications: UnseenNotifications_1.default, // YouTubeDLX.Account.UnseenNotifications
    },
    Misc: {
        System: {
            Help: Help_1.default, // YouTubeDLX.Misc.System.Help
            ProgressBar: progbar_1.default, // YouTubeDLX.Misc.System.ProgressBar
        },
        Video: {
            GetId: YouTubeId_1.default, // YouTubeDLX.Misc.Video.GetId
            Extract: Extract_1.default, // YouTubeDLX.Misc.Video.Extract
            Formats: Formats_1.default, // YouTubeDLX.Misc.Video.Formats
            Related: Related_1.default, // YouTubeDLX.Misc.Video.Related
            Comments: Comments_1.default, // YouTubeDLX.Video.Misc.Comments
            Transcript: Transcript_1.default, // YouTubeDLX.Misc.Video.Transcript
        },
    },
};
exports.default = YouTubeDLX;
//# sourceMappingURL=index.js.map