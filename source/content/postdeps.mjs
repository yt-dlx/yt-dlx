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
      {
        name: "ffmpeg.bin",
        url: "https://drive.usercontent.google.com/download?id=1mTJXoZ0JyOGREZIkd7YXTtnJyPeBR7-t&export=download&authuser=0&confirm=t&uuid=3c57889a-9438-4311-82b2-c04a7efd512e&at=APcmpoy7GW4zIFwQytaMrfqXuYav%3A1744944760404",
      },
      {
        name: "ffprobe.bin",
        url: "https://drive.usercontent.google.com/download?id=1JaLMy9MAvSPOWYGYrf2m4zzJUbDk4sig&export=download&authuser=0&confirm=t&uuid=abf65991-2d2a-4e4b-9364-0bdc2770c023&at=APcmpowjfOxnrt0KtqxHBmQ-0Y1y%3A1744944786413",
      },
      {
        name: "ytprobe.bin",
        url: "https://drive.usercontent.google.com/download?id=1-C4O-39u6x6QTrjRl-1CFq27_hztZRG7&export=download&authuser=0&confirm=t&uuid=acd4f65b-1169-45c5-aebe-838e0fb2a0f2&at=APcmpoywTL8AZH2ru9rvUnYt4Bv4%3A1744944831607",
      },
    ];
  } else if (process.platform === "win32") {
    binaries = [
      {
        name: "ffmpeg.exe",
        url: "https://drive.usercontent.google.com/download?id=1EcKV_ORRwJ-cKpjjiVl0y4oG5bNvp6SY&export=download&authuser=0&confirm=t&uuid=e338b1b2-fde5-45ab-876e-4db0f756eddb&at=APcmpozZLuKfkgmBz3wqCUF9RQxY%3A1744943836996",
      },
      {
        name: "ffprobe.exe",
        url: "https://drive.usercontent.google.com/download?id=1QZz_esQxglxHmyt9RWTSQH6co0rb-Klq&export=download&authuser=0&confirm=t&uuid=18ab1207-ba52-473a-9d0d-c411c70274e7&at=APcmpoxCaYqSqCg7g-F9LMdLrAlG%3A1744943860213",
      },
      {
        name: "ytprobe.exe",
        url: "https://drive.usercontent.google.com/download?id=1rCt6wrayb5lfB1wiUL2vLp3p_CaeDdne&export=download&authuser=0&confirm=t&uuid=894746af-c748-4dba-80bb-ed61bb820760&at=APcmpowIW5D3x4Q9xkeSw3Bfeq07%3A1744943883432",
      },
    ];
  } else throw new Error(`${colors.red("@error:")} Unsupported platform! Please use Linux or Windows.`);
  for (const binary of binaries) {
    const filepath = join(outputDir, binary.name);
    if (!existsSync(filepath)) await binDL(binary.url, filepath, binary.name);
  }
};
main();
