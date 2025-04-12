const colors = require("colors");
const YouTube = require("../../../out/cjs/src/index.js");

(async () => {
  try {
    const result = YouTube.default.ytSearch.Playlist.Single({ query: "playlist-NAME/ID/URL" });
    if (result) {
      console.log(colors.green("\nPlaylist Details:"));
      console.log("Title:", result.title);
      console.log("ID:", result.id);
      console.log("Video Count:", result.videoCount);
      console.log(colors.green("\nVideos in Playlist:"));
      result.result.forEach((video, index) => {
        console.log(colors.blue(`\nVideo ${index + 1}:`));
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
