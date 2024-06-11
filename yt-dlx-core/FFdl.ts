import { createWriteStream, existsSync } from "fs";
import fetch from "node-fetch";
import { join } from "path";

interface Binary {
  name: string;
  url: string;
}

const binDL = async (
  url: string,
  filepath: string,
  binaryName: string
): Promise<void> => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`@error: ${response.statusText}`);
    const tSize = parseInt(response.headers.get("content-length") || "0", 10);
    const writer = createWriteStream(filepath);
    let dSize = 0;
    if (!response.body) throw new Error("No response body");
    response.body.on("data", (chunk: Buffer) => {
      dSize += chunk.length;
      const progress = Math.round((dSize / tSize) * 100);
      process.stdout.write(`@${binaryName}: ${progress}%\r`);
    });
    response.body.pipe(writer);
    await new Promise<void>((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
    process.stdout.write(`@${binaryName}: Download complete\n`);
  } catch (error) {
    console.error(`@error: ${binaryName}: ${(error as Error).message}`);
  }
};

(async () => {
  const binaries: Binary[] = [
    {
      name: "ffmpeg.exe",
      url: "https://github.com/yt-dlx/yt-dlx/releases/latest/download/ffmpeg.exe",
    },
    {
      name: "ffprobe.exe",
      url: "https://github.com/yt-dlx/yt-dlx/releases/latest/download/ffprobe.exe",
    },
  ];
  for (const binary of binaries) {
    const filepath = join(__dirname, binary.name);
    if (!existsSync(filepath)) await binDL(binary.url, filepath, binary.name);
  }
})();
