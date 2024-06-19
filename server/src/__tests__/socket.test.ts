import path from "path";
import socket from "ws";

const server = new socket("ws://localhost:8642");
let currentEventIndex = 0;
const events = [
    { type: "Audio", events: ["AudioLowest", "AudioHighest"], folder: "Audio" },
    { type: "Video", events: ["VideoLowest", "VideoHighest"], folder: "Video" },
    { type: "AudioVideo", events: ["AudioVideoLowest", "AudioVideoHighest"], folder: "AudioVideo" },
];
server
    .on("close", ip => console.log("@disconnected:", ip))
    .on("error", error => console.error("@error:", error))
    .on("open", async () => {
        for (const eGroup of events) {
            for (const event of eGroup.events) {
                const payLoad = JSON.stringify({
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
    })
    .on("message", async response => {
        const input = JSON.parse(response.toString());
        if (input.event === "end") {
            console.log("@end", input.data);
            currentEventIndex++;
            if (currentEventIndex < events.length) {
                const eGroup = events[currentEventIndex];
                for (const event of eGroup.events) {
                    const payLoad = JSON.stringify({
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
            } else console.log("All events completed.");
        } else if (input.event === "error") console.log("@error:", input.data);
        else if (input.event === "start") console.log("@start:", input.data);
        else if (input.event === "progress") console.log("@progress:", input.data);
        else if (input.event === "metadata") console.log("@metadata:", input.data);
    });
