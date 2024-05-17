"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
function cservice() {
    try {
        (0, child_process_1.execSync)("service --version", { stdio: "ignore" });
        (0, child_process_1.execSync)("service tor stop", { stdio: "ignore" });
        return true;
    }
    catch {
        return false;
    }
}
exports.default = cservice;
//# sourceMappingURL=cservice.js.map