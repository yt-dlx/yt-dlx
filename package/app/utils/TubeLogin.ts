import * as fs from "fs";
import * as path from "path";
import colors from "colors";
import { Innertube, UniversalCache } from "youtubei.js";
/**
 * Define the TubeType alias for the Innertube client.
 */
export type TubeType = Innertube;
/**
 * Path to the cookies file exported from browser using 'Get cookies.txt' extension.
 */
const cookiesFilePath: string = path.join(process.cwd(), "cookies.txt");
/**
 * Global variable to store the initialized Innertube client.
 */
export let Tube: TubeType | null = null;
/**
 * Initializes the Innertube client using cookies.
 * Exits the process if the cookies file is missing or corrupt.
 *
 * @async
 * @function TubeLogin
 * @returns {Promise<TubeType>} The authenticated Innertube client.
 */
export default async function TubeLogin(): Promise<TubeType> {
  if (!fs.existsSync(cookiesFilePath)) {
    console.error(colors.red("@error:"), "Cookies file not found!");
    console.error(colors.red("@error:"), "Please use the 'Get cookies.txt' extension on Firefox or Chrome to export your YouTube cookies and save it as 'cookies.txt' in the project root.");
    process.exit(1);
  }
  const cookiesFromFile: string = fs.readFileSync(cookiesFilePath, "utf8");
  try {
    Tube = await Innertube.create({
      user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      cache: new UniversalCache(true, path.join(process.cwd(), "yt-dlx", "dlcache")),
      cookie: cookiesFromFile,
    });
    console.log(colors.green("@info:"), "Connected to YouTube...");
    return Tube;
  } catch (err) {
    console.error(colors.red("@error:"), "Failed to authenticate. The cookies file appears to be corrupt or invalid.");
    console.error(colors.red("@error:"), "Try exporting the cookies again using the 'Get cookies.txt' browser extension.");
    process.exit(1);
  }
}
