import axios from "axios";
import { join } from "path";
import { createWriteStream, existsSync, mkdirSync } from "fs";
const outputDir = join(process.cwd(), "pkg");
if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });
const binDL = async (url, filepath, binaryName) => {
  try {
    const response = await axios({ url, method: "GET", responseType: "stream" });
    if (response.status !== 200) throw new Error("@error: " + response.statusText);
    const tSize = parseInt(response.headers["content-length"], 10);
    const writer = createWriteStream(filepath);
    let dSize = 0;
    response.data.on("data", chunk => {
      dSize += chunk.length;
      const progress = Math.round((dSize / tSize) * 100);
      process.stdout.write("[" + binaryName + "]: " + progress + "%\\r");
    });
    response.data.pipe(writer);
    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  } catch (error) {
    console.error("@error: " + binaryName + ": " + error.message);
  }
};
const main = async () => {
  var pname;
  var ename;
  if (process.platform === "linux") {
    ename = ".bin";
    pname = "-linux";
  } else if (process.platform === "win32") {
    ename = ".exe";
    pname = "-windows";
  } else throw new Error("@error: Unsupported platform. Please use Linux or Windows.");
  const binaries = [
    { name: `ffmpeg${ename}`, url: `https://github.com/yt-dlx/yt-dlx/releases/latest/download/ffmpeg${pname}${ename}` },
    { name: `ffprobe${ename}`, url: `https://github.com/yt-dlx/yt-dlx/releases/latest/download/ffprobe${pname}${ename}` },
    { name: `ytprobe${ename}`, url: `https://github.com/yt-dlx/yt-dlx/releases/latest/download/ytprobe${pname}${ename}` },
  ];
  for (const binary of binaries) {
    const filepath = join(outputDir, binary.name + pname);
    if (!existsSync(filepath)) await binDL(binary.url, filepath, binary.name);
  }
};
main();
