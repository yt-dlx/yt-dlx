// console.clear();
// import colors from "colors";
// import * as path from "path";
// import express from "express";
// import TubeResponse from "../interfaces/TubeResponse";
// import subscriptions_feed from "../routes/Account/subscriptions_feed";
// const server = express();
// const PORT = process.env.PORT || 4040;
// server.listen(PORT, () => console.log(colors.cyan(`🚀 YT-DLX Server is live at http://localhost:${PORT}`)));
// server.get("/SubscriptionsFeed", async (req, res: any) => {
// const { cookiesPath, verbose } = req.query;
// if (!cookiesPath || typeof cookiesPath !== "string") {
// return res.status(400).json({ error: "Missing or invalid cookiesPath parameter." });
// }
// try {
// const Tuber = subscriptions_feed({ cookiesPath, verbose: verbose === "true" });
// Tuber.on("data", (data: TubeResponse<{ contents: any[] }>) => res.json(data));
// Tuber.on("error", (error: any) => res.status(500).json({ error: error.message || error }));
// } catch (error) {
// console.error(colors.red("❌ Unexpected error:"), error);
// res.status(500).json({
// error: error instanceof Error ? error.message : String(error),
// });
// }
// });
// export default server;
// import * as fs from "fs";
// import request from "supertest";
// async function runTests(): Promise<void> {
// console.log(colors.yellow("Running tests against the embedded Express server using Supertest..."));
// const subscriptionsFeed = request(server)
// .get("/SubscriptionsFeed")
// .query({ cookiesPath: path.resolve(process.cwd(), "./cookies.txt"), verbose: true });
// fs.writeFile("data.json", JSON.stringify((await subscriptionsFeed).body, null, 2), err => {
// if (err) console.error(colors.red("File Write Error:"), err.message || err);
// else console.log(colors.green("Data saved to data.json"));
// });
// }
// runTests();
// ==================================================================================
// ==================================================================================
import YouTubeDLX from "..";
import colors from "colors";
import * as path from "path";
async function HomeFeed() {
  console.log(colors.blue("@info"), "Test For HomeFeed: (1): Fetch home feed with only the cookiesPath");
  YouTubeDLX.Account.HomeFeed({ cookiesPath: path.resolve(process.cwd(), "./cookies.txt") })
    .on("data", data => console.log(colors.green("@data:"), data))
    .on("error", error => console.error(colors.red("@error:"), error));
  console.log(colors.blue("@info"), "Test For HomeFeed: (2): Fetch home feed with cookiesPath and verbose output enabled");
  YouTubeDLX.Account.HomeFeed({ cookiesPath: path.resolve(process.cwd(), "./cookies.txt"), verbose: true })
    .on("data", data => console.log(colors.green("@data:"), data))
    .on("error", error => console.error(colors.red("@error:"), error));
  console.log(colors.blue("@info"), "Test For HomeFeed: (3): Fetch home feed with cookiesPath and sorting by 'oldest'");
  YouTubeDLX.Account.HomeFeed({ cookiesPath: "path/to/cookies", sort: "oldest" })
    .on("data", data => console.log(colors.green("@data:"), data))
    .on("error", error => console.error(colors.red("@error:"), error));
  console.log(colors.blue("@info"), "Test For HomeFeed: (4): Fetch home feed with cookiesPath and sorting by 'newest'");
  YouTubeDLX.Account.HomeFeed({ cookiesPath: path.resolve(process.cwd(), "./cookies.txt"), sort: "newest" })
    .on("data", data => console.log(colors.green("@data:"), data))
    .on("error", error => console.error(colors.red("@error:"), error));
  console.log(colors.blue("@info"), "Test For HomeFeed: (5): Fetch home feed with cookiesPath and sorting by 'old-to-new'");
  YouTubeDLX.Account.HomeFeed({ cookiesPath: path.resolve(process.cwd(), "./cookies.txt"), sort: "old-to-new" })
    .on("data", data => console.log(colors.green("@data:"), data))
    .on("error", error => console.error(colors.red("@error:"), error));
  console.log(colors.blue("@info"), "Test For HomeFeed: (6): Fetch home feed with cookiesPath and sorting by 'new-to-old'");
  YouTubeDLX.Account.HomeFeed({ cookiesPath: path.resolve(process.cwd(), "./cookies.txt"), sort: "new-to-old" })
    .on("data", data => console.log(colors.green("@data:"), data))
    .on("error", error => console.error(colors.red("@error:"), error));
  console.log(colors.blue("@info"), "Test For HomeFeed: (7): Fetch home feed with all parameters (cookiesPath, verbose, and sort)");
  YouTubeDLX.Account.HomeFeed({ cookiesPath: path.resolve(process.cwd(), "./cookies.txt"), verbose: true, sort: "new-to-old" })
    .on("data", data => console.log(colors.green("@data:"), data))
    .on("error", error => console.error(colors.red("@error:"), error));
}
async function SubscriptionsFeed() {
  console.log(colors.blue("@info"), "Test For HomeFeed: (1): Fetch subscriptions feed with only the cookiesPath");
  YouTubeDLX.Account.SubscriptionsFeed({ cookiesPath: path.resolve(process.cwd(), "./cookies.txt") })
    .on("data", data => console.log(colors.green("@data:"), data))
    .on("error", error => console.error(colors.red("@error:"), error));
  console.log(colors.blue("@info"), "Test For HomeFeed: (2): Fetch subscriptions feed with cookiesPath and verbose output enabled");
  YouTubeDLX.Account.SubscriptionsFeed({ cookiesPath: path.resolve(process.cwd(), "./cookies.txt"), verbose: true })
    .on("data", data => console.log(colors.green("@data:"), data))
    .on("error", error => console.error(colors.red("@error:"), error));
}
async function UnseenNotificationsTest() {
  console.log(colors.blue("@info"), "Test For UnseenNotifications: (1): Fetch unseen notifications count with only the cookiesPath");
  YouTubeDLX.Account.Unseen_Notifications({ cookiesPath: path.resolve(process.cwd(), "./cookies.txt") })
    .on("data", data => console.log(colors.green("@data:"), data))
    .on("error", error => console.error(colors.red("@error:"), error));

  console.log(colors.blue("@info"), "Test For UnseenNotifications: (2): Fetch unseen notifications count with cookiesPath and verbose output enabled");
  YouTubeDLX.Account.Unseen_Notifications({ cookiesPath: path.resolve(process.cwd(), "./cookies.txt"), verbose: true })
    .on("data", data => console.log(colors.green("@data:"), data))
    .on("error", error => console.error(colors.red("@error:"), error));
}
