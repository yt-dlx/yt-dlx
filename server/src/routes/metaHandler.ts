import path from "path";
import WebSocket from "ws";
import ytdlx from "yt-dlx";
import retry from "async-retry";
import { promisify } from "util";
import { exec } from "child_process";

const metaHandler = async (ws: WebSocket, message: string) => {
  try {
    const req = JSON.parse(message);
    if (req.action === "meta") {
      var config = {
        factor: 2,
        retries: 3,
        minTimeout: 1000,
        maxTimeout: 3000,
      };
      var pLoc = "";
      var metaCore = await retry(async () => {
        pLoc += `${cprobe} --dump-single-json "${req.payload.query}"`;
        pLoc += ` --no-check-certificate --prefer-insecure --no-call-home --skip-download --no-warnings --geo-bypass`;
        pLoc += ` --user-agent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"`;
        return await promisify(exec)(pLoc);
      }, config);
      ws.send(JSON.stringify({ event: "metadata", data: JSON.parse(metaCore.stdout.toString()) }));
      // ytdlx.AudioOnly.Single.Highest({
      // stream: false,
      // metadata: true,
      // query: req.payload.query,
      // useTor: req.payload.useTor,
      // verbose: req.payload.verbose,
      // })
      // .on("error", error => {
      // console.log("@error:", error);
      // ws.send(JSON.stringify({ event: "error", data: error }));
      // })
      // .on("end", filename => {
      // console.log("@end:", filename);
      // ws.send(JSON.stringify({ event: "end", data: filename }));
      // })
      // .on("start", command => {
      // console.log("@start:", command);
      // ws.send(JSON.stringify({ event: "start", data: command }));
      // })
      // .on("progress", progress => {
      // console.log("@progress:", progress);
      // ws.send(JSON.stringify({ event: "progress", data: progress }));
      // })
      // .on("metadata", metadata => {
      // console.log("@metadata:", metadata);
      // ws.send(JSON.stringify({ event: "metadata", data: metadata }));
      // });
    } else ws.send(JSON.stringify({ success: false, error: "Invalid action" }));
  } catch (error: any) {
    if (error instanceof Error) ws.send(JSON.stringify({ success: false, error: error.message }));
    else ws.send(JSON.stringify({ success: false, error: "unknown error occurred" }));
  }
};

export default metaHandler;
