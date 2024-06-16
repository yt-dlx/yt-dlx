import caxa from "caxa";
import path from "path";

caxa({
  input: ".",
  output: path.resolve(__dirname, "out/core.exe"),
  command: ["{{caxa}}/node_modules/.bin/node", "{{caxa}}/build/index.js"],
})
  .then(() => console.log("Build complete."))
  .catch(error => console.error("Build failed.", error));
