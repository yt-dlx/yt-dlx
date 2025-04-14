import { Innertube, UniversalCache } from "youtubei.js";
import puppeteer from "puppeteer";
import * as path from "path";
import * as fs from "fs";

export default async function TubeLogin(): Promise<Innertube | null> {
  let Tubed: Innertube | null = null;
  const userDataDir: string = path.join(process.cwd(), "yt-dlx", "udata");
  const cookieFilePath: string = path.join(process.cwd(), "yt-dlx", "cookies.txt");
  const performLogin = async (): Promise<string | null> => {
    console.log("Performing login...");
    const browser = await puppeteer.launch({ userDataDir, headless: false, args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-blink-features=AutomationControlled"] });
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");
    await page.setViewport({ width: 1280, height: 720 });
    await page.evaluateOnNewDocument(() => Object.defineProperty(navigator, "webdriver", { get: () => false }));
    await page.setExtraHTTPHeaders({ "Accept-Language": "en-US,en;q=0.9", Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8" });
    const targetUrl: string = "https://www.youtube.com";
    await page.goto(targetUrl, { waitUntil: "networkidle0" });
    console.log("Please log in if required. Waiting for 30 seconds...");
    await new Promise<void>(resolve => setTimeout(resolve, 30000));
    console.log("Continuing after 60 seconds...");
    const isLoggedIn: boolean = await page.evaluate(() => !!document.querySelector("#avatar-btn") || !!document.querySelector("[aria-label='account']"));
    if (!isLoggedIn) {
      console.log("Login may have failed. Please ensure you logged in correctly.");
      await browser.close();
      return null;
    }
    const cookies = await page.browserContext().cookies();
    const cookieString: string = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join("; ");
    fs.writeFileSync(cookieFilePath, cookieString);
    console.log("Cookies have been saved to cookies.txt");
    await browser.close();
    return cookieString;
  };
  if (fs.existsSync(cookieFilePath)) {
    console.log("Found existing cookies.txt, attempting to use it...");
    const cookiesFromFile: string = fs.readFileSync(cookieFilePath, "utf8");
    try {
      Tubed = await Innertube.create({
        user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        cache: new UniversalCache(true, path.join(process.cwd(), "yt-dlx", "dlcache")),
        cookie: cookiesFromFile,
      });
      console.log("Congrats! You are connected to YouTube Account!");
      const UnseenNotificationsCount = await Tubed.getUnseenNotificationsCount();
      const SubscriptionsFeed = await Tubed.getSubscriptionsFeed();
      const Comments = await Tubed.getComments("kJi_cNVStMo");
      const history = await Tubed.getHistory();
      const HomeFeed = await Tubed.getHomeFeed();
      const Library = await Tubed.getLibrary();
      if (UnseenNotificationsCount) console.log(UnseenNotificationsCount);
      if (SubscriptionsFeed) console.log(SubscriptionsFeed);
      if (Comments) console.log(Comments);
      if (HomeFeed) console.log(HomeFeed);
      if (history) console.log(history);
      if (Library) console.log(Library);
    } catch (error: unknown) {
      if (error instanceof Error) console.log("Existing cookies are invalid or expired:", error.message);
      Tubed = null;
    }
  }
  if (!Tubed) {
    const cookiesFromFile: string | null = await performLogin();
    if (!cookiesFromFile) {
      console.error("Failed to obtain valid cookies. Exiting.");
      return null;
    }
    try {
      Tubed = await Innertube.create({
        user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        cache: new UniversalCache(true, path.join(process.cwd(), "yt-dlx", "dlcache")),
        cookie: cookiesFromFile,
      });
      console.log("Congrats! You are connected to YouTube Account!");
      const UnseenNotificationsCount = await Tubed.getUnseenNotificationsCount();
      const SubscriptionsFeed = await Tubed.getSubscriptionsFeed();
      const Comments = await Tubed.getComments("kJi_cNVStMo");
      const history = await Tubed.getHistory();
      const HomeFeed = await Tubed.getHomeFeed();
      const Library = await Tubed.getLibrary();
      if (UnseenNotificationsCount) console.log(UnseenNotificationsCount);
      if (SubscriptionsFeed) console.log(SubscriptionsFeed);
      if (Comments) console.log(Comments);
      if (HomeFeed) console.log(HomeFeed);
      if (history) console.log(history);
      if (Library) console.log(Library);
    } catch (error: unknown) {
      if (error instanceof Error) console.error("Error creating Innertube with new cookies:", error.message);
    }
  }
  return Tubed;
}

(async () => {
  await TubeLogin();
})();
