import colors from "colors";
import YouTubeID from "../../web/YouTubeId";
import web, { singleVideoType } from "../../web";

async function video_data({ query }: { query: string }): Promise<singleVideoType> {
  var videoId = await YouTubeID(query);
  if (!videoId) {
    throw new Error(colors.red("@error: ") + "incorrect playlist link");
  } else {
    var metaData = await web.singleVideo({ videoId });
    if (!metaData) {
      throw new Error(colors.red("@error: ") + "Unable to get response!");
    } else return metaData;
  }
}
