console.clear();
import request from "supertest";
import server from "./server.spec";
/* ============================================================================ Test Runner */
async function runTests() {
  console.log("Running tests against the embedded Express server using Supertest...");
  try {
    const audioCustom = await request(server).get("/AudioCustomData").query({ query: "Rick Astley Never Gonna Give You Up", resolution: "high" });
    console.log("/AudioCustomData Response:", audioCustom.body);
  } catch (error: any) {
    console.error("/AudioCustomData Error:", error.message || error);
  }
  try {
    const audioHighest = await request(server).get("/AudioHighestData").query({ query: "Queen Bohemian Rhapsody Official Audio" });
    console.log("/AudioHighestData Response:", audioHighest.body);
  } catch (error: any) {
    console.error("/AudioHighestData Error:", error.message || error);
  }
  try {
    const audioLowest = await request(server).get("/AudioLowestData").query({ query: "Classical Piano Music" });
    console.log("/AudioLowestData Response:", audioLowest.body);
  } catch (error: any) {
    console.error("/AudioLowestData Error:", error.message || error);
  }
  try {
    const videoCustom = await request(server).get("/VideoCustomData").query({ query: "Rick Astley Never Gonna Give You Up Official Video", resolution: "1080p" });
    console.log("/VideoCustomData Response:", videoCustom.body);
  } catch (error: any) {
    console.error("/VideoCustomData Error:", error.message || error);
  }
  try {
    const videoHighest = await request(server).get("/VideoHighestData").query({ query: "The Beatles Hey Jude Official Video" });
    console.log("/VideoHighestData Response:", videoHighest.body);
  } catch (error: any) {
    console.error("/VideoHighestData Error:", error.message || error);
  }
  try {
    const videoLowest = await request(server).get("/VideoLowestData").query({ query: "Relaxing Nature Videos" });
    console.log("/VideoLowestData Response:", videoLowest.body);
  } catch (error: any) {
    console.error("/VideoLowestData Error:", error.message || error);
  }
  try {
    const audioVideoHighest = await request(server).get("/AudioVideoHighestData").query({ query: "Ed Sheeran Shape of You Official" });
    console.log("/AudioVideoHighestData Response:", audioVideoHighest.body);
  } catch (error: any) {
    console.error("/AudioVideoHighestData Error:", error.message || error);
  }
  try {
    const audioVideoCustom = await request(server).get("/AudioVideoCustomData").query({ query: "Coldplay Viva la Vida Official", resolution: "720p" });
    console.log("/AudioVideoCustomData Response:", audioVideoCustom.body);
  } catch (error: any) {
    console.error("/AudioVideoCustomData Error:", error.message || error);
  }
  try {
    const audioVideoLowest = await request(server).get("/AudioVideoLowestData").query({ query: "Ambient Instrumental Music" });
    console.log("/AudioVideoLowestData Response:", audioVideoLowest.body);
  } catch (error: any) {
    console.error("/AudioVideoLowestData Error:", error.message || error);
  }
  try {
    const searchMultipleVideos = await request(server).get("/SearchMultipleVideos").query({ query: "best music videos 2023" });
    console.log("/SearchMultipleVideos Response:", searchMultipleVideos.body);
  } catch (error: any) {
    console.error("/SearchMultipleVideos Error:", error.message || error);
  }
  try {
    const searchSingleVideo = await request(server).get("/SearchSingleVideo").query({ videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" });
    console.log("/SearchSingleVideo Response:", searchSingleVideo.body);
  } catch (error: any) {
    console.error("/SearchSingleVideo Error:", error.message || error);
  }
  try {
    const searchRelatedVideos = await request(server).get("/SearchRelatedVideos").query({ videoId: "dQw4w9WgXcQ" });
    console.log("/SearchRelatedVideos Response:", searchRelatedVideos.body);
  } catch (error: any) {
    console.error("/SearchRelatedVideos Error:", error.message || error);
  }
  try {
    const searchMultiplePlaylists = await request(server).get("/SearchMultiplePlaylists").query({ playlistLink: "https://www.youtube.com/playlist?list=PLFgquLnL59amEj2ur28aqbY6r--7T4O-b" });
    console.log("/SearchMultiplePlaylists Response:", searchMultiplePlaylists.body);
  } catch (error: any) {
    console.error("/SearchMultiplePlaylists Error:", error.message || error);
  }
  try {
    const searchSinglePlaylist = await request(server).get("/SearchSinglePlaylist").query({ playlistLink: "https://www.youtube.com/playlist?list=PLFgquLnL59amEj2ur28aqbY6r--7T4O-b" });
    console.log("/SearchSinglePlaylist Response:", searchSinglePlaylist.body);
  } catch (error: any) {
    console.error("/SearchSinglePlaylist Error:", error.message || error);
  }
  try {
    const searchVideoTranscript = await request(server).get("/SearchVideoTranscript").query({ videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" });
    console.log("/SearchVideoTranscript Response:", searchVideoTranscript.body);
  } catch (error: any) {
    console.error("/SearchVideoTranscript Error:", error.message || error);
  }
  try {
    const extractVideoData = await request(server).get("/ExtractVideoData").query({ query: "Trevor Noah The Daily Show" });
    console.log("/ExtractVideoData Response:", extractVideoData.body);
  } catch (error: any) {
    console.error("/ExtractVideoData Error:", error.message || error);
  }
  try {
    const listVideoFormats = await request(server).get("/ListVideoFormats").query({ query: "Eminem Rap God" });
    console.log("/ListVideoFormats Response:", listVideoFormats.body);
  } catch (error: any) {
    console.error("/ListVideoFormats Error:", error.message || error);
  }
}
runTests();
