import colors from "colors";
import { z, ZodError } from "zod";
import { EventEmitter } from "events";
import { TubeType } from "../../utils/TubeLogin";
import TubeResponse from "../../interfaces/TubeResponse";
const ZodSchema = z.object({ verbose: z.boolean().optional() });
function sanitizeContentItem(item: any): any {
  if (!item) return null;
  if (item.type === "RichItem" && item.content?.videoRenderer) {
    return {
      type: "RichItem",
      content: {
        videoId: item.content.videoRenderer.videoId || "",
        title: { runs: item.content.videoRenderer.title?.runs, text: item.content.videoRenderer.title?.text || item.content.videoRenderer.title?.runs?.[0]?.text || "" },
        thumbnail: item.content.videoRenderer.thumbnail?.thumbnails?.map((t: any) => ({ url: t.url, width: t.width, height: t.height })) || [],
      },
    };
  } else if (item.type === "RichSection") return { type: "RichSection", content: item.content ? sanitizeRenderer(item.content) : null };
  else if (item.type === "ContinuationItem") return { type: "ContinuationItem" };
  return item;
}
function sanitizeRenderer(renderer: any): any {
  if (!renderer) return null;
  const result: any = { type: renderer.type };
  for (const key in renderer) {
    if (key === "type") continue;
    if (Array.isArray(renderer[key])) result[key] = renderer[key].map((item: any) => (typeof item === "object" ? sanitizeRenderer(item) : item));
    else if (typeof renderer[key] === "object") result[key] = sanitizeRenderer(renderer[key]);
    else result[key] = renderer[key];
  }
  return result;
}
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
