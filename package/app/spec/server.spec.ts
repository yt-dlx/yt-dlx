import express from "express";
import colors from "colors";
import ytdlx from "..";
const server = express();
const PORT = process.env.PORT || 4040;
server.listen(PORT, () => console.log(colors.cyan(`🚀 YT-DLX Server is live at http://localhost:${PORT}`)));
export default server;
/* ============================================================================ AUDIO Endpoints */
server.get("/AudioCustomData", async (req, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  let resolution: "high" | "medium" | "low" | "ultralow";
  switch (req.query.resolution) {
    case "high":
    case "low":
    case "medium":
    case "ultralow":
      resolution = req.query.resolution;
      break;
    default:
      resolution = "medium";
  }
  try {
    const Tuber = ytdlx.Audio.Custom({ useTor: true, metadata: true, verbose: true, query, resolution });
    Tuber.on("metadata", metadata => res.json(metadata));
    Tuber.on("start", command => console.log(colors.gray("start:"), command));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});
server.get("/AudioHighestData", async (req, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const Tuber = ytdlx.Audio.Highest({ useTor: true, metadata: true, verbose: true, query });
    Tuber.on("metadata", metadata => res.json(metadata));
    Tuber.on("start", command => console.log(colors.gray("start:"), command));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});
server.get("/AudioLowestData", async (req, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const Tuber = ytdlx.Audio.Lowest({ useTor: true, metadata: true, verbose: true, query });
    Tuber.on("metadata", metadata => res.json(metadata));
    Tuber.on("start", command => console.log(colors.gray("start:"), command));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});
/* ============================================================================ VIDEO Endpoints */
server.get("/VideoCustomData", async (req, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  let resolution: "144p" | "240p" | "360p" | "480p" | "720p" | "1080p" | "1440p" | "2160p" | "3072p" | "4320p" | "6480p" | "8640p" | "12000p";
  switch (req.query.resolution) {
    case "144p":
    case "240p":
    case "360p":
    case "480p":
    case "720p":
    case "1080p":
    case "1440p":
    case "2160p":
    case "3072p":
    case "4320p":
    case "6480p":
    case "8640p":
    case "12000p":
      resolution = req.query.resolution;
      break;
    default:
      resolution = "720p";
  }
  try {
    const Tuber = ytdlx.Video.Custom({ useTor: true, metadata: true, verbose: true, query, resolution });
    Tuber.on("metadata", metadata => res.json(metadata));
    Tuber.on("start", command => console.log(colors.gray("start:"), command));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});
server.get("/VideoHighestData", async (req, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const Tuber = ytdlx.Video.Highest({ useTor: true, metadata: true, verbose: true, query });
    Tuber.on("metadata", metadata => res.json(metadata));
    Tuber.on("start", command => console.log(colors.gray("start:"), command));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});
server.get("/VideoLowestData", async (req, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const Tuber = ytdlx.Video.Lowest({ useTor: true, metadata: true, verbose: true, query });
    Tuber.on("metadata", metadata => res.json(metadata));
    Tuber.on("start", command => console.log(colors.gray("start:"), command));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});
/* ============================================================================ AUDIO & VIDEO Endpoints */
server.get("/AudioVideoHighestData", async (req, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const Tuber = ytdlx.Audio_Video.Highest({ useTor: true, metadata: true, verbose: true, query });
    Tuber.on("metadata", metadata => res.json(metadata));
    Tuber.on("start", command => console.log(colors.gray("start:"), command));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});
server.get("/AudioVideoCustomData", async (req, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  let resolution: "144p" | "240p" | "360p" | "480p" | "720p" | "1080p" | "1440p" | "2160p" | "3072p" | "4320p" | "6480p" | "8640p" | "12000p";
  switch (req.query.resolution) {
    case "144p":
    case "240p":
    case "360p":
    case "480p":
    case "720p":
    case "1080p":
    case "1440p":
    case "2160p":
    case "3072p":
    case "4320p":
    case "6480p":
    case "8640p":
    case "12000p":
      resolution = req.query.resolution;
      break;
    default:
      resolution = "720p";
  }
  try {
    const Tuber = ytdlx.Audio_Video.Custom({ useTor: true, metadata: true, verbose: true, query, resolution });
    Tuber.on("metadata", metadata => res.json(metadata));
    Tuber.on("start", command => console.log(colors.gray("start:"), command));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});
server.get("/AudioVideoLowestData", async (req, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const Tuber = ytdlx.Audio_Video.Lowest({ useTor: true, metadata: true, verbose: true, query });
    Tuber.on("metadata", metadata => res.json(metadata));
    Tuber.on("start", command => console.log(colors.gray("start:"), command));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});
/* ============================================================================ SEARCH Endpoints */
server.get("/SearchMultipleVideos", async (req, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const Tuber = ytdlx.Search.Video.Multiple({ query });
    Tuber.on("data", data => res.json(data));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});
server.get("/SearchSingleVideo", async (req, res: any) => {
  const videoLink = req.query.videoLink as string;
  if (!videoLink) return res.status(400).json({ error: "Missing videoLink parameter." });
  try {
    const Tuber = ytdlx.Search.Video.Single({ videoLink });
    Tuber.on("data", data => res.json(data));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});
server.get("/SearchRelatedVideos", async (req, res: any) => {
  const videoId = req.query.videoId as string;
  if (!videoId) return res.status(400).json({ error: "Missing videoId parameter." });
  try {
    const Tuber = ytdlx.Search.Video.Related({ videoId });
    Tuber.on("data", data => res.json(data));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});
server.get("/SearchMultiplePlaylists", async (req, res: any) => {
  const playlistLink = req.query.playlistLink as string;
  if (!playlistLink) return res.status(400).json({ error: "Missing playlistLink parameter." });
  try {
    const Tuber = ytdlx.Search.Playlist.Multiple({ playlistLink });
    Tuber.on("data", data => res.json(data));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});
server.get("/SearchSinglePlaylist", async (req, res: any) => {
  const playlistLink = req.query.playlistLink as string;
  if (!playlistLink) return res.status(400).json({ error: "Missing playlistLink parameter." });
  try {
    const Tuber = ytdlx.Search.Playlist.Single({ playlistLink });
    Tuber.on("data", data => res.json(data));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});
server.get("/SearchVideoTranscript", async (req, res: any) => {
  const videoLink = req.query.videoLink as string;
  if (!videoLink) return res.status(400).json({ error: "Missing videoLink parameter." });
  try {
    const Tuber = ytdlx.Search.Video.Transcript({ videoLink });
    Tuber.on("data", data => res.json(data));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    return res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});
/* ============================================================================ INFO Endpoints */
server.get("/ExtractVideoData", async (req, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const Tuber = ytdlx.Info.extract({ query });
    Tuber.on("data", data => res.json(data));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});
server.get("/ListVideoFormats", async (req, res: any) => {
  const query = req.query.query as string;
  if (!query) {
    return res.status(400).json({ error: "Missing query parameter." });
  }
  try {
    const Tuber = ytdlx.Info.list_formats({ query });
    Tuber.on("data", data => res.json(data));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});
