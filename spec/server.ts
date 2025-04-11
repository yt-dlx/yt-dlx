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
