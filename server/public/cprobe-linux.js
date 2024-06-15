const fs = require("fs");
const path = require("path");
const axios = require("axios");

(async () => {
  try {
    const filepath = path.join(__dirname, "cprobe_linux");
    if (!fs.existsSync(filepath)) {
      const url = `https://github.com/yt-dlp/yt-dlp-nightly-builds/releases/latest/download/yt-dlp_linux`;
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
