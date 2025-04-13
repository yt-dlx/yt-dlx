// ====================================================================================
import ytdlx from "..";
import colors from "colors";
import express from "express";
const server = express();
const PORT = process.env.PORT || 4040;
server.listen(PORT, () => console.log(colors.cyan(`🚀 YT-DLX Server is live at port ${PORT}`)));
// ====================================================================================
server.get("/AudioOnlyCustomData", async (req: any, res: any) => {
  const query = req.query.query as string;
  const resolution = ["high", "medium", "low", "ultralow"].includes(req.query.resolution) ? (req.query.resolution as "high" | "medium" | "low" | "ultralow") : "medium";
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  if (!resolution) return res.status(400).json({ error: "Missing resolution parameter." });
  try {
    const instance = ytdlx.Audio.Custom({ useTor: true, metadata: true, verbose: true, query, resolution });
    instance.on("metadata", metadata => res.json(metadata));
    instance.on("start", command => console.log(colors.gray("start:"), command));
    instance.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (err) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});
// ====================================================================================
server.get("/AudioOnlyHighestData", async (req: any, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const instance = ytdlx.Audio.Highest({ useTor: true, metadata: true, verbose: true, query });
    instance.on("metadata", metadata => res.json(metadata));
    instance.on("start", command => console.log(colors.gray("start:"), command));
    instance.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (err: any) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err.message });
  }
});
// ====================================================================================
server.get("/AudioOnlyLowestData", async (req: any, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const instance = ytdlx.Audio.Lowest({ useTor: true, metadata: true, verbose: true, query });
    instance.on("metadata", metadata => res.json(metadata));
    instance.on("start", command => console.log(colors.gray("start:"), command));
    instance.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (err: any) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err.message });
  }
});
// ====================================================================================
server.get("/VideoOnlyCustomData", async (req: any, res: any) => {
  const query = req.query.query as string;
  const resolution = ["144p", "240p", "360p", "480p", "720p", "1080p", "1440p", "2160p", "3072p", "4320p", "6480p", "8640p", "12000p"].includes(req.query.resolution)
    ? (req.query.resolution as "144p" | "240p" | "360p" | "480p" | "720p" | "1080p" | "1440p" | "2160p" | "3072p" | "4320p" | "6480p" | "8640p" | "12000p")
    : "720p";
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  if (!resolution) return res.status(400).json({ error: "Missing resolution parameter." });
  try {
    const instance = ytdlx.Video.Custom({ useTor: true, metadata: true, verbose: true, query, resolution });
    instance.on("metadata", metadata => res.json(metadata));
    instance.on("start", command => console.log(colors.gray("start:"), command));
    instance.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (err: any) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err.message });
  }
});
// ====================================================================================
server.get("/VideoOnlyHighestData", async (req: any, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const instance = ytdlx.Video.Highest({ useTor: true, metadata: true, verbose: true, query });
    instance.on("metadata", metadata => res.json(metadata));
    instance.on("start", command => console.log(colors.gray("start:"), command));
    instance.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (err: any) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err.message });
  }
});
// ====================================================================================
server.get("/VideoOnlyLowestData", async (req: any, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const instance = ytdlx.Video.Lowest({ useTor: true, metadata: true, verbose: true, query });
    instance.on("metadata", metadata => res.json(metadata));
    instance.on("start", command => console.log(colors.gray("start:"), command));
    instance.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (err: any) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err.message });
  }
});
// ====================================================================================
server.get("/AudioVideoHighestData", async (req: any, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const instance = ytdlx.Audio_Video.Highest({ useTor: true, metadata: true, verbose: true, query });
    instance.on("metadata", metadata => res.json(metadata));
    instance.on("start", command => console.log(colors.gray("start:"), command));
    instance.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (err: any) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err.message });
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
    const instance = ytdlx.Audio_Video.Custom({ useTor: true, metadata: true, verbose: true, query, resolution });
    instance.on("metadata", metadata => res.json(metadata));
    instance.on("start", command => console.log(colors.gray("start:"), command));
    instance.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (err: any) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err.message });
  }
});
// ====================================================================================
server.get("/AudioVideoLowestData", async (req: any, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const instance = ytdlx.Audio_Video.Lowest({ useTor: true, metadata: true, verbose: true, query });
    instance.on("metadata", metadata => res.json(metadata));
    instance.on("start", command => console.log(colors.gray("start:"), command));
    instance.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (err: any) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err.message });
  }
});
// ====================================================================================
server.get("/AudioVideoLowestData", async (req: any, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const instance = ytdlx.Audio_Video.Lowest({ useTor: true, metadata: true, verbose: true, query });
    instance.on("metadata", metadata => res.json(metadata));
    instance.on("start", command => console.log(colors.gray("start:"), command));
    instance.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (err: any) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err.message });
  }
});
// ====================================================================================
server.get("/SearchMultipleVideos", async (req: any, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const instance = ytdlx.Search.Video.Multiple({ query });
    instance.on("data", data => res.json(data));
    instance.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (err: any) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err.message });
  }
});
// ====================================================================================
server.get("/SearchSingleVideo", async (req: any, res: any) => {
  const videoLink = req.query.videoLink as string;
  if (!videoLink) return res.status(400).json({ error: "Missing videoLink parameter." });
  try {
    const instance = ytdlx.Search.Video.Single({ videoLink });
    instance.on("data", data => res.json(data));
    instance.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (err: any) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err.message });
  }
});
// ====================================================================================
server.get("/SearchRelatedVideos", async (req: any, res: any) => {
  const videoId = req.query.videoId as string;
  if (!videoId) return res.status(400).json({ error: "Missing videoId parameter." });
  try {
    const instance = ytdlx.Search.Video.Related({ videoId });
    instance.on("data", data => res.json(data));
    instance.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (err: any) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err.message });
  }
});
// ====================================================================================
server.get("/SearchMultiplePlaylists", async (req: any, res: any) => {
  const playlistLink = req.query.playlistLink as string;
  if (!playlistLink) return res.status(400).json({ error: "Missing playlistLink parameter." });
  try {
    const instance = ytdlx.Search.Playlist.Multiple({ playlistLink });
    instance.on("data", data => res.json(data));
    instance.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (err: any) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err.message });
  }
});
// ====================================================================================
server.get("/SearchSinglePlaylist", async (req: any, res: any) => {
  const playlistLink = req.query.playlistLink as string;
  if (!playlistLink) return res.status(400).json({ error: "Missing playlistLink parameter." });
  try {
    const instance = ytdlx.Search.Playlist.Single({ playlistLink });
    instance.on("data", data => res.json(data));
    instance.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (err: any) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err.message });
  }
});
// ====================================================================================
server.get("/ExtractVideoData", async (req: any, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const instance = ytdlx.Info.extract({ query });
    instance.on("data", data => res.json(data));
    instance.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (err: any) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err.message });
  }
});
// ====================================================================================
server.get("/ListVideoFormats", async (req: any, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const instance = ytdlx.Info.list_formats({ query });
    instance.on("data", data => res.json(data));
    instance.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (err: any) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err.message });
  }
});
// ====================================================================================
