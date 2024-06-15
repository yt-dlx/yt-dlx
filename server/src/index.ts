// import http from "http";
// import WebSocket from "ws";
// import Agent from "./base/Agent";
// const server = http.createServer();
// const wss = new WebSocket.Server({ server });
// wss.on("connection", (ws: WebSocket) => {
// console.log("WebSocket client connected");
// ws.on("message", async (message: string) => {
// try {
// const request = JSON.parse(message);
// if (request.action === "meta") {
// const { query, useTor, verbose } = request.payload;
// const proc = await Agent({ query, useTor, verbose });
// ws.send(JSON.stringify({ success: true, data: proc }));
// } else ws.send(JSON.stringify({ success: false, error: "Invalid action" }));
// } catch (error: any) {
// ws.send(JSON.stringify({ success: false, error: error.message }));
// }
// });
// ws.on("close", () => console.log("WebSocket client disconnected"));
// ws.on("error", error => console.error("WebSocket error:", error));
// });
// const port = process.env.PORT || 8642;
// server.listen(port, () => console.log(`@web-socket: listening on port ${port}`));
// server.on("error", error => console.error("Server error:", error));
// ========================================================================
import http from "http";
import WebSocket from "ws";
import dotenv from "dotenv";
import winston from "winston";
import Agent from "./base/Agent";
// ===========================================================================
dotenv.config();
const server = http.createServer();
const wss = new WebSocket.Server({ server });
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "server.log" }),
  ],
});
// ===========================================================================
wss.on("connection", (ws: WebSocket, req) => {
  const ip = req.socket.remoteAddress;
  logger.info(`WebSocket client connected from ip: ${ip}`);
  ws.on("message", async (message: string) => {
    try {
      const request = JSON.parse(message);
      if (request.action === "meta") {
        const { query, useTor, verbose } = request.payload;
        const proc = await Agent({ query, useTor, verbose });
        ws.send(JSON.stringify({ success: true, data: proc }));
      } else ws.send(JSON.stringify({ success: false, error: "Invalid action" }));
    } catch (error: any) {
      if (error instanceof Error) {
        ws.send(JSON.stringify({ success: false, error: error.message }));
        logger.error(`Error processing message: ${error.message}`);
      } else {
        ws.send(JSON.stringify({ success: false, error: "Rate limit exceeded" }));
        logger.warn(`Rate limit exceeded for IP: ${ip}`);
      }
    }
  });
  ws.on("close", () => logger.info(`WebSocket client disconnected from ${ip}`));
  ws.on("error", error => logger.error(`WebSocket error: ${error.message}`));
});
// ===========================================================================
const port = process.env.PORT || 8642;
server.listen(port, () => logger.info(`@web-socket: listening on port ${port}`));
server.on("error", error => logger.error("Server error:", error));
const powerdown = () => {
  logger.info("Shutting down gracefully...");
  wss.clients.forEach(client => client.close());
  server.close(() => {
    logger.info("Closed out remaining connections.");
    process.exit(0);
  });
  setTimeout(() => {
    logger.error("Forcing shutdown...");
    process.exit(1);
  }, 10000);
};
process.on("SIGTERM", powerdown);
process.on("SIGINT", powerdown);
// ===========================================================================
