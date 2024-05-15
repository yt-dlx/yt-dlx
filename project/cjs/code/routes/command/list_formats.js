"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const Agent_1 = __importDefault(require("../../base/Agent"));
/**
 * Lists the available formats and manifest information for a YouTube video.
 *
 * @param query - The YouTube video URL for which to list formats and manifest.
 * @param verbose - (optional) Whether to log verbose output or not.
 * @param onionTor - (optional) Whether to use Tor for the extraction or not.
 * @returns A Promise that resolves after listing the formats and manifest information.
 * @throws An error if unable to get a response from YouTube.
 */
async function list_formats({ query, verbose, onionTor, }) {
    var metaBody = await (0, Agent_1.default)({ query, verbose, onionTor });
    if (!metaBody) {
        throw new Error("@error: Unable to get response from YouTube.");
    }
    else {
        pTable("@AudioLow:", metaBody.AudioLow);
        pTable("@AudioLowDRC:", metaBody.AudioLowDRC);
        pTable("@AudioHigh:", metaBody.AudioHigh);
        pTable("@AudioHighDRC:", metaBody.AudioHighDRC);
        pTable("@VideoLow:", metaBody.VideoLow);
        pTable("@VideoLowHDR:", metaBody.VideoLowHDR);
        pTable("@VideoHigh:", metaBody.VideoHigh);
        pTable("@VideoHighHDR:", metaBody.VideoHighHDR);
        pManifestTable("@ManifestLow:", metaBody.ManifestLow);
        pManifestTable("@ManifestHigh:", metaBody.ManifestHigh);
        var AudioLow = metaBody.AudioLow.map((item) => ({
            filesizeP: item.filesizeP,
            format_note: item.format_note,
        }));
        var AudioLowDRC = metaBody.AudioLowDRC.map((item) => ({
            filesizeP: item.filesizeP,
            format_note: item.format_note,
        }));
        var AudioHigh = metaBody.AudioHigh.map((item) => ({
            filesizeP: item.filesizeP,
            format_note: item.format_note,
        }));
        var AudioHighDRC = metaBody.AudioHighDRC.map((item) => ({
            filesizeP: item.filesizeP,
            format_note: item.format_note,
        }));
        var VideoLow = metaBody.VideoLow.map((item) => ({
            filesizeP: item.filesizeP,
            format_note: item.format_note,
        }));
        var VideoLowHDR = metaBody.VideoLowHDR.map((item) => ({
            filesizeP: item.filesizeP,
            format_note: item.format_note,
        }));
        var VideoHigh = metaBody.VideoHigh.map((item) => ({
            filesizeP: item.filesizeP,
            format_note: item.format_note,
        }));
        var VideoHighHDR = metaBody.VideoHighHDR.map((item) => ({
            filesizeP: item.filesizeP,
            format_note: item.format_note,
        }));
        var ManifestLow = metaBody.ManifestLow.map((item) => ({
            format: item.format,
            tbr: item.tbr,
        }));
        var ManifestHigh = metaBody.ManifestHigh.map((item) => ({
            format: item.format,
            tbr: item.tbr,
        }));
        return {
            AudioLow,
            AudioLowDRC,
            AudioHigh,
            AudioHighDRC,
            VideoLow,
            VideoLowHDR,
            VideoHigh,
            VideoHighHDR,
            ManifestLow,
            ManifestHigh,
        };
    }
}
exports.default = list_formats;
function pTable(title, data) {
    console.log(colors_1.default.green(title));
    data.forEach((item) => {
        console.log(" ".repeat(4), item.filesizeP.padEnd(10), "|", item.format_note);
    });
    console.log("");
}
function pManifestTable(title, data) {
    console.log(colors_1.default.green(title));
    data.forEach((item) => {
        console.log(" ".repeat(4), item.format.padEnd(10), "|", item.tbr);
    });
    console.log("");
}
//# sourceMappingURL=list_formats.js.map