// ====================================================================================
import ytdlx from "yt-dlx";
import colors from "colors";
import express from "express";
const server = express();
const PORT = process.env.PORT || 4040;
server.listen(PORT, () => console.log(colors.cyan(`🚀 YT-DLX Server is live at port ${PORT}`)));
// ====================================================================================
server.get("/Audio_Only_Custom_Data", async (req: any, res: any) => {
  const query = req.query.query as string;
  const resolution = ["high", "medium", "low", "ultralow"].includes(req.query.resolution) ? (req.query.resolution as "high" | "medium" | "low" | "ultralow") : "medium";
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  if (!resolution) return res.status(400).json({ error: "Missing resolution parameter." });
  try {
    const instance = ytdlx.AudioOnly.Custom({ useTor: true, metadata: true, verbose: true, query, resolution });
    instance.on("metadata", (metadata: any) => res.json(metadata));
    instance.on("start", (command: any) => console.log(colors.gray("start:"), command));
    instance.on("error", (error: any) => res.status(500).json({ error: error.message || error }));
  } catch (err: any) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err.message });
  }
});
// ====================================================================================
server.get("/Audio_Only_Highest_Data", async (req: any, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const instance = ytdlx.AudioOnly.Highest({ useTor: true, metadata: true, verbose: true, query });
    instance.on("metadata", (metadata: any) => res.json(metadata));
    instance.on("start", (command: any) => console.log(colors.gray("start:"), command));
    instance.on("error", (error: any) => res.status(500).json({ error: error.message || error }));
  } catch (err: any) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err.message });
  }
});
// ====================================================================================
server.get("/Audio_Only_Lowest_Data", async (req: any, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const instance = ytdlx.AudioOnly.Lowest({ useTor: true, metadata: true, verbose: true, query });
    instance.on("metadata", (metadata: any) => res.json(metadata));
    instance.on("start", (command: any) => console.log(colors.gray("start:"), command));
    instance.on("error", (error: any) => res.status(500).json({ error: error.message || error }));
  } catch (err: any) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err.message });
  }
});
// ====================================================================================
server.get("/Video_Only_Custom_Data", async (req: any, res: any) => {
  const query = req.query.query as string;
  const resolution = ["144p", "240p", "360p", "480p", "720p", "1080p", "1440p", "2160p", "3072p", "4320p", "6480p", "8640p", "12000p"].includes(req.query.resolution)
    ? (req.query.resolution as "144p" | "240p" | "360p" | "480p" | "720p" | "1080p" | "1440p" | "2160p" | "3072p" | "4320p" | "6480p" | "8640p" | "12000p")
    : "720p";
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  if (!resolution) return res.status(400).json({ error: "Missing resolution parameter." });
  try {
    const instance = ytdlx.VideoOnly.Custom({ useTor: true, metadata: true, verbose: true, query, resolution });
    instance.on("metadata", (metadata: any) => res.json(metadata));
    instance.on("start", (command: any) => console.log(colors.gray("start:"), command));
    instance.on("error", (error: any) => res.status(500).json({ error: error.message || error }));
  } catch (err: any) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err.message });
  }
});
// ====================================================================================
server.get("/Video_Only_Highest_Data", async (req: any, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const instance = ytdlx.VideoOnly.Highest({ useTor: true, metadata: true, verbose: true, query });
    instance.on("metadata", (metadata: any) => res.json(metadata));
    instance.on("start", (command: any) => console.log(colors.gray("start:"), command));
    instance.on("error", (error: any) => res.status(500).json({ error: error.message || error }));
  } catch (err: any) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err.message });
  }
});
// ====================================================================================
server.get("/Video_Only_Lowest_Data", async (req: any, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const instance = ytdlx.VideoOnly.Lowest({ useTor: true, metadata: true, verbose: true, query });
    instance.on("metadata", (metadata: any) => res.json(metadata));
    instance.on("start", (command: any) => console.log(colors.gray("start:"), command));
    instance.on("error", (error: any) => res.status(500).json({ error: error.message || error }));
  } catch (err: any) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err.message });
  }
});
// ====================================================================================
server.get("/Audio_Video_Highest_Data", async (req: any, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const instance = ytdlx.AudioVideo.Highest({ useTor: true, metadata: true, verbose: true, query });
    instance.on("metadata", (metadata: any) => res.json(metadata));
    instance.on("start", (command: any) => console.log(colors.gray("start:"), command));
    instance.on("error", (error: any) => res.status(500).json({ error: error.message || error }));
  } catch (err: any) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err.message });
  }
});
// ====================================================================================
server.get("/Audio_Video_Custom_Data", async (req: any, res: any) => {
  const query = req.query.query as string;
  const resolution = ["144p", "240p", "360p", "480p", "720p", "1080p", "1440p", "2160p", "3072p", "4320p", "6480p", "8640p", "12000p"].includes(req.query.resolution)
    ? (req.query.resolution as "144p" | "240p" | "360p" | "480p" | "720p" | "1080p" | "1440p" | "2160p" | "3072p" | "4320p" | "6480p" | "8640p" | "12000p")
    : "720p";
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  if (!resolution) return res.status(400).json({ error: "Missing resolution parameter." });
  try {
    const instance = ytdlx.AudioVideo.Custom({ useTor: true, metadata: true, verbose: true, query, resolution });
    instance.on("metadata", (metadata: any) => res.json(metadata));
    instance.on("start", (command: any) => console.log(colors.gray("start:"), command));
    instance.on("error", (error: any) => res.status(500).json({ error: error.message || error }));
  } catch (err: any) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err.message });
  }
});
// ====================================================================================
server.get("/Audio_Video_Lowest_Data", async (req: any, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const instance = ytdlx.AudioVideo.Lowest({ useTor: true, metadata: true, verbose: true, query });
    instance.on("metadata", (metadata: any) => res.json(metadata));
    instance.on("start", (command: any) => console.log(colors.gray("start:"), command));
    instance.on("error", (error: any) => res.status(500).json({ error: error.message || error }));
  } catch (err: any) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err.message });
  }
});
// ====================================================================================
server.get("/Audio_Video_Lowest_Data", async (req: any, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const instance = ytdlx.AudioVideo.Lowest({ useTor: true, metadata: true, verbose: true, query });
    instance.on("metadata", (metadata: any) => res.json(metadata));
    instance.on("start", (command: any) => console.log(colors.gray("start:"), command));
    instance.on("error", (error: any) => res.status(500).json({ error: error.message || error }));
  } catch (err: any) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err.message });
  }
});
// ====================================================================================
server.get("/Search_Multiple_Videos", async (req: any, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const instance = ytdlx.ytSearch.Video.Multiple({ query });
    instance.on("data", (data: any) => res.json(data));
    instance.on("error", (error: any) => res.status(500).json({ error: error.message || error }));
  } catch (err: any) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err.message });
  }
});
// ====================================================================================
server.get("/Search_Single_Video", async (req: any, res: any) => {
  const videoLink = req.query.videoLink as string;
  if (!videoLink) return res.status(400).json({ error: "Missing videoLink parameter." });
  try {
    const instance = ytdlx.ytSearch.Video.Single({ videoLink });
    instance.on("data", (data: any) => res.json(data));
    instance.on("error", (error: any) => res.status(500).json({ error: error.message || error }));
  } catch (err: any) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err.message });
  }
});
// ====================================================================================
server.get("/Search_Related_Videos", async (req: any, res: any) => {
  const videoId = req.query.videoId as string;
  if (!videoId) return res.status(400).json({ error: "Missing videoId parameter." });
  try {
    const instance = ytdlx.ytSearch.Video.Related({ videoId });
    instance.on("data", (data: any) => res.json(data));
    instance.on("error", (error: any) => res.status(500).json({ error: error.message || error }));
  } catch (err: any) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err.message });
  }
});
// ====================================================================================
server.get("/Search_Multiple_Videos", async (req: any, res: any) => {
  const playlistLink = req.query.playlistLink as string;
  if (!playlistLink) return res.status(400).json({ error: "Missing playlistLink parameter." });
  try {
    const instance = ytdlx.ytSearch.Playlist.Multiple({ playlistLink });
    instance.on("data", (data: any) => res.json(data));
    instance.on("error", (error: any) => res.status(500).json({ error: error.message || error }));
  } catch (err: any) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err.message });
  }
});
// ====================================================================================
server.get("/Search_Single_Video", async (req: any, res: any) => {
  const playlistLink = req.query.playlistLink as string;
  if (!playlistLink) return res.status(400).json({ error: "Missing playlistLink parameter." });
  try {
    const instance = ytdlx.ytSearch.Playlist.Single({ playlistLink });
    instance.on("data", (data: any) => res.json(data));
    instance.on("error", (error: any) => res.status(500).json({ error: error.message || error }));
  } catch (err: any) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err.message });
  }
});
// ====================================================================================
server.get("/Extract_Video_Data", async (req: any, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const instance = ytdlx.info.extract({ query });
    instance.on("data", (data: any) => res.json(data));
    instance.on("error", (error: any) => res.status(500).json({ error: error.message || error }));
  } catch (err: any) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err.message });
  }
});
// ====================================================================================
server.get("/List_Video_Formats", async (req: any, res: any) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter." });
  try {
    const instance = ytdlx.info.list_formats({ query });
    instance.on("data", (data: any) => res.json(data));
    instance.on("error", (error: any) => res.status(500).json({ error: error.message || error }));
  } catch (err: any) {
    console.error(colors.red("❌ Unexpected error:"), err);
    res.status(500).json({ error: err.message });
  }
});
// ====================================================================================
