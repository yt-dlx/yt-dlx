"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const package_json_1 = require("../../package.json");
(0, child_process_1.exec)("npm show yt-dlx version", (_error, stdout) => {
    let logger = "";
    const latestVersion = stdout.trim();
    const currentVersionNum = package_json_1.version.split(".").map(Number).join("");
    const latestVersionNum = latestVersion.split(".").map(Number).join("");
    if (latestVersionNum > currentVersionNum) {
        console.clear();
        logger += `\x1b[31mUsing outdated version of yt-dlx@${package_json_1.version}\n`;
        logger += `\x1b[31mPlease update to the latest version yt-dlx@${latestVersion}\x1b[0m`;
        console.error(logger);
    }
});
//# sourceMappingURL=npm.js.map