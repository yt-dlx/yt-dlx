import * as fs from "fs";
import ytdlx from "yt-dlx";
import colors from "colors";
import { ipcMain as api, dialog } from "electron";

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
        console.log(colors.green("❓ query:"), colors.italic(response.query));
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
api.on("video", async (event, response) => {
    try {
        console.log(
            colors.green("❓ videoId:"),
            colors.italic(response.videoId),
        );
        var io = await ytdlx.VideoOnly.Single.Highest({
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
                    event.reply("video", { percent, timemark });
                },
            );
        } else event.sender.send("video", "ffmpeg or filename not found!");
    } catch (error: any) {
        event.reply("video", error.message);
    }
});
api.on("audiovideo", async (event, response) => {
    try {
        console.log(
            colors.green("❓ videoId:"),
            colors.italic(response.videoId),
        );
        var io = await ytdlx.AudioVideo.Single.Highest({
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
                    event.reply("audiovideo", { percent, timemark });
                },
            );
        } else event.sender.send("audiovideo", "ffmpeg or filename not found!");
    } catch (error: any) {
        event.reply("audiovideo", error.message);
    }
});
