// console.clear();
// import colors from "colors";
// import * as path from "path";
// import express from "express";
// import TubeResponse from "../interfaces/TubeResponse";
// import History from "../routes/command/future/History";
// import Library from "../routes/command/future/Library";
// import Home_Feed from "../routes/command/future/Home_Feed";
// import Subscriptions_Feed from "../routes/command/future/Subscriptions_Feed";
// import Unseen_Notifications from "../routes/command/future/Unseen_Notifications";
// // ========================================================================================================
// const server = express();
// const PORT = process.env.PORT || 4040;
// server.listen(PORT, () => console.log(colors.cyan(`🚀 YT-DLX Server is live at http://localhost:${PORT}`)));
// // ========================================================================================================
// server.get("/UnseenNotifications", async (req, res: any) => {
// const { cookiesPath, verbose } = req.query;
// if (!cookiesPath || typeof cookiesPath !== "string") {
// return res.status(400).json({ error: "Missing or invalid cookiesPath parameter." });
// }
// try {
// const Tuber = Unseen_Notifications({ cookiesPath, verbose: verbose === "true" });
// Tuber.on("data", (data: TubeResponse<{ count: number }>) => res.json(data));
// Tuber.on("error", (error: any) => res.status(500).json({ error: error.message || error }));
// } catch (error) {
// console.error(colors.red("❌ Unexpected error:"), error);
// res.status(500).json({
// error: error instanceof Error ? error.message : String(error),
// });
// }
// });
// server.get("/SubscriptionsFeed", async (req, res: any) => {
// const { cookiesPath, verbose } = req.query;
// if (!cookiesPath || typeof cookiesPath !== "string") {
// return res.status(400).json({ error: "Missing or invalid cookiesPath parameter." });
// }
// try {
// const Tuber = Subscriptions_Feed({ cookiesPath, verbose: verbose === "true" });
// Tuber.on("data", (data: TubeResponse<{ contents: any[] }>) => res.json(data));
// Tuber.on("error", (error: any) => res.status(500).json({ error: error.message || error }));
// } catch (error) {
// console.error(colors.red("❌ Unexpected error:"), error);
// res.status(500).json({
// error: error instanceof Error ? error.message : String(error),
// });
// }
// });
// server.get("/HomeFeed", async (req, res: any) => {
// const { cookiesPath, verbose } = req.query;
// if (!cookiesPath || typeof cookiesPath !== "string") {
// return res.status(400).json({ error: "Missing or invalid cookiesPath parameter." });
// }
// try {
// const Tuber = Home_Feed({ cookiesPath, verbose: verbose === "true" });
// Tuber.on("data", (data: TubeResponse<{ header: any; contents: any }>) => res.json(data));
// Tuber.on("error", (error: any) => res.status(500).json({ error: error.message || error }));
// } catch (error) {
// console.error(colors.red("❌ Unexpected error:"), error);
// res.status(500).json({
// error: error instanceof Error ? error.message : String(error),
// });
// }
// });
// server.get("/History", async (req, res: any) => {
// const { cookiesPath, verbose } = req.query;
// if (!cookiesPath || typeof cookiesPath !== "string") {
// return res.status(400).json({ error: "Missing or invalid cookiesPath parameter." });
// }
// try {
// const Tuber = History({ cookiesPath, verbose: verbose === "true" });
// Tuber.on("data", (data: TubeResponse<{ sections: any[]; feedActions: any }>) => res.json(data));
// Tuber.on("error", (error: any) => res.status(500).json({ error: error.message || error }));
// } catch (error) {
// console.error(colors.red("❌ Unexpected error:"), error);
// res.status(500).json({
// error: error instanceof Error ? error.message : String(error),
// });
// }
// });
// server.get("/Library", async (req, res: any) => {
// const { cookiesPath, verbose } = req.query;
// if (!cookiesPath || typeof cookiesPath !== "string") {
// return res.status(400).json({ error: "Missing or invalid cookiesPath parameter." });
// }
// try {
// const Tuber = Library({ cookiesPath, verbose: verbose === "true" });
// Tuber.on("data", (data: TubeResponse<{ header: any; sections: any[] }>) => res.json(data));
// Tuber.on("error", (error: any) => res.status(500).json({ error: error.message || error }));
// } catch (error) {
// console.error(colors.red("❌ Unexpected error:"), error);
// res.status(500).json({
// error: error instanceof Error ? error.message : String(error),
// });
// }
// });
// export default server;
// // ========================================================================================================
// import request from "supertest";
// async function runTests(): Promise<void> {
// console.log(colors.yellow("Running tests against the embedded Express server using Supertest..."));
// try {
// const unseenNotifications = await request(server)
// .get("/UnseenNotifications")
// .query({ cookiesPath: path.resolve(process.cwd(), "./cookies.txt"), verbose: true });
// console.log(colors.green("/UnseenNotifications Response:"), unseenNotifications.body);
// } catch (error: any) {
// console.error(colors.red("/UnseenNotifications Error:"), error.message || error);
// }
// try {
// const subscriptionsFeed = await request(server)
// .get("/SubscriptionsFeed")
// .query({ cookiesPath: path.resolve(process.cwd(), "./cookies.txt"), verbose: true });
// console.log(colors.green("/SubscriptionsFeed Response:"), subscriptionsFeed.body);
// } catch (error: any) {
// console.error(colors.red("/SubscriptionsFeed Error:"), error.message || error);
// }
// try {
// const homeFeed = await request(server)
// .get("/HomeFeed")
// .query({ cookiesPath: path.resolve(process.cwd(), "./cookies.txt"), verbose: true });
// console.log(colors.green("/HomeFeed Response:"), homeFeed.body);
// } catch (error: any) {
// console.error(colors.red("/HomeFeed Error:"), error.message || error);
// }
// try {
// const history = await request(server)
// .get("/History")
// .query({ cookiesPath: path.resolve(process.cwd(), "./cookies.txt"), verbose: true });
// console.log(colors.green("/History Response:"), history.body);
// } catch (error: any) {
// console.error(colors.red("/History Error:"), error.message || error);
// }
// try {
// const library = await request(server)
// .get("/Library")
// .query({ cookiesPath: path.resolve(process.cwd(), "./cookies.txt"), verbose: true });
// console.log(colors.green("/Library Response:"), library.body);
// } catch (error: any) {
// console.error(colors.red("/Library Error:"), error.message || error);
// }
// }
// runTests();
// // ========================================================================================================
import video_comments from "../routes/command/video_comments";
function getVideoComments(options: {
  query: string;
  useTor?: boolean | undefined;
  verbose?: boolean | undefined;
  filter?: "favorited" | "longest" | "most_liked" | "newest" | "oldest" | "pinned" | "replies" | "shortest" | "top" | "uploader" | "verified" | undefined;
}) {
  return new Promise((resolve, reject) => {
    video_comments(options)
      .on("data", data => resolve(data))
      .on("error", error => reject(error));
  });
}
async function fetchComments() {
  try {
    const favorited = await getVideoComments({ query: "Martin Garrix & Arijit Singh - Weightless (Official Video)", filter: "favorited" });
    console.log("@favorited", favorited);
    const longest = await getVideoComments({ query: "Martin Garrix & Arijit Singh - Weightless (Official Video)", filter: "longest" });
    console.log("@longest", longest);
    const mostLiked = await getVideoComments({ query: "Martin Garrix & Arijit Singh - Weightless (Official Video)", filter: "most_liked" });
    console.log("@most_liked", mostLiked);
    const newest = await getVideoComments({ query: "Martin Garrix & Arijit Singh - Weightless (Official Video)", filter: "newest" });
    console.log("@newest", newest);
    const oldest = await getVideoComments({ query: "Martin Garrix & Arijit Singh - Weightless (Official Video)", filter: "oldest" });
    console.log("@oldest", oldest);
    const pinned = await getVideoComments({ query: "Martin Garrix & Arijit Singh - Weightless (Official Video)", filter: "pinned" });
    console.log("@pinned", pinned);
    const replies = await getVideoComments({ query: "Martin Garrix & Arijit Singh - Weightless (Official Video)", filter: "replies" });
    console.log("@replies", replies);
    const shortest = await getVideoComments({ query: "Martin Garrix & Arijit Singh - Weightless (Official Video)", filter: "shortest" });
    console.log("@shortest", shortest);
    const top = await getVideoComments({ query: "Martin Garrix & Arijit Singh - Weightless (Official Video)", filter: "top" });
    console.log("@top", top);
    const uploader = await getVideoComments({ query: "Martin Garrix & Arijit Singh - Weightless (Official Video)", filter: "uploader" });
    console.log("@uploader", uploader);
    const verified = await getVideoComments({ query: "Martin Garrix & Arijit Singh - Weightless (Official Video)", filter: "verified" });
    console.log("@verified", verified);
  } catch (error) {
    console.error(error);
  }
}

fetchComments();
