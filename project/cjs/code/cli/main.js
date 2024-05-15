#!/usr/bin/env node
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
const __1 = __importDefault(require(".."));
const fs = __importStar(require("fs"));
const colors_1 = __importDefault(require("colors"));
const path = __importStar(require("path"));
const minimist_1 = __importDefault(require("minimist"));
const child_process_1 = require("child_process");
const package_json_1 = require("../../package.json");
const proTube = (0, minimist_1.default)(process.argv.slice(2), {
    string: ["query", "format"],
    alias: {
        h: "help",
        v: "version",
        e: "extract",
        vl: "video-lowest",
        al: "audio-lowest",
        vh: "video_highest",
        ah: "audio-highest",
    },
});
let uLoc = "";
let maxTries = 6;
let currentDir = __dirname;
const program = async () => {
    const command = proTube._[0];
    switch (command) {
        case "install:deps":
            while (maxTries > 0) {
                const enginePath = path.join(currentDir, "util");
                if (fs.existsSync(enginePath)) {
                    uLoc = enginePath;
                    break;
                }
                else {
                    currentDir = path.join(currentDir, "..");
                    maxTries--;
                }
            }
            const rox = (0, child_process_1.spawn)("sh", [
                "-c",
                `chmod +x ${uLoc}/deps.sh && ${uLoc}/deps.sh`,
            ]);
            await Promise.all([
                new Promise((resolve, reject) => {
                    rox.stdout.on("data", (stdout) => {
                        console.log(colors_1.default.green("@stdout:"), stdout.toString().trim());
                    });
                    rox.on("close", (code) => {
                        if (code === 0)
                            resolve();
                        else
                            reject(new Error(`@closed with code ${code}`));
                    });
                }),
                new Promise((resolve, reject) => {
                    rox.stderr.on("data", (stderr) => {
                        console.log(colors_1.default.yellow("@stderr:"), stderr.toString().trim());
                    });
                    rox.on("close", (code) => {
                        if (code === 0)
                            resolve();
                        else
                            reject(new Error(`@closed with code ${code}`));
                    });
                }),
            ]);
            break;
        case "install:socks5":
            while (maxTries > 0) {
                const enginePath = path.join(currentDir, "util");
                if (fs.existsSync(enginePath)) {
                    uLoc = enginePath;
                    break;
                }
                else {
                    currentDir = path.join(currentDir, "..");
                    maxTries--;
                }
            }
            const xrox = (0, child_process_1.spawn)("sh", [
                "-c",
                `chmod +x ${uLoc}/socks5.sh && ${uLoc}/socks5.sh`,
            ]);
            await Promise.all([
                new Promise((resolve, reject) => {
                    xrox.stdout.on("data", (stdout) => {
                        console.log(colors_1.default.green("@stdout:"), stdout.toString().trim());
                    });
                    xrox.on("close", (code) => {
                        if (code === 0)
                            resolve();
                        else
                            reject(new Error(`@closed with code ${code}`));
                    });
                }),
                new Promise((resolve, reject) => {
                    xrox.stderr.on("data", (stderr) => {
                        console.log(colors_1.default.yellow("@stderr:"), stderr.toString().trim());
                    });
                    xrox.on("close", (code) => {
                        if (code === 0)
                            resolve();
                        else
                            reject(new Error(`@closed with code ${code}`));
                    });
                }),
            ]);
            break;
        case "version":
        case "v":
            console.error(colors_1.default.green("Installed Version: yt-dlx@" + package_json_1.version));
            break;
        case "help":
        case "h":
            console.log("@help: visit https://yt-dlx-shovit.koyeb.app/");
            break;
        case "extract":
        case "e":
            if (!proTube || !proTube.query || proTube.query.length === 0) {
                console.error(colors_1.default.red("error: no query"));
            }
            else
                await __1.default.info
                    .extract({
                    query: proTube.query,
                })
                    .then((data) => {
                    console.log(data);
                    process.exit();
                })
                    .catch((error) => {
                    console.error(colors_1.default.red(error));
                    process.exit();
                });
            break;
        // case "list-formats":
        // case "f":
        // if (!proTube || !proTube.query || proTube.query.length === 0) {
        // console.error(colors.red("error: no query"));
        // } else
        // await ytdlx.info
        // .list_formats({
        // query: proTube.query,
        // })
        // .then((data: any) => {
        // console.log(data);
        // process.exit();
        // })
        // .catch((error: string) => {
        // console.error(colors.red(error));
        // process.exit();
        // });
        // break;
        case "audio-highest":
        case "ah":
            if (!proTube || !proTube.query || proTube.query.length === 0) {
                console.error(colors_1.default.red("error: no query"));
            }
            else
                await __1.default.AudioOnly.Single.Highest({
                    query: proTube.query,
                })
                    .then((data) => {
                    console.log(data);
                    process.exit();
                })
                    .catch((error) => {
                    console.error(colors_1.default.red(error));
                    process.exit();
                });
            break;
        case "audio-lowest":
        case "al":
            if (!proTube || !proTube.query || proTube.query.length === 0) {
                console.error(colors_1.default.red("error: no query"));
            }
            else
                await __1.default.AudioOnly.Single.Lowest({
                    query: proTube.query,
                })
                    .then((data) => {
                    console.log(data);
                    process.exit();
                })
                    .catch((error) => {
                    console.error(colors_1.default.red(error));
                    process.exit();
                });
            break;
        case "video_highest":
        case "vh":
            if (!proTube || !proTube.query || proTube.query.length === 0) {
                console.error(colors_1.default.red("error: no query"));
            }
            else
                await __1.default.VideoOnly.Single.Highest({
                    query: proTube.query,
                })
                    .then((data) => {
                    console.log(data);
                    process.exit();
                })
                    .catch((error) => {
                    console.error(colors_1.default.red(error));
                    process.exit();
                });
            break;
        case "video-lowest":
        case "vl":
            if (!proTube || !proTube.query || proTube.query.length === 0) {
                console.error(colors_1.default.red("error: no query"));
            }
            else
                await __1.default.VideoOnly.Single.Lowest({
                    query: proTube.query,
                })
                    .then((data) => {
                    console.log(data);
                    process.exit();
                })
                    .catch((error) => {
                    console.error(colors_1.default.red(error));
                    process.exit();
                });
            break;
        default:
            console.log("@help: visit https://yt-dlx-shovit.koyeb.app/");
            process.exit();
            break;
    }
};
if (!proTube._[0]) {
    console.log("@help: visit https://yt-dlx-shovit.koyeb.app/");
    process.exit();
}
else
    program();
//# sourceMappingURL=main.js.map