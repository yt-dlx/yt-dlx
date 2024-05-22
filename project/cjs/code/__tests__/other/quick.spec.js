"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.clear();
const web_1 = __importDefault(require("../../web"));
const colors_1 = __importDefault(require("colors"));
const Engine_1 = __importDefault(require("../../base/Engine"));
const child_process_1 = require("child_process");
const YouTubeId_1 = __importDefault(require("../../web/YouTubeId"));
async function Agent({ query, useTor, verbose, }) {
    var ipAddress = "";
    function sip() {
        var op = (0, child_process_1.execSync)("curl https://checkip.amazonaws.com --insecure", {
            stdio: "pipe",
        });
        return op.toString().trim();
    }
    function tip() {
        var op = (0, child_process_1.execSync)("curl --socks5-hostname 127.0.0.1:9050 https://checkip.amazonaws.com --insecure", {
            stdio: "pipe",
        });
        return op.toString().trim();
    }
    if (useTor) {
        function service() {
            try {
                (0, child_process_1.execSync)("service --version", { stdio: "ignore" });
                (0, child_process_1.execSync)("service tor stop", { stdio: "ignore" });
                return true;
            }
            catch {
                return false;
            }
        }
        function systemctl() {
            try {
                (0, child_process_1.execSync)("systemctl --version", { stdio: "ignore" });
                (0, child_process_1.execSync)("systemctl tor stop", { stdio: "ignore" });
                return true;
            }
            catch {
                return false;
            }
        }
        switch (true) {
            case systemctl():
                (0, child_process_1.execSync)("systemctl restart tor", { stdio: "inherit" });
                ipAddress = tip() || sip();
                break;
            case service():
                (0, child_process_1.execSync)("service tor restart", { stdio: "inherit" });
                ipAddress = tip() || sip();
                break;
            default:
                ipAddress = sip();
                break;
        }
    }
    else
        ipAddress = sip();
    if (verbose) {
        console.log(colors_1.default.green("@info:"), "now using", colors_1.default.green("ipAddress"), ipAddress);
    }
    var TubeBody;
    var respEngine = undefined;
    var videoId = await (0, YouTubeId_1.default)(query);
    if (!videoId) {
        TubeBody = await web_1.default.searchVideos({ query });
        if (!TubeBody[0])
            throw new Error("Unable to get response!");
        console.log(colors_1.default.green("@info:"), "preparing payload for", colors_1.default.green(TubeBody[0].title));
        respEngine = await (0, Engine_1.default)({
            ipAddress,
            query: `https://www.youtube.com/watch?v=${TubeBody[0].id}`,
        });
        return respEngine;
    }
    else {
        TubeBody = await web_1.default.singleVideo({ videoId });
        if (!TubeBody)
            throw new Error("Unable to get response!");
        console.log(colors_1.default.green("@info:"), "preparing payload for", colors_1.default.green(TubeBody.title));
        respEngine = await (0, Engine_1.default)({
            ipAddress,
            query: `https://www.youtube.com/watch?v=${TubeBody.id}`,
        });
        return respEngine;
    }
}
exports.default = Agent;
(async () => {
    const meta = await Agent({
        query: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        verbose: true,
        useTor: true,
    });
    console.log(meta);
})();
//# sourceMappingURL=quick.spec.js.map