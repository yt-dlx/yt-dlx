import colors from "colors";
import { z, ZodError } from "zod";
import { EventEmitter } from "events";
import { TubeType } from "../../utils/TubeLogin";
import TubeResponse from "../../interfaces/TubeResponse";
import sanitizeContentItem from "../../utils/sanitizeContentItem";
const ZodSchema = z.object({ verbose: z.boolean().optional() });
export default function Subscriptions_Feed(client: TubeType, options: z.infer<typeof ZodSchema> = {}): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse(options);
      const { verbose } = options;
      if (verbose) console.log(colors.green("@info:"), "Fetching subscriptions feed...");
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
