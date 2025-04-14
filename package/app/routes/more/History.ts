import colors from "colors";
import { z, ZodError } from "zod";
import { EventEmitter } from "events";
import { TubeType } from "../../utils/TubeLogin";
import TubeResponse from "../../interfaces/TubeResponse";
import sanitizeRenderer from "../../utils/sanitizeRenderer";
import sanitizeContentItem from "../../utils/sanitizeContentItem";
const ZodSchema = z.object({ verbose: z.boolean().optional() });
export default function History(client: TubeType, options: z.infer<typeof ZodSchema> = {}): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse(options);
      const { verbose } = options;
      if (verbose) console.log(colors.green("@info:"), "Fetching watch history...");
      const history = await client.getHistory();
      const result: TubeResponse<{ sections: any[]; feedActions: any }> = {
        status: "success",
        data: {
          sections: history.sections?.map((section: any) => ({ type: section.type, header: sanitizeRenderer(section.header?.[0]), contents: section.contents?.map(sanitizeContentItem) || [] })) || [],
          feedActions: { type: history.feed_actions?.type || "", contents: history.feed_actions?.contents?.map((action: any) => sanitizeRenderer(action)) || [] },
        },
      };
      if (verbose) console.log(colors.green("@info:"), "Watch history fetched:", JSON.stringify(result, null, 2));
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
