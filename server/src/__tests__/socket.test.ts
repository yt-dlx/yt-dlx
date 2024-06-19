import path from "path";
import socket from "ws";

var eIndex: number = 0;
var server: socket = new socket("ws://localhost:8642");
var events = [
    { type: "Audio", events: ["AudioLowest", "AudioHighest"], folder: "Audio" },
    { type: "Video", events: ["VideoLowest", "VideoHighest"], folder: "Video" },
    { type: "AudioVideo", events: ["AudioVideoLowest", "AudioVideoHighest"], folder: "AudioVideo" },
];

server.on("close", ip => console.log("@disconnected:", ip));
server.on("error", error => console.error("@error:", error));
server.on("open", async () => {
    for (var eGroup of events) {
        for (var event of eGroup.events) {
            var payLoad = JSON.stringify({
                event,
                payload: {
                    stream: true,
                    useTor: true,
                    verbose: true,
                    metadata: false,
                    query: "careless-whisper",
                    output: path.join(process.cwd(), "downloads", eGroup.folder),
                },
            });
            server.send(payLoad);
            await new Promise(resolve => setTimeout(resolve, 10000));
        }
    }
});

server.on("message", async response => {
    var input = JSON.parse(response.toString());
    if (input.event === "end") {
        console.log("@end", input.data);
        eIndex++;
        if (eIndex < events.length) {
            var eGroup = events[eIndex];
            for (var event of eGroup.events) {
                var payLoad = JSON.stringify({
                    event,
                    payload: {
                        stream: true,
                        useTor: true,
                        verbose: true,
                        metadata: false,
                        query: "careless-whisper",
                        output: path.join(process.cwd(), "downloads", eGroup.folder),
                    },
                });
                server.send(payLoad);
                await new Promise(resolve => setTimeout(resolve, 10000));
            }
            console.log("@current-Event:", events[eIndex].type);
            if (eIndex + 1 < events.length) console.log("@next-Event:", events[eIndex + 1].type);
            else console.log("@next-Event: None (all events completed)");
        } else console.log("@info: all events completed.");
    }
    if (input.event === "error") console.log("@error:", input.data);
    if (input.event === "start") console.log("@start:", input.data);
    if (input.event === "progress") console.log("@progress:", input.data);
    if (input.event === "metadata") console.log("@metadata:", input.data);
});
