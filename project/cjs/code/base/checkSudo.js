"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
async function checkSudo() {
    return new Promise((resolve) => {
        try {
            if (process.env.sudo === "false")
                resolve(false);
            const check = (0, child_process_1.spawn)("sudo", ["-n", "true"]);
            check.on("error", () => resolve(false));
            check.on("close", (code) => {
                resolve(code === 0);
            });
        }
        catch (error) {
            console.error(error);
            resolve(false);
        }
    });
}
exports.default = checkSudo;
//# sourceMappingURL=checkSudo.js.map