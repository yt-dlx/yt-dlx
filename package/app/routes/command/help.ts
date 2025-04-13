import colors from "colors";

/**
 * Displays a help message in the console with a link to the project's GitHub repository and the help page.
 *
 * @function help
 * @returns {Promise<string>} A promise that resolves with a help message containing a link to the help page.
 *
 * @example
 * help().then(message => console.log(message));
 */
export default function help(): Promise<string> {
  console.log(colors.green("@info:"), "❣️ Thank you for using", colors.green("yt-dlx."), "Consider", colors.green("🌟starring"), "the github repo", colors.green("https://github.com/yt-dlx\n"));
  return Promise.resolve(colors.bold.white(`@help: visit https://yt-dlx-shovit.koyeb.app`));
}
