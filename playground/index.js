import { Innertube, UniversalCache } from "youtubei.js";
import { chromium } from "playwright";
import * as path from "path";
import * as fs from "fs";

async function performOperations(yt) {
  try {
    const history = await yt.getHistory();
    history.sections.forEach((section, index) => {
      console.log(`Section ${index + 1}: ${section.header?.title || "Untitled Section"}`);
      if (section.contents && Array.isArray(section.contents)) {
        section.contents.forEach((item, itemIndex) => {
          if (item.type === "Video" || item.type === "CompactVideo") {
            console.log(`  Video ${itemIndex + 1}:`);
            console.log(`    Title: ${item.title || "N/A"}`);
            console.log(`    Video ID: ${item.video_id || "N/A"}`);
            console.log(`    Channel: ${item.author?.title || "N/A"}`);
            console.log(`    Duration: ${item.length?.text || "N/A"}`);
            console.log(`    Views: ${item.view_count?.text || "N/A"}`);
            console.log(`    Published: ${item.published?.text || "N/A"}`);
          } else console.log(`  Item ${itemIndex + 1}: Non-video content (${item.type || "Unknown"})`);
        });
      } else console.log("  No contents available in this section.");
    });
  } catch (error) {
    console.error("Error fetching history:", error.message);
  }
}

(async () => {
  let yt;
  const userDataDir = path.resolve("./data/user_data");
  const cookieFilePath = path.resolve("./data/cookies.txt");
  const performLogin = async () => {
    console.log("Performing login...");
    const context = await chromium.launchPersistentContext(userDataDir, {
      headless: false,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-blink-features=AutomationControlled"],
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      viewport: { width: 1280, height: 720 },
      permissions: ["notifications"],
    });
    await context.addInitScript(() => {
      Object.defineProperty(navigator, "webdriver", { get: () => false });
    });
    const page = await context.newPage();
    await page.setExtraHTTPHeaders({ "Accept-Language": "en-US,en;q=0.9", Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8" });
    const targetUrl = "https://www.youtube.com";
    await page.goto(targetUrl, { waitUntil: "networkidle" });
    console.log("Please log in if required. Waiting for 60 seconds...");
    await page.waitForTimeout(60000);
    const isLoggedIn = await page.evaluate(() => {
      return !!document.querySelector("#avatar-btn") || !!document.querySelector("[aria-label='account']");
    });
    if (!isLoggedIn) {
      console.log("Login may have failed. Please ensure you logged in correctly.");
      await context.close();
      return null;
    }
    const cookies = await context.cookies(targetUrl);
    const cookieString = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join("; ");
    fs.writeFileSync(cookieFilePath, cookieString);
    console.log("Cookies have been saved to cookies.txt");
    await context.close();
    return cookieString;
  };
  if (fs.existsSync(cookieFilePath)) {
    console.log("Found existing cookies.txt, attempting to use it...");
    const cookiesFromFile = fs.readFileSync(cookieFilePath, "utf8");
    try {
      yt = await Innertube.create({
        user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        cache: new UniversalCache(true, "./data/youtube_cache"),
        cookie: cookiesFromFile,
      });
      await performOperations(yt);
    } catch (error) {
      console.log("Existing cookies are invalid or expired:", error.message);
      yt = null;
    }
  }
  if (!yt) {
    const cookiesFromFile = await performLogin();
    if (!cookiesFromFile) {
      console.error("Failed to obtain valid cookies. Exiting.");
      return;
    }
    try {
      yt = await Innertube.create({
        user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        cache: new UniversalCache(true, "./data/youtube_cache"),
        cookie: cookiesFromFile,
      });
      await performOperations(yt);
    } catch (error) {
      console.error("Error creating Innertube with new cookies:", error.message);
    }
  }
})();
