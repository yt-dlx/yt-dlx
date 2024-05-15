// =============================[ CORE TESTER ]=============================
//
import colors from "colors";
import YouTube from "../../";
(async () => {
  try {
    const resolutions = ["high", "medium", "low", "ultralow"] as const;
    for (const resolution of resolutions) {
      await YouTube.AudioOnly.Single.Custom({
        resolution,
        stream: false,
        verbose: true,
        onionTor: false,
        output: "public/audio",
        query: "21 savage - redrum",
      });
    }
  } catch (error: any) {
    console.error(colors.red(error.message));
  }
})();
//
// =============================[ CORE TESTER ]=============================
