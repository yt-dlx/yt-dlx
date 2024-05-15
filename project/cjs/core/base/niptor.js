"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSudo = void 0;
const colors_1 = __importDefault(require("colors"));
const child_process_1 = require("child_process");
async function checkSudo() {
    return new Promise((resolve) => {
        if (process.env.sudo === "false")
            resolve(false);
        else {
            const check = (0, child_process_1.spawn)("sudo", ["-n", "true"]);
            check.on("error", () => resolve(false));
            check.on("close", (code) => {
                resolve(code === 0);
            });
        }
    });
}
exports.checkSudo = checkSudo;
async function niptor(args) {
    const sudoAvailable = await checkSudo();
    const command = sudoAvailable ? ["sudo", ...args] : args;
    const prox = (0, child_process_1.spawn)("sh", ["-c", command.join(" ")]);
    const [stdoutData, stderrData] = await Promise.all([
        new Promise((resolve, reject) => {
            const stdoutData = [];
            prox.stdout.on("data", (data) => stdoutData.push(data));
            prox.on("close", (code) => {
                if (code === 0)
                    resolve(Buffer.concat(stdoutData).toString());
                else
                    reject(new Error(colors_1.default.red("@error: ") +
                        `not able to connect to the server. if using ${colors_1.default.yellow("onionTor")}, maybe try running ${colors_1.default.yellow("npx yt-dlx install:socks5")}. make sure yt-dlx is always running with ${colors_1.default.yellow("sudo privileges")}!`));
            });
        }),
        new Promise((resolve, reject) => {
            const stderrData = [];
            prox.stderr.on("data", (data) => stderrData.push(data));
            prox.on("close", (code) => {
                if (code === 0)
                    resolve(Buffer.concat(stderrData).toString());
                else
                    reject(new Error(colors_1.default.red("@error: ") +
                        `not able to connect to the server. if using ${colors_1.default.yellow("onionTor")}, maybe try running ${colors_1.default.yellow("npx yt-dlx install:socks5")}. make sure yt-dlx is always running with ${colors_1.default.yellow("sudo privileges")}!`));
            });
        }),
    ]);
    return { stdout: stdoutData, stderr: stderrData };
}
exports.default = niptor;
//# sourceMappingURL=niptor.js.map