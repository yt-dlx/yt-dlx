import ytdlx from "yt-dlx";
import colors from "colors";
import express from "express";
const client = express();
const PORT = process.env.PORT || 3000;
// ====================================================================================
client.get("/AudioOnlyHighest", async (req: any, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const instance = ytdlx.AudioOnly.Highest({ useTor: true, metadata: true, verbose: true, query });
    instance
      .on("metadata", (metadata: any) => res.json(metadata))
      .on("start", (command: any) => console.log(colors.gray("start:"), command))
      .on("error", (error: any) => res.status(500).json({ error: error.message || error }));
  } catch (err: any) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err.message });
  }
});
// ====================================================================================
client.get("/AudioOnlyLowest", async (req: any, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const instance = ytdlx.AudioOnly.Lowest({ useTor: true, metadata: true, verbose: true, query });
    instance
      .on("metadata", (metadata: any) => res.json(metadata))
      .on("start", (command: any) => console.log(colors.gray("start:"), command))
      .on("error", (error: any) => res.status(500).json({ error: error.message || error }));
  } catch (err: any) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err.message });
  }
});
// ====================================================================================
client.get("/VideoOnlyHighest", async (req: any, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const instance = ytdlx.VideoOnly.Highest({ useTor: true, metadata: true, verbose: true, query });
    instance
      .on("metadata", (metadata: any) => res.json(metadata))
      .on("start", (command: any) => console.log(colors.gray("start:"), command))
      .on("error", (error: any) => res.status(500).json({ error: error.message || error }));
  } catch (err: any) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err.message });
  }
});
// ====================================================================================
client.get("/VideoOnlyLowest", async (req: any, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const instance = ytdlx.VideoOnly.Lowest({ useTor: true, metadata: true, verbose: true, query });
    instance
      .on("metadata", (metadata: any) => res.json(metadata))
      .on("start", (command: any) => console.log(colors.gray("start:"), command))
      .on("error", (error: any) => res.status(500).json({ error: error.message || error }));
  } catch (err: any) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err.message });
  }
});
// ====================================================================================
client.get("/AudioVideoHighest", async (req: any, res: any) => {
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
// ====================================================================================
client.get("/AudioVideoLowest", async (req: any, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const instance = ytdlx.AudioVideo.Lowest({ useTor: true, metadata: true, verbose: true, query });
    instance
      .on("metadata", (metadata: any) => res.json(metadata))
      .on("start", (command: any) => console.log(colors.gray("start:"), command))
      .on("error", (error: any) => res.status(500).json({ error: error.message || error }));
  } catch (err: any) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err.message });
  }
});
// ====================================================================================
client.listen(PORT, () => console.log(colors.cyan(`🚀 Metadata API is live at http://localhost:${PORT}`)));
