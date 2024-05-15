// =============================[ CORE TESTER ]=============================
//
import colors from "colors";
import YouTube from "../../";
(async () => {
  try {
    const resolutions = [
      "144p",
      "240p",
      "360p",
      "480p",
      "720p",
      "1080p",
      "1440p",
      "2160p",
      "3072p",
      "4320p",
      "6480p",
      "8640p",
      "12000p",
    ] as const;
    for (const resolution of resolutions) {
      await YouTube.VideoOnly.Single.Custom({
        resolution,
        stream: false,
        verbose: true,
        onionTor: false,
        output: "public/video",
        query: "21 savage - redrum",
      });
    }
  } catch (error: any) {
    console.error(colors.red(error.message));
  }
})();
//
// =============================[ CORE TESTER ]=============================
