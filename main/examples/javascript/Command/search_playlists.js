const colors = require("colors");
const YouTube = require("../../../out/cjs/src/index.js");

(async () => {
  try {
    const result = YouTube.default.ytSearch.Playlist.Multiple({ query: "search term" });
    if (result) {
      console.log(colors.green("Search Results:"));
      result.forEach((playlist, index) => {
        console.log(colors.blue(`\nResult ${index + 1}:`));
        console.log("Title:", playlist.title);
        console.log("Video Count:", playlist.videoCount);
        console.log("ID:", playlist.id);
        console.log("Thumbnail:", playlist.thumbnails[0]);
      });
    }
  } catch (error) {
    console.error(colors.red(error.message));
  }
})();
