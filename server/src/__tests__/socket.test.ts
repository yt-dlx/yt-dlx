import path from "path";
import socket from "ws";
import async from "async";

const sendEvents = (events: string[], outputDir: string, callback: (err?: Error | null) => void) => {
    async.eachSeries(
        events,
        async (event, cb) => {
            const payLoad = JSON.stringify({
                event,
                payload: {
                    stream: true,
                    useTor: true,
                    verbose: true,
                    metadata: false,
                    query: "careless-whisper",
                    output: path.join(process.cwd(), "downloads", outputDir),
                },
            });
            server.send(payLoad);
            await new Promise(resolve => setTimeout(resolve, 10000));
            cb();
        },
        callback,
    );
};

const server = new socket("ws://localhost:8642")
    .on("close", ip => console.log("@disconnected:", ip))
    .on("error", error => console.error("@error:", error))
    .on("open", async () => {
        await async.series([
            callback => sendEvents(["AudioLowest", "AudioHighest"], "Audio", callback),
            callback => sendEvents(["VideoLowest", "VideoHighest"], "Video", callback),
            callback => sendEvents(["AudioVideoLowest", "AudioVideoHighest"], "AudioVideo", callback),
        ]);
    })
    .on("message", response => {
        const input = JSON.parse(response.toString());
        if (input.event === "end") console.log("@end", input.data);
        if (input.event === "error") console.log("@error:", input.data);
        if (input.event === "start") console.log("@start:", input.data);
        if (input.event === "progress") console.log("@progress:", input.data);
        if (input.event === "metadata") console.log("@metadata:", input.data);
    });
