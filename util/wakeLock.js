const { spawn } = require("child_process");
const { schedule } = require("node-cron");
const colors = require("colors/safe");
const express = require("express");

const app = express();
const port = process.env.PORT || 8000;
app.use((req, res) => res.status(404).send("404!"));

function reproc() {
  const iproc = spawn("sh", [
    "-c",
    "pkill tor && service tor start && yarn global add yt-dlx",
  ]);
  iproc.stdout.on("data", (data) => {
    console.log(colors.yellow("@debug:"), data.toString());
  });
  iproc.stderr.on("data", (data) => {
    console.error(colors.red("@error:"), data.toString());
  });
  iproc.on("close", (code) => {
    if (code !== 0) {
      console.error(colors.red("@error:"), "installation failed.");
    } else {
      const rproc = spawn("sh", [
        "-c",
        "pkill tor && service tor start && yarn global remove yt-dlx",
      ]);
      rproc.stdout.on("data", (data) => {
        console.log(colors.yellow("@debug:"), data.toString());
      });
      rproc.stderr.on("data", (data) => {
        console.error(colors.red("@error:"), data.toString());
      });
      rproc.on("close", (code) => {
        if (code !== 0) console.error(colors.red("@error:"), "removal failed.");
        else reproc();
      });
    }
  });
}

app.listen(port, () => {
  console.log(colors.green("@server:"), "started on port", port);
  schedule("*/10 * * * *", () => reproc());
});

module.exports = app;
