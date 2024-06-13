import "./Audio";
import "./Video";
import "./AudioVideo";
import ytdlx from "yt-dlx";
import colors from "colors";
import { ipcMain as api } from "electron";

api.on("search", async (event, response) => {
  try {
    var TubeBody: any;
    if (response.videoId) {
      console.log(
        colors.green("❓ videoId:"),
        colors.italic(response.videoId),
      );
      TubeBody = await ytdlx.ytSearch.Video.Single({
        query: "https://youtu.be/" + response.videoId,
      });
      if (TubeBody) event.reply("search", TubeBody);
      else event.sender.send("search", null);
    } else {
      console.log(
        colors.green("❓ query:"),
        colors.italic(response.query),
      );
      TubeBody = await ytdlx.ytSearch.Video.Multiple({
        query: response.query,
      });
      if (TubeBody) event.reply("search", TubeBody);
      else event.sender.send("search", null);
    }
  } catch (error: any) {
    event.reply("search", error.message);
  }
});
api.on("formats", async (event, response) => {
  try {
    console.log(
      colors.green("❓ query:"),
      colors.italic(response.query),
    );
    var io = await ytdlx.info.list_formats({
      query: response.query,
      verbose: response.verbose || false,
    });
    if (io) event.reply("formats", io);
    else event.sender.send("formats", null);
  } catch (error: any) {
    event.reply("formats", error.message);
  }
});
