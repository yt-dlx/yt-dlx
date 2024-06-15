import WebSocket from "ws";
import ytdlx from "yt-dlx";

const metaHandler = (ws: WebSocket, message: string) => {
  const req = JSON.parse(message);
  ytdlx.AudioOnly.Single.Highest({
    stream: false,
    metadata: true,
    query: req.payload.query,
    useTor: req.payload.useTor,
    verbose: req.payload.verbose,
  })
    .on("error", error => {
      console.log("@error:", error);
      ws.send(JSON.stringify({ event: "error", data: error }));
    })
    .on("end", filename => {
      console.log("@end:", filename);
      ws.send(JSON.stringify({ event: "end", data: filename }));
    })
    .on("start", command => {
      console.log("@start:", command);
      ws.send(JSON.stringify({ event: "start", data: command }));
    })
    .on("progress", progress => {
      console.log("@progress:", progress);
      ws.send(JSON.stringify({ event: "progress", data: progress }));
    })
    .on("metadata", metadata => {
      console.log("@metadata:", metadata);
      ws.send(JSON.stringify({ event: "metadata", data: metadata }));
    });
};
export default metaHandler;
