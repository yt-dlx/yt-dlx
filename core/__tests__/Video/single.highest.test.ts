// =============================[ CORE TESTER ]=============================
//
import colors from "colors";
import YouTube from "../../";
(async () => {
  try {
    await YouTube.VideoOnly.Single.Highest({
      stream: false,
      verbose: true,
      onionTor: false,
      output: "public/video",
      query: "21 savage - redrum",
    });
  } catch (error: any) {
    console.error(colors.red(error.message));
  }
})();
//
// =============================[ CORE TESTER ]=============================
