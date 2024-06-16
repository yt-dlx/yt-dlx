import WebSocket from "ws";
const ws = new WebSocket("ws://localhost:8642");

ws.on("open", () => {
  console.log("Connected to WebSocket server");
  const message = JSON.stringify({
    payload: {
      useTor: false,
      verbose: false,
      query: "careless whisper",
    },
  });
  ws.send(message);
});

ws.on("message", data => {
  console.log("Received:", data);
  const response = JSON.parse(data);
  switch (response.event) {
    case "metadata":
      console.log("Metadata:", response.data);
      break;
    case "start":
      console.log("Start:", response.data);
      break;
    case "progress":
      console.log("Progress:", response.data);
      break;
    case "end":
      console.log("End:", response.data);
      break;
    case "error":
      console.error("Error:", response.data);
      break;
    case "info":
      console.log("Info:", response.data);
      break;
    case "warning":
      console.warn("Warning:", response.data);
      break;
    default:
      console.log("Unknown event:", response);
  }
  ws.close();
});

ws.on("close", () => console.log("Disconnected from WebSocket server"));
ws.on("error", error => console.error("WebSocket error:", error));
