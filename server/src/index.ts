import http from "http";
import WebSocket from "ws";
import Agent from "./base/Agent";

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws: WebSocket) => {
  console.log("WebSocket client connected");

  ws.on("message", async (message: string) => {
    try {
      const request = JSON.parse(message);
      if (request.action === "meta") {
        const { query, useTor, verbose } = request.payload;
        const proc = await Agent({ query, useTor, verbose });
        ws.send(JSON.stringify({ success: true, data: proc }));
      } else ws.send(JSON.stringify({ success: false, error: "Invalid action" }));
    } catch (error: any) {
      ws.send(JSON.stringify({ success: false, error: error.message }));
    }
  });

  ws.on("close", () => console.log("WebSocket client disconnected"));
  ws.on("error", error => console.error("WebSocket error:", error));
});

const port = process.env.PORT || 8642;
server.listen(port, () => console.log(`@web-socket: listening on port ${port}`));
server.on("error", error => console.error("Server error:", error));
