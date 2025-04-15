import colors from "colors";
import YouTube from "../../../out/esm/src/index.js";
(async () => {
  try {
    const result = YouTube.ytSearch.Video.Multiple({ query: "search term" });
    if (result) {
      console.log(colors.green("Search Results:"));
      result.forEach((video, index) => {
        console.log(colors.blue(`\nResult ${index + 1}:`));
        console.log("Title:", video.title);
        console.log("Duration:", video.duration);
        console.log("Live:", video.isLive);
        console.log("ID:", video.id);
        console.log("Thumbnail:", video.thumbnails[0]);
      });
    }
  } catch (error) {
    console.error(colors.red(error.message));
  }
})();
