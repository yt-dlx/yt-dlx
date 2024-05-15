// =============================[ CORE TESTER ]=============================
//
import colors from "colors";
import YouTube from "../../";
(async () => {
  try {
    await YouTube.AudioOnly.Single.Lowest({
      stream: false,
      verbose: true,
      onionTor: true,
      output: "public/audio",
      query: "21 savage - redrum",
    });
  } catch (error: any) {
    console.error(colors.red(error.message));
  }
})();
//
// =============================[ CORE TESTER ]=============================
