import * as fs from "fs";
import * as path from "path";
import { Innertube, UniversalCache } from "youtubei.js";
const cookiesFilePath = path.join(process.cwd(), "cookies.txt");
if (!fs.existsSync(cookiesFilePath)) {
  console.error("Cookies file not found!");
  console.error("Please use the 'Get cookies.txt' extension on Firefox or Chrome to export your YouTube cookies and save it as 'cookies.txt' in the project root.");
  process.exit(1);
}
const cookiesFromFile = fs.readFileSync(cookiesFilePath, "utf8");
(async () => {
  const Tubed = await Innertube.create({
    user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    cache: new UniversalCache(true, path.join(process.cwd(), "yt-dlx", "dlcache")),
    cookie: cookiesFromFile,
  });
  console.log("Congrats! You are connected to YouTube Account!");
  const history = await Tubed.getHistory();
  if (history) console.log(history);
})();
