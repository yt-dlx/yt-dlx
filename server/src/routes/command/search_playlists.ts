import colors from "colors";
import YouTubeID from "../../web/YouTubeId";
import web, { searchPlaylistsType } from "../../web";

async function search_playlists({ query }: { query: string }): Promise<searchPlaylistsType[]> {
  var isID = await YouTubeID(query);
  if (isID) {
    throw new Error(colors.red("@error: ") + "use playlist_data() for playlist link!");
  } else {
    var metaData = await web.searchPlaylists({ query });
    if (!metaData) {
      throw new Error(colors.red("@error: ") + "Unable to get response!");
    } else return metaData;
  }
}
