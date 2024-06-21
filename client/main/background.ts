import socket from "ws";
import path from "path";
import retry from "async-retry";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import { ipcMain, dialog, app } from "electron";
//
//
const onprod = process.env.NODE_ENV === "production";
if (onprod) serve({ directory: "app" });
else app.setPath("userData", `${app.getPath("userData")} (development)`);
//
//
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
//
//
ipcMain.handle("select-output-folder", async event => {
    const result = await dialog.showOpenDialog({
        properties: ["openDirectory"],
    });
    if (result.canceled) return null;
    else return result.filePaths[0];
});
// ====================================================/ Ipc - WebSocket /====================================================
//
//
const reops = {
    retries: 3,
    minTimeout: 1000,
    maxTimeout: 5000,
    factor: 2,
};
const server = new socket("ws://localhost:8642");
server.on("close", ip => console.log("@disconnected:", ip));
server.on("error", error => console.error("@error:", error));
//
//
interface AudioLowest {
    query: string;
    output: string;
    stream: boolean;
    useTor: boolean;
    verbose: boolean;
    metadata: boolean;
}
ipcMain.on("AudioLowest", (event, response: AudioLowest) => {
    try {
        retry(async () => {
            server.on("open", () => {
                const payLoad = JSON.stringify({
                    event: "AudioLowest",
                    payload: response,
                });
                server.send(payLoad);
            });
        }, reops);
        server.on("message", response => {
            const { event: msgEvent, data: msgData } = JSON.parse(response.toString());
            event.reply(msgEvent, msgData);
        });
    } catch (error: any) {
        event.reply("error", error.message);
    }
});
//
//
interface AudioHighest {
    query: string;
    output: string;
    stream: boolean;
    useTor: boolean;
    verbose: boolean;
    metadata: boolean;
}
ipcMain.on("AudioHighest", (event, response: AudioHighest) => {
    try {
        retry(async () => {
            server.on("open", () => {
                const payLoad = JSON.stringify({
                    event: "AudioHighest",
                    payload: response,
                });
                server.send(payLoad);
            });
        }, reops);
        server.on("message", response => {
            const { event: msgEvent, data: msgData } = JSON.parse(response.toString());
            event.reply(msgEvent, msgData);
        });
    } catch (error: any) {
        event.reply("error", error.message);
    }
});
//
//
interface VideoLowest {
    query: string;
    output: string;
    stream: boolean;
    useTor: boolean;
    verbose: boolean;
    metadata: boolean;
}
ipcMain.on("VideoLowest", (event, response: VideoLowest) => {
    try {
        retry(async () => {
            server.on("open", () => {
                const payLoad = JSON.stringify({
                    event: "VideoLowest",
                    payload: response,
                });
                server.send(payLoad);
            });
        }, reops);
        server.on("message", response => {
            const { event: msgEvent, data: msgData } = JSON.parse(response.toString());
            event.reply(msgEvent, msgData);
        });
    } catch (error: any) {
        event.reply("error", error.message);
    }
});
//
//
interface VideoHighest {
    query: string;
    output: string;
    stream: boolean;
    useTor: boolean;
    verbose: boolean;
    metadata: boolean;
}
ipcMain.on("VideoHighest", (event, response: VideoHighest) => {
    try {
        retry(async () => {
            server.on("open", () => {
                const payLoad = JSON.stringify({
                    event: "VideoHighest",
                    payload: response,
                });
                server.send(payLoad);
            });
        }, reops);
        server.on("message", response => {
            const { event: msgEvent, data: msgData } = JSON.parse(response.toString());
            event.reply(msgEvent, msgData);
        });
    } catch (error: any) {
        event.reply("error", error.message);
    }
});
//
//
// ====================================================/ Ipc - WebSocket /====================================================
app.on("window-all-closed", () => app.quit());
