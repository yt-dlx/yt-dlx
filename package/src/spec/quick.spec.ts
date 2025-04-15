import { env } from "node:process";
import dotenv from "dotenv";
import colors from "colors";
import YouTubeDLX from "..";
console.clear();
dotenv.config();
(async () => {
  console.log(colors.bold.blue("@info"), "Test For HomeFeed: (1): Fetch home feed with only the cookies");

  var emitter = await YouTubeDLX.Account.HomeFeed({ cookies: env.cookies as string });
  emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
  emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
  console.log(colors.bold.blue("@info"), "Test For HomeFeed: (2): Fetch home feed with cookies and verbose output enabled");

  var emitter = await YouTubeDLX.Account.HomeFeed({ cookies: env.cookies as string, verbose: true });
  emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
  emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
  console.log(colors.bold.blue("@info"), "Test For HomeFeed: (3): Fetch home feed with cookies and sorting by 'oldest'");

  var emitter = await YouTubeDLX.Account.HomeFeed({ cookies: env.cookies as string, sort: "oldest" });
  emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
  emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
  console.log(colors.bold.blue("@info"), "Test For HomeFeed: (4): Fetch home feed with cookies and sorting by 'newest'");

  var emitter = await YouTubeDLX.Account.HomeFeed({ cookies: env.cookies as string, sort: "newest" });
  emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
  emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
  console.log(colors.bold.blue("@info"), "Test For HomeFeed: (5): Fetch home feed with cookies and sorting by 'old-to-new'");

  var emitter = await YouTubeDLX.Account.HomeFeed({ cookies: env.cookies as string, sort: "old-to-new" });
  emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
  emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
  console.log(colors.bold.blue("@info"), "Test For HomeFeed: (6): Fetch home feed with cookies and sorting by 'new-to-old'");

  var emitter = await YouTubeDLX.Account.HomeFeed({ cookies: env.cookies as string, sort: "new-to-old" });
  emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
  emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
  console.log(colors.bold.blue("@info"), "Test For HomeFeed: (7): Fetch home feed with all parameters (cookies: env.cookies as string, verbose, and sort)");

  var emitter = await YouTubeDLX.Account.HomeFeed({ cookies: env.cookies as string, verbose: true, sort: "new-to-old" });
  emitter.on("data", data => console.log(colors.italic.green("@data:"), data));
  emitter.on("error", error => console.error(colors.italic.red("@error:"), error));
})();
