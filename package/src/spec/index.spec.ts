import axios from "axios";
const baseUrl = "http://localhost:4040";
async function AudioCustomData() {
  console.log("Testing /AudioCustomData");
  try {
    const response = await axios.get(`${baseUrl}/AudioCustomData`, { params: { query: "sample audio custom query", resolution: "high" } });
    console.log("/AudioCustomData Response:", response.data);
  } catch (error: any) {
    console.error("/AudioCustomData Error:", error.message || error);
  }
}
async function AudioHighestData() {
  console.log("Testing /AudioHighestData");
  try {
    const response = await axios.get(`${baseUrl}/AudioHighestData`, { params: { query: "sample audio highest query" } });
    console.log("/AudioHighestData Response:", response.data);
  } catch (error: any) {
    console.error("/AudioHighestData Error:", error.message || error);
  }
}
async function AudioLowestData() {
  console.log("Testing /AudioLowestData");
  try {
    const response = await axios.get(`${baseUrl}/AudioLowestData`, { params: { query: "sample audio lowest query" } });
    console.log("/AudioLowestData Response:", response.data);
  } catch (error: any) {
    console.error("/AudioLowestData Error:", error.message || error);
  }
}
async function VideoCustomData() {
  console.log("Testing /VideoCustomData");
  try {
    const response = await axios.get(`${baseUrl}/VideoCustomData`, { params: { query: "sample video custom query", resolution: "1080p" } });
    console.log("/VideoCustomData Response:", response.data);
  } catch (error: any) {
    console.error("/VideoCustomData Error:", error.message || error);
  }
}
async function VideoHighestData() {
  console.log("Testing /VideoHighestData");
  try {
    const response = await axios.get(`${baseUrl}/VideoHighestData`, { params: { query: "sample video highest query" } });
    console.log("/VideoHighestData Response:", response.data);
  } catch (error: any) {
    console.error("/VideoHighestData Error:", error.message || error);
  }
}
async function VideoLowestData() {
  console.log("Testing /VideoLowestData");
  try {
    const response = await axios.get(`${baseUrl}/VideoLowestData`, { params: { query: "sample video lowest query" } });
    console.log("/VideoLowestData Response:", response.data);
  } catch (error: any) {
    console.error("/VideoLowestData Error:", error.message || error);
  }
}
async function AudioVideoHighestData() {
  console.log("Testing /AudioVideoHighestData");
  try {
    const response = await axios.get(`${baseUrl}/AudioVideoHighestData`, { params: { query: "sample audio-video highest query" } });
    console.log("/AudioVideoHighestData Response:", response.data);
  } catch (error: any) {
    console.error("/AudioVideoHighestData Error:", error.message || error);
  }
}
async function AudioVideoCustomData() {
  console.log("Testing /AudioVideoCustomData");
  try {
    const response = await axios.get(`${baseUrl}/AudioVideoCustomData`, { params: { query: "sample audio-video custom query", resolution: "720p" } });
    console.log("/AudioVideoCustomData Response:", response.data);
  } catch (error: any) {
    console.error("/AudioVideoCustomData Error:", error.message || error);
  }
}
async function AudioVideoLowestData() {
  console.log("Testing /AudioVideoLowestData");
  try {
    const response = await axios.get(`${baseUrl}/AudioVideoLowestData`, { params: { query: "sample audio-video lowest query" } });
    console.log("/AudioVideoLowestData Response:", response.data);
  } catch (error: any) {
    console.error("/AudioVideoLowestData Error:", error.message || error);
  }
}
async function SearchMultipleVideos() {
  console.log("Testing /SearchMultipleVideos");
  try {
    const response = await axios.get(`${baseUrl}/SearchMultipleVideos`, { params: { query: "sample search multiple videos" } });
    console.log("/SearchMultipleVideos Response:", response.data);
  } catch (error: any) {
    console.error("/SearchMultipleVideos Error:", error.message || error);
  }
}
async function SearchSingleVideo() {
  console.log("Testing /SearchSingleVideo");
  try {
    const response = await axios.get(`${baseUrl}/SearchSingleVideo`, { params: { videoLink: "https://www.youtube.com/watch?v=sample" } });
    console.log("/SearchSingleVideo Response:", response.data);
  } catch (error: any) {
    console.error("/SearchSingleVideo Error:", error.message || error);
  }
}
async function SearchRelatedVideos() {
  console.log("Testing /SearchRelatedVideos");
  try {
    const response = await axios.get(`${baseUrl}/SearchRelatedVideos`, { params: { videoId: "sampleId" } });
    console.log("/SearchRelatedVideos Response:", response.data);
  } catch (error: any) {
    console.error("/SearchRelatedVideos Error:", error.message || error);
  }
}
async function SearchMultiplePlaylists() {
  console.log("Testing /SearchMultiplePlaylists");
  try {
    const response = await axios.get(`${baseUrl}/SearchMultiplePlaylists`, { params: { playlistLink: "sample playlist link" } });
    console.log("/SearchMultiplePlaylists Response:", response.data);
  } catch (error: any) {
    console.error("/SearchMultiplePlaylists Error:", error.message || error);
  }
}
async function SearchSinglePlaylist() {
  console.log("Testing /SearchSinglePlaylist");
  try {
    const response = await axios.get(`${baseUrl}/SearchSinglePlaylist`, { params: { playlistLink: "sample playlist link" } });
    console.log("/SearchSinglePlaylist Response:", response.data);
  } catch (error: any) {
    console.error("/SearchSinglePlaylist Error:", error.message || error);
  }
}
async function SearchVideoTranscript() {
  console.log("Testing /SearchVideoTranscript");
  try {
    const response = await axios.get(`${baseUrl}/SearchVideoTranscript`, { params: { videoLink: "https://www.youtube.com/watch?v=sample" } });
    console.log("/SearchVideoTranscript Response:", response.data);
  } catch (error: any) {
    console.error("/SearchVideoTranscript Error:", error.message || error);
  }
}
async function ExtractVideoData() {
  console.log("Testing /ExtractVideoData");
  try {
    const response = await axios.get(`${baseUrl}/ExtractVideoData`, { params: { query: "sample extract video query" } });
    console.log("/ExtractVideoData Response:", response.data);
  } catch (error: any) {
    console.error("/ExtractVideoData Error:", error.message || error);
  }
}
async function ListVideoFormats() {
  console.log("Testing /ListVideoFormats");
  try {
    const response = await axios.get(`${baseUrl}/ListVideoFormats`, { params: { query: "sample list video formats query" } });
    console.log("/ListVideoFormats Response:", response.data);
  } catch (error: any) {
    console.error("/ListVideoFormats Error:", error.message || error);
  }
}
async function runTests() {
  await AudioCustomData();
  await AudioHighestData();
  await AudioLowestData();
  await VideoCustomData();
  await VideoHighestData();
  await VideoLowestData();
  await AudioVideoHighestData();
  await AudioVideoCustomData();
  await AudioVideoLowestData();
  await SearchMultipleVideos();
  await SearchSingleVideo();
  await SearchRelatedVideos();
  await SearchMultiplePlaylists();
  await SearchSinglePlaylist();
  await SearchVideoTranscript();
  await ExtractVideoData();
  await ListVideoFormats();
}
runTests();
