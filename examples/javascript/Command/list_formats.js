const colors = require("colors");
const YouTube = require("../../../out/cjs/src/index.js");

(async () => {
  try {
    const result = YouTube.default.info.list_formats({ verbose: true, query: "video-NAME/ID/URL" });
    if (result) {
      console.log(colors.green("Available Formats:"), {
        manifest: { low: result.ManifestLow, high: result.ManifestHigh },
        audio: { low: result.AudioLow, high: result.AudioHigh, lowDRC: result.AudioLowDRC, highDRC: result.AudioHighDRC },
        video: { low: result.VideoLow, high: result.VideoHigh, lowHDR: result.VideoLowHDR, highHDR: result.VideoHighHDR },
      });
    }
  } catch (error) {
    console.error(colors.red(error.message));
  }
})();
