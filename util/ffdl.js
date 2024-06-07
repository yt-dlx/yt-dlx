const fetch = require("node-fetch");
const { dirname, join } = require("path");
const { createWriteStream, existsSync } = require("fs");

const binDL = async (url, filepath, binaryName) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`@error: ${response.statusText}`);
    const tSize = parseInt(response.headers.get("content-length"), 10);
    const writer = createWriteStream(filepath);
    let dSize = 0;
    response.body.on("data", (chunk) => {
      dSize += chunk.length;
      const progress = Math.round((dSize / tSize) * 100);
      process.stdout.write(`@${binaryName}: ${progress}%\r`);
    });
    response.body.pipe(writer);
    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
    console.log(`\n@${binaryName}: Download complete`);
  } catch (error) {
    console.error(`@error: ${binaryName}: ${error.message}`);
  }
};

(async () => {
  for (const binary of [
    {
      name: "ffmpeg.exe",
      url: "https://github.com/yt-dlx/yt-dlx/releases/download/v1.0.0/ffmpeg.exe",
    },
    {
      name: "ffplay.exe",
      url: "https://github.com/yt-dlx/yt-dlx/releases/download/v1.0.0/ffplay.exe",
    },
    {
      name: "ffprobe.exe",
      url: "https://github.com/yt-dlx/yt-dlx/releases/download/v1.0.0/ffprobe.exe",
    },
  ]) {
    const filepath = join(dirname(__filename), binary.name);
    if (!existsSync(filepath)) await binDL(binary.url, filepath, binary.name);
  }
})();
