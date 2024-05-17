"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
function csystemctl() {
    try {
        (0, child_process_1.execSync)("systemctl --version", { stdio: "ignore" });
        (0, child_process_1.execSync)("systemctl tor stop", { stdio: "ignore" });
        return true;
    }
    catch {
        return false;
    }
}
exports.default = csystemctl;
//# sourceMappingURL=csystemctl.js.map