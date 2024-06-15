console.clear();
var baseTime = new Date();
import * as path from "path";
import progbar from "../../base/progbar";
import AudioLowest from "../../routes/Audio/single/AudioLowest";
import AudioHighest from "../../routes/Audio/single/AudioHighest";
import VideoLowest from "../../routes/Video/single/VideoLowest";
import VideoHighest from "../../routes/Video/single/VideoHighest";
import AudioVideoLowest from "../../routes/AudioVideo/single/AudioVideoLowest";
import AudioVideoHighest from "../../routes/AudioVideo/single/AudioVideoHighest";

var proc = AudioLowest({
  output: path.join(__dirname, "downloads"),
  query: "21 savage - redrum",
  metadata: false,
  verbose: false,
  stream: false,
  useTor: false,
})
  .on("progress", ({ percent, timemark }) => {
    progbar({ percent, timemark, baseTime });
  })
  .on("end", filename => console.log("@end:", filename))
  .on("error", error => console.error("@error:", error))
  .on("start", command => console.log("@start:", command))
  .on("metadata", metadata => console.log("@metadata:", metadata))
  .on("ready", ({ ffmpeg, filename }) => console.log(ffmpeg, filename));
// =================================[  ]=================================
var proc = AudioHighest({
  output: path.join(__dirname, "downloads"),
  query: "21 savage - redrum",
  metadata: false,
  verbose: false,
  stream: false,
  useTor: false,
})
  .on("progress", ({ percent, timemark }) => {
    progbar({ percent, timemark, baseTime });
  })
  .on("end", filename => console.log("@end:", filename))
  .on("error", error => console.error("@error:", error))
  .on("start", command => console.log("@start:", command))
  .on("metadata", metadata => console.log("@metadata:", metadata))
  .on("ready", ({ ffmpeg, filename }) => console.log(ffmpeg, filename));
// =================================[  ]=================================
var proc = VideoLowest({
  output: path.join(__dirname, "downloads"),
  query: "21 savage - redrum",
  metadata: false,
  verbose: false,
  stream: false,
  useTor: false,
})
  .on("progress", ({ percent, timemark }) => {
    progbar({ percent, timemark, baseTime });
  })
  .on("end", filename => console.log("@end:", filename))
  .on("error", error => console.error("@error:", error))
  .on("start", command => console.log("@start:", command))
  .on("metadata", metadata => console.log("@metadata:", metadata))
  .on("ready", ({ ffmpeg, filename }) => console.log(ffmpeg, filename));
// =================================[  ]=================================
var proc = VideoHighest({
  output: path.join(__dirname, "downloads"),
  query: "21 savage - redrum",
  metadata: false,
  verbose: false,
  stream: false,
  useTor: false,
})
  .on("progress", ({ percent, timemark }) => {
    progbar({ percent, timemark, baseTime });
  })
  .on("end", filename => console.log("@end:", filename))
  .on("error", error => console.error("@error:", error))
  .on("start", command => console.log("@start:", command))
  .on("metadata", metadata => console.log("@metadata:", metadata))
  .on("ready", ({ ffmpeg, filename }) => console.log(ffmpeg, filename));
// =================================[  ]=================================
var proc = AudioVideoLowest({
  output: path.join(__dirname, "downloads"),
  query: "21 savage - redrum",
  metadata: false,
  verbose: false,
  stream: false,
  useTor: false,
})
  .on("progress", ({ percent, timemark }) => {
    progbar({ percent, timemark, baseTime });
  })
  .on("end", filename => console.log("@end:", filename))
  .on("error", error => console.error("@error:", error))
  .on("start", command => console.log("@start:", command))
  .on("metadata", metadata => console.log("@metadata:", metadata))
  .on("ready", ({ ffmpeg, filename }) => console.log(ffmpeg, filename));
// =================================[  ]=================================
var proc = AudioVideoHighest({
  output: path.join(__dirname, "downloads"),
  query: "21 savage - redrum",
  metadata: false,
  verbose: false,
  stream: false,
  useTor: false,
})
  .on("progress", ({ percent, timemark }) => {
    progbar({ percent, timemark, baseTime });
  })
  .on("end", filename => console.log("@end:", filename))
  .on("error", error => console.error("@error:", error))
  .on("start", command => console.log("@start:", command))
  .on("metadata", metadata => console.log("@metadata:", metadata))
  .on("ready", ({ ffmpeg, filename }) => console.log(ffmpeg, filename));
