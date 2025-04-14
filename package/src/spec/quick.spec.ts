console.clear();
import colors from "colors";
import * as path from "path";
import express from "express";
import TubeResponse from "../interfaces/TubeResponse";
import subscriptions_feed from "../routes/Account/subscriptions_feed";
const server = express();
const PORT = process.env.PORT || 4040;
server.listen(PORT, () => console.log(colors.cyan(`🚀 YT-DLX Server is live at http://localhost:${PORT}`)));
server.get("/SubscriptionsFeed", async (req, res: any) => {
  const { cookiesPath, verbose } = req.query;
  if (!cookiesPath || typeof cookiesPath !== "string") {
    return res.status(400).json({ error: "Missing or invalid cookiesPath parameter." });
  }
  try {
    const Tuber = subscriptions_feed({ cookiesPath, verbose: verbose === "true" });
    Tuber.on("data", (data: TubeResponse<{ contents: any[] }>) => res.json(data));
    Tuber.on("error", (error: any) => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    res.status(500).json({
      error: error instanceof Error ? error.message : String(error),
    });
  }
});
export default server;
import * as fs from "fs";
import request from "supertest";
async function runTests(): Promise<void> {
  console.log(colors.yellow("Running tests against the embedded Express server using Supertest..."));
  const subscriptionsFeed = request(server)
    .get("/SubscriptionsFeed")
    .query({ cookiesPath: path.resolve(process.cwd(), "./cookies.txt"), verbose: true });
  fs.writeFile("data.json", JSON.stringify((await subscriptionsFeed).body, null, 2), err => {
    if (err) console.error(colors.red("File Write Error:"), err.message || err);
    else console.log(colors.green("Data saved to data.json"));
  });
}
runTests();
