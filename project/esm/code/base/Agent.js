console.clear();
import web from "../web";
import colors from "colors";
import Engine from "./Engine";
import { execSync } from "child_process";
import YouTubeID from "../web/YouTubeId";
export default async function Agent({ query, useTor, verbose, }) {
    var ipAddress = "", issystemctl = false, isservice = false;
    function sip() {
        var op = execSync("curl https://checkip.amazonaws.com --insecure", {
            stdio: "pipe",
        });
        return op.toString().trim();
    }
    function tip() {
        var op = execSync("curl --socks5-hostname 127.0.0.1:9050 https://checkip.amazonaws.com --insecure", {
            stdio: "pipe",
        });
        return op.toString().trim();
    }
    function service() {
        try {
            execSync("service --version", { stdio: "ignore" });
            execSync("service tor stop", { stdio: "ignore" });
            return true;
        }
        catch {
            return false;
        }
    }
    function systemctl() {
        try {
            execSync("systemctl --version", { stdio: "ignore" });
            execSync("systemctl tor stop", { stdio: "ignore" });
            return true;
        }
        catch {
            return false;
        }
    }
    function sudo() {
        try {
            execSync("sudo --version", { stdio: "ignore" });
            return true;
        }
        catch {
            return false;
        }
    }
    var issudo = sudo();
    if (useTor) {
        switch (true) {
            case systemctl():
                execSync("systemctl restart tor", { stdio: "inherit" });
                ipAddress = tip() || sip();
                issystemctl = true;
                break;
            case service():
                execSync("service tor restart", { stdio: "inherit" });
                ipAddress = tip() || sip();
                isservice = true;
                break;
            default:
                ipAddress = sip();
                break;
        }
    }
    else
        ipAddress = sip();
    if (verbose) {
        console.log(colors.green("@info:"), "now using", colors.green("ipAddress"), ipAddress);
        console.log(colors.green("@info:"), "is sudo", colors.green("available"), issudo);
        console.log(colors.green("@info:"), "is service", colors.green("available"), isservice);
        console.log(colors.green("@info:"), "is systemctl", colors.green("available"), issystemctl);
    }
    var TubeBody;
    var respEngine = undefined;
    var videoId = await YouTubeID(query);
    if (!videoId) {
        TubeBody = await web.searchVideos({ query });
        if (!TubeBody[0])
            throw new Error("Unable to get response!");
        console.log(colors.green("@info:"), "preparing payload for", colors.green(TubeBody[0].title));
        respEngine = await Engine({
            ipAddress,
            sudo: issudo,
            query: "https://www.youtube.com/watch?v=" + TubeBody[0].id,
        });
        return respEngine;
    }
    else {
        TubeBody = await web.singleVideo({ videoId });
        if (!TubeBody)
            throw new Error("Unable to get response!");
        console.log(colors.green("@info:"), "preparing payload for", colors.green(TubeBody.title));
        respEngine = await Engine({
            ipAddress,
            sudo: issudo,
            query: "https://www.youtube.com/watch?v=" + TubeBody.id,
        });
        return respEngine;
    }
}
//# sourceMappingURL=Agent.js.map