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

import * as fs from "fs";
import colors from "colors";
import * as path from "path";
import { spawn } from "child_process";
import { pathToFileURL } from "url";

const directoryPath = path.join(__dirname, "public");
function isPkg() {
  return process.hasOwnProperty("pkg");
}

function resolvePath(filePath: string) {
  return isPkg() ? pathToFileURL(path.resolve(filePath)).pathname.slice(1) : filePath;
}

fs.readdir(directoryPath, (error, files) => {
  if (error) {
    console.error(colors.red("@error:"), error);
    return;
  }
  console.clear();
  let fileName: string;
  switch (process.platform) {
    case "win32":
      fileName = "cprobe.exe";
      console.log(colors.green("@found:"), fileName);
      break;
    case "darwin":
      fileName = "cprobe_macos";
      console.log(colors.green("@found:"), fileName);
      break;
    case "linux":
      fileName = "cprobe_linux";
      console.log(colors.green("@found:"), fileName);
      break;
    default:
      console.error(colors.red("@error:"), "Unsupported platform");
      return;
  }
  if (files.includes(fileName)) {
    const filePath = resolvePath(path.join(directoryPath, fileName));
    const child = spawn(filePath, ["--version"]);
    child.stdout.on("data", data => console.log(colors.blue("@version:"), data.toString()));
    child.stderr.on("data", data => console.error(colors.red("@error:"), data.toString()));
    child.on("error", err => console.error(colors.red("@error:"), err));
  } else console.error(colors.red("@error:"), `${fileName} not found`);
});
