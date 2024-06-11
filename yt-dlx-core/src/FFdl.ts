import axios from "axios";
import { join } from "path";
import { createWriteStream, existsSync } from "fs";

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
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
    });
    if (response.status !== 200) {
      throw new Error(`@error: ${response.statusText}`);
    }
    const tSize = parseInt(response.headers["content-length"], 10);
    const writer = createWriteStream(filepath);
    let dSize = 0;
    response.data.on("data", (chunk: Buffer) => {
      dSize += chunk.length;
      const progress = Math.round((dSize / tSize) * 100);
      process.stdout.write(`@${binaryName}: ${progress}%\r`);
    });
    response.data.pipe(writer);
    await new Promise<void>((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  } catch (error) {
    console.error(`@error: ${binaryName}: ${(error as Error).message}`);
  }
};

(async () => {
  const binaries: Binary[] = [
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
  ];
  for (const binary of binaries) {
    const filepath = join(__dirname, binary.name);
    if (!existsSync(filepath)) await binDL(binary.url, filepath, binary.name);
  }
})();
