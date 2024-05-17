"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web_1 = __importDefault(require("../web"));
const colors_1 = __importDefault(require("colors"));
const cip_1 = __importDefault(require("./check/cip"));
const Engine_1 = __importDefault(require("./Engine"));
const ctor_1 = __importDefault(require("./check/ctor"));
const csudo_1 = __importDefault(require("./check/csudo"));
const cservice_1 = __importDefault(require("./check/cservice"));
const YouTubeId_1 = __importDefault(require("../web/YouTubeId"));
const csystemctl_1 = __importDefault(require("./check/csystemctl"));
const package_json_1 = require("../../package.json");
async function Agent({ query, useTor, verbose, }) {
    var cipResult;
    var ipAddress;
    if (useTor) {
        cipResult = (0, cip_1.default)(true);
        ipAddress = cipResult.torIP || cipResult.sysIP;
    }
    else {
        cipResult = (0, cip_1.default)(false);
        ipAddress = cipResult.sysIP || cipResult.torIP;
    }
    if (verbose) {
        console.log(colors_1.default.green("@info:"), "system has", colors_1.default.green("tor"), (0, ctor_1.default)());
        console.log(colors_1.default.green("@info:"), "system has", colors_1.default.green("sudo"), (0, csudo_1.default)());
        console.log(colors_1.default.green("@info:"), "system has", colors_1.default.green("service"), (0, cservice_1.default)());
        console.log(colors_1.default.green("@info:"), "system has", colors_1.default.green("systemctl"), (0, csystemctl_1.default)());
        console.log(colors_1.default.green("@info:"), "using", colors_1.default.green("yt-dlx"), "version", colors_1.default.green(package_json_1.version));
        console.log(colors_1.default.green("@info:"), "current", colors_1.default.green("ipAddress"), "is", colors_1.default.green(ipAddress));
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
//# sourceMappingURL=Agent.js.map