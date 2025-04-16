import colors from "colors";
import YouTube from "../../../out/esm/src/index.js";
(async () => {
  try {
    const result = YouTube.info.help();
    if (result) console.log(result);
  } catch (error) {
    console.error(colors.red(error.message));
  }
})();
