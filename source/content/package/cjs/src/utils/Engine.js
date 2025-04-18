"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sizeFormat = exports.getLocatedPaths = void 0;
exports.default = Engine;
const colors_1 = __importDefault(require("colors"));
const async_retry_1 = __importDefault(require("async-retry"));
const readline_1 = __importDefault(require("readline"));
const util_1 = require("util");
const locator_1 = require("./locator");
const child_process_1 = require("child_process");
let cachedLocatedPaths = null;
const getLocatedPaths = async () => {
    if (cachedLocatedPaths === null)
        cachedLocatedPaths = await (0, locator_1.locator)();
    return cachedLocatedPaths;
};
exports.getLocatedPaths = getLocatedPaths;
const startTor = async (ytDlxPath, verbose = false) => {
    return new Promise(async (resolve, reject) => {
        if (verbose)
            console.log(colors_1.default.green("@info:"), `Attempting to spawn Tor using yt-dlx at: ${ytDlxPath}`);
        const torProcess = (0, child_process_1.spawn)(ytDlxPath, ["--tor"], { stdio: ["ignore", "pipe", "pipe"] });
        const rlStdout = readline_1.default.createInterface({ input: torProcess.stdout, output: process.stdout, terminal: false });
        const rlStderr = readline_1.default.createInterface({ input: torProcess.stderr, output: process.stderr, terminal: false });
        rlStdout.on("line", line => {
            if (verbose)
                console.log(colors_1.default.green("@info:"), line);
            if (line.includes("Bootstrapped 100% (done): Done")) {
                if (verbose)
                    console.log(colors_1.default.green("@info:"), "Tor is 100% bootstrapped!");
                rlStdout.removeAllListeners("line");
                rlStderr.removeAllListeners("line");
                resolve(torProcess);
            }
        });
        rlStderr.on("line", line => {
            if (verbose)
                console.error(colors_1.default.red("@error:"), line);
        });
        torProcess.on("error", err => {
            console.error(colors_1.default.red("@error:"), "Tor process error:", err);
            reject(err);
        });
        torProcess.on("close", code => {
            console.log(colors_1.default.green("@info:"), `Tor process closed with code ${code}`);
            if (code !== 0)
                reject(new Error(`Tor process exited with code ${code} before bootstrapping.`));
        });
        if (verbose)
            console.log(colors_1.default.green("@info:"), `Spawned yt-dlx --tor process with PID: ${torProcess.pid} using ${ytDlxPath}. Waiting for bootstrap...`);
    });
};
var sizeFormat = (filesize) => {
    if (isNaN(filesize) || filesize < 0)
        return filesize;
    var bytesPerMegabyte = 1024 * 1024;
    var bytesPerGigabyte = bytesPerMegabyte * 1024;
    var bytesPerTerabyte = bytesPerGigabyte * 1024;
    if (filesize < bytesPerMegabyte)
        return filesize + " B";
    else if (filesize < bytesPerGigabyte) {
        return (filesize / bytesPerGigabyte).toFixed(2) + " MB";
    }
    else if (filesize < bytesPerTerabyte) {
        return (filesize / bytesPerGigabyte).toFixed(2) + " GB";
    }
    else
        return (filesize / bytesPerTerabyte).toFixed(2) + " TB";
};
exports.sizeFormat = sizeFormat;
function nAudio(i) {
    i.filesizeP = (0, exports.sizeFormat)(i.filesize);
    delete i.format_id;
    delete i.source_preference;
    delete i.has_drm;
    delete i.quality;
    delete i.fps;
    delete i.height;
    delete i.width;
    delete i.language;
    delete i.language_preference;
    delete i.preference;
    delete i.dynamic_range;
    delete i.downloader_options;
    delete i.protocol;
    delete i.aspect_ratio;
    delete i.vbr;
    delete i.vcodec;
    delete i.http_headers;
    delete i.video_ext;
    return i;
}
function nVideo(i) {
    i.filesizeP = (0, exports.sizeFormat)(i.filesize);
    return i;
}
function pAudio(i) {
    return {
        filesize: i.filesize,
        filesizeP: (0, exports.sizeFormat)(i.filesize),
        asr: parseFloat(i.asr),
        format_note: i.format_note,
        tbr: parseFloat(i.tbr),
        url: i.url,
        ext: i.ext,
        acodec: i.acodec,
        container: i.container,
        resolution: i.resolution,
        audio_ext: i.audio_ext,
        abr: parseFloat(i.abr),
        format: i.format,
    };
}
function pVideo(i) {
    return {
        filesize: i.filesize,
        filesizeP: (0, exports.sizeFormat)(i.filesize),
        format_note: i.format_note,
        fps: parseFloat(i.fps),
        height: parseFloat(i.height),
        width: parseFloat(i.width),
        tbr: parseFloat(i.tbr),
        url: i.url,
        ext: i.ext,
        vcodec: i.vcodec,
        dynamic_range: i.dynamic_range,
        container: i.container,
        resolution: i.resolution,
        aspect_ratio: parseFloat(i.aspect_ratio),
        video_ext: i.video_ext,
        vbr: parseFloat(i.vbr),
        format: i.format,
    };
}
function pManifest(i) {
    return {
        url: i.url,
        manifest_url: i.manifest_url,
        tbr: parseFloat(i.tbr),
        ext: i.ext,
        fps: parseFloat(i.fps),
        width: parseFloat(i.width),
        height: parseFloat(i.height),
        vcodec: i.vcodec,
        dynamic_range: i.dynamic_range,
        aspect_ratio: parseFloat(i.aspect_ratio),
        video_ext: i.video_ext,
        vbr: parseFloat(i.vbr),
        format: i.format,
    };
}
async function Engine({ query, useTor = false, verbose = false }) {
    let torProcess = null;
    const located = await (0, exports.getLocatedPaths)();
    const ytDlxPath = located["yt-dlx"];
    const ffmpegPath = located["ffmpeg"];
    if (!ytDlxPath) {
        console.error(colors_1.default.red("@error:"), "yt-dlx executable path not found.");
        return null;
    }
    if (useTor) {
        try {
            if (verbose)
                console.log(colors_1.default.green("@info:"), "Attempting to start Tor and wait for bootstrap...");
            torProcess = await startTor(ytDlxPath, verbose);
            if (verbose)
                console.log(colors_1.default.green("@info:"), `Tor is ready for ${process.platform === "win32" ? "Windows" : "Linux"}.`);
        }
        catch (error) {
            console.error(colors_1.default.red("@error:"), "Failed to start Tor:", error);
            useTor = false;
        }
    }
    var AudioLow = {};
    var AudioHigh = {};
    var VideoLow = {};
    var VideoHigh = {};
    var ManifestLow = {};
    var ManifestHigh = {};
    var AudioLowDRC = {};
    var AudioHighDRC = {};
    var VideoLowHDR = {};
    var VideoHighHDR = {};
    var AudioLowF = null;
    var AudioHighF = null;
    var VideoLowF = null;
    var VideoHighF = null;
    var config = { factor: 2, retries: 3, minTimeout: 1000, maxTimeout: 3000 };
    const ytprobeArgs = [
        "--ytprobe",
        "--dump-single-json",
        query,
        "--no-check-certificate",
        "--prefer-insecure",
        "--no-call-home",
        "--skip-download",
        "--no-warnings",
        "--geo-bypass",
        "--user-agent",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
    ];
    const ytprobeIndex = ytprobeArgs.indexOf("--ytprobe");
    const insertIndex = ytprobeIndex !== -1 ? ytprobeIndex + 1 : 1;
    const argsToInsert = [];
    if (useTor) {
        argsToInsert.push("--proxy", "socks5://127.0.0.1:9050");
        if (verbose)
            console.log(colors_1.default.green("@info:"), "Adding Tor proxy arguments.");
    }
    if (ffmpegPath) {
        argsToInsert.push("--ffmpeg", ffmpegPath);
        if (verbose)
            console.log(colors_1.default.green("@info:"), `Adding ffmpeg path argument: ${ffmpegPath}`);
    }
    else {
        console.warn(colors_1.default.yellow("@warn:"), "ffmpeg executable path not found. yt-dlx may use its built-in downloader or fail for some formats.");
    }
    if (argsToInsert.length > 0) {
        ytprobeArgs.splice(insertIndex, 0, ...argsToInsert);
    }
    var metaCore = await (0, async_retry_1.default)(async () => {
        return await (0, util_1.promisify)(child_process_1.execFile)(ytDlxPath, ytprobeArgs);
    }, config);
    if (torProcess) {
        torProcess.kill();
        if (verbose)
            console.log(colors_1.default.green("@info:"), `Tor process terminated on ${process.platform === "win32" ? "Windows" : "Linux"}`);
    }
    var i = JSON.parse(metaCore.stdout.toString().replace(/yt-dlp/g, "yt-dlx"));
    i.formats.forEach((tube) => {
        var rm = new Set(["storyboard", "Default"]);
        if (!rm.has(tube.format_note) && tube.protocol === "m3u8_native" && tube.vbr) {
            if (!ManifestLow[tube.resolution] || tube.vbr < ManifestLow[tube.resolution].vbr)
                ManifestLow[tube.resolution] = tube;
            if (!ManifestHigh[tube.resolution] || tube.vbr > ManifestHigh[tube.resolution].vbr)
                ManifestHigh[tube.resolution] = tube;
        }
        if (rm.has(tube.format_note) || tube.filesize === undefined || null)
            return;
        if (tube.format_note.includes("DRC")) {
            if (AudioLow[tube.resolution] && !AudioLowDRC[tube.resolution]) {
                AudioLowDRC[tube.resolution] = AudioLow[tube.resolution];
            }
            if (AudioHigh[tube.resolution] && !AudioHighDRC[tube.resolution]) {
                AudioHighDRC[tube.resolution] = AudioHigh[tube.resolution];
            }
            AudioLowDRC[tube.format_note] = tube;
            AudioHighDRC[tube.format_note] = tube;
        }
        else if (tube.format_note.includes("HDR")) {
            if (!VideoLowHDR[tube.format_note] || tube.filesize < VideoLowHDR[tube.format_note].filesize)
                VideoLowHDR[tube.format_note] = tube;
            if (!VideoHighHDR[tube.format_note] || tube.filesize > VideoHighHDR[tube.format_note].filesize)
                VideoHighHDR[tube.format_note] = tube;
        }
        var prevLowVideo = VideoLow[tube.format_note];
        var prevHighVideo = VideoHigh[tube.format_note];
        var prevLowAudio = AudioLow[tube.format_note];
        var prevHighAudio = AudioHigh[tube.format_note];
        switch (true) {
            case tube.format_note.includes("p"):
                if (!prevLowVideo || tube.filesize < prevLowVideo.filesize)
                    VideoLow[tube.format_note] = tube;
                if (!prevHighVideo || tube.filesize > prevHighVideo.filesize)
                    VideoHigh[tube.format_note] = tube;
                break;
            default:
                if (!prevLowAudio || tube.filesize < prevLowAudio.filesize)
                    AudioLow[tube.format_note] = tube;
                if (!prevHighAudio || tube.filesize > prevHighAudio.filesize)
                    AudioHigh[tube.format_note] = tube;
                break;
        }
    });
    Object.values(AudioLow).forEach((audio) => {
        if (audio.filesize !== null) {
            switch (true) {
                case !AudioLowF || audio.filesize < AudioLowF.filesize:
                    AudioLowF = audio;
                    break;
                case !AudioHighF || audio.filesize > AudioHighF.filesize:
                    AudioHighF = audio;
                    break;
                default:
                    break;
            }
        }
    });
    Object.values(VideoLow).forEach((video) => {
        if (video.filesize !== null) {
            switch (true) {
                case !VideoLowF || video.filesize < VideoLowF.filesize:
                    VideoLowF = video;
                    break;
                case !VideoHighF || video.filesize > VideoHighF.filesize:
                    VideoHighF = video;
                    break;
                default:
                    break;
            }
        }
    });
    function propfilter(formats) {
        return formats.filter(i => {
            return !i.format_note.includes("DRC") && !i.format_note.includes("HDR");
        });
    }
    var payLoad = {
        AudioLowF: (() => {
            var i = AudioLowF || {};
            return nAudio(i);
        })(),
        AudioHighF: (() => {
            var i = AudioHighF || {};
            return nAudio(i);
        })(),
        VideoLowF: (() => {
            var i = VideoLowF || {};
            return nVideo(i);
        })(),
        VideoHighF: (() => {
            var i = VideoHighF || {};
            return nVideo(i);
        })(),
        AudioLowDRC: Object.values(AudioLowDRC).map(i => pAudio(i)),
        AudioHighDRC: Object.values(AudioHighDRC).map(i => pAudio(i)),
        AudioLow: propfilter(Object.values(AudioLow)).map(i => pAudio(i)),
        AudioHigh: propfilter(Object.values(AudioHigh)).map(i => pAudio(i)),
        VideoLowHDR: Object.values(VideoLowHDR).map(i => pVideo(i)),
        VideoHighHDR: Object.values(VideoHighHDR).map(i => pVideo(i)),
        VideoLow: propfilter(Object.values(VideoLow)).map(i => pVideo(i)),
        VideoHigh: propfilter(Object.values(VideoHigh)).map(i => pVideo(i)),
        ManifestLow: Object.values(ManifestLow).map(i => pManifest(i)),
        ManifestHigh: Object.values(ManifestHigh).map(i => pManifest(i)),
        metaData: {
            id: i.id,
            title: i.title,
            channel: i.channel,
            uploader: i.uploader,
            duration: i.duration,
            thumbnail: i.thumbnail,
            age_limit: i.age_limit,
            channel_id: i.channel_id,
            categories: i.categories,
            display_id: i.display_id,
            view_count: i.view_count,
            like_count: i.like_count,
            description: i.description,
            channel_url: i.channel_url,
            webpage_url: i.webpage_url,
            live_status: i.live_status,
            upload_date: i.upload_date,
            uploader_id: i.uploader_id,
            original_url: i.original_url,
            uploader_url: i.uploader_url,
            comment_count: i.comment_count,
            duration_string: i.duration_string,
            channel_follower_count: i.channel_follower_count,
        },
    };
    return payLoad;
}
//# sourceMappingURL=Engine.js.map