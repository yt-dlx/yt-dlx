// =============================[ CORE TESTER ]=============================
//
import colors from "colors"
import YouTube from "../../"
;(async () => {
  try {
    await YouTube.AudioOnly.Single.Highest({
      useTor: true,
      verbose: true,
      stream: false,
      output: "public/audio",
      query: "21 savage - redrum",
    })
  } catch (error: any) {
    console.error(colors.red(error.message))
  }
})()
//
// =============================[ CORE TESTER ]=============================
