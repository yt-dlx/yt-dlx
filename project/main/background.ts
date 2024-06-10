// ==============================================[ Imports ]==============================================
import path from "path";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import { app, ipcMain as api } from "electron";
// ==============================================[ Imports ]==============================================
//
//
//
// ============================================[ App Handlers ]============================================
const isProd = process.env.NODE_ENV === "production";
if (isProd) serve({ directory: "app" });
else app.setPath("userData", `${app.getPath("userData")} (development)`);
(async () => {
  await app.whenReady();
  const mainWindow = createWindow("main", {
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  if (isProd) await mainWindow.loadURL("app://./home");
  const port = process.argv[2];
  await mainWindow.loadURL(`http://localhost:${port}/home`);
  mainWindow.webContents.openDevTools();
})();
app.on("window-all-closed", () => app.quit());
// ============================================[ App Handlers ]============================================
//
//
//
// ============================================[ IPC Handlers ]============================================
api.on("time", async (event, response) => event.reply("time", response));
// ============================================[ IPC Handlers ]============================================
