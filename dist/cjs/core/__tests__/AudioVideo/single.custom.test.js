"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const __1 = __importDefault(require("../.."));
const colors_1 = __importDefault(require("colors"));
(async () => {
    try {
        const resolutions = [
            "144p",
            "240p",
            "360p",
            "480p",
            "720p",
            "1080p",
            "1440p",
            "2160p",
            "3072p",
            "4320p",
            "6480p",
            "8640p",
            "12000p",
        ];
        for (const resolution of resolutions) {
            console.log(colors_1.default.blue("@test:"), "Download Custom audio");
            await __1.default.AudioVideo.Single.Custom({
                resolution,
                stream: false,
                verbose: true,
                onionTor: false,
                output: "public/audio",
                query: "https://www.youtube.com/watch?v=AbFnsaDQMYQ",
            });
            console.log(colors_1.default.blue("@test:"), "(stream) Download Custom audio");
            const result = await __1.default.AudioVideo.Single.Custom({
                resolution,
                stream: true,
                verbose: true,
                onionTor: false,
                output: "public/audio",
                query: "https://www.youtube.com/watch?v=AbFnsaDQMYQ",
            });
            if (result && result.filename && result.ffmpeg) {
                result.ffmpeg.pipe(fs.createWriteStream(result.filename));
            }
            else {
                console.error(colors_1.default.red("@error:"), "ffmpeg or filename not found!");
            }
        }
    }
    catch (error) {
        console.error(colors_1.default.red(error.message));
    }
})();
//# sourceMappingURL=single.custom.test.js.map