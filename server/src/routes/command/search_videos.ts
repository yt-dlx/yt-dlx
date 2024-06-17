import colors from "colors";
import YouTubeID from "../../web/YouTubeId";
import web, { searchVideosType } from "../../web";

async function search_videos({ query }: { query: string }): Promise<searchVideosType[]> {
  var isID = await YouTubeID(query);
  if (isID) {
    throw new Error(colors.red("@error: ") + "use video_data() for video link!");
  } else {
    var metaData = await web.searchVideos({ query });
    if (!metaData) {
      throw new Error(colors.red("@error: ") + "Unable to get response!");
    } else return metaData;
  }
}
