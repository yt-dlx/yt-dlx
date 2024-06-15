import path from "path";
import axios from "axios";
import ytdlx from "yt-dlx";
import colors from "colors";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import { ipcMain as api, dialog, app } from "electron";
import { singleVideoType, searchVideosType } from "yt-dlx/out/types/web";
const onprod = process.env.NODE_ENV === "production";
if (onprod) serve({ directory: "app" });
else app.setPath("userData", `${app.getPath("userData")} (development)`);
(async () => {
  await app.whenReady();
  const mainWindow = createWindow("main", {
    show: true,
    width: 900,
    height: 670,
    autoHideMenuBar: true,
    webPreferences: {
      sandbox: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  switch (onprod) {
    case false:
      await mainWindow.loadURL("http://localhost:" + process.argv[2] + "/home");
      mainWindow.webContents.openDevTools();
      break;
    default:
      await mainWindow.loadURL("app://./home");
      break;
  }
})();
api.on("search", async (event, response) => {
  try {
    let TubeBody: singleVideoType | searchVideosType[];
    if (response.videoId) {
      console.log(colors.green("❓ videoId:"), colors.italic(response.videoId));
      TubeBody = await ytdlx.ytSearch.Video.Single({
        query: "https://youtu.be/" + response.videoId,
      });
      if (TubeBody) event.reply("search", TubeBody);
      else event.sender.send("search", null);
    } else {
      console.log(colors.green("❓ query:"), colors.italic(response.query));
      TubeBody = await ytdlx.ytSearch.Video.Multiple({
        query: response.query,
      });
      if (TubeBody) event.reply("search", TubeBody);
      else event.sender.send("search", null);
    }
  } catch (error) {
    event.reply("search", error.message);
  }
});
api.on("meta", async (event, response) => {
  const params = {
    useTor: true,
    verbose: true,
    metadata: true,
    query: response.query,
  };
  axios
    .get("http://localhost:8642/api/meta", { params })
    .then(response => event.reply("start", response.data))
    .catch(error => event.reply("error", error));
});
api.handle("select-output-folder", async event => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });
  if (result.canceled) return null;
  else return result.filePaths[0];
});
app.on("window-all-closed", () => app.quit());
// =====================================================================================
// import path from "path";
// import ytdlx from "yt-dlx";
// import WebSocket from "ws";
// import colors from "colors";
// import serve from "electron-serve";
// import { createWindow } from "./helpers";
// import { ipcMain as api, dialog, app } from "electron";
// import { singleVideoType, searchVideosType } from "yt-dlx/out/types/web";
// const ws = new WebSocket("ws://localhost:8642");
// const onprod = process.env.NODE_ENV === "production";
// if (onprod) serve({ directory: "app" });
// else app.setPath("userData", `${app.getPath("userData")} (development)`);
// (async () => {
// await app.whenReady();
// const mainWindow = createWindow("main", {
// fullscreen: true,
// autoHideMenuBar: true,
// webPreferences: {
// preload: path.join(__dirname, "preload.js"),
// },
// });
// switch (onprod) {
// case false:
// await mainWindow.loadURL(`http://localhost:${process.argv[2]}/home`);
// mainWindow.webContents.openDevTools();
// break;
// default:
// await mainWindow.loadURL("app://./home");
// break;
// }
// })();
// api.on("search", async (event, response) => {
// try {
// let TubeBody: singleVideoType | searchVideosType[];
// if (response.videoId) {
// console.log(colors.green("❓ videoId:"), colors.italic(response.videoId));
// TubeBody = await ytdlx.ytSearch.Video.Single({
// query: `https://youtu.be/${response.videoId}`,
// });
// } else {
// console.log(colors.green("❓ query:"), colors.italic(response.query));
// TubeBody = await ytdlx.ytSearch.Video.Multiple({
// query: response.query,
// });
// }
// if (TubeBody) event.reply("search", TubeBody);
// else event.sender.send("search", null);
// } catch (error) {
// event.reply("search", error.message);
// }
// });
// api.on("meta", async (event, response) => {
// ws.send(
// JSON.stringify({
// action: "meta",
// payload: {
// query: response.query,
// verbose: true,
// useTor: true,
// },
// }),
// );
// ws.once("message", (message: string) => {
// try {
// const response = JSON.parse(message);
// if (response.success) event.sender.send("start", response.data);
// else event.sender.send("error", response.error);
// } catch (error) {
// console.error("@error: parsing JSON:", error);
// }
// });
// });
// api.handle("select-output-folder", async event => {
// const result = await dialog.showOpenDialog({
// properties: ["openDirectory"],
// });
// if (result.canceled) return null;
// else return result.filePaths[0];
// });
// app.on("window-all-closed", () => app.quit());
// ws.on("close", () => console.log("Disconnected from WebSocket server"));
// ws.on("error", error => console.error("WebSocket error:", error));
