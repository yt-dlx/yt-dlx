console.clear();
import path from "path";
import progbar from "../../base/progbar";
import VideoLowest from "../../routes/Video/single/VideoLowest";

(async () => {
    var baseTime = new Date();
    const outputFolder = path.resolve(__dirname, "./downloads");
    const proc = VideoLowest({
        query: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        output: outputFolder,
        filter: "grayscale",
        metadata: false,
        stream: false,
        verbose: true,
        useTor: false,
    });
    proc.on("progress", ({ percent, timemark }) => {
        progbar({ percent, timemark, baseTime });
    });
    proc.on("end", filename => {
        console.log("@end:", filename);
    });
    proc.on("error", error => {
        console.error("@error:", error);
    });
    proc.on("start", command => {
        console.log("@start:", command);
    });
    proc.on("metadata", metadata => {
        console.log("@metadata:", metadata);
    });
    proc.on("ready", ({ ffmpeg, filename }) => {
        console.log(ffmpeg, filename);
    });
})();
