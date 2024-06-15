const fs = require("fs");
const path = require("path");
const axios = require("axios");

(async () => {
  try {
    const platform = process.platform;
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
    const filepath = path.join(__dirname, `cprobe${fileExtension}`);
    if (!fs.existsSync(filepath)) {
      const url = `https://github.com/yt-dlp/yt-dlp-nightly-builds/releases/latest/download/yt-dlp${fileExtension}`;
      let downloadedSize = 0;
      const response = await axios.get(url, { responseType: "stream" });
      if (response.status !== 200) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const totalSize = parseInt(response.headers["content-length"], 10);
      const writer = fs.createWriteStream(filepath);
      response.data.on("data", chunk => {
        downloadedSize += chunk.length;
        const progress = Math.round((downloadedSize / totalSize) * 100);
        process.stdout.write(`@cprobe: ${progress}%\r`);
      });
      response.data.pipe(writer);
      await new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
      });
    }
  } catch (error) {
    console.error("@error:", error.message);
  }
})();
