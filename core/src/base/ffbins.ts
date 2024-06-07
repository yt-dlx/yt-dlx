import * as path from "path";

const ffmpegPath: string = path.join(process.cwd(), "util", "ffmpeg");
const ffplayPath: string = path.join(process.cwd(), "util", "ffplay");
const ffprobePath: string = path.join(process.cwd(), "util", "ffprobe");

export { ffmpegPath, ffplayPath, ffprobePath };
