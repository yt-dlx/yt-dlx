import WebSocket from "ws";

const ws = new WebSocket("ws://localhost:8642")
  .on("close", () => console.log("Disconnected from WebSocket server"))
  .on("error", error => console.error("WebSocket error:", error))
  .on("open", async () => {
    const events = [
      "VideoLowest",
      "VideoHighest",
      "AudioLowest",
      "AudioHighest",
      "AudioVideoLowest",
      "AudioVideoHighest",
    ];
    for (const name of events) {
      const payLoad = JSON.stringify({
        event: name,
        payload: {
          verbose: true,
          stream: true,
          useTor: false,
          metadata: false,
          query: "careless whisper",
        },
      });
      ws.send(payLoad);
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  })
  .on("message", (response: any) => {
    const { event, data } = JSON.parse(response);
    if (event === "end") console.log("@end", data);
    if (event === "error") console.log("@error:", data);
    if (event === "start") console.log("@start:", data);
    if (event === "progress") console.log("@progress:", data);
    if (event === "metadata") console.log("@metadata:", data);
  });
