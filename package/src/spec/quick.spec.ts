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
async function Account_Functions() {
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
  async function WatchHistoryTest() {
    console.log(colors.blue("@info"), "Test For WatchHistory: (1): Fetch watch history with only the cookiesPath");
    YouTubeDLX.Account.History({ cookiesPath: path.resolve(process.cwd(), "./cookies.txt") })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For WatchHistory: (2): Fetch watch history with cookiesPath and verbose output enabled");
    YouTubeDLX.Account.History({ cookiesPath: path.resolve(process.cwd(), "./cookies.txt"), verbose: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For WatchHistory: (3): Fetch watch history with cookiesPath and sorting by 'oldest'");
    YouTubeDLX.Account.History({ cookiesPath: path.resolve(process.cwd(), "./cookies.txt"), sort: "oldest" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For WatchHistory: (4): Fetch watch history with cookiesPath and sorting by 'newest'");
    YouTubeDLX.Account.History({ cookiesPath: path.resolve(process.cwd(), "./cookies.txt"), sort: "newest" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For WatchHistory: (5): Fetch watch history with cookiesPath and sorting by 'old-to-new'");
    YouTubeDLX.Account.History({ cookiesPath: path.resolve(process.cwd(), "./cookies.txt"), sort: "old-to-new" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For WatchHistory: (6): Fetch watch history with cookiesPath and sorting by 'new-to-old'");
    YouTubeDLX.Account.History({ cookiesPath: path.resolve(process.cwd(), "./cookies.txt"), sort: "new-to-old" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For WatchHistory: (7): Fetch watch history with all parameters (cookiesPath, verbose, and sort)");
    YouTubeDLX.Account.History({ cookiesPath: path.resolve(process.cwd(), "./cookies.txt"), verbose: true, sort: "new-to-old" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
  }
}
// ==================================================================================
// ==================================================================================
async function Aduio_Functions() {
  async function AudioCustomTest() {
    console.log(colors.blue("@info"), "Test For AudioCustom: (1): Download and process audio with only the query and resolution");
    YouTubeDLX.Audio.Custom({ query: "test song", resolution: "high" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioCustom: (2): Download and process audio with query, resolution, and verbose output enabled");
    YouTubeDLX.Audio.Custom({ query: "test song", resolution: "high", verbose: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioCustom: (3): Download and process audio with query, resolution, and custom output folder");
    YouTubeDLX.Audio.Custom({ query: "test song", resolution: "high", output: path.resolve(process.cwd(), "./output") })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioCustom: (4): Download and stream audio with query, resolution, and stream enabled");
    YouTubeDLX.Audio.Custom({ query: "test song", resolution: "high", stream: true })
      .on("stream", streamData => console.log(colors.green("@stream:"), streamData))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioCustom: (5): Download and process audio with query, resolution, and audio filter applied");
    YouTubeDLX.Audio.Custom({ query: "test song", resolution: "high", filter: "bassboost" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioCustom: (6): Download and process audio with metadata instead of downloading the audio");
    YouTubeDLX.Audio.Custom({ query: "test song", resolution: "high", metadata: true })
      .on("metadata", metadata => console.log(colors.green("@metadata:"), metadata))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioCustom: (7): Download and process audio with all parameters (query, resolution, output, stream, filter, verbose, metadata)");
    YouTubeDLX.Audio.Custom({ query: "test song", resolution: "high", output: path.resolve(process.cwd(), "./output"), stream: true, filter: "echo", verbose: true, metadata: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
  }
  async function AudioHighestTest() {
    console.log(colors.blue("@info"), "Test For AudioHighest: (1): Download and process highest quality audio with only the query and filter");
    YouTubeDLX.Audio.Highest({ query: "test song", filter: "bassboost" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioHighest: (2): Download and process highest quality audio with query, filter, and verbose output enabled");
    YouTubeDLX.Audio.Highest({ query: "test song", filter: "bassboost", verbose: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioHighest: (3): Download and process highest quality audio with query, filter, and custom output folder");
    YouTubeDLX.Audio.Highest({ query: "test song", filter: "bassboost", output: path.resolve(process.cwd(), "./output") })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioHighest: (4): Stream highest quality audio with query and stream enabled");
    YouTubeDLX.Audio.Highest({ query: "test song", stream: true })
      .on("stream", streamData => console.log(colors.green("@stream:"), streamData))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioHighest: (5): Download and process highest quality audio with query, filter, and metadata output enabled");
    YouTubeDLX.Audio.Highest({ query: "test song", filter: "bassboost", metadata: true })
      .on("metadata", metadata => console.log(colors.green("@metadata:"), metadata))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioHighest: (6): Download and process highest quality audio with query, filter, stream, and metadata");
    YouTubeDLX.Audio.Highest({ query: "test song", filter: "bassboost", stream: true, metadata: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioHighest: (7): Download and process highest quality audio with all parameters (query, output, filter, stream, verbose, metadata)");
    YouTubeDLX.Audio.Highest({ query: "test song", output: path.resolve(process.cwd(), "./output"), filter: "bassboost", stream: true, verbose: true, metadata: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
  }
  async function AudioLowestTest() {
    console.log(colors.blue("@info"), "Test For AudioLowest: (1): Download and process lowest quality audio with only the query and filter");
    YouTubeDLX.Audio.Lowest({ query: "test song", filter: "bassboost" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioLowest: (2): Download and process lowest quality audio with query, filter, and verbose output enabled");
    YouTubeDLX.Audio.Lowest({ query: "test song", filter: "bassboost", verbose: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioLowest: (3): Download and process lowest quality audio with query, filter, and custom output folder");
    YouTubeDLX.Audio.Lowest({ query: "test song", filter: "bassboost", output: path.resolve(process.cwd(), "./output") })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioLowest: (4): Stream lowest quality audio with query and stream enabled");
    YouTubeDLX.Audio.Lowest({ query: "test song", stream: true })
      .on("stream", streamData => console.log(colors.green("@stream:"), streamData))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioLowest: (5): Download and process lowest quality audio with query, filter, and metadata output enabled");
    YouTubeDLX.Audio.Lowest({ query: "test song", filter: "bassboost", metadata: true })
      .on("metadata", metadata => console.log(colors.green("@metadata:"), metadata))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioLowest: (6): Download and process lowest quality audio with query, filter, stream, and metadata");
    YouTubeDLX.Audio.Lowest({ query: "test song", filter: "bassboost", stream: true, metadata: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioLowest: (7): Download and process lowest quality audio with all parameters (query, output, filter, stream, verbose, metadata)");
    YouTubeDLX.Audio.Lowest({ query: "test song", output: path.resolve(process.cwd(), "./output"), filter: "bassboost", stream: true, verbose: true, metadata: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
  }
}
// ==================================================================================
// ==================================================================================
async function Audio_Video_Functions() {
  async function AudioVideoCustomTest() {
    console.log(colors.blue("@info"), "Test For AudioVideoCustom: (1): Download and process audio and video with only the query, resolution, and filter");
    YouTubeDLX.Audio_Video.Custom({ query: "test song", resolution: "720p", filter: "grayscale" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioVideoCustom: (2): Download and process audio and video with query, resolution, filter, and verbose output enabled");
    YouTubeDLX.Audio_Video.Custom({ query: "test song", resolution: "720p", filter: "grayscale", verbose: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioVideoCustom: (3): Download and process audio and video with query, resolution, and custom output folder");
    YouTubeDLX.Audio_Video.Custom({ query: "test song", resolution: "720p", filter: "grayscale", output: path.resolve(process.cwd(), "./output") })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioVideoCustom: (4): Stream audio and video with query, resolution, and stream enabled");
    YouTubeDLX.Audio_Video.Custom({ query: "test song", resolution: "720p", stream: true })
      .on("stream", streamData => console.log(colors.green("@stream:"), streamData))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioVideoCustom: (5): Download and process audio and video with query, resolution, filter, and metadata output enabled");
    YouTubeDLX.Audio_Video.Custom({ query: "test song", resolution: "720p", filter: "grayscale", metadata: true })
      .on("metadata", metadata => console.log(colors.green("@metadata:"), metadata))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioVideoCustom: (6): Download and process audio and video with query, resolution, filter, stream, and metadata");
    YouTubeDLX.Audio_Video.Custom({ query: "test song", resolution: "720p", filter: "grayscale", stream: true, metadata: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioVideoCustom: (7): Download and process audio and video with all parameters (query, output, filter, stream, verbose, metadata, resolution)");
    YouTubeDLX.Audio_Video.Custom({ query: "test song", output: path.resolve(process.cwd(), "./output"), resolution: "720p", filter: "grayscale", stream: true, verbose: true, metadata: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
  }
  async function AudioVideoHighestTest() {
    console.log(colors.blue("@info"), "Test For AudioVideoHighest: (1): Download and process highest quality audio and video with only the query and filter");
    YouTubeDLX.Audio_Video.Highest({ query: "test song", filter: "grayscale" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioVideoHighest: (2): Download and process highest quality audio and video with query, filter, and verbose output enabled");
    YouTubeDLX.Audio_Video.Highest({ query: "test song", filter: "grayscale", verbose: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioVideoHighest: (3): Download and process highest quality audio and video with query, filter, and custom output folder");
    YouTubeDLX.Audio_Video.Highest({ query: "test song", filter: "grayscale", output: path.resolve(process.cwd(), "./output") })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioVideoHighest: (4): Stream highest quality audio and video with query, filter, and stream enabled");
    YouTubeDLX.Audio_Video.Highest({ query: "test song", filter: "grayscale", stream: true })
      .on("stream", streamData => console.log(colors.green("@stream:"), streamData))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioVideoHighest: (5): Download and process highest quality audio and video with query, filter, and metadata output enabled");
    YouTubeDLX.Audio_Video.Highest({ query: "test song", filter: "grayscale", metadata: true })
      .on("metadata", metadata => console.log(colors.green("@metadata:"), metadata))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioVideoHighest: (6): Download and process highest quality audio and video with query, filter, stream, and metadata");
    YouTubeDLX.Audio_Video.Highest({ query: "test song", filter: "grayscale", stream: true, metadata: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioVideoHighest: (7): Download and process highest quality audio and video with all parameters (query, output, filter, stream, verbose, metadata)");
    YouTubeDLX.Audio_Video.Highest({ query: "test song", output: path.resolve(process.cwd(), "./output"), filter: "grayscale", stream: true, verbose: true, metadata: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
  }
  async function AudioVideoLowestTest() {
    console.log(colors.blue("@info"), "Test For AudioVideoLowest: (1): Download and process lowest quality audio and video with only the query and filter");
    YouTubeDLX.Audio_Video.Lowest({ query: "test song", filter: "grayscale" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioVideoLowest: (2): Download and process lowest quality audio and video with query, filter, and verbose output enabled");
    YouTubeDLX.Audio_Video.Lowest({ query: "test song", filter: "grayscale", verbose: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioVideoLowest: (3): Download and process lowest quality audio and video with query, filter, and custom output folder");
    YouTubeDLX.Audio_Video.Lowest({ query: "test song", filter: "grayscale", output: path.resolve(process.cwd(), "./output") })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioVideoLowest: (4): Stream lowest quality audio and video with query, filter, and stream enabled");
    YouTubeDLX.Audio_Video.Lowest({ query: "test song", filter: "grayscale", stream: true })
      .on("stream", streamData => console.log(colors.green("@stream:"), streamData))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioVideoLowest: (5): Download and process lowest quality audio and video with query, filter, and metadata output enabled");
    YouTubeDLX.Audio_Video.Lowest({ query: "test song", filter: "grayscale", metadata: true })
      .on("metadata", metadata => console.log(colors.green("@metadata:"), metadata))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioVideoLowest: (6): Download and process lowest quality audio and video with query, filter, stream, and metadata");
    YouTubeDLX.Audio_Video.Lowest({ query: "test song", filter: "grayscale", stream: true, metadata: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For AudioVideoLowest: (7): Download and process lowest quality audio and video with all parameters (query, output, filter, stream, verbose, metadata)");
    YouTubeDLX.Audio_Video.Lowest({ query: "test song", output: path.resolve(process.cwd(), "./output"), filter: "grayscale", stream: true, verbose: true, metadata: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
  }
}
// ==================================================================================
// ==================================================================================
async function Video_Functions() {
  async function VideoCustomTest() {
    console.log(colors.blue("@info"), "Test For VideoCustom: (1): Process a video with only the query and resolution");
    YouTubeDLX.Video.Custom({ query: "test video", resolution: "720p" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoCustom: (2): Process a video with the query, resolution, and a filter (grayscale)");
    YouTubeDLX.Video.Custom({ query: "test video", resolution: "1080p", filter: "grayscale" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoCustom: (3): Stream a video with the query, resolution, and stream option enabled");
    YouTubeDLX.Video.Custom({ query: "test video", resolution: "480p", stream: true })
      .on("stream", streamData => console.log(colors.green("@stream:"), streamData))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoCustom: (4): Process a video with verbose output enabled");
    YouTubeDLX.Video.Custom({ query: "test video", resolution: "720p", verbose: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoCustom: (5): Fetch metadata instead of processing the video");
    YouTubeDLX.Video.Custom({ query: "test video", resolution: "1080p", metadata: true })
      .on("metadata", metadata => console.log(colors.green("@metadata:"), metadata))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoCustom: (6): Process a video with query, resolution, filter, stream, and metadata");
    YouTubeDLX.Video.Custom({ query: "test video", resolution: "720p", filter: "grayscale", stream: true, metadata: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoCustom: (7): Process a video with all parameters (query, output, filter, stream, verbose, metadata, resolution)");
    YouTubeDLX.Video.Custom({ query: "test video", output: path.resolve(process.cwd(), "./output"), resolution: "720p", filter: "grayscale", stream: true, verbose: true, metadata: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
  }
  async function VideoHighestTest() {
    console.log(colors.blue("@info"), "Test For VideoHighest: (1): Process the highest quality video with only the query");
    YouTubeDLX.Video.Highest({ query: "test video" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoHighest: (2): Process the highest quality video with the query and a filter (grayscale)");
    YouTubeDLX.Video.Highest({ query: "test video", filter: "grayscale" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoHighest: (3): Stream the highest quality video with the query and stream option enabled");
    YouTubeDLX.Video.Highest({ query: "test video", stream: true })
      .on("stream", streamData => console.log(colors.green("@stream:"), streamData))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoHighest: (4): Process the highest quality video with verbose output enabled");
    YouTubeDLX.Video.Highest({ query: "test video", verbose: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoHighest: (5): Fetch metadata instead of processing the video");
    YouTubeDLX.Video.Highest({ query: "test video", metadata: true })
      .on("metadata", metadata => console.log(colors.green("@metadata:"), metadata))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoHighest: (6): Process the highest quality video with query, filter, stream, and metadata");
    YouTubeDLX.Video.Highest({ query: "test video", filter: "grayscale", stream: true, metadata: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoHighest: (7): Process the highest quality video with all parameters (query, output, filter, stream, verbose, metadata)");
    YouTubeDLX.Video.Highest({ query: "test video", output: path.resolve(process.cwd(), "./output"), filter: "grayscale", stream: true, verbose: true, metadata: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
  }
  async function VideoLowestTest() {
    console.log(colors.blue("@info"), "Test For VideoLowest: (1): Process the lowest quality video with only the query");
    YouTubeDLX.Video.Lowest({ query: "test video" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoLowest: (2): Process the lowest quality video with the query and a filter (grayscale)");
    YouTubeDLX.Video.Lowest({ query: "test video", filter: "grayscale" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoLowest: (3): Stream the lowest quality video with the query and stream option enabled");
    YouTubeDLX.Video.Lowest({ query: "test video", stream: true })
      .on("stream", streamData => console.log(colors.green("@stream:"), streamData))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoLowest: (4): Process the lowest quality video with verbose output enabled");
    YouTubeDLX.Video.Lowest({ query: "test video", verbose: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoLowest: (5): Fetch metadata instead of processing the video");
    YouTubeDLX.Video.Lowest({ query: "test video", metadata: true })
      .on("metadata", metadata => console.log(colors.green("@metadata:"), metadata))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoLowest: (6): Process the lowest quality video with query, filter, stream, and metadata");
    YouTubeDLX.Video.Lowest({ query: "test video", filter: "grayscale", stream: true, metadata: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For VideoLowest: (7): Process the lowest quality video with all parameters (query, output, filter, stream, verbose, metadata)");
    YouTubeDLX.Video.Lowest({ query: "test video", output: path.resolve(process.cwd(), "./output"), filter: "grayscale", stream: true, verbose: true, metadata: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
  }
}
// ==================================================================================
// ==================================================================================
async function Search_Functions() {
  async function AdvanceSearchTest() {
    console.log(colors.blue("@info"), "Test For Advance_Search: (1): Basic search with only the query");
    YouTubeDLX.Search.Video.Advance_Search({ query: "test video" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For Advance_Search: (2): Search with minimum view count");
    YouTubeDLX.Search.Video.Advance_Search({ query: "test video", minViews: 1000 })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For Advance_Search: (3): Search with maximum view count");
    YouTubeDLX.Search.Video.Advance_Search({ query: "test video", maxViews: 100000 })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For Advance_Search: (4): Search with both minViews and maxViews");
    YouTubeDLX.Search.Video.Advance_Search({ query: "test video", minViews: 500, maxViews: 50000 })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For Advance_Search: (5): Search with ordering by view count");
    YouTubeDLX.Search.Video.Advance_Search({ query: "test video", orderBy: "viewCount" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For Advance_Search: (6): Search with verbose output enabled");
    YouTubeDLX.Search.Video.Advance_Search({ query: "test video", verbose: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For Advance_Search: (7): Search with order by date");
    YouTubeDLX.Search.Video.Advance_Search({ query: "test video", orderBy: "date" })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
    console.log(colors.blue("@info"), "Test For Advance_Search: (8): Search with all parameters (query, minViews, maxViews, orderBy, verbose)");
    YouTubeDLX.Search.Video.Advance_Search({ query: "test video", minViews: 1000, maxViews: 100000, orderBy: "viewCount", verbose: true })
      .on("data", data => console.log(colors.green("@data:"), data))
      .on("error", error => console.error(colors.red("@error:"), error));
  }
}
