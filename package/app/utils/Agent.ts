import colors from "colors";
import Engine from "./Engine";
import YouTubeID from "../utils/YouTubeId";
import { execSync } from "child_process";
import type EngineOutput from "../interfaces/EngineOutput";
import { singleVideo } from "../routes/command/video_data";
import { searchVideos } from "../routes/command/search_videos";
/**
 * Checks if the "systemctl" command is available on the host system.
 *
 * @function systemctlAvailable
 * @async
 * @returns {Promise<boolean>} Resolves to true if systemctl is available; otherwise, false.
 *
 * @example
 * systemctlAvailable().then(isAvailable => {
 *   console.log(isAvailable); // Output: true if available, false otherwise.
 * });
 */
async function systemctlAvailable(): Promise<boolean> {
  try {
    execSync("systemctl --version", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

/**
 * Checks if the "service" command is available on the host system.
 *
 * @function serviceAvailable
 * @async
 * @returns {Promise<boolean>} Resolves to true if the service command is available; otherwise, false.
 *
 * @example
 * serviceAvailable().then(isAvailable => {
 *   console.log(isAvailable); // Output: true if available, false otherwise.
 * });
 */
async function serviceAvailable(): Promise<boolean> {
  try {
    execSync("service --version", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

/**
 * Attempts to restart the Tor service using available system commands.
 *
 * The function first checks if the "service" command is available; if so, it tries to restart Tor using it.
 * If that fails or isn’t available, it then checks for "systemctl" and attempts the same.
 * Appropriate log messages are output based on the success or failure of each attempt.
 *
 * @function restartTor
 * @async
 * @returns {Promise<boolean>} Resolves to true if Tor is successfully restarted; otherwise, false.
 *
 * @example
 * restartTor().then(success => {
 *   console.log(success); // Output: true if Tor restarted successfully, false otherwise.
 * });
 */
async function restartTor(): Promise<boolean> {
  const hasService = await serviceAvailable();
  if (hasService) {
    try {
      execSync("service tor restart", { stdio: "ignore" });
      console.log(colors.green("@info:"), "Tor restarted successfully using service");
      return true;
    } catch {
      console.log(colors.yellow("@warn:"), "Failed to restart Tor using service");
    }
  }
  const hasSystemctl = await systemctlAvailable();
  if (hasSystemctl) {
    try {
      execSync("systemctl restart tor", { stdio: "ignore" });
      console.log(colors.green("@info:"), "Tor restarted successfully using systemctl");
      return true;
    } catch {
      console.log(colors.yellow("@warn:"), "Failed to restart Tor using systemctl");
    }
  }
  console.log(colors.red("@error:"), "Unable to restart Tor with either service or systemctl");
  return false;
}

/**
 * Processes a YouTube video query by searching for a video and passing it to the Engine.
 *
 * This function takes in a query string along with optional flags for using Tor and verbose logging.
 * It first checks whether Tor should be used (with a restriction on Windows platforms).
 * Then it attempts to extract a YouTube video ID from the query. If no valid ID is found, it searches
 * for a video and selects the first result. The corresponding YouTube URL is then sent to the Engine for processing.
 *
 * @function Agent
 * @async
 * @param {Object} options - The options object.
 * @param {string} options.query - The search query or potential YouTube video identifier.
 * @param {boolean} [options.useTor=false] - When true, routes the request through Tor (not supported on Windows).
 * @param {boolean} [options.verbose=false] - Enables verbose logging.
 * @returns {Promise<any>} Resolves with the output from the Engine based on the processed YouTube video.
 * @throws {Error} Throws an error if no video can be found or if video details cannot be retrieved.
 *
 * @example
 * Agent({ query: "Trending music", useTor: true, verbose: true })
 *   .then(response => console.log(response))
 *   .catch(error => console.error(error));
 */
export default async function Agent({ query, useTor, verbose }: { query: string; useTor?: boolean; verbose?: boolean }): Promise<any> {
  if (useTor && process.platform === "win32") {
    console.log(colors.red("@error:"), "TOR can't be used on your system!");
    useTor = false;
  } else if (useTor) {
    await restartTor();
  }
  if (verbose && useTor) {
    console.log(colors.green("@info:"), "Using Tor for request anonymization");
  }
  let TubeBody: any;
  let respEngine: EngineOutput | undefined = undefined;
  const videoId: string | undefined = await YouTubeID(query);
  if (!videoId) {
    const searchResult = await searchVideos({ query });
    const video = searchResult[0];
    if (!video) throw new Error("Unable to find a video!");
    console.log(colors.green("@info:"), "preparing payload for", video.title);
    respEngine = await Engine({ query: `https://www.youtube.com/watch?v=${video.id}`, useTor });
    return respEngine;
  } else {
    TubeBody = await singleVideo({ videoId });
    if (!TubeBody) throw new Error("Unable to get response!");
    console.log(colors.green("@info:"), "preparing payload for", TubeBody.title);
    respEngine = await Engine({ query: `https://www.youtube.com/watch?v=${TubeBody.id}`, useTor });
    return respEngine;
  }
}
