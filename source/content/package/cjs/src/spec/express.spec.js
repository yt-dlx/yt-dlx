"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const __1 = __importDefault(require(".."));
const path_1 = __importDefault(require("path"));
const port = 3000;
const server = (0, express_1.default)();
server.use(express_1.default.json());
function wrapEmitter(emitter, eventType = "data") {
    return new Promise((resolve, reject) => {
        emitter.on(eventType, resolve);
        emitter.on("error", reject);
    });
}
// Account Routes
server.get("/api/Account/HomeFeed", async (req, res) => {
    try {
        const options = { cookies: req.query.YouTubeDLX_COOKIES, verbose: req.query.verbose, sort: req.query.sort };
        const emitter = __1.default.Account.HomeFeed(options);
        const data = await wrapEmitter(emitter);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
});
server.get("/api/Account/SubscriptionsFeed", async (req, res) => {
    try {
        const options = { cookies: req.query.YouTubeDLX_COOKIES, verbose: req.query.verbose };
        const emitter = __1.default.Account.SubscriptionsFeed(options);
        const data = await wrapEmitter(emitter);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
});
server.get("/api/Account/UnseenNotifications", async (req, res) => {
    try {
        const options = { cookies: req.query.YouTubeDLX_COOKIES, verbose: req.query.verbose };
        const emitter = __1.default.Account.UnseenNotifications(options);
        const data = await wrapEmitter(emitter);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
});
server.get("/api/Account/History", async (req, res) => {
    try {
        const options = { cookies: req.query.YouTubeDLX_COOKIES, verbose: req.query.verbose, sort: req.query.sort };
        const emitter = __1.default.Account.History(options);
        const data = await wrapEmitter(emitter);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
});
// Search Routes
server.get("/api/Search/Channel/Single", async (req, res) => {
    try {
        const options = { channelLink: req.query.channelLink };
        const emitter = __1.default.Search.Channel.Single(options);
        const data = await wrapEmitter(emitter);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
});
server.get("/api/Search/Channel/Multiple", async (req, res) => {
    try {
        const options = { query: req.query.query };
        const emitter = __1.default.Search.Channel.Multiple(options);
        const data = await wrapEmitter(emitter);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
});
server.get("/api/Search/Video/Single", async (req, res) => {
    try {
        const options = { videoLink: req.query.videoLink };
        const emitter = __1.default.Search.Video.Single(options);
        const data = await wrapEmitter(emitter);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
});
server.get("/api/Search/Video/Multiple", async (req, res) => {
    try {
        const options = { query: req.query.query };
        const emitter = __1.default.Search.Video.Multiple(options);
        const data = await wrapEmitter(emitter);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
});
server.get("/api/Search/Playlist/Single", async (req, res) => {
    try {
        const options = { playlistLink: req.query.playlistLink };
        const emitter = __1.default.Search.Playlist.Single(options);
        const data = await wrapEmitter(emitter);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
});
server.get("/api/Search/Playlist/Multiple", async (req, res) => {
    try {
        const options = { playlistLink: req.query.query };
        const emitter = __1.default.Search.Playlist.Multiple(options);
        const data = await wrapEmitter(emitter);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
});
// Misc Routes
server.get("/api/Misc/System/Help", async (req, res) => {
    try {
        const helpUrl = await __1.default.Misc.System.Help();
        res.json({ helpUrl });
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
});
server.get("/api/Misc/Video/Extract", async (req, res) => {
    try {
        const options = { query: req.query.query, verbose: req.query.verbose, useTor: req.query.useTor };
        const emitter = __1.default.Misc.Video.Extract(options);
        const data = await wrapEmitter(emitter);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
});
server.get("/api/Misc/Video/Formats", async (req, res) => {
    try {
        const options = { query: req.query.query, verbose: req.query.verbose };
        const emitter = __1.default.Misc.Video.Formats(options);
        const data = await wrapEmitter(emitter);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
});
server.get("/api/Misc/Video/Comments", async (req, res) => {
    try {
        const options = { query: req.query.query, verbose: req.query.verbose };
        const emitter = __1.default.Misc.Video.Comments(options);
        const data = await wrapEmitter(emitter);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
});
server.get("/api/Misc/Video/Transcript", async (req, res) => {
    try {
        const options = { videoLink: req.query.videoLink, verbose: req.query.verbose };
        const emitter = __1.default.Misc.Video.Transcript(options);
        const data = await wrapEmitter(emitter);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
});
server.get("/api/Misc/Video/Related", async (req, res) => {
    try {
        const options = { videoId: req.query.videoId };
        const emitter = __1.default.Misc.Video.Related(options);
        const data = await wrapEmitter(emitter);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
});
// Video Routes
server.get("/api/Video/Custom", async (req, res) => {
    try {
        const options = {
            query: req.query.query,
            output: req.query.output || path_1.default.resolve(process.cwd(), "./output"),
            resolution: req.query.resolution,
            filter: req.query.filter,
            stream: req.query.stream,
            verbose: req.query.verbose,
            metadata: req.query.metadata,
        };
        const emitter = __1.default.Video.Custom(options);
        if (options.stream) {
            emitter.on("stream", streamData => streamData.pipe(res));
            emitter.on("error", error => res.status(500).send(error.message));
        }
        else if (options.metadata) {
            const metadata = await wrapEmitter(emitter, "metadata");
            res.json(metadata);
        }
        else {
            const data = await wrapEmitter(emitter);
            res.json(data);
        }
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
});
server.get("/api/Video/Highest", async (req, res) => {
    try {
        const options = {
            query: req.query.query,
            output: req.query.output || path_1.default.resolve(process.cwd(), "./output"),
            filter: req.query.filter,
            stream: req.query.stream,
            verbose: req.query.verbose,
            metadata: req.query.metadata,
        };
        const emitter = __1.default.Video.Highest(options);
        if (options.stream) {
            emitter.on("stream", streamData => streamData.pipe(res));
            emitter.on("error", error => res.status(500).send(error.message));
        }
        else if (options.metadata) {
            const metadata = await wrapEmitter(emitter, "metadata");
            res.json(metadata);
        }
        else {
            const data = await wrapEmitter(emitter);
            res.json(data);
        }
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
});
server.get("/api/Video/Lowest", async (req, res) => {
    try {
        const options = {
            query: req.query.query,
            output: req.query.output || path_1.default.resolve(process.cwd(), "./output"),
            filter: req.query.filter,
            stream: req.query.stream,
            verbose: req.query.verbose,
            metadata: req.query.metadata,
        };
        const emitter = __1.default.Video.Lowest(options);
        if (options.stream) {
            emitter.on("stream", streamData => streamData.pipe(res));
            emitter.on("error", error => res.status(500).send(error.message));
        }
        else if (options.metadata) {
            const metadata = await wrapEmitter(emitter, "metadata");
            res.json(metadata);
        }
        else {
            const data = await wrapEmitter(emitter);
            res.json(data);
        }
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
});
// Audio Routes
server.get("/api/Audio/Custom", async (req, res) => {
    try {
        const options = {
            query: req.query.query,
            resolution: req.query.resolution,
            output: req.query.output || path_1.default.resolve(process.cwd(), "./output"),
            filter: req.query.filter,
            stream: req.query.stream,
            verbose: req.query.verbose,
            metadata: req.query.metadata,
        };
        const emitter = __1.default.Audio.Custom(options);
        if (options.stream) {
            emitter.on("stream", streamData => streamData.pipe(res));
            emitter.on("error", error => res.status(500).send(error.message));
        }
        else if (options.metadata) {
            const metadata = await wrapEmitter(emitter, "metadata");
            res.json(metadata);
        }
        else {
            const data = await wrapEmitter(emitter);
            res.json(data);
        }
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
});
server.get("/api/Audio/Highest", async (req, res) => {
    try {
        const options = {
            query: req.query.query,
            output: req.query.output || path_1.default.resolve(process.cwd(), "./output"),
            filter: req.query.filter,
            stream: req.query.stream,
            verbose: req.query.verbose,
            metadata: req.query.metadata,
        };
        const emitter = __1.default.Audio.Highest(options);
        if (options.stream) {
            emitter.on("stream", streamData => streamData.pipe(res));
            emitter.on("error", error => res.status(500).send(error.message));
        }
        else if (options.metadata) {
            const metadata = await wrapEmitter(emitter, "metadata");
            res.json(metadata);
        }
        else {
            const data = await wrapEmitter(emitter);
            res.json(data);
        }
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
});
server.get("/api/Audio/Lowest", async (req, res) => {
    try {
        const options = {
            query: req.query.query,
            output: req.query.output || path_1.default.resolve(process.cwd(), "./output"),
            filter: req.query.filter,
            stream: req.query.stream,
            verbose: req.query.verbose,
            metadata: req.query.metadata,
        };
        const emitter = __1.default.Audio.Lowest(options);
        if (options.stream) {
            emitter.on("stream", streamData => streamData.pipe(res));
            emitter.on("error", error => res.status(500).send(error.message));
        }
        else if (options.metadata) {
            const metadata = await wrapEmitter(emitter, "metadata");
            res.json(metadata);
        }
        else {
            const data = await wrapEmitter(emitter);
            res.json(data);
        }
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
});
// Audio_Video Routes
server.get("/api/Audio_Video/Custom", async (req, res) => {
    try {
        const options = {
            query: req.query.query,
            resolution: req.query.resolution,
            output: req.query.output || path_1.default.resolve(process.cwd(), "./output"),
            filter: req.query.filter,
            stream: req.query.stream,
            verbose: req.query.verbose,
            metadata: req.query.metadata,
        };
        const emitter = __1.default.Audio_Video.Custom(options);
        if (options.stream) {
            emitter.on("stream", streamData => streamData.pipe(res));
            emitter.on("error", error => res.status(500).send(error.message));
        }
        else if (options.metadata) {
            const metadata = await wrapEmitter(emitter, "metadata");
            res.json(metadata);
        }
        else {
            const data = await wrapEmitter(emitter);
            res.json(data);
        }
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
});
server.get("/api/Audio_Video/Highest", async (req, res) => {
    try {
        const options = {
            query: req.query.query,
            output: req.query.output || path_1.default.resolve(process.cwd(), "./output"),
            filter: req.query.filter,
            stream: req.query.stream,
            verbose: req.query.verbose,
            metadata: req.query.metadata,
        };
        const emitter = __1.default.Audio_Video.Highest(options);
        if (options.stream) {
            emitter.on("stream", streamData => streamData.pipe(res));
            emitter.on("error", error => res.status(500).send(error.message));
        }
        else if (options.metadata) {
            const metadata = await wrapEmitter(emitter, "metadata");
            res.json(metadata);
        }
        else {
            const data = await wrapEmitter(emitter);
            res.json(data);
        }
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
});
server.get("/api/Audio_Video/Lowest", async (req, res) => {
    try {
        const options = {
            query: req.query.query,
            output: req.query.output || path_1.default.resolve(process.cwd(), "./output"),
            filter: req.query.filter,
            stream: req.query.stream,
            verbose: req.query.verbose,
            metadata: req.query.metadata,
        };
        const emitter = __1.default.Audio_Video.Lowest(options);
        if (options.stream) {
            emitter.on("stream", streamData => streamData.pipe(res));
            emitter.on("error", error => res.status(500).send(error.message));
        }
        else if (options.metadata) {
            const metadata = await wrapEmitter(emitter, "metadata");
            res.json(metadata);
        }
        else {
            const data = await wrapEmitter(emitter);
            res.json(data);
        }
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
});
server.listen(port, () => console.log(`Server running on port ${port}`));
//# sourceMappingURL=express.spec.js.map