import web from "../web";
import colors from "colors";
import Engine from "./Engine";
import YouTubeID from "../web/YouTubeId";
import { version } from "../../package.json";
export default async function Agent({ query, verbose, }) {
    verbose;
    console.log(colors.green("@info:"), "using", colors.green("yt-dlx"), "version", colors.green(version));
    let TubeBody;
    let respEngine = undefined;
    let videoId = await YouTubeID(query);
    if (!videoId) {
        TubeBody = await web.searchVideos({ query });
        if (!TubeBody[0])
            throw new Error("Unable to get response!");
        console.log(colors.green("@info:"), `preparing payload for`, colors.green(TubeBody[0].title));
        respEngine = await Engine({
            query: `https://www.youtube.com/watch?v=${TubeBody[0].id}`,
        });
        return respEngine;
    }
    else {
        TubeBody = await web.singleVideo({ videoId });
        if (!TubeBody)
            throw new Error("Unable to get response!");
        console.log(colors.green("@info:"), `preparing payload for`, colors.green(TubeBody.title));
        respEngine = await Engine({
            query: `https://www.youtube.com/watch?v=${TubeBody.id}`,
        });
        return respEngine;
    }
}
//# sourceMappingURL=Agent.js.map