import WebSocket from "ws";

const ws = new WebSocket("ws://localhost:8642")
  .on("close", () => console.log("Disconnected from WebSocket server"))
  .on("error", error => console.error("WebSocket error:", error));

ws.on("open", () => {
  ws.send(
    JSON.stringify({
      event: "VideoLowest",
      payload: {
        verbose: true,
        stream: true,
        useTor: false,
        metadata: false,
        query: "careless whisper",
      },
    }),
  );
});

ws.on("message", data => {
  const response = JSON.parse(data);
  if (response.event === "end") console.log(response.data);
  if (response.event === "error") console.log(response.data);
  if (response.event === "start") console.log(response.data);
  if (response.event === "progress") console.log(response.data);
  if (response.event === "metadata") console.log(response.data);
});

// import WebSocket from "ws";
// const ws = new WebSocket("ws://localhost:8642");

// const __Tests__ = [
// {
// route: "routeAudioLowest",
// message: JSON.stringify({
// payload: {
// query: "careless whisper",
// useTor: false,
// verbose: false,
// },
// }),
// },
// {
// route: "routeAudioHighest",
// message: JSON.stringify({
// payload: {
// query: "careless whisper",
// useTor: false,
// verbose: false,
// },
// }),
// },
// {
// route: "routeAudioCustom",
// message: JSON.stringify({
// payload: {
// query: "careless whisper",
// useTor: false,
// verbose: false,
// filter: "bassboost",
// },
// }),
// },
// {
// route: "routeVideoLowest",
// message: JSON.stringify({
// payload: {
// query: "careless whisper",
// useTor: false,
// verbose: false,
// },
// }),
// },
// {
// route: "routeVideoHighest",
// message: JSON.stringify({
// payload: {
// query: "careless whisper",
// useTor: false,
// verbose: false,
// },
// }),
// },
// {
// route: "routeVideoCustom",
// message: JSON.stringify({
// payload: {
// query: "careless whisper",
// useTor: false,
// verbose: false,
// resolution: "720p",
// },
// }),
// },
// {
// route: "routeAudioVideoLowest",
// message: JSON.stringify({
// payload: {
// query: "careless whisper",
// useTor: false,
// verbose: false,
// },
// }),
// },
// {
// route: "routeAudioVideoHighest",
// message: JSON.stringify({
// payload: {
// query: "careless whisper",
// useTor: false,
// verbose: false,
// },
// }),
// },
// {
// route: "routeAudioVideoCustom",
// message: JSON.stringify({
// payload: {
// query: "careless whisper",
// useTor: false,
// verbose: false,
// resolution: "1080p",
// },
// }),
// },
// {
// route: "routeExtract",
// message: JSON.stringify({
// payload: {
// query: "careless whisper",
// verbose: false,
// },
// }),
// },
// {
// route: "routeListFormats",
// message: JSON.stringify({
// payload: {
// query: "careless whisper",
// verbose: false,
// },
// }),
// },
// {
// route: "routePlaylistData",
// message: JSON.stringify({
// payload: {
// query: "playlist link here",
// },
// }),
// },
// {
// route: "routeSearchPlaylists",
// message: JSON.stringify({
// payload: {
// query: "careless whisper",
// },
// }),
// },
// {
// route: "routeSearchVideos",
// message: JSON.stringify({
// payload: {
// query: "careless whisper",
// },
// }),
// },
// {
// route: "routeVideoData",
// message: JSON.stringify({
// payload: {
// query: "video link here",
// },
// }),
// },
// ];

// let currentTest = 0;

// ws.on("open", () => {
// console.log("Connected to WebSocket server");
// runTest();
// });

// ws.on("message", data => {
// const response = JSON.parse(data);
// switch (response.event) {
// case "metadata":
// console.log("@metadata:", response.data);
// break;
// case "start":
// console.log("@start:", response.data);
// break;
// case "progress":
// console.log("@progress:", response.data);
// break;
// case "end":
// console.log("@end:", response.data);
// break;
// case "error":
// console.error("@error:", response.data);
// break;
// case "info":
// console.log("@info:", response.data);
// break;
// case "warning":
// console.warn("@warning:", response.data);
// break;
// default:
// console.log("@unknown-event:", response);
// }

// currentTest++;
// if (currentTest < __Tests__.length) runTest();
// else ws.close();
// });

// ws.on("close", () => console.log("Disconnected from WebSocket server"));
// ws.on("error", error => console.error("WebSocket error:", error));

// function runTest() {
// console.log(`Running test for ${__Tests__[currentTest].route}`);
// ws.send(__Tests__[currentTest].message);
// }
