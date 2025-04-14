console.clear();
import colors from "colors";
import express from "express";
import History from "../routes/more/History";
import Library from "../routes/more/Library";
import Comments from "../routes/more/Comments";
import Home_Feed from "../routes/more/Home_Feed";
import TubeResponse from "../interfaces/TubeResponse";
import Subscriptions_Feed from "../routes/more/Subscriptions_Feed";
import Unseen_Notifications from "../routes/more/Unseen_Notifications";
// ========================================================================================================
const server = express();
const PORT = process.env.PORT || 4040;
server.listen(PORT, () => console.log(colors.cyan(`🚀 YT-DLX Server is live at http://localhost:${PORT}`)));
// ========================================================================================================
server.get("/UnseenNotifications", async (req, res: any) => {
  const { cookiesPath, verbose } = req.query;
  if (!cookiesPath || typeof cookiesPath !== "string") {
    return res.status(400).json({ error: "Missing or invalid cookiesPath parameter." });
  }
  try {
    const Tuber = Unseen_Notifications({ cookiesPath, verbose: verbose === "true" });
    Tuber.on("data", (data: TubeResponse<{ count: number }>) => res.json(data));
    Tuber.on("error", (error: any) => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    res.status(500).json({
      error: error instanceof Error ? error.message : String(error),
    });
  }
});
server.get("/SubscriptionsFeed", async (req, res: any) => {
  const { cookiesPath, verbose } = req.query;
  if (!cookiesPath || typeof cookiesPath !== "string") {
    return res.status(400).json({ error: "Missing or invalid cookiesPath parameter." });
  }
  try {
    const Tuber = Subscriptions_Feed({ cookiesPath, verbose: verbose === "true" });
    Tuber.on("data", (data: TubeResponse<{ contents: any[] }>) => res.json(data));
    Tuber.on("error", (error: any) => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    res.status(500).json({
      error: error instanceof Error ? error.message : String(error),
    });
  }
});
server.get("/HomeFeed", async (req, res: any) => {
  const { cookiesPath, verbose } = req.query;
  if (!cookiesPath || typeof cookiesPath !== "string") {
    return res.status(400).json({ error: "Missing or invalid cookiesPath parameter." });
  }
  try {
    const Tuber = Home_Feed({ cookiesPath, verbose: verbose === "true" });
    Tuber.on("data", (data: TubeResponse<{ header: any; contents: any }>) => res.json(data));
    Tuber.on("error", (error: any) => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    res.status(500).json({
      error: error instanceof Error ? error.message : String(error),
    });
  }
});
server.get("/Comments", async (req, res: any) => {
  const { cookiesPath, videoId, verbose } = req.query;
  if (!cookiesPath || typeof cookiesPath !== "string") {
    return res.status(400).json({ error: "Missing or invalid cookiesPath parameter." });
  }
  if (!videoId || typeof videoId !== "string") {
    return res.status(400).json({ error: "Missing or invalid videoId parameter." });
  }
  try {
    const Tuber = Comments({ cookiesPath, videoId, verbose: verbose === "true" });
    Tuber.on("data", (data: TubeResponse<{ header: any; contents: any[] }>) => res.json(data));
    Tuber.on("error", (error: any) => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    res.status(500).json({
      error: error instanceof Error ? error.message : String(error),
    });
  }
});
server.get("/History", async (req, res: any) => {
  const { cookiesPath, verbose } = req.query;
  if (!cookiesPath || typeof cookiesPath !== "string") {
    return res.status(400).json({ error: "Missing or invalid cookiesPath parameter." });
  }
  try {
    const Tuber = History({ cookiesPath, verbose: verbose === "true" });
    Tuber.on("data", (data: TubeResponse<{ sections: any[]; feedActions: any }>) => res.json(data));
    Tuber.on("error", (error: any) => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    res.status(500).json({
      error: error instanceof Error ? error.message : String(error),
    });
  }
});
server.get("/Library", async (req, res: any) => {
  const { cookiesPath, verbose } = req.query;
  if (!cookiesPath || typeof cookiesPath !== "string") {
    return res.status(400).json({ error: "Missing or invalid cookiesPath parameter." });
  }
  try {
    const Tuber = Library({ cookiesPath, verbose: verbose === "true" });
    Tuber.on("data", (data: TubeResponse<{ header: any; sections: any[] }>) => res.json(data));
    Tuber.on("error", (error: any) => res.status(500).json({ error: error.message || error }));
  } catch (error) {
    console.error(colors.red("❌ Unexpected error:"), error);
    res.status(500).json({
      error: error instanceof Error ? error.message : String(error),
    });
  }
});
export default server;
// ========================================================================================================
import request from "supertest";
async function runTests(): Promise<void> {
  console.log(colors.yellow("Running tests against the embedded Express server using Supertest..."));
  try {
    const unseenNotifications = await request(server).get("/UnseenNotifications").query({ cookiesPath: "./cookies.txt", verbose: true });
    console.log(colors.green("/UnseenNotifications Response:"), unseenNotifications.body);
  } catch (error: any) {
    console.error(colors.red("/UnseenNotifications Error:"), error.message || error);
  }
  try {
    const subscriptionsFeed = await request(server).get("/SubscriptionsFeed").query({ cookiesPath: "./cookies.txt", verbose: true });
    console.log(colors.green("/SubscriptionsFeed Response:"), subscriptionsFeed.body);
  } catch (error: any) {
    console.error(colors.red("/SubscriptionsFeed Error:"), error.message || error);
  }
  try {
    const homeFeed = await request(server).get("/HomeFeed").query({ cookiesPath: "./cookies.txt", verbose: true });
    console.log(colors.green("/HomeFeed Response:"), homeFeed.body);
  } catch (error: any) {
    console.error(colors.red("/HomeFeed Error:"), error.message || error);
  }
  try {
    const comments = await request(server).get("/Comments").query({ cookiesPath: "./cookies.txt", videoId: "dQw4w9WgXcQ", verbose: true });
    console.log(colors.green("/Comments Response:"), comments.body);
  } catch (error: any) {
    console.error(colors.red("/Comments Error:"), error.message || error);
  }
  try {
    const history = await request(server).get("/History").query({ cookiesPath: "./cookies.txt", verbose: true });
    console.log(colors.green("/History Response:"), history.body);
  } catch (error: any) {
    console.error(colors.red("/History Error:"), error.message || error);
  }
  try {
    const library = await request(server).get("/Library").query({ cookiesPath: "./cookies.txt", verbose: true });
    console.log(colors.green("/Library Response:"), library.body);
  } catch (error: any) {
    console.error(colors.red("/Library Error:"), error.message || error);
  }
}
runTests();
// ========================================================================================================
