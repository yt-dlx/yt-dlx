// import http from "http";
// import cors from "cors";
// import morgan from "morgan";
// import helmet from "helmet";
// import meta from "./routes/meta";
// import compression from "compression";
// import express, { Application } from "express";
// import errorHandler from "./middlewares/errorHandler";
// import notFoundHandler from "./middlewares/notFoundHandler";

// const app: Application = express();
// app.use(cors());
// app.use(helmet());
// app.use(morgan("dev"));
// app.use(compression());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use("/api", meta);
// app.use(notFoundHandler);
// app.use(errorHandler);

// export default app;

// const port = 8642 || process.env.PORT;
// const server: http.Server = http.createServer(app);
// server.listen(port, () => console.log("@server: listening on port", port));

import http from "http";
import cors from "cors";
import WebSocket from "ws";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import express, { Application } from "express";
import errorHandler from "./middlewares/errorHandler";
import notFoundHandler from "./middlewares/notFoundHandler";
import { Server as WebSocketServer } from "ws";
import meta from "./routes/meta";

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

const port = 8642 || process.env.PORT;
const server: http.Server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", (ws: WebSocket) => {
  console.log("WebSocket client connected");
  ws.on("message", (message: string) => {
    console.log(`Received message: ${message}`);
    ws.send(`Echo: ${message}`);
  });
  ws.on("close", () => {
    console.log("WebSocket client disconnected");
  });
});

server.listen(port, () => {
  console.log(`@server: listening on port ${port}`);
});
