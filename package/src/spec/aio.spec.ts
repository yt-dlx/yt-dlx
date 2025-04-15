console.clear();
import path from "path";
import request from "supertest";
import server from "./server.spec";
async function runTests() {
  /* ============================================================================ AUDIO Endpoints */
  try {
    const audioCustom = await request(server).get("/AudioCustom").query({ query: "Rick Astley Never Gonna Give You Up", resolution: "high" });
    console.log("/AudioCustom Response:", audioCustom.body);
  } catch (error) {
    console.error("/AudioCustom Error:", (error as Error).message || error);
  }
  try {
    const audioHighest = await request(server).get("/AudioHighest").query({ query: "Queen Bohemian Rhapsody Official Audio" });
    console.log("/AudioHighest Response:", audioHighest.body);
  } catch (error) {
    console.error("/AudioHighest Error:", (error as Error).message || error);
  }
  try {
    const audioLowest = await request(server).get("/AudioLowest").query({ query: "Classical Piano Music" });
    console.log("/AudioLowest Response:", audioLowest.body);
  } catch (error) {
    console.error("/AudioLowest Error:", (error as Error).message || error);
  }
  /* ============================================================================ VIDEO Endpoints */
  try {
    const videoCustom = await request(server).get("/VideoCustom").query({ query: "Rick Astley Never Gonna Give You Up Official Video", resolution: "1080p" });
    console.log("/VideoCustom Response:", videoCustom.body);
  } catch (error) {
    console.error("/VideoCustom Error:", (error as Error).message || error);
  }
  try {
    const videoHighest = await request(server).get("/VideoHighest").query({ query: "The Beatles Hey Jude Official Video" });
    console.log("/VideoHighest Response:", videoHighest.body);
  } catch (error) {
    console.error("/VideoHighest Error:", (error as Error).message || error);
  }
  try {
    const videoLowest = await request(server).get("/VideoLowest").query({ query: "Relaxing Nature Videos" });
    console.log("/VideoLowest Response:", videoLowest.body);
  } catch (error) {
    console.error("/VideoLowest Error:", (error as Error).message || error);
  }
  /* ============================================================================ AUDIO & VIDEO Endpoints */
  try {
    const audioVideoHighest = await request(server).get("/AudioVideoHighest").query({ query: "Ed Sheeran Shape of You Official" });
    console.log("/AudioVideoHighest Response:", audioVideoHighest.body);
  } catch (error) {
    console.error("/AudioVideoHighest Error:", (error as Error).message || error);
  }
  try {
    const audioVideoCustom = await request(server).get("/AudioVideoCustom").query({ query: "Coldplay Viva la Vida Official", resolution: "720p" });
    console.log("/AudioVideoCustom Response:", audioVideoCustom.body);
  } catch (error) {
    console.error("/AudioVideoCustom Error:", (error as Error).message || error);
  }
  try {
    const audioVideoLowest = await request(server).get("/AudioVideoLowest").query({ query: "Ambient Instrumental Music" });
    console.log("/AudioVideoLowest Response:", audioVideoLowest.body);
  } catch (error) {
    console.error("/AudioVideoLowest Error:", (error as Error).message || error);
  }
  /* ============================================================================ SEARCH Endpoints */
  try {
    const searchMultipleVideos = await request(server).get("/SearchMultipleVideos").query({ query: "best music videos 2023" });
    console.log("/SearchMultipleVideos Response:", searchMultipleVideos.body);
  } catch (error) {
    console.error("/SearchMultipleVideos Error:", (error as Error).message || error);
  }
  try {
    const searchSingleVideo = await request(server).get("/SearchSingleVideo").query({ videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" });
    console.log("/SearchSingleVideo Response:", searchSingleVideo.body);
  } catch (error) {
    console.error("/SearchSingleVideo Error:", (error as Error).message || error);
  }
  try {
    const searchRelatedVideos = await request(server).get("/SearchRelatedVideos").query({ videoId: "dQw4w9WgXcQ" });
    console.log("/SearchRelatedVideos Response:", searchRelatedVideos.body);
  } catch (error) {
    console.error("/SearchRelatedVideos Error:", (error as Error).message || error);
  }
  try {
    const searchMultiplePlaylists = await request(server).get("/SearchMultiplePlaylists").query({ playlistLink: "https://www.youtube.com/playlist?list=PLFgquLnL59amEj2ur28aqbY6r--7T4O-b" });
    console.log("/SearchMultiplePlaylists Response:", searchMultiplePlaylists.body);
  } catch (error) {
    console.error("/SearchMultiplePlaylists Error:", (error as Error).message || error);
  }
  try {
    const searchSinglePlaylist = await request(server).get("/SearchSinglePlaylist").query({ playlistLink: "https://www.youtube.com/playlist?list=PLFgquLnL59amEj2ur28aqbY6r--7T4O-b" });
    console.log("/SearchSinglePlaylist Response:", searchSinglePlaylist.body);
  } catch (error) {
    console.error("/SearchSinglePlaylist Error:", (error as Error).message || error);
  }
  try {
    const searchVideoTranscript = await request(server).get("/SearchVideoTranscript").query({ videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" });
    console.log("/SearchVideoTranscript Response:", searchVideoTranscript.body);
  } catch (error) {
    console.error("/SearchVideoTranscript Error:", (error as Error).message || error);
  }
  /* ============================================================================ INFO Endpoints */
  try {
    const extractVideo = await request(server).get("/ExtractVideo").query({ query: "Trevor Noah The Daily Show" });
    console.log("/ExtractVideo Response:", extractVideo.body);
  } catch (error) {
    console.error("/ExtractVideo Error:", (error as Error).message || error);
  }
  try {
    const listVideoFormats = await request(server).get("/ListVideoFormats").query({ query: "Eminem Rap God" });
    console.log("/ListVideoFormats Response:", listVideoFormats.body);
  } catch (error) {
    console.error("/ListVideoFormats Error:", (error as Error).message || error);
  }
  /* ============================================================================ ACCOUNT Endpoints */
  try {
    const homeFeed = await request(server)
      .get("/HomeFeed")
      .query({ cookiesPath: path.resolve(process.cwd(), "cookies.txt") });
    console.log("/HomeFeed Response:", homeFeed.body);
  } catch (error) {
    console.error("/HomeFeed Error:", (error as Error).message || error);
  }
  try {
    const subscriptionFeed = await request(server)
      .get("/SubscriptionFeed")
      .query({ cookiesPath: path.resolve(process.cwd(), "cookies.txt") });
    console.log("/SubscriptionFeed Response:", subscriptionFeed.body);
  } catch (error) {
    console.error("/SubscriptionFeed Error:", (error as Error).message || error);
  }
  try {
    const unseenNotifications = await request(server)
      .get("/UnseenNotifications")
      .query({ cookiesPath: path.resolve(process.cwd(), "cookies.txt") });
    console.log("/UnseenNotifications Response:", unseenNotifications.body);
  } catch (error) {
    console.error("/UnseenNotifications Error:", (error as Error).message || error);
  }
  try {
    const watchHistory = await request(server)
      .get("/WatchHistory")
      .query({ cookiesPath: path.resolve(process.cwd(), "cookies.txt") });
    console.log("/WatchHistory Response:", watchHistory.body);
  } catch (error) {
    console.error("/WatchHistory Error:", (error as Error).message || error);
  }
}
console.log("Running tests against the embedded Express server using Supertest...");
runTests();
