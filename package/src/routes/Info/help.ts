import colors from "colors";
import { EventEmitter } from "events";
export default function help(): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      console.log(colors.green("@info:"), "❣️ Thank you for using", colors.green("yt-dlx."), "Consider", colors.green("🌟starring"), "the GitHub repo", colors.green("https://github.com/yt-dlx\n"));
      emitter.emit("data", colors.bold.white(`@help: visit https://yt-dlx-shovit.koyeb.app`));
    } catch (error) {
      emitter.emit("error", `${colors.red("@error:")} An unexpected error occurred: ${error instanceof Error ? error.message : String(error)}`);
    }
  })();
  return emitter;
}
