import dotenv from "dotenv";
import colors from "colors";
import YouTubeDLX from "..";
dotenv.config();
console.clear();

console.log(colors.bold.blue("@info"), "VideoComments: (3): Fetch video comments with the sort set to 'newest'");
YouTubeDLX.Info.Comments({ query: "Node.js tutorial", sort: "newest" })
  .on("data", data => console.log(colors.italic.green("@data:"), data))
  .on("error", error => console.error(colors.italic.red("@error:"), error));

// console.log(colors.bold.blue("@info"), "VideoComments: (4): Fetch video comments with the sort set to 'most-liked'");
// YouTubeDLX.Info.Comments({ query: "Node.js tutorial", sort: "most-liked" })
// .on("data", data => console.log(colors.italic.green("@data:"), data))
// .on("error", error => console.error(colors.italic.red("@error:"), error));

// console.log(colors.bold.blue("@info"), "VideoComments: (5): Fetch video comments with the sort set to 'pinned-first'");
// YouTubeDLX.Info.Comments({ query: "Node.js tutorial", sort: "pinned-first" })
// .on("data", data => console.log(colors.italic.green("@data:"), data))
// .on("error", error => console.error(colors.italic.red("@error:"), error));

// console.log(colors.bold.blue("@info"), "VideoComments: (6): Fetch video comments with the sort set to 'longest'");
// YouTubeDLX.Info.Comments({ query: "Node.js tutorial", sort: "longest" })
// .on("data", data => console.log(colors.italic.green("@data:"), data))
// .on("error", error => console.error(colors.italic.red("@error:"), error));

// console.log(colors.bold.blue("@info"), "VideoComments: (7): Fetch video comments with the sort set to 'oldest'");
// YouTubeDLX.Info.Comments({ query: "Node.js tutorial", sort: "oldest" })
// .on("data", data => console.log(colors.italic.green("@data:"), data))
// .on("error", error => console.error(colors.italic.red("@error:"), error));

// console.log(colors.bold.blue("@info"), "VideoComments: (8): Fetch video comments with the sort set to 'least-liked'");
// YouTubeDLX.Info.Comments({ query: "Node.js tutorial", sort: "least-liked" })
// .on("data", data => console.log(colors.italic.green("@data:"), data))
// .on("error", error => console.error(colors.italic.red("@error:"), error));

// console.log(colors.bold.blue("@info"), "VideoComments: (9): Fetch video comments with the sort set to 'replies-first'");
// YouTubeDLX.Info.Comments({ query: "Node.js tutorial", sort: "replies-first" })
// .on("data", data => console.log(colors.italic.green("@data:"), data))
// .on("error", error => console.error(colors.italic.red("@error:"), error));

// console.log(colors.bold.blue("@info"), "VideoComments: (10): Fetch video comments with an invalid (too short) query");
// YouTubeDLX.Info.Comments({ query: "a" })
// .on("data", data => console.log(colors.italic.green("@data:"), data))
// .on("error", error => console.error(colors.italic.red("@error:"), error));

// console.log(colors.bold.blue("@info"), "VideoComments: (11): Fetch video comments with a query that returns no videos");
// YouTubeDLX.Info.Comments({ query: "asdhfkjashdfkjh", verbose: true })
// .on("data", data => console.log(colors.italic.green("@data:"), data))
// .on("error", error => console.error(colors.italic.red("@error:"), error));

// console.log(colors.bold.blue("@info"), "VideoComments: (12): Fetch video comments for a video likely to have no comments");
// YouTubeDLX.Info.Comments({ query: "silent ASMR no comments", verbose: true })
// .on("data", data => console.log(colors.italic.green("@data:"), data))
// .on("error", error => console.error(colors.italic.red("@error:"), error));
