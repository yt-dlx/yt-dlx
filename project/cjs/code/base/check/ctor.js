"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
function ctor() {
    try {
        (0, child_process_1.execSync)("tor --version", { stdio: "ignore" });
        return true;
    }
    catch {
        return false;
    }
}
exports.default = ctor;
//# sourceMappingURL=ctor.js.map