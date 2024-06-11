import { createWriteStream, existsSync } from "fs";
import fetch from "node-fetch";
import { join } from "path";

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
      const response = await fetch(url);
      if (!response.ok) throw new Error(`@error: ${response.statusText}`);
      const totalSize = parseInt(
        response.headers.get("content-length") || "0",
        10
      );
      const writer = createWriteStream(filepath);
      if (!response.body) throw new Error("No response body");
      response.body.on("data", (chunk: Buffer) => {
        downloadedSize += chunk.length;
        const progress = Math.round((downloadedSize / totalSize) * 100);
        process.stdout.write(`@cprobe: ${progress}%\r`);
      });
      response.body.pipe(writer);
      await new Promise<void>((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
      });
      process.stdout.write(`@cprobe: Download complete\n`);
    }
  } catch (error) {
    console.error("@error:", (error as Error).message);
  }
})();
