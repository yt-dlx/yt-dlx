// import http from "http";
// import WebSocket from "ws";
// import dotenv from "dotenv";
// import metaHandler from "./routes/metaHandler";

// dotenv.config();
// const server = http.createServer();
// const wss = new WebSocket.Server({ server });
// wss.on("connection", (ws: WebSocket, req) => {
// const ip = req.socket.remoteAddress;
// console.log(`WebSocket client connected from ip: ${ip}`);
// ws.on("message", async (message: string) => await metaHandler(ws, message));
// ws.on("error", error => console.error(`WebSocket error: ${error.message}`));
// ws.on("close", () => console.log(`WebSocket client disconnected from ${ip}`));
// });

// const port = process.env.PORT || 8642;
// server.listen(port, () => console.log(`@web-socket: listening on port ${port}`));
// server.on("error", error => console.error("Server error:", error));
// const powerdown = () => {
// console.log("Shutting down gracefully...");
// wss.clients.forEach(client => client.close());
// server.close(() => {
// console.log("Closed out remaining connections.");
// process.exit(0);
// });
// setTimeout(() => {
// console.error("Forcing shutdown...");
// process.exit(1);
// }, 10000);
// };
// process.on("SIGTERM", powerdown);
// process.on("SIGINT", powerdown);

import * as path from "path";
import * as fsx from "fs-extra";
interface SearchResult {
  fileName: string;
  filePath: string | null;
}
async function Locator(dir: string, fileNames: string[]): Promise<SearchResult[]> {
  const results: SearchResult[] = fileNames.map(fileName => ({ fileName, filePath: null }));
  const files = await fsx.readdir(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = await fsx.lstat(fullPath);
    if (stat.isDirectory()) {
      (await Locator(fullPath, fileNames)).forEach(result => {
        const existingResult = results.find(r => r.fileName === result.fileName);
        if (existingResult && result.filePath !== null) existingResult.filePath = result.filePath;
      });
    } else {
      results.forEach(result => {
        if (file === result.fileName && !result.filePath) result.filePath = fullPath;
      });
    }
  }
  return results;
}

(async () => {
  const results = await Locator(process.cwd(), ["ffmpeg.exe", "ffprobe.exe", "cprobe.exe"]);
  results.forEach(result => {
    switch (result.filePath !== null) {
      case true:
        if (result.fileName.startsWith("cprobe")) console.log("@cprobe:", result.filePath);
        if (result.fileName.startsWith("ffmpeg")) console.log("@ffmpeg:", result.filePath);
        if (result.fileName.startsWith("ffprobe")) console.log("@ffprobe:", result.filePath);
        break;
      default:
        break;
    }
  });
})();
