// ====================================================================================
import ytdlx from "..";
import colors from "colors";
import express from "express";
const server = express();
const PORT = process.env.PORT || 4040;
server.listen(PORT, () => console.log(colors.cyan(`🚀 YT-DLX Server is live at port ${PORT}`)));
// ====================================================================================
server.get("/AudioCustomData", async (req: any, res: any) => {
  const query = req.query.query as string;
  const resolution = ["high", "medium", "low", "ultralow"].includes(req.query.resolution) ? (req.query.resolution as "high" | "medium" | "low" | "ultralow") : "medium";
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  if (!resolution) return res.status(400).json({ error: "Missing resolution parameter." });
  try {
    const Tuber = ytdlx.Audio.Custom({ useTor: true, metadata: true, verbose: true, query, resolution });
    Tuber.on("metadata", metadata => res.json(metadata));
    Tuber.on("start", command => console.log(colors.gray("start:"), command));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (err) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});
// ====================================================================================
server.get("/AudioHighestData", async (req: any, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const Tuber = ytdlx.Audio.Highest({ useTor: true, metadata: true, verbose: true, query });
    Tuber.on("metadata", metadata => res.json(metadata));
    Tuber.on("start", command => console.log(colors.gray("start:"), command));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (err) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});
// ====================================================================================
server.get("/AudioLowestData", async (req: any, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const Tuber = ytdlx.Audio.Lowest({ useTor: true, metadata: true, verbose: true, query });
    Tuber.on("metadata", metadata => res.json(metadata));
    Tuber.on("start", command => console.log(colors.gray("start:"), command));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (err) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});
// ====================================================================================
server.get("/VideoCustomData", async (req: any, res: any) => {
  const query = req.query.query as string;
  const resolution = ["144p", "240p", "360p", "480p", "720p", "1080p", "1440p", "2160p", "3072p", "4320p", "6480p", "8640p", "12000p"].includes(req.query.resolution)
    ? (req.query.resolution as "144p" | "240p" | "360p" | "480p" | "720p" | "1080p" | "1440p" | "2160p" | "3072p" | "4320p" | "6480p" | "8640p" | "12000p")
    : "720p";
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  if (!resolution) return res.status(400).json({ error: "Missing resolution parameter." });
  try {
    const Tuber = ytdlx.Video.Custom({ useTor: true, metadata: true, verbose: true, query, resolution });
    Tuber.on("metadata", metadata => res.json(metadata));
    Tuber.on("start", command => console.log(colors.gray("start:"), command));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (err) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});
// ====================================================================================
server.get("/VideoHighestData", async (req: any, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const Tuber = ytdlx.Video.Highest({ useTor: true, metadata: true, verbose: true, query });
    Tuber.on("metadata", metadata => res.json(metadata));
    Tuber.on("start", command => console.log(colors.gray("start:"), command));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (err) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});
// ====================================================================================
server.get("/VideoLowestData", async (req: any, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const Tuber = ytdlx.Video.Lowest({ useTor: true, metadata: true, verbose: true, query });
    Tuber.on("metadata", metadata => res.json(metadata));
    Tuber.on("start", command => console.log(colors.gray("start:"), command));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (err) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});
// ====================================================================================
server.get("/AudioVideoHighestData", async (req: any, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const Tuber = ytdlx.Audio_Video.Highest({ useTor: true, metadata: true, verbose: true, query });
    Tuber.on("metadata", metadata => res.json(metadata));
    Tuber.on("start", command => console.log(colors.gray("start:"), command));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (err) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});
// ====================================================================================
server.get("/AudioVideoCustomData", async (req: any, res: any) => {
  const query = req.query.query as string;
  const resolution = ["144p", "240p", "360p", "480p", "720p", "1080p", "1440p", "2160p", "3072p", "4320p", "6480p", "8640p", "12000p"].includes(req.query.resolution)
    ? (req.query.resolution as "144p" | "240p" | "360p" | "480p" | "720p" | "1080p" | "1440p" | "2160p" | "3072p" | "4320p" | "6480p" | "8640p" | "12000p")
    : "720p";
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  if (!resolution) return res.status(400).json({ error: "Missing resolution parameter." });
  try {
    const Tuber = ytdlx.Audio_Video.Custom({ useTor: true, metadata: true, verbose: true, query, resolution });
    Tuber.on("metadata", metadata => res.json(metadata));
    Tuber.on("start", command => console.log(colors.gray("start:"), command));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (err) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});
// ====================================================================================
server.get("/AudioVideoLowestData", async (req: any, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const Tuber = ytdlx.Audio_Video.Lowest({ useTor: true, metadata: true, verbose: true, query });
    Tuber.on("metadata", metadata => res.json(metadata));
    Tuber.on("start", command => console.log(colors.gray("start:"), command));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (err) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});
// ====================================================================================
server.get("/AudioVideoLowestData", async (req: any, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const Tuber = ytdlx.Audio_Video.Lowest({ useTor: true, metadata: true, verbose: true, query });
    Tuber.on("metadata", metadata => res.json(metadata));
    Tuber.on("start", command => console.log(colors.gray("start:"), command));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (err) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});
// ====================================================================================
server.get("/SearchMultipleVideos", async (req: any, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const Tuber = ytdlx.Search.Video.Multiple({ query });
    Tuber.on("data", data => res.json(data));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (err) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});
// ====================================================================================
server.get("/SearchSingleVideo", async (req: any, res: any) => {
  const videoLink = req.query.videoLink as string;
  if (!videoLink) return res.status(400).json({ error: "Missing videoLink parameter." });
  try {
    const Tuber = ytdlx.Search.Video.Single({ videoLink });
    Tuber.on("data", data => res.json(data));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (err) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});
// ====================================================================================
server.get("/SearchRelatedVideos", async (req: any, res: any) => {
  const videoId = req.query.videoId as string;
  if (!videoId) return res.status(400).json({ error: "Missing videoId parameter." });
  try {
    const Tuber = ytdlx.Search.Video.Related({ videoId });
    Tuber.on("data", data => res.json(data));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (err) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});
// ====================================================================================
server.get("/SearchMultiplePlaylists", async (req: any, res: any) => {
  const playlistLink = req.query.playlistLink as string;
  if (!playlistLink) return res.status(400).json({ error: "Missing playlistLink parameter." });
  try {
    const Tuber = ytdlx.Search.Playlist.Multiple({ playlistLink });
    Tuber.on("data", data => res.json(data));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (err) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});
// ====================================================================================
server.get("/SearchSinglePlaylist", async (req: any, res: any) => {
  const playlistLink = req.query.playlistLink as string;
  if (!playlistLink) return res.status(400).json({ error: "Missing playlistLink parameter." });
  try {
    const Tuber = ytdlx.Search.Playlist.Single({ playlistLink });
    Tuber.on("data", data => res.json(data));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (err) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});
// ====================================================================================
server.get("/ExtractVideoData", async (req: any, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const Tuber = ytdlx.Info.extract({ query });
    Tuber.on("data", data => res.json(data));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (err) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});
// ====================================================================================
server.get("/ListVideoFormats", async (req: any, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const Tuber = ytdlx.Info.list_formats({ query });
    Tuber.on("data", data => res.json(data));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (err) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});
// ====================================================================================
