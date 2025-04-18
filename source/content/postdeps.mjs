import axios from "axios";
import colors from "colors";
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
  var binaries = [];
  if (process.platform === "linux") {
    binaries = [
      { name: "ffmpeg.bin", url: "https://drive.google.com/file/d/1mTJXoZ0JyOGREZIkd7YXTtnJyPeBR7-t/view?usp=sharing" },
      { name: "ffprobe.bin", url: "" },
      { name: "ytprobe.bin", url: "https://drive.google.com/file/d/1-C4O-39u6x6QTrjRl-1CFq27_hztZRG7/view?usp=sharing" },
    ];
  } else if (process.platform === "win32") {
    binaries = [
      { name: "ffmpeg.exe", url: "https://drive.google.com/file/d/1EcKV_ORRwJ-cKpjjiVl0y4oG5bNvp6SY/view?usp=sharing" },
      { name: "ffprobe.exe", url: "https://drive.google.com/file/d/1QZz_esQxglxHmyt9RWTSQH6co0rb-Klq/view?usp=sharing" },
      { name: "ytprobe.exe", url: "https://drive.google.com/file/d/1rCt6wrayb5lfB1wiUL2vLp3p_CaeDdne/view?usp=sharing" },
    ];
  } else throw new Error(`${colors.red("@error:")} Unsupported platform! Please use Linux or Windows.`);
  for (const binary of binaries) {
    const filepath = join(outputDir, binary.name);
    if (!existsSync(filepath)) await binDL(binary.url, filepath, binary.name);
  }
};
main();
