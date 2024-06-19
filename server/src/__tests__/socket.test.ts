import path from "path";
import WebSocket from "ws";
import async from "async";

const sendEvents = (events: string[], callback: (err?: Error | null) => void) => {
    const fn = async (event: string, cb: () => void) => {
        const payload = JSON.stringify({
            event,
            payload: {
                stream: true,
                useTor: true,
                verbose: true,
                metadata: false,
                query: "careless-whisper",
                output: path.join(process.cwd(), "downloads"),
            },
        });
        server.send(payload);
        await new Promise(resolve => setTimeout(resolve, 20000));
        cb();
    };
    async.eachSeries(events, fn, callback);
};

const server = new WebSocket("ws://localhost:8642")
    .on("close", ip => console.log("@disconnected:", ip))
    .on("error", error => console.error("@error:", error))
    .on("open", async () => {
        try {
            await async.series([
                callback => sendEvents(["AudioLowest", "AudioHighest"], callback),
                callback => sendEvents(["VideoLowest", "VideoHighest"], callback),
                callback => sendEvents(["AudioVideoLowest", "AudioVideoHighest"], callback),
            ]);
        } catch (error) {
            console.error("Error occurred in sending events:", error);
        }
    })
    .on("message", response => {
        const input = JSON.parse(response.toString());
        if (input.event === "end") console.log("@end", input.data);
        if (input.event === "error") console.log("@error:", input.data);
        if (input.event === "start") console.log("@start:", input.data);
        if (input.event === "progress") console.log("@progress:", input.data);
        if (input.event === "metadata") console.log("@metadata:", input.data);
    });
