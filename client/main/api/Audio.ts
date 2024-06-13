import * as fs from "fs";
import ytdlx from "yt-dlx";
import colors from "colors";
import { ipcMain as api } from "electron";

api.on("audio", async (event, response) => {
    try {
        console.log(
            colors.green("❓ videoId:"),
            colors.italic(response.videoId),
        );
        var io = await ytdlx.AudioOnly.Single.Highest({
            stream: true,
            metadata: false,
            query: response.videoId,
            useTor: response.useTor || false,
            verbose: response.verbose || false,
            output: response.output || undefined,
        });
        if (io && "ffmpeg" in io && "filename" in io) {
            io.ffmpeg.pipe(fs.createWriteStream(io.filename), {
                end: true,
            });
            io.ffmpeg.on(
                "progress",
                ({
                    percent,
                    timemark,
                }: {
                    percent: number;
                    timemark: string;
                }) => {
                    event.reply("audio", { percent, timemark });
                },
            );
        } else event.sender.send("audio", "ffmpeg or filename not found!");
    } catch (error: any) {
        event.reply("audio", error.message);
    }
});