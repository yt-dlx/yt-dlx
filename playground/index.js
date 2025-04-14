import { Innertube, UniversalCache } from "youtubei.js";
import puppeteer from "puppeteer";
import * as path from "path";
import * as fs from "fs";

(async () => {
  let instance;
  const userDataDir = path.resolve(process.cwd(), "./data/user_data");
  const cookieFilePath = path.resolve(process.cwd(), "./data/cookies.txt");
  const performLogin = async () => {
    console.log("Performing login...");
    const browser = await puppeteer.launch({
      userDataDir,
      headless: false,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-blink-features=AutomationControlled"],
    });
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");
    await page.setViewport({ width: 1280, height: 720 });
    await page.evaluateOnNewDocument(() => Object.defineProperty(navigator, "webdriver", { get: () => false }));
    await page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.9",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    });
    const targetUrl = "https://www.youtube.com";
    await page.goto(targetUrl, { waitUntil: "networkidle0" });
    console.log("Please log in if required. Waiting for 60 seconds...");
    await new Promise(resolve => setTimeout(resolve, 60000));
    console.log("Continuing after 60 seconds...");
    const isLoggedIn = await page.evaluate(() => {
      return !!document.querySelector("#avatar-btn") || !!document.querySelector("[aria-label='account']");
    });
    if (!isLoggedIn) {
      console.log("Login may have failed. Please ensure you logged in correctly.");
      await browser.close();
      return null;
    }
    const cookies = await page.cookies();
    const cookieString = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join("; ");
    fs.writeFileSync(cookieFilePath, cookieString);
    console.log("Cookies have been saved to cookies.txt");
    await browser.close();
    return cookieString;
  };
  if (fs.existsSync(cookieFilePath)) {
    console.log("Found existing cookies.txt, attempting to use it...");
    const cookiesFromFile = fs.readFileSync(cookieFilePath, "utf8");
    try {
      instance = await Innertube.create({
        user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        cache: new UniversalCache(true, process.cwd(), "./data/youtube_cache"),
        cookie: cookiesFromFile,
      });
      console.log("Congrats! You are connected to YouTube Account!");
    } catch (error) {
      console.log("Existing cookies are invalid or expired:", error.message);
      instance = null;
    }
  }
  if (!instance) {
    const cookiesFromFile = await performLogin();
    if (!cookiesFromFile) {
      console.error("Failed to obtain valid cookies. Exiting.");
      return;
    }
    try {
      instance = await Innertube.create({
        user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        cache: new UniversalCache(true, process.cwd(), "./data/youtube_cache"),
        cookie: cookiesFromFile,
      });
      console.log("Congrats! You are connected to YouTube Account!");
    } catch (error) {
      console.error("Error creating Innertube with new cookies:", error.message);
    }
  }
})();
