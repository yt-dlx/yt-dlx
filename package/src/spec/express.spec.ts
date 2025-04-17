import express from "express";
import YouTubeDLX from "..";
import path from "path";
const port = 3000;
const server = express();
server.use(express.json());
function wrapEmitter(emitter, eventType = "data") {
  return new Promise((resolve, reject) => {
    emitter.on(eventType, resolve);
    emitter.on("error", reject);
  });
}
server.get("/api/Account/HomeFeed", async (req: any, res) => {
  try {
    const options = { cookies: req.query.YouTubeDLX_COOKIES, verbose: req.query.verbose, sort: req.query.sort };
    const emitter = YouTubeDLX.Account.HomeFeed(options);
    const data = await wrapEmitter(emitter);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
});
server.get("/api/Account/SubscriptionsFeed", async (req: any, res) => {
  try {
    const options = { cookies: req.query.YouTubeDLX_COOKIES, verbose: req.query.verbose };
    const emitter = YouTubeDLX.Account.SubscriptionsFeed(options);
    const data = await wrapEmitter(emitter);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
});
server.get("/api/Account/UnseenNotifications", async (req: any, res) => {
  try {
    const options = { cookies: req.query.YouTubeDLX_COOKIES, verbose: req.query.verbose };
    const emitter = YouTubeDLX.Account.Unseen_Notifications(options);
    const data = await wrapEmitter(emitter);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
});
server.get("/api/Account/History", async (req: any, res) => {
  try {
    const options = { cookies: req.query.YouTubeDLX_COOKIES, verbose: req.query.verbose, sort: req.query.sort };
    const emitter = YouTubeDLX.Account.History(options);
    const data = await wrapEmitter(emitter);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
});
server.get("/api/Search/VideoChannelData", async (req: any, res) => {
  try {
    const options = { channelLink: req.query.channelLink };
    const emitter = YouTubeDLX.Search.Video.Channel_Data(options);
    const data = await wrapEmitter(emitter);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
});
server.get("/api/Search/VideoRelated", async (req: any, res) => {
  try {
    const options = { videoId: req.query.videoId };
    const emitter = YouTubeDLX.Search.Video.Related(options);
    const data = await wrapEmitter(emitter);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
});
server.get("/api/Search/VideoChannel", async (req: any, res) => {
  try {
    const options = { query: req.query.query };
    const emitter = YouTubeDLX.Search.Video.Channel(options);
    const data = await wrapEmitter(emitter);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
});
server.get("/api/Search/VideoMultiple", async (req: any, res) => {
  try {
    const options = { query: req.query.query };
    const emitter = YouTubeDLX.Search.Video.Multiple(options);
    const data = await wrapEmitter(emitter);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
});
server.get("/api/Search/VideoSingle", async (req: any, res) => {
  try {
    const options = { videoLink: req.query.videoLink };
    const emitter = YouTubeDLX.Search.Video.Single(options);
    const data = await wrapEmitter(emitter);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
});
server.get("/api/Search/PlaylistSingle", async (req: any, res) => {
  try {
    const options = { playlistLink: req.query.playlistLink };
    const emitter = YouTubeDLX.Search.Playlist.Single(options);
    const data = await wrapEmitter(emitter);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
});
server.get("/api/Search/PlaylistMultiple", async (req: any, res) => {
  try {
    const options = { playlistLink: req.query.playlistLink };
    const emitter = YouTubeDLX.Search.Playlist.Multiple(options);
    const data = await wrapEmitter(emitter);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
});
server.get("/api/Info/Extract", async (req: any, res) => {
  try {
    const options = { query: req.query.query, verbose: req.query.verbose, useTor: req.query.useTor };
    const emitter = YouTubeDLX.Info.Extract(options);
    const data = await wrapEmitter(emitter);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
});
server.get("/api/Info/Help", async (req: any, res) => {
  try {
    const helpUrl = await YouTubeDLX.Info.Help();
    res.json({ helpUrl });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
});
server.get("/api/Info/Formats", async (req: any, res) => {
  try {
    const options = { query: req.query.query, verbose: req.query.verbose };
    const emitter = YouTubeDLX.Info.Formats(options);
    const data = await wrapEmitter(emitter);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
});
server.get("/api/Info/Comments", async (req: any, res) => {
  try {
    const options = { query: req.query.query, verbose: req.query.verbose };
    const emitter = YouTubeDLX.Info.Comments(options);
    const data = await wrapEmitter(emitter);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
});
server.get("/api/Info/Transcript", async (req: any, res) => {
  try {
    const options = { videoLink: req.query.videoLink, verbose: req.query.verbose };
    const emitter = YouTubeDLX.Info.Transcript(options);
    const data = await wrapEmitter(emitter);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
});
server.get("/api/Video/Custom", async (req: any, res) => {
  try {
    const options = {
      query: req.query.query,
      output: req.query.output || path.resolve(process.cwd(), "./output"),
      resolution: req.query.resolution,
      filter: req.query.filter,
      stream: req.query.stream,
      verbose: req.query.verbose,
      metadata: req.query.metadata,
    };
    const emitter = YouTubeDLX.Video.Custom(options);
    if (options.stream) {
      emitter.on("stream", streamData => streamData.pipe(res));
      emitter.on("error", error => res.status(500).send(error.message));
    } else if (options.metadata) {
      const metadata = await wrapEmitter(emitter, "metadata");
      res.json(metadata);
    } else {
      const data = await wrapEmitter(emitter);
      res.json(data);
    }
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
});
server.get("/api/Video/Highest", async (req: any, res) => {
  try {
    const options = {
      query: req.query.query,
      output: req.query.output || path.resolve(process.cwd(), "./output"),
      filter: req.query.filter,
      stream: req.query.stream,
      verbose: req.query.verbose,
      metadata: req.query.metadata,
    };
    const emitter = YouTubeDLX.Video.Highest(options);
    if (options.stream) {
      emitter.on("stream", streamData => streamData.pipe(res));
      emitter.on("error", error => res.status(500).send(error.message));
    } else if (options.metadata) {
      const metadata = await wrapEmitter(emitter, "metadata");
      res.json(metadata);
    } else {
      const data = await wrapEmitter(emitter);
      res.json(data);
    }
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
});
server.get("/api/Video/Lowest", async (req: any, res) => {
  try {
    const options = {
      query: req.query.query,
      output: req.query.output || path.resolve(process.cwd(), "./output"),
      filter: req.query.filter,
      stream: req.query.stream,
      verbose: req.query.verbose,
      metadata: req.query.metadata,
    };
    const emitter = YouTubeDLX.Video.Lowest(options);
    if (options.stream) {
      emitter.on("stream", streamData => streamData.pipe(res));
      emitter.on("error", error => res.status(500).send(error.message));
    } else if (options.metadata) {
      const metadata = await wrapEmitter(emitter, "metadata");
      res.json(metadata);
    } else {
      const data = await wrapEmitter(emitter);
      res.json(data);
    }
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
});
server.get("/api/Audio/Custom", async (req: any, res) => {
  try {
    const options = {
      query: req.query.query,
      resolution: req.query.resolution,
      output: req.query.output || path.resolve(process.cwd(), "./output"),
      filter: req.query.filter,
      stream: req.query.stream,
      verbose: req.query.verbose,
      metadata: req.query.metadata,
    };
    const emitter = YouTubeDLX.Audio.Custom(options);
    if (options.stream) {
      emitter.on("stream", streamData => streamData.pipe(res));
      emitter.on("error", error => res.status(500).send(error.message));
    } else if (options.metadata) {
      const metadata = await wrapEmitter(emitter, "metadata");
      res.json(metadata);
    } else {
      const data = await wrapEmitter(emitter);
      res.json(data);
    }
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
});
server.get("/api/Audio/Highest", async (req: any, res) => {
  try {
    const options = {
      query: req.query.query,
      output: req.query.output || path.resolve(process.cwd(), "./output"),
      filter: req.query.filter,
      stream: req.query.stream,
      verbose: req.query.verbose,
      metadata: req.query.metadata,
    };
    const emitter = YouTubeDLX.Audio.Highest(options);
    if (options.stream) {
      emitter.on("stream", streamData => streamData.pipe(res));
      emitter.on("error", error => res.status(500).send(error.message));
    } else if (options.metadata) {
      const metadata = await wrapEmitter(emitter, "metadata");
      res.json(metadata);
    } else {
      const data = await wrapEmitter(emitter);
      res.json(data);
    }
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
});
server.get("/api/Audio/Lowest", async (req: any, res) => {
  try {
    const options = {
      query: req.query.query,
      output: req.query.output || path.resolve(process.cwd(), "./output"),
      filter: req.query.filter,
      stream: req.query.stream,
      verbose: req.query.verbose,
      metadata: req.query.metadata,
    };
    const emitter = YouTubeDLX.Audio.Lowest(options);
    if (options.stream) {
      emitter.on("stream", streamData => streamData.pipe(res));
      emitter.on("error", error => res.status(500).send(error.message));
    } else if (options.metadata) {
      const metadata = await wrapEmitter(emitter, "metadata");
      res.json(metadata);
    } else {
      const data = await wrapEmitter(emitter);
      res.json(data);
    }
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
});
server.get("/api/Audio/Video/Custom", async (req: any, res) => {
  try {
    const options = {
      query: req.query.query,
      resolution: req.query.resolution,
      output: req.query.output || path.resolve(process.cwd(), "./output"),
      filter: req.query.filter,
      stream: req.query.stream,
      verbose: req.query.verbose,
      metadata: req.query.metadata,
    };
    const emitter = YouTubeDLX.Audio_Video.Custom(options);
    if (options.stream) {
      emitter.on("stream", streamData => streamData.pipe(res));
      emitter.on("error", error => res.status(500).send(error.message));
    } else if (options.metadata) {
      const metadata = await wrapEmitter(emitter, "metadata");
      res.json(metadata);
    } else {
      const data = await wrapEmitter(emitter);
      res.json(data);
    }
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
});
server.get("/api/Audio/Video/Highest", async (req: any, res) => {
  try {
    const options = {
      query: req.query.query,
      output: req.query.output || path.resolve(process.cwd(), "./output"),
      filter: req.query.filter,
      stream: req.query.stream,
      verbose: req.query.verbose,
      metadata: req.query.metadata,
    };
    const emitter = YouTubeDLX.Audio_Video.Highest(options);
    if (options.stream) {
      emitter.on("stream", streamData => streamData.pipe(res));
      emitter.on("error", error => res.status(500).send(error.message));
    } else if (options.metadata) {
      const metadata = await wrapEmitter(emitter, "metadata");
      res.json(metadata);
    } else {
      const data = await wrapEmitter(emitter);
      res.json(data);
    }
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
});
server.get("/api/Audio/Video/Lowest", async (req: any, res) => {
  try {
    const options = {
      query: req.query.query,
      output: req.query.output || path.resolve(process.cwd(), "./output"),
      filter: req.query.filter,
      stream: req.query.stream,
      verbose: req.query.verbose,
      metadata: req.query.metadata,
    };
    const emitter = YouTubeDLX.Audio_Video.Lowest(options);
    if (options.stream) {
      emitter.on("stream", streamData => streamData.pipe(res));
      emitter.on("error", error => res.status(500).send(error.message));
    } else if (options.metadata) {
      const metadata = await wrapEmitter(emitter, "metadata");
      res.json(metadata);
    } else {
      const data = await wrapEmitter(emitter);
      res.json(data);
    }
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
});
server.listen(port, () => console.log(`Server running on port ${port}`));
