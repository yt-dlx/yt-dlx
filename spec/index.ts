// import fs from "fs";
// import ytdlx from "yt-dlx";
// import colors from "colors";
// console.clear();
// const baseTime = new Date();
// const query = "Haseen by Tailwinder";
// function runYtdlx(method: string, quality: string, query: string) {
// return new Promise((resolve, reject) => {
// ytdlx[method][quality]({ useTor: true, stream: true, verbose: false, metadata: false, output: "downloads", query })
// .on("metadata", (metadata: any) => console.log("metadata:", metadata))
// .on("start", (command: any) => console.log("start:", command))
// .on("stream", ({ ffmpeg, filename }) => {
// if (!ffmpeg && filename) console.error(colors.red("error:"), "ffmpeg not found!");
// else if (ffmpeg && !filename) console.error(colors.red("error:"), "filename not found!");
// else if (!ffmpeg && !filename) console.error(colors.red("error:"), "ffmpeg and filename not found!");
// else ffmpeg.pipe(fs.createWriteStream(filename), { end: true });
// })
// .on("progress", ({ percent, timemark }) => ytdlx.progbar({ percent, timemark, baseTime }))
// .on("end", (filename: any) => {
// console.log("end:", filename);
// resolve(filename);
// })
// .on("error", (error: any) => {
// console.error("error:", error);
// reject(error);
// });
// });
// }
// async function runAllSequentially() {
// try {
// await runYtdlx("AudioOnly", "Highest", query);
// await runYtdlx("AudioOnly", "Lowest", query);
// await runYtdlx("VideoOnly", "Highest", query);
// await runYtdlx("VideoOnly", "Lowest", query);
// await runYtdlx("AudioVideo", "Highest", query);
// await runYtdlx("AudioVideo", "Lowest", query);
// console.log(colors.green("✅ All downloads completed in sequence!"));
// } catch (err) {
// console.error(colors.red("❌ Something went wrong:"), err);
// }
// }
// runAllSequentially();

import ytdlx from "yt-dlx";
import colors from "colors";
import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;
app.get("/AudioVideoHighest", async (req: any, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const instance = ytdlx.AudioVideo.Highest({ useTor: true, metadata: true, verbose: true, query });
    instance
      .on("metadata", (metadata: any) => res.json(metadata))
      .on("start", (command: any) => console.log(colors.gray("start:"), command))
      .on("error", (error: any) => res.status(500).json({ error: error.message || error }));
  } catch (err: any) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err.message });
  }
});
app.listen(PORT, () => console.log(colors.cyan(`🚀 Metadata API is live at http://localhost:${PORT}`)));
// http://localhost:3000/AudioVideoHighest?query=Haseen
