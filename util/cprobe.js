const { createWriteStream, existsSync } = require("fs");
const { dirname, join } = require("path");
const fetch = require("node-fetch");

(async () => {
  try {
    let platform = process.platform;
    let fileExtension = "";
    switch (platform) {
      case "win32":
        fileExtension = ".exe";
        break;
      case "darwin":
        fileExtension = "_macos";
        break;
      case "linux":
        fileExtension = "_linux";
        break;
      default:
        throw new Error("Unsupported platform");
    }
    const filepath = join(dirname(__filename), `cprobe${fileExtension}`);
    if (!existsSync(filepath)) {
      const url = `https://github.com/yt-dlp/yt-dlp-nightly-builds/releases/latest/download/yt-dlp${fileExtension}`;
      let dSize = 0;
      const response = await fetch(url);
      if (!response.ok) throw new Error("@error: " + response.statusText);
      const tSize = parseInt(response.headers.get("content-length"), 10);
      const writer = createWriteStream(filepath);
      response.body.on("data", (chunk) => {
        dSize += chunk.length;
        const progress = Math.round((dSize / tSize) * 100);
        process.stdout.write(`@cprobe: ${progress}%\r`);
      });
      response.body.pipe(writer);
      await new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
      });
    }
  } catch (error) {
    console.error("@error:", error.message);
  }
})();
