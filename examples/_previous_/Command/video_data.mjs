import colors from "colors";
import YouTube from "../../../out/esm/src/index.js";
(async () => {
  try {
    const result = YouTube.ytSearch.Video.Single({ query: "video-NAME/ID/URL" });
    if (result) {
      console.log(colors.green("\nVideo Details:"));
      console.log(colors.blue("\nBasic Info:"));
      console.log("Title:", result.title);
      console.log("ID:", result.id);
      console.log("Duration:", result.duration);
      console.log("Views:", result.view_count_formatted);
      console.log("Likes:", result.like_count_formatted);
      console.log(colors.blue("\nChannel Info:"));
      console.log("Channel:", result.channel_name);
      console.log("Channel ID:", result.channel_id);
      console.log("Channel URL:", result.channel_url);
      console.log("Subscribers:", result.channel_follower_count_formatted);
      console.log(colors.blue("\nUpload Info:"));
      console.log("Upload Date:", result.upload_date);
      console.log("Uploaded:", result.upload_ago_formatted);
      console.log(colors.blue("\nURLs:"));
      console.log("Video URL:", result.webpage_url);
      console.log("Thumbnail:", result.thumbnail);
    }
  } catch (error) {
    console.error(colors.red(error.message));
  }
})();
