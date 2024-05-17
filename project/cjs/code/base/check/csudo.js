"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
function csudo() {
    try {
        (0, child_process_1.execSync)("sudo --version", { stdio: "ignore" });
        return true;
    }
    catch {
        return false;
    }
}
exports.default = csudo;
//# sourceMappingURL=csudo.js.map