import http from "http";
import WebSocket from "ws";
import dotenv from "dotenv";
import routeAudioLowest from "./routes/audio/AudioLowest";
import routeAudioHighest from "./routes/audio/AudioHighest";
import routeAudioCustom from "./routes/audio/AudioCustom";
import routeVideoLowest from "./routes/video/VideoLowest";
import routeVideoHighest from "./routes/video/VideoHighest";
import routeVideoCustom from "./routes/video/VideoCustom";
import routeAudioVideoLowest from "./routes/audiovideo/AudioVideoLowest";
import routeAudioVideoHighest from "./routes/audiovideo/AudioVideoHighest";
import routeAudioVideoCustom from "./routes/audiovideo/AudioVideoCustom";
import routeExtract from "./routes/command/extract";
import routeListFormats from "./routes/command/list_formats";
import routePlaylistData from "./routes/command/playlist_data";
import routeSearchPlaylists from "./routes/command/search_playlists";
import routeSearchVideos from "./routes/command/search_videos";
import routeVideoData from "./routes/command/video_data";

dotenv.config();

const port = process.env.PORT || 8642;
const server = http
    .createServer()
    .listen(port, () => console.log(`@web-socket: listening on port ${port}`))
    .on("error", error => console.error("Server error:", error));
const wss = new WebSocket.Server({ server }).on("connection", (ws: WebSocket, req) => {
    console.log(`WebSocket client connected from ip: ${req.socket.remoteAddress}`);
    ws.on("message", (message: string) => {
        const data = JSON.parse(message);
        const { event, payload } = data;
        switch (event) {
            case "AudioLowest":
                routeAudioLowest(ws, payload);
                break;
            case "AudioHighest":
                routeAudioHighest(ws, payload);
                break;
            case "AudioCustom":
                routeAudioCustom(ws, payload);
                break;
            case "VideoLowest":
                routeVideoLowest(ws, payload);
                break;
            case "VideoHighest":
                routeVideoHighest(ws, payload);
                break;
            case "VideoCustom":
                routeVideoCustom(ws, payload);
                break;
            case "AudioVideoLowest":
                routeAudioVideoLowest(ws, payload);
                break;
            case "AudioVideoHighest":
                routeAudioVideoHighest(ws, payload);
                break;
            case "AudioVideoCustom":
                routeAudioVideoCustom(ws, payload);
                break;
            case "Extract":
                routeExtract(ws, payload);
                break;
            case "VideoData":
                routeVideoData(ws, payload);
                break;
            case "ListFormats":
                routeListFormats(ws, payload);
                break;
            case "PlaylistData":
                routePlaylistData(ws, payload);
                break;
            case "SearchVideos":
                routeSearchVideos(ws, payload);
                break;
            case "SearchPlaylists":
                routeSearchPlaylists(ws, payload);
                break;
            default:
                break;
        }
    });
    ws.on("error", error => console.error(`WebSocket error: ${error.message}`));
    ws.on("close", () => {
        console.log(`WebSocket client disconnected from ip: ${req.socket.remoteAddress}`);
    });
});
const powerdown = () => {
    console.log("Shutting down gracefully...");
    wss.clients.forEach(client => client.close());
    server.close(() => {
        console.log("Closed out remaining connections.");
        process.exit(0);
    });
    setTimeout(() => {
        console.error("Forcing shutdown...");
        process.exit(1);
    }, 10000);
};
process.on("SIGTERM", powerdown);
process.on("SIGINT", powerdown);
