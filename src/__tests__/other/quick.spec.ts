console.clear();
import * as path from "path";
import progbar from "../../base/progbar";
import VideoLowest from "../../routes/Video/single/VideoLowest";

(async () => {
    var baseTime = new Date();
    const proc = VideoLowest({
        output: path.join(__dirname, "downloads"),
        query: "21 savage - redrum",
        metadata: false,
        verbose: false,
        stream: false,
        useTor: false,
    });
    proc.on("progress", ({ percent, timemark }) => {
        progbar({ percent, timemark, baseTime });
    });
    proc.on("end", filename => console.log("@end:", filename));
    proc.on("error", error => console.error("@error:", error));
    proc.on("start", command => console.log("@start:", command));
    proc.on("metadata", metadata => console.log("@metadata:", metadata));
    proc.on("ready", ({ ffmpeg, filename }) => console.log(ffmpeg, filename));
})();
