import web from "../web";
import colors from "colors";
import niptor from "./niptor";
import Engine from "./Engine";
import YouTubeID from "../web/YouTubeId";
import { version } from "../../package.json";
/**
 * Fetches data for a YouTube video or search query using yt-dlx.
 *
 * @param query - The YouTube video ID, link, or search query.
 * @param verbose - Optional flag to enable verbose mode.
 * @param onionTor - Optional flag to use Tor network.
 * @returns A Promise that resolves with the engine output containing video metadata.
 * @throws An error if unable to get a response or encounter issues with Tor connection.
 */
export default async function Agent({ query, verbose, onionTor, }) {
    console.log(colors.green("@info:"), "using", colors.green("yt-dlx"), "version", colors.green(version));
    let nipTor;
    let ipAddress = undefined;
    nipTor = await niptor(["curl https://checkip.amazonaws.com --insecure"]);
    console.log(colors.green("@info:"), "system", colors.green("ipAddress"), nipTor.stdout.trim());
    ipAddress = nipTor.stdout.trim();
    if (onionTor) {
        nipTor = await niptor([
            "systemctl restart tor && curl --socks5-hostname 127.0.0.1:9050 https://checkip.amazonaws.com --insecure",
        ]);
        if (nipTor.stdout.trim().length > 0) {
            console.log(colors.green("@info:"), "socks5", colors.green("ipAddress"), nipTor.stdout.trim());
            ipAddress = nipTor.stdout.trim();
        }
        else
            throw new Error("Unable to connect to Tor.");
    }
    let TubeBody;
    let respEngine = undefined;
    let videoId = await YouTubeID(query);
    if (!videoId) {
        TubeBody = await web.browserLess.searchVideos({ query });
        if (!TubeBody[0])
            throw new Error("Unable to get response!");
        else {
            console.log(colors.green("@info:"), `preparing payload for`, colors.green(TubeBody[0].title));
            respEngine = await Engine({
                query: `https://www.youtube.com/watch?v=${TubeBody[0].id}`,
                onionTor,
                ipAddress,
            });
            return respEngine;
        }
    }
    else {
        TubeBody = await web.browserLess.singleVideo({ videoId });
        if (!TubeBody)
            throw new Error("Unable to get response!");
        else {
            console.log(colors.green("@info:"), `preparing payload for`, colors.green(TubeBody.title));
            respEngine = await Engine({
                query: `https://www.youtube.com/watch?v=${TubeBody.id}`,
                onionTor,
                ipAddress,
            });
            return respEngine;
        }
    }
}
//# sourceMappingURL=Agent.js.map