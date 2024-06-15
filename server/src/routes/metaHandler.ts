import path from "path";
import WebSocket from "ws";
import ytdlx from "yt-dlx";

const metaHandler = (ws: WebSocket, message: string) => {
  try {
    const req = JSON.parse(message);
    if (req.action === "meta") {
      ytdlx.AudioOnly.Single.Highest({
        stream: false,
        metadata: true,
        query: req.payload.query,
        useTor: req.payload.useTor,
        verbose: req.payload.verbose,
        output: path.join(__dirname, req.payload.output),
      })
        .on("error", error => ws.send(error))
        .on("end", filename => ws.send(filename))
        .on("start", command => ws.send(command))
        .on("progress", progress => ws.send(progress))
        .on("metadata", metadata => ws.send(metadata))
        .on("ready", ({ ffmpeg, filename }) => {
          console.log(ffmpeg, filename);
        });
    } else ws.send(JSON.stringify({ success: false, error: "Invalid action" }));
  } catch (error: any) {
    if (error instanceof Error) ws.send(JSON.stringify({ success: false, error: error.message }));
    else ws.send(JSON.stringify({ success: false, error: "unknwon error occured" }));
  }
};
export default metaHandler;
