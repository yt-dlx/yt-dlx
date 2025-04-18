import colors from "colors";
import { EventEmitter } from "events";
/**
 * @shortdesc Displays a help message for yt-dlx with a documentation link.
 *
 * @description This function provides users with helpful information about the yt-dlx tool. It logs a thank you message to the console, encourages starring the GitHub repository, and emits a "data" event containing a link to the official yt-dlx documentation.
 *
 * @returns {EventEmitter} An EventEmitter that emits the following events:
 * - `"data"`: Emitted with a help message containing a link to the yt-dlx documentation.
 * - `"error"`: Emitted if an unexpected error occurs during the process.
 *
 * @example
 * // Display the help message
 * YouTubeDLX.help()
 * .on("data", (message) => console.log(message))
 * .on("error", (error) => console.error("Error:", error));
 */
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
