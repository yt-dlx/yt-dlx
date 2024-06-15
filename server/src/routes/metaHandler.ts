import WebSocket from "ws";
import Agent from "../base/Agent";

const metaHandler = (ws: WebSocket, message: string) => {
  try {
    const request = JSON.parse(message);
    if (request.action === "meta") {
      const { query, useTor, verbose } = request.payload;
      Agent({ query, useTor, verbose })
        .then(proc => ws.send(JSON.stringify({ success: true, data: proc })))
        .catch(error => {
          ws.send(JSON.stringify({ success: false, error: error.message }));
        });
    } else ws.send(JSON.stringify({ success: false, error: "Invalid action" }));
  } catch (error: any) {
    if (error instanceof Error) ws.send(JSON.stringify({ success: false, error: error.message }));
    else ws.send(JSON.stringify({ success: false, error: "Rate limit exceeded" }));
  }
};
export default metaHandler;
