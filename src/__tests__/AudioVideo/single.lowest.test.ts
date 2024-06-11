// =============================[ CORE TESTER ]=============================
//
import colors from "colors"
import YouTube from "../../"
;(async () => {
  try {
    await YouTube.AudioVideo.Single.Lowest({
      useTor: true,
      verbose: true,
      stream: false,
      output: "public/mix",
      query: "21 savage - redrum",
    })
  } catch (error: any) {
    console.error(colors.red(error.message))
  }
})()
//
// =============================[ CORE TESTER ]=============================
