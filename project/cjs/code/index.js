"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ============================[ GENERAL ]============================
const help_1 = __importDefault(require("./routes/command/help"));
const extract_1 = __importDefault(require("./routes/command/extract"));
const list_formats_1 = __importDefault(require("./routes/command/list_formats"));
//
// ============================[ YT-SEARCH ]============================
const video_data_1 = __importDefault(require("./routes/command/video_data"));
const search_videos_1 = __importDefault(require("./routes/command/search_videos"));
const playlist_data_1 = __importDefault(require("./routes/command/playlist_data"));
const search_playlists_1 = __importDefault(require("./routes/command/search_playlists"));
//
// ============================[ AUDIO-ONLY ]============================
const AudioLowest_1 = __importDefault(require("./routes/Audio/single/AudioLowest"));
const AudioHighest_1 = __importDefault(require("./routes/Audio/single/AudioHighest"));
const AudioCustom_1 = __importDefault(require("./routes/Audio/single/AudioCustom"));
const ListAudioLowest_1 = __importDefault(require("./routes/Audio/list/ListAudioLowest"));
const ListAudioHighest_1 = __importDefault(require("./routes/Audio/list/ListAudioHighest"));
const ListAudioCustom_1 = __importDefault(require("./routes/Audio/list/ListAudioCustom"));
//
// ============================[ VIDEO-ONLY ]============================
const VideoLowest_1 = __importDefault(require("./routes/Video/single/VideoLowest"));
const VideoHighest_1 = __importDefault(require("./routes/Video/single/VideoHighest"));
const VideoCustom_1 = __importDefault(require("./routes/Video/single/VideoCustom"));
const ListVideoLowest_1 = __importDefault(require("./routes/Video/list/ListVideoLowest"));
const ListVideoHighest_1 = __importDefault(require("./routes/Video/list/ListVideoHighest"));
const ListVideoCustom_1 = __importDefault(require("./routes/Video/list/ListVideoCustom"));
//
// ============================[ AUDIO-VIDEO ]============================
const AudioVideoHighest_1 = __importDefault(require("./routes/AudioVideo/single/AudioVideoHighest"));
const AudioVideoLowest_1 = __importDefault(require("./routes/AudioVideo/single/AudioVideoLowest"));
const AudioVideoCustom_1 = __importDefault(require("./routes/AudioVideo/single/AudioVideoCustom"));
const ListAudioVideoHighest_1 = __importDefault(require("./routes/AudioVideo/list/ListAudioVideoHighest"));
const ListAudioVideoLowest_1 = __importDefault(require("./routes/AudioVideo/list/ListAudioVideoLowest"));
const ListAudioVideoCustom_1 = __importDefault(require("./routes/AudioVideo/list/ListAudioVideoCustom"));
//
const ytdlx = {
    ytSearch: {
        Video: {
            Single: video_data_1.default,
            Multiple: search_videos_1.default,
        },
        Playlist: {
            Single: playlist_data_1.default,
            Multiple: search_playlists_1.default,
        },
    },
    info: {
        help: help_1.default,
        extract: extract_1.default,
        list_formats: list_formats_1.default,
    },
    AudioOnly: {
        Single: {
            Lowest: AudioLowest_1.default,
            Highest: AudioHighest_1.default,
            Custom: AudioCustom_1.default,
        },
        List: {
            Lowest: ListAudioLowest_1.default,
            Highest: ListAudioHighest_1.default,
            Custom: ListAudioCustom_1.default,
        },
    },
    VideoOnly: {
        Single: {
            Lowest: VideoLowest_1.default,
            Highest: VideoHighest_1.default,
            Custom: VideoCustom_1.default,
        },
        List: {
            Lowest: ListVideoLowest_1.default,
            Highest: ListVideoHighest_1.default,
            Custom: ListVideoCustom_1.default,
        },
    },
    AudioVideo: {
        Single: {
            Lowest: AudioVideoLowest_1.default,
            Highest: AudioVideoHighest_1.default,
            Custom: AudioVideoCustom_1.default,
        },
        List: {
            Lowest: ListAudioVideoLowest_1.default,
            Highest: ListAudioVideoHighest_1.default,
            Custom: ListAudioVideoCustom_1.default,
        },
    },
};
exports.default = ytdlx;
//# sourceMappingURL=index.js.map