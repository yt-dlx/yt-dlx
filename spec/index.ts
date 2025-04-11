import fs from "fs";
import ytdlx from "yt-dlx";
import colors from "colors";
console.clear();
const baseTime = new Date();
const query = "Haseen by Tailwinder";
function runYtdlx(method: string, quality: string, query: string) {
  return new Promise((resolve, reject) => {
    ytdlx[method][quality]({ useTor: true, stream: true, verbose: false, metadata: false, output: "downloads", query })
      .on("metadata", (metadata: any) => console.log("metadata:", metadata))
      .on("start", (command: any) => console.log("start:", command))
      .on("stream", ({ ffmpeg, filename }) => {
        if (!ffmpeg && filename) console.error(colors.red("error:"), "ffmpeg not found!");
        else if (ffmpeg && !filename) console.error(colors.red("error:"), "filename not found!");
        else if (!ffmpeg && !filename) console.error(colors.red("error:"), "ffmpeg and filename not found!");
        else ffmpeg.pipe(fs.createWriteStream(filename), { end: true });
      })
      .on("progress", ({ percent, timemark }) => ytdlx.progbar({ percent, timemark, baseTime }))
      .on("end", (filename: any) => {
        console.log("end:", filename);
        resolve(filename);
      })
      .on("error", (error: any) => {
        console.error("error:", error);
        reject(error);
      });
  });
}
async function runAllSequentially() {
  try {
    await runYtdlx("AudioOnly", "Highest", query);
    await runYtdlx("AudioOnly", "Lowest", query);
    await runYtdlx("VideoOnly", "Highest", query);
    await runYtdlx("VideoOnly", "Lowest", query);
    await runYtdlx("AudioVideo", "Highest", query);
    await runYtdlx("AudioVideo", "Lowest", query);
    console.log(colors.green("✅ All downloads completed in sequence!"));
  } catch (err) {
    console.error(colors.red("❌ Something went wrong:"), err);
  }
}
runAllSequentially();
