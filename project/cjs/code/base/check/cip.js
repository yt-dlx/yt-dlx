"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
function cip(useTor) {
    try {
        var sysIP = (0, child_process_1.execSync)("curl https://checkip.amazonaws.com --insecure", {
            stdio: "pipe",
        })
            .toString()
            .trim();
        var torIP;
        if (useTor) {
            torIP = (0, child_process_1.execSync)("curl --socks5-hostname 127.0.0.1:9050 https://checkip.amazonaws.com --insecure", {
                stdio: "pipe",
            })
                .toString()
                .trim();
        }
        return { sysIP, torIP };
    }
    catch {
        return { sysIP: "", torIP: "" };
    }
}
exports.default = cip;
//# sourceMappingURL=cip.js.map