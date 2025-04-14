import colors from "colors";
import { z, ZodError } from "zod";
import { EventEmitter } from "events";
import { TubeType } from "../../utils/TubeLogin";
import TubeResponse from "../../interfaces/TubeResponse";
const ZodSchema = z.object({ verbose: z.boolean().optional() });
function extractText(textObj: any): { runs?: any[]; text: string } {
  return { runs: textObj?.runs || undefined, text: textObj?.text || textObj?.runs?.[0]?.text || "" };
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
function sanitizeContentItem(item: any): any {
  if (!item) return null;
  if (item.type === "RichItem" && item.content?.videoRenderer) {
    return {
      type: "RichItem",
      content: {
        videoId: item.content.videoRenderer.videoId || "",
        title: extractText(item.content.videoRenderer.title),
        thumbnail: item.content.videoRenderer.thumbnail?.thumbnails?.map((t: any) => ({ url: t.url, width: t.width, height: t.height })) || [],
      },
    };
  } else if (item.type === "RichSection") return { type: "RichSection", content: item.content ? sanitizeRenderer(item.content) : null };
  else if (item.type === "ContinuationItem") return { type: "ContinuationItem" };
  return item;
}
export default function Library(client: TubeType, options: z.infer<typeof ZodSchema> = {}): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse(options);
      const { verbose } = options;
      if (verbose) console.log(colors.green("@info:"), "Fetching library...");
      const library = await client.getLibrary();
      const result: TubeResponse<{ header: any; sections: any[] }> = {
        status: "success",
        data: {
          header: {
            type: library.header?.type || "",
            pageTitle: library.header?.page_title || "",
            content: {
              type: library.header?.content?.type || "",
              banner: library.header?.content?.banner || null,
              title: extractText(library.header?.content?.title),
              heroImage: library.header?.content?.hero_image || null,
              image: sanitizeRenderer(library.header?.content?.image),
              description: library.header?.content?.description || null,
              actions: sanitizeRenderer(library.header?.content?.actions),
              attributation: library.header?.content?.attributation || null,
              metadata: sanitizeRenderer(library.header?.content?.metadata),
              animatedImage: library.header?.content?.animated_image || null,
            },
          },
          sections: library.sections?.map((section: any) => ({ type: section.type, header: sanitizeRenderer(section.header?.[0]), contents: section.contents?.map(sanitizeContentItem) || [] })) || [],
        },
      };
      if (verbose) console.log(colors.green("@info:"), "Library fetched:", JSON.stringify(result, null, 2));
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
