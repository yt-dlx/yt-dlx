import "./api";
import path from "path";
import { app } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";

const onprod = process.env.NODE_ENV === "production";
if (onprod) serve({ directory: "app" });
else app.setPath("userData", `${app.getPath("userData")} (development)`);

(async () => {
  await app.whenReady();
  const mainWindow = createWindow("main", {
    fullscreen: true,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  switch (onprod) {
    case false:
      await mainWindow.loadURL("http://localhost:" + process.argv[2] + "/home");
      mainWindow.webContents.openDevTools();
      break;
    case true:
    default:
      await mainWindow.loadURL("app://./home");
      mainWindow.webContents.openDevTools();
      break;
  }
})();

app.on("window-all-closed", () => app.quit());
