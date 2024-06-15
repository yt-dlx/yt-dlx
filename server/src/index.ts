import http from "http";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import meta from "./routes/meta";
import compression from "compression";
import express, { Application } from "express";
import errorHandler from "./middlewares/errorHandler";
import notFoundHandler from "./middlewares/notFoundHandler";
const app: Application = express();
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", meta);
app.use(notFoundHandler);
app.use(errorHandler);
export default app;
const port = 8642 || process.env.PORT;
const server: http.Server = http.createServer(app);
server.listen(port, () => console.log("@server: listening on port", port));

// import http from "http";
// import WebSocket from "ws";
// import Agent from "./base/Agent";

// const server = http.createServer();
// const wss = new WebSocket.Server({ server });

// wss.on("connection", (ws: WebSocket) => {
// ws.on("message", async (message: string) => {
// try {
// const request = JSON.parse(message);
// if (request.action === "meta") {
// const { query, useTor, verbose } = request.payload;
// const proc = await Agent({ query, useTor, verbose });
// ws.send(JSON.stringify({ success: true, data: proc }));
// } else {
// ws.send(JSON.stringify({ success: false, error: "Invalid action" }));
// }
// } catch (error: any) {
// ws.send(JSON.stringify({ success: false, error: error.message }));
// }
// });

// ws.on("close", () => console.log("WebSocket client disconnected"));

// // Handle WebSocket errors
// ws.on("error", error => {
// console.error("WebSocket error:", error);
// });
// });

// const port = 8642 || process.env.PORT;
// server.listen(port, () => console.log(`@web-socket: listening on port ${port}`));

// // Handle server errors
// server.on("error", error => {
// console.error("Server error:", error);
// });
