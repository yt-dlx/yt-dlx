"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web_1 = __importDefault(require("../web"));
const colors_1 = __importDefault(require("colors"));
const Engine_1 = __importDefault(require("./Engine"));
const async_retry_1 = __importDefault(require("async-retry"));
const child_process_1 = require("child_process");
const YouTubeId_1 = __importDefault(require("../web/YouTubeId"));
var reOpts = {
    retries: 3,
    minTimeout: 1000,
    maxTimeout: 5000,
    factor: 2,
};
async function sip() {
    return await (0, async_retry_1.default)(async () => {
        var op = (0, child_process_1.execSync)("curl https://checkip.amazonaws.com --insecure", {
            stdio: "pipe",
        });
        return op.toString().trim();
    }, reOpts);
}
async function tip() {
    return await (0, async_retry_1.default)(async () => {
        var op = (0, child_process_1.execSync)("curl --socks5-hostname 127.0.0.1:9050 https://checkip.amazonaws.com --insecure", {
            stdio: "pipe",
        });
        return op.toString().trim();
    }, reOpts);
}
async function service() {
    return await (0, async_retry_1.default)(async () => {
        try {
            (0, child_process_1.execSync)("service --version", { stdio: "ignore" });
            (0, child_process_1.execSync)("service tor stop", { stdio: "ignore" });
            return true;
        }
        catch {
            return false;
        }
    }, reOpts);
}
async function systemctl() {
    return await (0, async_retry_1.default)(async () => {
        try {
            (0, child_process_1.execSync)("systemctl --version", { stdio: "ignore" });
            (0, child_process_1.execSync)("systemctl tor stop", { stdio: "ignore" });
            return true;
        }
        catch {
            return false;
        }
    }, reOpts);
}
async function sudo() {
    return await (0, async_retry_1.default)(async () => {
        try {
            (0, child_process_1.execSync)("sudo --version", { stdio: "ignore" });
            return true;
        }
        catch {
            return false;
        }
    }, reOpts);
}
async function Agent({ query, useTor, verbose, }) {
    var iptor = "";
    var ipsys = "";
    // var isservice: boolean = false;
    // var issystemctl: boolean = false;
    if (useTor) {
        switch (true) {
            case await systemctl():
                (0, child_process_1.execSync)("systemctl restart tor", { stdio: "inherit" });
                // issystemctl = true;
                ipsys = await sip();
                iptor = await tip();
                break;
            case await service():
                (0, child_process_1.execSync)("service tor restart", { stdio: "inherit" });
                // isservice = true;
                ipsys = await sip();
                iptor = await tip();
                break;
            default:
                ipsys = await sip();
                break;
        }
    }
    else
        ipsys = await sip();
    if (verbose) {
        switch (useTor) {
            case true:
                console.log(colors_1.default.green("@info:"), "system ipAddress", ipsys);
                console.log(colors_1.default.green("@info:"), "socks5 ipAddress", iptor);
                break;
            default:
                console.log(colors_1.default.green("@info:"), "system ipAddress", ipsys);
                break;
        }
        // console.log(colors.green("@info:"), "is sudo available", await sudo());
        // console.log(colors.green("@info:"), "is service available", isservice);
        // console.log(colors.green("@info:"), "is systemctl available", issystemctl);
    }
    var TubeBody;
    var respEngine = undefined;
    var videoId = await (0, YouTubeId_1.default)(query);
    if (!videoId) {
        TubeBody = await web_1.default.searchVideos({ query });
        if (!TubeBody[0])
            throw new Error("Unable to get response!");
        console.log(colors_1.default.green("@info:"), "preparing payload for", TubeBody[0].title);
        respEngine = await (0, Engine_1.default)({
            sudo: await sudo(),
            ipAddress: iptor || ipsys,
            query: "https://www.youtube.com/watch?v=" + TubeBody[0].id,
        });
        return respEngine;
    }
    else {
        TubeBody = await web_1.default.singleVideo({ videoId });
        if (!TubeBody)
            throw new Error("Unable to get response!");
        console.log(colors_1.default.green("@info:"), "preparing payload for", TubeBody.title);
        respEngine = await (0, Engine_1.default)({
            sudo: await sudo(),
            ipAddress: iptor || ipsys,
            query: "https://www.youtube.com/watch?v=" + TubeBody.id,
        });
        return respEngine;
    }
}
exports.default = Agent;
//# sourceMappingURL=Agent.js.map