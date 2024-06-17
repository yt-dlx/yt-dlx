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
const port = process.env.PORT || 8642;
const server = http
  .createServer()
  .listen(port, () => console.log(`@web-socket: listening on port ${port}`))
  .on("error", error => console.error("@server-error:", error));
const wserver = new WebSocket.Server({ server });

wserver.on("connection", (ws: WebSocket, req) => {
  ws.on("message", (message: string) => {
    routeAudioLowest(ws, message);
    routeAudioHighest(ws, message);
    routeAudioCustom(ws, message);
    routeVideoLowest(ws, message);
    routeVideoHighest(ws, message);
    routeVideoCustom(ws, message);
    routeAudioVideoLowest(ws, message);
    routeAudioVideoHighest(ws, message);
    routeAudioVideoCustom(ws, message);
    routeExtract(ws, message);
    routeListFormats(ws, message);
    routePlaylistData(ws, message);
    routeSearchPlaylists(ws, message);
    routeSearchVideos(ws, message);
    routeVideoData(ws, message);
  });
  ws.on("close", () => console.log("@webSocket-disconnected:", req.socket.remoteAddress));
  ws.on("error", error => console.error("@webSocket-error:", error.message));
});

const powerdown = () => {
  wserver.clients.forEach(client => client.close());
  server.close(() => process.exit(0));
  setTimeout(() => {
    process.exit(1);
  }, 10000);
};

process.on("SIGTERM", powerdown);
process.on("SIGINT", powerdown);
