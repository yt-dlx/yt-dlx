const colors = require("colors");
const YouTube = require("../../../out/cjs/src/index.js");

(async () => {
  try {
    const result = YouTube.default.info.extract({ verbose: true, query: "video-NAME/ID/URL" });
    if (result) {
      console.log(colors.green("\nExtracted Information:"));
      console.log(colors.blue("\nFormat Information:"));
      console.log("Audio Formats:", {
        low: { format: result.AudioLowF, drc: result.AudioLowDRC, all: result.AudioLow },
        high: { format: result.AudioHighF, drc: result.AudioHighDRC, all: result.AudioHigh },
      });
      console.log("\nVideo Formats:", {
        low: { format: result.VideoLowF, hdr: result.VideoLowHDR, all: result.VideoLow },
        high: { format: result.VideoHighF, hdr: result.VideoHighHDR, all: result.VideoHigh },
      });
      console.log("\nManifest Formats:", { low: result.ManifestLow, high: result.ManifestHigh });
      console.log(colors.blue("\nMetadata:"));
      console.log("Basic Info:", {
        id: result.meta_data.id,
        title: result.meta_data.title,
        duration: result.meta_data.duration,
        description: result.meta_data.description,
      });
      console.log("\nStats:", {
        views: result.meta_data.view_count_formatted,
        likes: result.meta_data.like_count_formatted,
        comments: result.meta_data.comment_count_formatted,
      });
      console.log("\nChannel Info:", {
        name: result.meta_data.channel_name,
        id: result.meta_data.channel_id,
        url: result.meta_data.channel_url,
        followers: result.meta_data.channel_follower_count_formatted,
      });
      console.log("\nUpload Info:", { date: result.meta_data.upload_date, ago: result.meta_data.upload_ago_formatted });
    }
  } catch (error) {
    console.error(colors.red(error.message));
  }
})();
