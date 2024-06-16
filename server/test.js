const WebSocket = require("ws");
const url = "ws://localhost:8642";
const ws = new WebSocket(url);

ws.on("open", () => {
  console.log("Connected to WebSocket server");
  const message = JSON.stringify({
    payload: {
      query: "test query",
      useTor: false,
      verbose: false,
    },
  });
  ws.send(message);
});

ws.on("message", data => {
  console.log("Received:", data);
  const response = JSON.parse(data);
  if (response.event === "metadata") console.log("Metadata:", response.data);
  ws.close();
});

ws.on("close", () => console.log("Disconnected from WebSocket server"));
ws.on("error", error => console.error("WebSocket error:", error));
