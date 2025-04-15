import { env } from "node:process";
import dotenv from "dotenv";
import colors from "colors";
import YouTubeDLX from "..";
console.clear();
dotenv.config();
(async () => {
  console.log(colors.bold.blue("@info"), "Test For HomeFeed: (1): Fetch home feed with only the cookies");
  var emitter = await YouTubeDLX.Account.HomeFeed({ cookies: env.cookies as string });
  emitter.on("data", async data => {
    const result = await data;
    console.log(result);
  });
  emitter.on("error", async error => {
    const result = await error;
    console.log(result);
  });
})();
