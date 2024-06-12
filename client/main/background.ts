// ==============================================[ Imports ]==============================================
import path from "path"
import * as fs from "fs"
import ytdlx from "yt-dlx"
import colors from "colors"
import serve from "electron-serve"
import { createWindow } from "./helpers"
import { app, ipcMain as api, dialog } from "electron"
// ==============================================[ Imports ]==============================================
//
//
//
// ============================================[ App Handlers ]===========================================
const isProd = process.env.NODE_ENV === "production"
if (isProd) serve({ directory: "app" })
else app.setPath("userData", `${app.getPath("userData")} (development)`)
;(async () => {
  await app.whenReady()
  const mainWindow = createWindow("main", {
    width: 1980,
    height: 1080,
    fullscreen: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  })
  if (isProd) await mainWindow.loadURL("app://./home")
  else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)
    mainWindow.webContents.openDevTools()
    mainWindow.setFullScreen(true)
  }
})()
app.on("window-all-closed", () => app.quit())
// ============================================[ App Handlers ]===========================================
//
//
//
// ============================================[ IPC Handlers ]===========================================
api.handle("select-save-location", async () => {
  const result = await dialog.showOpenDialog({
    title: "Select Save Location",
    buttonLabel: "Select Folder",
    properties: ["openDirectory"],
  })
  if (result.canceled || result.filePaths.length === 0) {
    return { filePath: null }
  }
  return { filePath: result.filePaths[0] }
})

api.on("search", async (event, response) => {
  try {
    var TubeBody
    if (response.videoId) {
      console.log(colors.green("❓ videoId:"), colors.italic(response.videoId))
      TubeBody = await ytdlx.ytSearch.Video.Single({
        query: "https://youtu.be/" + response.videoId,
      })
      if (TubeBody) event.reply("search", TubeBody)
      else event.sender.send("search", null)
    } else {
      console.log(colors.green("❓ query:"), colors.italic(response.query))
      TubeBody = await ytdlx.ytSearch.Video.Multiple({
        query: response.query,
      })
      if (TubeBody) event.reply("search", TubeBody)
      else event.sender.send("search", null)
    }
  } catch (error) {
    event.reply("search", error.message)
  }
})
api.on("formats", async (event, response) => {
  try {
    console.log(colors.green("❓ query:"), colors.italic(response.query))
    var io = await ytdlx.info.list_formats({
      query: response.query,
      verbose: response.verbose || false,
    })
    if (io) event.reply("formats", io)
    else event.sender.send("formats", null)
  } catch (error) {
    event.reply("formats", error.message)
  }
})
api.on("audio", async (event, response) => {
  try {
    console.log(colors.green("❓ videoId:"), colors.italic(response.videoId))
    var io
    if (response.quality === "highest") {
      io = await ytdlx.AudioOnly.Single.Highest({
        stream: true,
        metadata: false,
        query: response.videoId,
        useTor: response.useTor || false,
        verbose: response.verbose || false,
        output: response.output,
      })
    } else {
      io = await ytdlx.AudioOnly.Single.Lowest({
        stream: true,
        metadata: false,
        query: response.videoId,
        useTor: response.useTor || false,
        verbose: response.verbose || false,
        output: response.output,
      })
    }
    if (io && "ffmpeg" in io && "filename" in io) {
      io.ffmpeg.pipe(
        fs.createWriteStream(path.join(response.output, io.filename)),
        {
          end: true,
        },
      )
      io.ffmpeg.on("progress", ({ percent, timemark }) => {
        event.reply("audio", { percent, timemark })
      })
    } else event.sender.send("audio", "ffmpeg or filename not found!")
  } catch (error) {
    event.reply("audio", error.message)
  }
})
api.on("video", async (event, response) => {
  try {
    console.log(colors.green("❓ videoId:"), colors.italic(response.videoId))
    var io = await ytdlx.VideoOnly.Single.Highest({
      stream: true,
      metadata: false,
      query: response.videoId,
      useTor: response.useTor || false,
      verbose: response.verbose || false,
      output: response.output,
    })
    if (io && "ffmpeg" in io && "filename" in io) {
      io.ffmpeg.pipe(
        fs.createWriteStream(path.join(response.output, io.filename)),
        {
          end: true,
        },
      )
      io.ffmpeg.on("progress", ({ percent, timemark }) => {
        event.reply("video", { percent, timemark })
      })
    } else event.sender.send("video", "ffmpeg or filename not found!")
  } catch (error) {
    event.reply("video", error.message)
  }
})
api.on("audiovideo", async (event, response) => {
  try {
    console.log(colors.green("❓ videoId:"), colors.italic(response.videoId))
    var io = await ytdlx.AudioVideo.Single.Highest({
      stream: true,
      metadata: false,
      query: response.videoId,
      useTor: response.useTor || false,
      verbose: response.verbose || false,
      output: response.output,
    })
    if (io && "ffmpeg" in io && "filename" in io) {
      io.ffmpeg.pipe(
        fs.createWriteStream(path.join(response.output, io.filename)),
        {
          end: true,
        },
      )
      io.ffmpeg.on("progress", ({ percent, timemark }) => {
        event.reply("audiovideo", { percent, timemark })
      })
    } else event.sender.send("audiovideo", "ffmpeg or filename not found!")
  } catch (error) {
    event.reply("audiovideo", error.message)
  }
})
// ============================================[ IPC Handlers ]===========================================
