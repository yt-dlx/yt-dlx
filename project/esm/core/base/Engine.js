import * as fs from "fs";
import colors from "colors";
import * as path from "path";
import retry from "async-retry";
import { promisify } from "util";
import { checkSudo } from "./niptor";
import { exec, spawn } from "child_process";
export const sizeFormat = (filesize) => {
    if (isNaN(filesize) || filesize < 0)
        return filesize;
    const bytesPerMegabyte = 1024 * 1024;
    const bytesPerGigabyte = bytesPerMegabyte * 1024;
    const bytesPerTerabyte = bytesPerGigabyte * 1024;
    if (filesize < bytesPerMegabyte)
        return filesize + " B";
    else if (filesize < bytesPerGigabyte) {
        return (filesize / bytesPerMegabyte).toFixed(2) + " MB";
    }
    else if (filesize < bytesPerTerabyte) {
        return (filesize / bytesPerGigabyte).toFixed(2) + " GB";
    }
    else
        return (filesize / bytesPerTerabyte).toFixed(2) + " TB";
};
// =====================================================================================
export default async function Engine({ query, ipAddress, onionTor, }) {
    let AudioLow = {};
    let AudioHigh = {};
    let VideoLow = {};
    let VideoHigh = {};
    let ManifestLow = {};
    let ManifestHigh = {};
    let AudioLowDRC = {};
    let AudioHighDRC = {};
    let VideoLowHDR = {};
    let VideoHighHDR = {};
    let AudioLowF = null;
    let AudioHighF = null;
    let VideoLowF = null;
    let VideoHighF = null;
    let dirC = __dirname || process.cwd();
    let pLoc = "";
    let maxT = 8;
    while (maxT > 0) {
        const cprobePath = path.join(dirC, "util", "cprobe");
        if (fs.existsSync(cprobePath)) {
            pLoc = cprobePath;
            break;
        }
        else {
            dirC = path.join(dirC, "..");
            maxT--;
        }
    }
    if (pLoc === "") {
        throw new Error(colors.red("@error: ") +
            "Could not find cprobe file. maybe re-install yt-dlx?");
    }
    const sudoAvailable = await checkSudo();
    const command = sudoAvailable
        ? ["sudo", ["chmod", "+x", pLoc]]
        : ["chmod", "+x", pLoc];
    spawn("sh", ["-c", command.join(" ")]);
    const config = {
        factor: 2,
        retries: 3,
        minTimeout: 1000,
        maxTimeout: 3000,
    };
    const metaCore = await retry(async () => {
        if (onionTor)
            pLoc += ` --proxy "socks5://127.0.0.1:9050"`;
        pLoc += ` --dump-single-json "${query}"`;
        pLoc += ` --no-check-certificate --prefer-insecure --no-call-home --skip-download --no-warnings --geo-bypass`;
        pLoc += ` --user-agent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"`;
        return await promisify(exec)(pLoc);
    }, config);
    const i = JSON.parse(metaCore.stdout.toString());
    i.formats.forEach((tube) => {
        const rm = new Set(["storyboard", "Default"]);
        if (!rm.has(tube.format_note) &&
            tube.protocol === "m3u8_native" &&
            tube.vbr) {
            if (!ManifestLow[tube.resolution] ||
                tube.vbr < ManifestLow[tube.resolution].vbr)
                ManifestLow[tube.resolution] = tube;
            if (!ManifestHigh[tube.resolution] ||
                tube.vbr > ManifestHigh[tube.resolution].vbr)
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
            if (!VideoLowHDR[tube.format_note] ||
                tube.filesize < VideoLowHDR[tube.format_note].filesize)
                VideoLowHDR[tube.format_note] = tube;
            if (!VideoHighHDR[tube.format_note] ||
                tube.filesize > VideoHighHDR[tube.format_note].filesize)
                VideoHighHDR[tube.format_note] = tube;
        }
        const prevLowVideo = VideoLow[tube.format_note];
        const prevHighVideo = VideoHigh[tube.format_note];
        const prevLowAudio = AudioLow[tube.format_note];
        const prevHighAudio = AudioHigh[tube.format_note];
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
        return formats.filter((i) => {
            return !i.format_note.includes("DRC") && !i.format_note.includes("HDR");
        });
    }
    const payLoad = {
        ipAddress,
        AudioLowF: (() => {
            const i = AudioLowF || {};
            return nAudio(i);
        })(),
        AudioHighF: (() => {
            const i = AudioHighF || {};
            return nAudio(i);
        })(),
        VideoLowF: (() => {
            const i = VideoLowF || {};
            return nVideo(i);
        })(),
        VideoHighF: (() => {
            const i = VideoHighF || {};
            return nVideo(i);
        })(),
        AudioLowDRC: Object.values(AudioLowDRC).map((i) => pAudio(i)),
        AudioHighDRC: Object.values(AudioHighDRC).map((i) => pAudio(i)),
        AudioLow: propfilter(Object.values(AudioLow)).map((i) => pAudio(i)),
        AudioHigh: propfilter(Object.values(AudioHigh)).map((i) => pAudio(i)),
        VideoLowHDR: Object.values(VideoLowHDR).map((i) => pVideo(i)),
        VideoHighHDR: Object.values(VideoHighHDR).map((i) => pVideo(i)),
        VideoLow: propfilter(Object.values(VideoLow)).map((i) => pVideo(i)),
        VideoHigh: propfilter(Object.values(VideoHigh)).map((i) => pVideo(i)),
        ManifestLow: Object.values(ManifestLow).map((i) => pManifest(i)),
        ManifestHigh: Object.values(ManifestHigh).map((i) => pManifest(i)),
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
            comment_count: i.comment_count,
            channel_follower_count: i.channel_follower_count,
            description: i.description,
            channel_url: i.channel_url,
            webpage_url: i.webpage_url,
            live_status: i.live_status,
            upload_date: i.upload_date,
            uploader_id: i.uploader_id,
            original_url: i.original_url,
            uploader_url: i.uploader_url,
            duration_string: i.duration_string,
        },
    };
    return payLoad;
}
function nAudio(i) {
    i.filesizeP = sizeFormat(i.filesize);
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
    i.filesizeP = sizeFormat(i.filesize);
    delete i.asr;
    delete i.format_id;
    delete i.has_drm;
    delete i.quality;
    delete i.source_preference;
    delete i.audio_channels;
    delete i.protocol;
    delete i.language;
    delete i.language_preference;
    delete i.preference;
    delete i.acodec;
    delete i.downloader_options;
    delete i.http_headers;
    delete i.audio_ext;
    delete i.abr;
    return i;
}
function pAudio(i) {
    return {
        filesize: i.filesize,
        filesizeP: sizeFormat(i.filesize),
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
        filesizeP: sizeFormat(i.filesize),
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
//# sourceMappingURL=Engine.js.map