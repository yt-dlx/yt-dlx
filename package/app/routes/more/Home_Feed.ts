import colors from "colors";
import { z, ZodError } from "zod";
import { EventEmitter } from "events";
import extractText from "../../utils/extractText";
import TubeResponse from "../../interfaces/TubeResponse";
import TubeLogin, { TubeType } from "../../utils/TubeLogin";
import sanitizeContentItem from "../../utils/sanitizeContentItem";
const ZodSchema = z.object({ verbose: z.boolean().optional() });
function sanitizeFeedFilterChipBar(chipBar: any): any {
  return { type: chipBar?.type || "", contents: chipBar?.contents?.map((chip: any) => ({ text: extractText(chip.text), isSelected: chip.isSelected || false })) || [] };
}
export default function Home_Feed(client: TubeType, options: z.infer<typeof ZodSchema> = {}): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse(options);
      const { verbose } = options;
      if (verbose) console.log(colors.green("@info:"), "Fetching home feed...");
      const homeFeed = await client.getHomeFeed();
      const result: TubeResponse<{ header: any; contents: any }> = {
        status: "success",
        data: {
          header: { type: homeFeed.header?.type || "", title: extractText(homeFeed.header?.title) },
          contents: {
            type: homeFeed.contents?.type || "",
            targetId: (homeFeed.contents as any)?.target_id || "",
            header: sanitizeFeedFilterChipBar((homeFeed.contents as any)?.header),
            contents: (homeFeed.contents as any)?.contents?.map(sanitizeContentItem) || [],
          },
        },
      };
      if (verbose) console.log(colors.green("@info:"), "Home feed fetched:", JSON.stringify(result, null, 2));
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
