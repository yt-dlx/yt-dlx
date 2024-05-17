import { exec } from "child_process";
import { version } from "../../package.json";

exec("npm show yt-dlx version", (_error, stdout) => {
  let logger = "";
  const latestVersion = stdout.trim();
  const currentVersionNum = version.split(".").map(Number).join("");
  const latestVersionNum = latestVersion.split(".").map(Number).join("");
  if (latestVersionNum > currentVersionNum) {
    console.clear();
    logger += `\x1b[31mUsing outdated version of yt-dlx@${version}\n`;
    logger += `\x1b[31mPlease update to the latest version yt-dlx@${latestVersion}\x1b[0m`;
    console.error(logger);
  }
});
