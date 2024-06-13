console.clear();
import progbar from "../../base/progbar";
import AudioCustom from "../../routes/Audio/single/AudioCustom";

(async () => {
  var baseTime = new Date();
  const proc = AudioCustom({
    query: "21 savage - redrum",
    resolution: "medium",
    metadata: false,
    verbose: false,
    stream: false,
    useTor: false,
  });

  proc.on("progress", ({ percent, timemark }) => {
    progbar({ percent, timemark, baseTime });
  });
  proc.on("end", filename =>
    console.log("@end:", filename),
  );
  proc.on("error", error =>
    console.error("@error:", error),
  );
  proc.on("start", command =>
    console.log("@start:", command),
  );
  proc.on("metadata", metadata =>
    console.log("@metadata:", metadata),
  );
  proc.on("ready", ({ ffmpeg, filename }) =>
    console.log(ffmpeg, filename),
  );
})();
