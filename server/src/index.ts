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
  .listen(port, () => {
    console.clear();
    console.log(`@web-socket: listening on port ${port}`);
  })
  .on("error", error => console.error("@server-error:", error));

const wserver = new WebSocket.Server({ server });

wserver.on("connection", (ws, req) => {
  ws.on("message", (message: WebSocket.Data) => {
    let parsedMessage: any;
    try {
      const messageString = message.toString();
      parsedMessage = JSON.parse(messageString);
    } catch (error) {
      console.error("@message-error: Invalid JSON", error);
      return;
    }
    const { event } = parsedMessage;
    switch (event) {
      case "AudioLowest":
        routeAudioLowest(ws, parsedMessage);
        break;
      case "AudioHighest":
        routeAudioHighest(ws, parsedMessage);
        break;
      case "AudioCustom":
        routeAudioCustom(ws, parsedMessage);
        break;
      case "VideoLowest":
        routeVideoLowest(ws, parsedMessage);
        break;
      case "VideoHighest":
        routeVideoHighest(ws, parsedMessage);
        break;
      case "VideoCustom":
        routeVideoCustom(ws, parsedMessage);
        break;
      case "AudioVideoLowest":
        routeAudioVideoLowest(ws, parsedMessage);
        break;
      case "AudioVideoHighest":
        routeAudioVideoHighest(ws, parsedMessage);
        break;
      case "AudioVideoCustom":
        routeAudioVideoCustom(ws, parsedMessage);
        break;
      case "Extract":
        routeExtract(ws, parsedMessage);
        break;
      case "ListFormats":
        routeListFormats(ws, parsedMessage);
        break;
      case "PlaylistData":
        routePlaylistData(ws, parsedMessage);
        break;
      case "SearchPlaylists":
        routeSearchPlaylists(ws, parsedMessage);
        break;
      case "SearchVideos":
        routeSearchVideos(ws, parsedMessage);
        break;
      case "VideoData":
        routeVideoData(ws, parsedMessage);
        break;
      default:
        console.warn("@message-warning: Unhandled event type", event);
        break;
    }
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
