import colors from "colors";
import { z, ZodError } from "zod";
import { EventEmitter } from "events";
import TubeResponse from "../../interfaces/TubeResponse";
import TubeLogin, { TubeType } from "../../utils/TubeLogin";
import sanitizeContentItem from "../../utils/sanitizeContentItem";
const ZodSchema = z.object({ cookiesPath: z.string(), verbose: z.boolean().optional() });
export default function subscriptions_feed(options: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse(options);
      const { verbose, cookiesPath } = options;
      if (verbose) console.log(colors.green("@info:"), "Fetching subscriptions feed...");
      if (!cookiesPath) {
        emitter.emit("error", `${colors.red("@error:")} incorrect 'cookiesPath' provided!`);
        return;
      }
      const client: TubeType = await TubeLogin(cookiesPath);
      const feed = await client.getSubscriptionsFeed();
      const contents = (feed as any).contents?.map(sanitizeContentItem) || [];
      const result: TubeResponse<{ contents: any[] }> = { status: "success", data: { contents } };
      if (verbose) console.log(colors.green("@info:"), "Subscriptions feed fetched:", JSON.stringify(result, null, 2));
      emitter.emit("data", result);
    } catch (error: unknown) {
      switch (true) {
        case error instanceof ZodError:
          emitter.emit("error", error.errors);
          break;
        default:
          emitter.emit("error", (error as Error).message);
          break;
      }
    } finally {
      console.log(colors.green("@info:"), "❣️ Thank you for using yt-dlx. Consider starring our GitHub repo https://github.com/yt-dlx.");
    }
  })().catch(err => emitter.emit("error", err.message));
  return emitter;
}
