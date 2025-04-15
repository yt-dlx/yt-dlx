console.clear();
import YouTubeDLX from "..";
import colors from "colors";
import express from "express";
const server = express();
const PORT = process.env.PORT || 4040;
server.listen(PORT, () => console.log(colors.cyan(`🚀 YT-DLX Server is live at http://localhost:${PORT}`)));
export default server;
/* ============================================================================ AUDIO Endpoints */
server.get("/AudioCustom", async (req, res: any) => {
  const query = req.query.query as string;
  const useTor = req.query.useTor === "true";
  const verbose = req.query.verbose === "true";
  const metadata = req.query.metadata === "true";
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  let resolution: "high" | "medium" | "low" | "ultralow";
  switch (req.query.resolution) {
    case "low":
    case "high":
    case "medium":
    case "ultralow":
      resolution = req.query.resolution;
      break;
    default:
      resolution = "medium";
  }
  try {
    const Tuber = YouTubeDLX.Audio.Custom({ useTor, metadata, verbose, query, resolution });
    Tuber.on("metadata", metadata => res.json(metadata));
    Tuber.on("start", command => console.log(colors.gray("start:"), command));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});
server.get("/AudioHighest", async (req, res: any) => {
  const query = req.query.query as string;
  const useTor = req.query.useTor === "true";
  const verbose = req.query.verbose === "true";
  const metadata = req.query.metadata === "true";
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const Tuber = YouTubeDLX.Audio.Highest({ useTor, metadata, verbose, query });
    Tuber.on("metadata", metadata => res.json(metadata));
    Tuber.on("start", command => console.log(colors.gray("start:"), command));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});
server.get("/AudioLowest", async (req, res: any) => {
  const query = req.query.query as string;
  const useTor = req.query.useTor === "true";
  const verbose = req.query.verbose === "true";
  const metadata = req.query.metadata === "true";
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const Tuber = YouTubeDLX.Audio.Lowest({ useTor, metadata, verbose, query });
    Tuber.on("metadata", metadata => res.json(metadata));
    Tuber.on("start", command => console.log(colors.gray("start:"), command));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});
/* ============================================================================ VIDEO Endpoints */
server.get("/VideoCustom", async (req, res: any) => {
  const query = req.query.query as string;
  const useTor = req.query.useTor === "true";
  const verbose = req.query.verbose === "true";
  const metadata = req.query.metadata === "true";
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
      resolution = "360p";
  }
  try {
    const Tuber = YouTubeDLX.Video.Custom({ useTor, metadata, verbose, query, resolution });
    Tuber.on("metadata", metadata => res.json(metadata));
    Tuber.on("start", command => console.log(colors.gray("start:"), command));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});
server.get("/VideoHighest", async (req, res: any) => {
  const query = req.query.query as string;
  const useTor = req.query.useTor === "true";
  const verbose = req.query.verbose === "true";
  const metadata = req.query.metadata === "true";
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const Tuber = YouTubeDLX.Video.Highest({ useTor, metadata, verbose, query });
    Tuber.on("metadata", metadata => res.json(metadata));
    Tuber.on("start", command => console.log(colors.gray("start:"), command));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});
server.get("/VideoLowest", async (req, res: any) => {
  const query = req.query.query as string;
  const useTor = req.query.useTor === "true";
  const verbose = req.query.verbose === "true";
  const metadata = req.query.metadata === "true";
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const Tuber = YouTubeDLX.Video.Lowest({ useTor, metadata, verbose, query });
    Tuber.on("metadata", metadata => res.json(metadata));
    Tuber.on("start", command => console.log(colors.gray("start:"), command));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});
/* ============================================================================ AUDIO & VIDEO Endpoints */
server.get("/AudioVideoHighest", async (req, res: any) => {
  const query = req.query.query as string;
  const useTor = req.query.useTor === "true";
  const verbose = req.query.verbose === "true";
  const metadata = req.query.metadata === "true";
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const Tuber = YouTubeDLX.Audio_Video.Highest({ useTor, metadata, verbose, query });
    Tuber.on("metadata", metadata => res.json(metadata));
    Tuber.on("start", command => console.log(colors.gray("start:"), command));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});
server.get("/AudioVideoCustom", async (req, res: any) => {
  const query = req.query.query as string;
  const useTor = req.query.useTor === "true";
  const verbose = req.query.verbose === "true";
  const metadata = req.query.metadata === "true";
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
    const Tuber = YouTubeDLX.Audio_Video.Custom({ useTor, metadata, verbose, query, resolution });
    Tuber.on("metadata", metadata => res.json(metadata));
    Tuber.on("start", command => console.log(colors.gray("start:"), command));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});
server.get("/AudioVideoLowest", async (req, res: any) => {
  const query = req.query.query as string;
  const useTor = req.query.useTor === "true";
  const verbose = req.query.verbose === "true";
  const metadata = req.query.metadata === "true";
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const Tuber = YouTubeDLX.Audio_Video.Lowest({ useTor, metadata, verbose, query });
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
    const Tuber = YouTubeDLX.Search.Video.Multiple({ query });
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
    const Tuber = YouTubeDLX.Search.Video.Single({ videoLink });
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
    const Tuber = YouTubeDLX.Search.Video.Related({ videoId });
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
    const Tuber = YouTubeDLX.Search.Playlist.Multiple({ playlistLink });
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
    const Tuber = YouTubeDLX.Search.Playlist.Single({ playlistLink });
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
    const Tuber = YouTubeDLX.Info.Transcript({ videoLink });
    Tuber.on("data", data => res.json(data));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    return res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});
server.get("/SearchAdvanced", async (req, res: any) => {
  const query = req.query.query as string;
  const verbose = req.query.verbose === "true";
  const minViews = req.query.minViews ? parseInt(req.query.minViews as string, 10) : undefined;
  const maxViews = req.query.maxViews ? parseInt(req.query.maxViews as string, 10) : undefined;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  let orderBy: "relevance" | "viewCount" | "rating" | "date";
  switch (req.query.orderBy) {
    case "relevance":
    case "viewCount":
    case "rating":
    case "date":
      orderBy = req.query.orderBy;
      break;
    default:
      orderBy = "relevance";
  }
  try {
    const Tuber = YouTubeDLX.Search.Video.Advance_Search({ query, orderBy, maxViews, minViews, verbose });
    Tuber.on("data", data => res.json(data));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});
server.get("/SearchChannel", async (req, res: any) => {
  const channelLink = req.query.channelLink as string;
  if (!channelLink) return res.status(400).json({ error: "Missing channelLink parameter." });
  try {
    const Tuber = YouTubeDLX.Search.Video.Channel_Data({ channelLink });
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
    const Tuber = YouTubeDLX.Search.Video.Related({ videoId });
    Tuber.on("data", data => res.json(data));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});
server.get("/SearchChannels", async (req, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const Tuber = YouTubeDLX.Search.Video.Channel({ query });
    Tuber.on("data", data => res.json(data));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});
/* ============================================================================ INFO Endpoints */
server.get("/ExtractVideo", async (req, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const Tuber = YouTubeDLX.Info.extract({ query });
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
    const Tuber = YouTubeDLX.Info.list_formats({ query });
    Tuber.on("data", data => res.json(data));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});
server.get("/LiveVideo", async (req, res: any) => {
  const videoLink = req.query.videoLink as string;
  if (!videoLink) return res.status(400).json({ error: "Missing videoLink parameter." });
  try {
    const Tuber = YouTubeDLX.Info.Live({ videoLink });
    Tuber.on("data", data => res.json(data));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});
server.get("/VideoComments", async (req, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing videoLink parameter." });
  try {
    const Tuber = YouTubeDLX.Info.Comments({ query });
    Tuber.on("data", data => res.json(data));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});
server.get("/VideoTranscript", async (req, res: any) => {
  const videoLink = req.query.videoLink as string;
  if (!videoLink) return res.status(400).json({ error: "Missing videoLink parameter." });
  try {
    const Tuber = YouTubeDLX.Info.Transcript({ videoLink });
    Tuber.on("data", data => res.json(data));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    return res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});
/* ============================================================================ ACCOUNT Endpoints */
server.get("/HomeFeed", async (req, res: any) => {
  const cookiesPath = req.query.cookiesPath as string;
  if (!cookiesPath) return res.status(400).json({ error: "Missing cookiesPath parameter." });
  try {
    const Tuber = YouTubeDLX.Account.HomeFeed({ cookiesPath });
    Tuber.on("data", data => res.json(data));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});
server.get("/SubscriptionFeed", async (req, res: any) => {
  const cookiesPath = req.query.cookiesPath as string;
  if (!cookiesPath) return res.status(400).json({ error: "Missing cookiesPath parameter." });
  try {
    const Tuber = YouTubeDLX.Account.SubscriptionsFeed({ cookiesPath });
    Tuber.on("data", data => res.json(data));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});
server.get("/UnseenNotifications", async (req, res: any) => {
  const cookiesPath = req.query.cookiesPath as string;
  if (!cookiesPath) return res.status(400).json({ error: "Missing cookiesPath parameter." });
  try {
    const Tuber = YouTubeDLX.Account.Unseen_Notifications({ cookiesPath });
    Tuber.on("data", data => res.json(data));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});
server.get("/WatchHistory", async (req, res: any) => {
  const cookiesPath = req.query.cookiesPath as string;
  if (!cookiesPath) return res.status(400).json({ error: "Missing cookiesPath parameter." });
  try {
    const Tuber = YouTubeDLX.Account.History({ cookiesPath });
    Tuber.on("data", data => res.json(data));
    Tuber.on("error", error => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});
