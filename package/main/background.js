import path from "path";
import serve from "electron-serve";
import { exec } from "child_process";
import { app, ipcMain } from "electron";
import { createWindow } from "./helpers";

const isProd = process.env.NODE_ENV === "production";

async function startProcess(event, value) {
  if (event) {
    let scriptPath;
    if (isProd) {
      const parentDir = path.dirname(path.dirname(path.dirname(__dirname)));
      scriptPath = path.join(parentDir, "scripts/runner.sh");
    } else scriptPath = path.join(__dirname, "../scripts/runner.sh");
    const cmd = `sh "${scriptPath}" ${value}`;
    exec(cmd, (error, stdout) => {
      if (error) {
        console.error(`ERROR: Error executing post-install script: ${error}`);
        event.sender.send("log", error.message);
        return;
      }
      event.sender.send("log", "Python script executed successfully");
      event.sender.send("message", stdout);
    });
  }
}

ipcMain.on("run-sh", async (event, value) => {
  console.log("DEBUG: starting process");
  event.sender.send("log", "Running...");
  await startProcess(event, value);
});

if (isProd) serve({ directory: "app" });
else app.setPath("userData", `${app.getPath("userData")} (development)`);

(async () => {
  await app.whenReady();
  const mainWindow = createWindow("main", {
    width: 1000,
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
