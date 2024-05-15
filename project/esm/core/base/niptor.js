import colors from "colors";
import { spawn } from "child_process";
export async function checkSudo() {
    return new Promise((resolve) => {
        try {
            if (process.env.sudo === "false")
                resolve(false);
            const check = spawn("sudo", ["-n", "true"]);
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
export default async function niptor(args) {
    const sudoAvailable = await checkSudo();
    const command = sudoAvailable ? ["sudo", ...args] : args;
    const prox = spawn("sh", ["-c", command.join(" ")]);
    const [stdoutData, stderrData] = await Promise.all([
        new Promise((resolve, reject) => {
            const stdoutData = [];
            prox.stdout.on("data", (data) => stdoutData.push(data));
            prox.on("close", (code) => {
                if (code === 0)
                    resolve(Buffer.concat(stdoutData).toString());
                else
                    reject(new Error(colors.red("@error: ") +
                        `not able to connect to the server. if using ${colors.yellow("onionTor")}, maybe try running ${colors.yellow("npx yt-dlx install:socks5")}. make sure yt-dlx is always running with ${colors.yellow("sudo privileges")}!`));
            });
        }),
        new Promise((resolve, reject) => {
            const stderrData = [];
            prox.stderr.on("data", (data) => stderrData.push(data));
            prox.on("close", (code) => {
                if (code === 0)
                    resolve(Buffer.concat(stderrData).toString());
                else
                    reject(new Error(colors.red("@error: ") +
                        `not able to connect to the server. if using ${colors.yellow("onionTor")}, maybe try running ${colors.yellow("npx yt-dlx install:socks5")}. make sure yt-dlx is always running with ${colors.yellow("sudo privileges")}!`));
            });
        }),
    ]);
    return { stdout: stdoutData, stderr: stderrData };
}
//# sourceMappingURL=niptor.js.map