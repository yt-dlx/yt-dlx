import colors from "colors";
import { z, ZodError } from "zod";
import { EventEmitter } from "events";
import TubeResponse from "../../interfaces/TubeResponse";
import TubeLogin, { TubeType } from "../../utils/TubeLogin";
import sanitizeContentItem from "../../utils/sanitizeContentItem";
const ZodSchema = z.object({ cookies: z.string(), verbose: z.boolean().optional() });
export default function subscriptions_feed(options: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse(options);
      const { verbose, cookies } = options;
      if (verbose) console.log(colors.green("@info:"), "Fetching subscriptions feed...");
      if (!cookies) {
        emitter.emit("error", `${colors.red("@error:")} cookies not provided!`);
        return;
      }
      const client: TubeType = await TubeLogin(cookies);
      const feed = await client.getSubscriptionsFeed();
      const contents = (feed as any).contents?.map(sanitizeContentItem) || [];
      const result: TubeResponse<{ contents: any[] }> = { status: "success", data: { contents } };
      if (verbose) console.log(colors.green("@info:"), "Subscriptions feed fetched!");
      emitter.emit("data", result);
    } catch (error) {
      if (error instanceof ZodError) emitter.emit("error", error.errors);
      else if (error instanceof Error) emitter.emit("error", error.message);
      else emitter.emit("error", String(error));
    } finally {
      console.log(colors.green("@info:"), "❣️ Thank you for using yt-dlx. Consider 🌟starring the GitHub repo https://github.com/yt-dlx.");
    }
  })();
  return emitter;
}
