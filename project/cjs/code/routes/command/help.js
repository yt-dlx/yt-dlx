"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
function help() {
    console.log(colors_1.default.green("@info:"), "❣️ Thank you for using", colors_1.default.green("yt-dlx."), "Consider", colors_1.default.green("🌟starring"), "the github repo", colors_1.default.green("https://github.com/yt-dlx\n"));
    return Promise.resolve(colors_1.default.bold.white(`@help: visit https://yt-dlx-shovit.koyeb.app`));
}
exports.default = help;
//# sourceMappingURL=help.js.map