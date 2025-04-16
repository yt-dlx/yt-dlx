import { env } from "node:process";
import dotenv from "dotenv";
import colors from "colors";
import YouTubeDLX from "..";

console.clear();
dotenv.config();

function runHomeFeedTest(options: any): Promise<void> {
  return new Promise((resolve, reject) => {
    const emitter = YouTubeDLX.Account.HomeFeed(options);
    emitter.on("data", data => {
      console.log(colors.italic.green("@data:"), data);
      resolve();
    });
    emitter.on("error", error => {
      console.error(colors.italic.red("@error:"), error);
      reject(error);
    });
  });
}

(async () => {
  console.log(colors.bold.blue("@info"), "Test For HomeFeed: (1): Fetch home feed with only the cookies");
  await runHomeFeedTest({ cookies: env.YouTubeDLX_COOKIES as string });

  console.log(colors.bold.blue("@info"), "Test For HomeFeed: (2): Fetch home feed with cookies and verbose output enabled");
  await runHomeFeedTest({ cookies: env.YouTubeDLX_COOKIES as string, verbose: true });

  console.log(colors.bold.blue("@info"), "Test For HomeFeed: (3): Fetch home feed with cookies and sorting by 'oldest'");
  await runHomeFeedTest({ cookies: env.YouTubeDLX_COOKIES as string, sort: "oldest" });

  console.log(colors.bold.blue("@info"), "Test For HomeFeed: (4): Fetch home feed with cookies and sorting by 'newest'");
  await runHomeFeedTest({ cookies: env.YouTubeDLX_COOKIES as string, sort: "newest" });

  console.log(colors.bold.blue("@info"), "Test For HomeFeed: (5): Fetch home feed with cookies and sorting by 'old-to-new'");
  await runHomeFeedTest({ cookies: env.YouTubeDLX_COOKIES as string, sort: "old-to-new" });

  console.log(colors.bold.blue("@info"), "Test For HomeFeed: (6): Fetch home feed with cookies and sorting by 'new-to-old'");
  await runHomeFeedTest({ cookies: env.YouTubeDLX_COOKIES as string, sort: "new-to-old" });

  console.log(colors.bold.blue("@info"), "Test For HomeFeed: (7): Fetch home feed with all parameters (cookies: env.YouTubeDLX_COOKIES as string, verbose, and sort)");
  await runHomeFeedTest({ cookies: env.YouTubeDLX_COOKIES as string, verbose: true, sort: "new-to-old" });
})();
