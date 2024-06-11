import { rm } from "fs/promises"
import { join, resolve } from "path"

async function rmdir(folderPath, folders) {
  for (const folder of folders) {
    const folderToDelete = join(folderPath, folder)
    try {
      await rm(folderToDelete, { recursive: true, force: true })
    } catch (err) {
      console.error("@error:", `${folder}: ${err.message}`)
    }
  }
}

rmdir(resolve(), [
  "./util/ffprobe.exe",
  "./util/ffprobe_mac",
  "./util/ffprobe_linux",
  "./util/ffmpeg.exe",
  "./util/ffmpeg_mac",
  "./util/ffmpeg_linux",
  "./util/ffplay.exe",
  "./util/ffplay_mac",
  "./util/ffplay_linux",
])
