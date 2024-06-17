import colors from "colors";
import YouTubeID from "../../web/YouTubeId";
import web, { playlistVideosType } from "../../web";

async function playlist_data({ query }: { query: string }): Promise<playlistVideosType> {
  var playlistId = await YouTubeID(query);
  if (!playlistId) {
    throw new Error(colors.red("@error: ") + "incorrect playlist link");
  } else {
    var metaData = await web.playlistVideos({ playlistId });
    if (!metaData) {
      throw new Error(colors.red("@error: ") + "Unable to get response!");
    } else return metaData;
  }
}
