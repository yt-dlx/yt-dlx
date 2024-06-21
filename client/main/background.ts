import socket from "ws";
import path from "path";
import retry from "async-retry";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import { ipcMain as ipc, dialog, app as client } from "electron";
//
//
//
//
(async () => {
  var port = 8642;
  var production = process.env.NODE_ENV === "production";
  var server: socket = new socket("ws://localhost:" + port);
  server.on("open", () => console.log("@connected:", port));
  server.on("error", error => console.error("@error:", error));
  server.on("close", ip => console.log("@disconnected:", ip, " @port:", port));
  //
  //
  //
  //
  var reops: object = {
    retries: 3,
    minTimeout: 1000,
    maxTimeout: 5000,
    factor: 2,
  };
  if (production) serve({ directory: "app" });
  else client.setPath("userData", client.getPath("userData") + " (development)");
  //
  //
  //
  //
  await client.whenReady();
  var mainwindow = createWindow("main", {
    show: true,
    fullscreen: true,
    autoHideMenuBar: true,
    webPreferences: {
      sandbox: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  switch (production) {
    case false:
      await mainwindow.loadURL("http://localhost:" + process.argv[2] + "/home");
      mainwindow.webContents.openDevTools();
      break;
    case true:
      await mainwindow.loadURL("app://./home");
      break;
    default:
      process.exit(0);
  }
  //
  //
  //
  //
  ipc.handle("select-output-folder", async event => {
    var result = await dialog.showOpenDialog({ properties: ["openDirectory"] });
    if (result.canceled) return null;
    else return result.filePaths[0];
  });
  //
  //
  //
  //
  interface SearchVideos {
    query: string;
    verbose: boolean;
  }
  ipc.on("SearchVideos", (event, response: SearchVideos) => {
    retry(async () => {
      server.on("open", () => server.send(JSON.stringify({ event: "SearchVideos", payload: response })));
      server.on("message", output => {
        var { event: msgEvent, data: msgData } = JSON.parse(output.toString());
        event.reply(msgEvent, msgData);
      });
    }, reops);
  });
  //
  //
  //
  //
  interface VideoData {
    query: string;
    verbose: boolean;
  }
  ipc.on("VideoData", (event, response: VideoData) => {
    retry(async () => {
      server.on("open", () => server.send(JSON.stringify({ event: "VideoData", payload: response })));
      server.on("message", output => {
        var { event: msgEvent, data: msgData } = JSON.parse(output.toString());
        event.reply(msgEvent, msgData);
      });
    }, reops);
  });
  //
  //
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
  ipc.on("AudioLowest", (event, response: AudioLowest) => {
    retry(async () => {
      server.on("open", () => server.send(JSON.stringify({ event: "AudioLowest", payload: response })));
      server.on("message", output => {
        var { event: msgEvent, data: msgData } = JSON.parse(output.toString());
        event.reply(msgEvent, msgData);
      });
    }, reops);
  });
  //
  //
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
  ipc.on("AudioHighest", (event, response: AudioHighest) => {
    retry(async () => {
      server.on("open", () => server.send(JSON.stringify({ event: "AudioHighest", payload: response })));
      server.on("message", output => {
        var { event: msgEvent, data: msgData } = JSON.parse(output.toString());
        event.reply(msgEvent, msgData);
      });
    }, reops);
  });
  //
  //
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
  ipc.on("VideoLowest", (event, response: VideoLowest) => {
    retry(async () => {
      server.on("open", () => server.send(JSON.stringify({ event: "VideoLowest", payload: response })));
      server.on("message", output => {
        var { event: msgEvent, data: msgData } = JSON.parse(output.toString());
        event.reply(msgEvent, msgData);
      });
    }, reops);
  });
  //
  //
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
  ipc.on("VideoHighest", (event, response: VideoHighest) => {
    retry(async () => {
      server.on("open", () => server.send(JSON.stringify({ event: "VideoHighest", payload: response })));
      server.on("message", output => {
        var { event: msgEvent, data: msgData } = JSON.parse(output.toString());
        event.reply(msgEvent, msgData);
      });
    }, reops);
  });
  //
  //
  //
  //
  interface AudioVideoLowest {
    query: string;
    output: string;
    stream: boolean;
    useTor: boolean;
    verbose: boolean;
    metadata: boolean;
  }
  ipc.on("AudioVideoLowest", (event, response: AudioVideoLowest) => {
    retry(async () => {
      server.on("open", () => server.send(JSON.stringify({ event: "AudioVideoLowest", payload: response })));
      server.on("message", output => {
        var { event: msgEvent, data: msgData } = JSON.parse(output.toString());
        event.reply(msgEvent, msgData);
      });
    }, reops);
  });
  //
  //
  //
  //
  interface AudioVideoHighest {
    query: string;
    output: string;
    stream: boolean;
    useTor: boolean;
    verbose: boolean;
    metadata: boolean;
  }
  ipc.on("AudioVideoHighest", (event, response: AudioVideoHighest) => {
    retry(async () => {
      server.on("open", () => server.send(JSON.stringify({ event: "AudioVideoHighest", payload: response })));
      server.on("message", output => {
        var { event: msgEvent, data: msgData } = JSON.parse(output.toString());
        event.reply(msgEvent, msgData);
      });
    }, reops);
  });
  //
  //
  //
  //
  client.on("window-all-closed", () => client.quit());
})();
