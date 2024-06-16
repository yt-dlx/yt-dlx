import http from "http";
import WebSocket from "ws";
import dotenv from "dotenv";
import routeAudioLowest from "./routes/Audio/AudioLowest";
import routeAudioHighest from "./routes/Audio/AudioHighest";
import routeVideoLowest from "./routes/Video/VideoLowest";
import routeVideoHighest from "./routes/Video/VideoHighest";
import routeAudioVideoLowest from "./routes/AudioVideo/AudioVideoLowest";
import routeAudioVideoHighest from "./routes/AudioVideo/AudioVideoHighest";

dotenv.config();
const server = http.createServer();
const wserver = new WebSocket.Server({ server });
wserver.on("connection", (ws: WebSocket, req) => {
  const ip = req.socket.remoteAddress;
  console.log(`@webSocket-connected: ${ip}`);
  ws.on("close", () => console.log(`@webSocket-disconnected: ${ip}`));
  ws.on("error", error => console.error(`@webSocket-error: ${error.message}`));
  ws.on("message", (message: string) => {
    routeAudioLowest(ws, message);
    routeAudioHighest(ws, message);
    routeVideoLowest(ws, message);
    routeVideoHighest(ws, message);
    routeAudioVideoLowest(ws, message);
    routeAudioVideoHighest(ws, message);
  });
});

const port = process.env.PORT || 8642;
server.listen(port, () => console.log(`@web-socket: listening on port ${port}`));
server.on("error", error => console.error("Server error:", error));

const powerdown = () => {
  console.log("Shutting down gracefully...");
  wserver.clients.forEach(client => client.close());
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
