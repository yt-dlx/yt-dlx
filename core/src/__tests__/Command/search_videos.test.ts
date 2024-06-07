import YouTube from "../../";
import colors from "colors";

(async () => {
  try {
    console.log(colors.blue("@test:"), "ytSearch video multiple");
    const result = await YouTube.ytSearch.Video.Multiple({
      query: "8k dolby nature",
    });
    console.log(result);
  } catch (error: any) {
    console.error(colors.red(error.message));
  }
})();
