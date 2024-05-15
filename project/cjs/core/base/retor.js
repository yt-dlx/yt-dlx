"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const os_1 = require("os");
function osget() {
    var recom;
    if ((0, os_1.platform)() === "darwin") {
        recom = "brew services stop tor && brew services start tor";
    }
    else if ((0, os_1.platform)() === "linux") {
        if ((0, child_process_1.execSync)("command -v systemctl", { stdio: "ignore" })) {
            recom = "systemctl stop tor && systemctl start tor";
        }
        else
            recom = "service tor stop && service tor start";
    }
    else {
        return false;
    }
    try {
        (0, child_process_1.execSync)(recom, { stdio: "ignore" });
        return true;
    }
    catch {
        return false;
    }
}
const retor = async () => {
    var sysip, torip;
    switch (osget()) {
        case true:
            try {
                sysip = (0, child_process_1.execSync)("curl https://checkip.amazonaws.com --insecure", {
                    stdio: "pipe",
                })
                    .toString()
                    .trim();
                torip = (0, child_process_1.execSync)("curl --socks5-hostname 127.0.0.1:9050 https://checkip.amazonaws.com --insecure", { stdio: "pipe" })
                    .toString()
                    .trim();
            }
            catch (error) {
                console.error("@error:", error);
            }
            break;
        default:
            try {
                sysip = (0, child_process_1.execSync)("curl https://checkip.amazonaws.com --insecure", {
                    stdio: "pipe",
                })
                    .toString()
                    .trim();
            }
            catch (error) {
                console.error("@error:", error);
            }
            break;
    }
    return { sysip, torip };
};
exports.default = retor;
//# sourceMappingURL=retor.js.map