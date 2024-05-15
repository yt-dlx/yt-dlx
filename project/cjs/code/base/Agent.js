"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web_1 = __importDefault(require("../web"));
const colors_1 = __importDefault(require("colors"));
const Engine_1 = __importDefault(require("./Engine"));
const YouTubeId_1 = __importDefault(require("../web/YouTubeId"));
const package_json_1 = require("../../package.json");
async function Agent({ query, verbose, }) {
    verbose;
    console.log(colors_1.default.green("@info:"), "using", colors_1.default.green("yt-dlx"), "version", colors_1.default.green(package_json_1.version));
    let TubeBody;
    let respEngine = undefined;
    let videoId = await (0, YouTubeId_1.default)(query);
    if (!videoId) {
        TubeBody = await web_1.default.searchVideos({ query });
        if (!TubeBody[0])
            throw new Error("Unable to get response!");
        console.log(colors_1.default.green("@info:"), `preparing payload for`, colors_1.default.green(TubeBody[0].title));
        respEngine = await (0, Engine_1.default)({
            query: `https://www.youtube.com/watch?v=${TubeBody[0].id}`,
        });
        return respEngine;
    }
    else {
        TubeBody = await web_1.default.singleVideo({ videoId });
        if (!TubeBody)
            throw new Error("Unable to get response!");
        console.log(colors_1.default.green("@info:"), `preparing payload for`, colors_1.default.green(TubeBody.title));
        respEngine = await (0, Engine_1.default)({
            query: `https://www.youtube.com/watch?v=${TubeBody.id}`,
        });
        return respEngine;
    }
}
exports.default = Agent;
//# sourceMappingURL=Agent.js.map