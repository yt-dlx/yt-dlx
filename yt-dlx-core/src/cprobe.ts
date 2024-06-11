import { createWriteStream, existsSync } from "fs";
import { join } from "path";
import axios from "axios";

(async () => {
  try {
    const platform = process.platform;
    let fileExtension: string;
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
    const filepath = join(__dirname, `cprobe${fileExtension}`);
    if (!existsSync(filepath)) {
      const url = `https://github.com/yt-dlp/yt-dlp-nightly-builds/releases/latest/download/yt-dlp${fileExtension}`;
      let downloadedSize = 0;
      const response = await axios.get(url, { responseType: "stream" });
      if (response.status !== 200) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const totalSize = parseInt(response.headers["content-length"], 10);
      const writer = createWriteStream(filepath);
      response.data.on("data", (chunk: Buffer) => {
        downloadedSize += chunk.length;
        const progress = Math.round((downloadedSize / totalSize) * 100);
        process.stdout.write(`@cprobe: ${progress}%\r`);
      });
      response.data.pipe(writer);
      await new Promise<void>((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
      });
      console.log(`\n@cprobe: Download complete`);
    }
  } catch (error) {
    console.error("@error:", (error as Error).message);
  }
})();
