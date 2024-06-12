console.clear();
// import bytes from "bytes";
// import colors from "colors";
// import readline from "readline";
// import Agent from "../base/Agent";
// import { spawn } from "child_process";
// import speedometer from "speedometer";
// import bigEntry from "../base/bigEntry";

// const rl = readline.createInterface({
// output: process.stdout,
// input: process.stdin,
// });
// const speed = speedometer();

// let durrT: any;
// const reTime = /time=([^ ]+)\s*/;
// const reSize = /size=\s*(\d+)kB\s*/;
// const reDurr = /Duration: (\d+:\d+:\d+)/;
// const reBitrate = /bitrate=\s*(\d+\.\d+)\s*/;
// function toSec(timeString: any) {
// const [hours, minutes, seconds] = timeString.split(":").map(Number);
// return hours * 3600 + minutes * 60 + seconds;
// }

// (async () => {
// await Agent({
// query: "Houdini",
// }).then(async (engineData) => {
// const sorted = await bigEntry(engineData.VideoStore);
// console.log(
// colors.blue("@fileSize:"),
// sorted.AVInfo.filesizeformatted.toString()
// );
// const ffmpeg = spawn("ffmpeg", [
// "-y",
// "-i",
// sorted.AVDownload.mediaurl,
// "-f",
// "matroska",
// "temp/video.mkv",
// ]);
// ffmpeg.stderr.on("data", (data) => {
// const ffout = data.toString();
// const time = ffout.match(reTime) ? ffout.match(reTime)[1] : null;
// const size = ffout.match(reSize) ? ffout.match(reSize)[1] : null;
// const bitrate = ffout.match(reBitrate) ? ffout.match(reBitrate)[1] : null;
// if (ffout.match(reDurr) && !durrT) durrT = toSec(ffout.match(reDurr)[1]);

// switch (true) {
// case !(
// time !== null &&
// size !== null &&
// bitrate !== null &&
// time !== "N/A" &&
// size !== "N/A" &&
// bitrate !== "N/A"
// ):
// break;
// default:
// let color = colors.green;
// const durrC = toSec(time);
// const byteSize = parseInt(size) * 1024;
// const progress = (durrC / durrT) * 100;
// const frame = ffout.match(/frame=\s*(\d+)/);
// if (progress < 25) color = colors.red;
// else if (progress < 50) color = colors.yellow;

// const width = Math.floor(process.stdout.columns / 4);
// const scomp = Math.round((width * progress) / 100);
// const percs =
// color("━").repeat(scomp) + color(" ").repeat(width - scomp);

// rl.write(null, { ctrl: true, name: "u" });
// rl.write(
// `${color("@progress:")} ${percs}${progress.toFixed(2)}%` +
// " " +
// `${color("@duration:")} ${time}` +
// " " +
// `${color("@convRate:")} ${bitrate}kb/s` +
// " " +
// `${color("@size:")} ${bytes(byteSize)}` +
// " " +
// `${color("@network:")} ${bytes(speed(byteSize))}/s` +
// " " +
// `${color("@frames:")} ${parseInt(frame[1]) || 0}`
// );
// break;
// }
// });
// ffmpeg.stdout.on("data", (data) => console.log("stdout:", data));
// ffmpeg.on("error", (err) => console.error("@error:", err));
// ffmpeg.on("close", () => {
// process.stdout.write("\n");
// rl.close();
// });
// rl.on("close", () => process.exit(0));
// });
// })();
