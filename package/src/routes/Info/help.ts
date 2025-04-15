import colors from "colors";
/**
 * Displays a help message and returns a URL for further assistance.
 *
 * @returns {Promise<string>} A promise that resolves to a help URL.
 *
 * @example
 * // Example: Display help message and get the help URL
 * YouTubeDLX.Info.Help().then(helpUrl => console.log(helpUrl));
 */
export default function help(): Promise<string> {
  console.log(colors.green("@info:"), "❣️ Thank you for using", colors.green("yt-dlx."), "Consider", colors.green("🌟starring"), "the github repo", colors.green("https://github.com/yt-dlx\n"));
  return Promise.resolve(colors.bold.white(`@help: visit https://yt-dlx-shovit.koyeb.app`));
}
