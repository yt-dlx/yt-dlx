import WebSocket from "ws";
import Agent from "../base/Agent";

const metaHandler = async (ws: WebSocket, message: string) => {
  const req = JSON.parse(message);
  const metadata = await Agent({
    query: req.payload.query,
    useTor: req.payload.useTor,
    verbose: req.payload.verbose,
  });
  ws.send(JSON.stringify({ event: "metadata", data: metadata }));
};
export default metaHandler;
