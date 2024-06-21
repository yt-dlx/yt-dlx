import path from "path";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import { ipcMain, dialog, app } from "electron";

const onprod = process.env.NODE_ENV === "production";
if (onprod) serve({ directory: "app" });
else app.setPath("userData", `${app.getPath("userData")} (development)`);

(async () => {
  await app.whenReady();
  const mainWindow = createWindow("main", {
    show: true,
    width: 800,
    height: 600,
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
ipcMain.handle("select-output-folder", async event => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });
  if (result.canceled) return null;
  else return result.filePaths[0];
});
app.on("window-all-closed", () => app.quit());
