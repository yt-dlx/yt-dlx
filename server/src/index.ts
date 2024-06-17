import http from "http";
import WebSocket from "ws";
import dotenv from "dotenv";
import routeAudioLowest from "./routes/audio/AudioLowest";
import routeAudioHighest from "./routes/audio/AudioHighest";
import routeAudioCustom from "./routes/audio/AudioCustom";
import routeVideoLowest from "./routes/video/VideoLowest";
import routeVideoHighest from "./routes/video/VideoHighest";
import routeVideoCustom from "./routes/video/VideoCustom";
import routeAudioVideoLowest from "./routes/audiovideo/AudioVideoLowest";
import routeAudioVideoHighest from "./routes/audiovideo/AudioVideoHighest";
import routeAudioVideoCustom from "./routes/audiovideo/AudioVideoCustom";
import routeExtract from "./routes/command/extract";
import routeListFormats from "./routes/command/list_formats";
import routePlaylistData from "./routes/command/playlist_data";
import routeSearchPlaylists from "./routes/command/search_playlists";
import routeSearchVideos from "./routes/command/search_videos";
import routeVideoData from "./routes/command/video_data";

dotenv.config();
const server = http.createServer();
const wss = new WebSocket.Server({ server });
wss.on("connection", (ws: WebSocket, req) => {
  const ip = req.socket.remoteAddress;
  console.log(`WebSocket client connected from ip: ${ip}`);
  ws.on("message", (message: string) => {
    const data = JSON.parse(message);
    const { event, payload } = data;
    if (event === "AudioLowest") routeAudioLowest(ws, payload);
    else if (event === "AudioCustom") routeAudioCustom(ws, payload);
    else if (event === "AudioHighest") routeAudioHighest(ws, payload);
    else if (event === "VideoLowest") routeVideoLowest(ws, payload);
    else if (event === "VideoCustom") routeVideoCustom(ws, payload);
    else if (event === "VideoHighest") routeVideoHighest(ws, payload);
    else if (event === "AudioVideoLowest") routeAudioVideoLowest(ws, payload);
    else if (event === "AudioVideoCustom") routeAudioVideoCustom(ws, payload);
    else if (event === "AudioVideoHighest") routeAudioVideoHighest(ws, payload);
    else if (event === "Extract") routeExtract(ws, payload);
    else if (event === "VideoData") routeVideoData(ws, payload);
    else if (event === "ListFormats") routeListFormats(ws, payload);
    else if (event === "PlaylistData") routePlaylistData(ws, payload);
    else if (event === "SearchVideos") routeSearchVideos(ws, payload);
    else if (event === "SearchPlaylists") routeSearchPlaylists(ws, payload);
    else console.log(event, JSON.stringify(payload));
  });
  ws.on("error", error => console.error(`WebSocket error: ${error.message}`));
  ws.on("close", () => console.log(`WebSocket client disconnected from ${ip}`));
});
const port = process.env.PORT || 8642;
server.listen(port, () => console.log(`@web-socket: listening on port ${port}`));
server.on("error", error => console.error("Server error:", error));
const powerdown = () => {
  console.log("Shutting down gracefully...");
  wss.clients.forEach(client => client.close());
  server.close(() => {
    console.log("Closed out remaining connections.");
    process.exit(0);
  });
  setTimeout(() => {
    console.error("Forcing shutdown...");
    process.exit(1);
  }, 10000);
};
process.on("SIGTERM", powerdown);
process.on("SIGINT", powerdown);
