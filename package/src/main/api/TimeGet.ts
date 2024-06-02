import { BrowserWindow } from "electron";

export default function registerIpcHandlers(_ipcMain: Electron.IpcMain) {
  setInterval(() => {
    BrowserWindow.getAllWindows().forEach((window) => {
      window.webContents.send("TimeGet", new Date().toLocaleTimeString());
    });
  }, 1000);
}
