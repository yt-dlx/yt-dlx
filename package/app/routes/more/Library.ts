import colors from "colors";
import { z, ZodError } from "zod";
import { EventEmitter } from "events";
import { TubeType } from "../../utils/TubeLogin";
import extractText from "../../utils/extractText";
import TubeResponse from "../../interfaces/TubeResponse";
import sanitizeRenderer from "../../utils/sanitizeRenderer";
import sanitizeContentItem from "../../utils/sanitizeContentItem";
const ZodSchema = z.object({ verbose: z.boolean().optional() });
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
