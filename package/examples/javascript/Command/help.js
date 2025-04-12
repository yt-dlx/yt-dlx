const colors = require("colors");
const YouTube = require("../../../out/cjs/src/index.js");

(async () => {
  try {
    const result = YouTube.default.info.help();
    if (result) console.log(result);
  } catch (error) {
    console.error(colors.red(error.message));
  }
})();
