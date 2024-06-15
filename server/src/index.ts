import http from "http";
import WebSocket from "ws";
import dotenv from "dotenv";
import metaHandler from "./routes/metaHandler";

dotenv.config();
const server = http.createServer();
const wss = new WebSocket.Server({ server });
wss.on("connection", (ws: WebSocket, req) => {
  const ip = req.socket.remoteAddress;
  console.log(`WebSocket client connected from ip: ${ip}`);
  ws.on("message", async (message: string) => metaHandler(ws, message));
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
