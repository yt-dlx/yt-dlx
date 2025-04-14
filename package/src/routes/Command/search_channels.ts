import colors from "colors";
import { z, ZodError } from "zod";
import { Client } from "youtubei";
import { EventEmitter } from "events";
const ZodSchema = z.object({ query: z.string().min(2) });
export interface channelSearchType {
  id: string;
  name: string;
  subscriberCount: number;
  description: string;
  thumbnails: string[];
}
async function searchChannels({ query }: { query: string }): Promise<channelSearchType[]> {
  try {
    const youtube = new Client();
    const searchResults = await youtube.search(query, { type: "channel" });
    const result: channelSearchType[] = searchResults.items.map((item: any) => ({
      id: item.id,
      name: item.name,
      subscriberCount: item.subscriberCount,
      description: item.description,
      thumbnails: item.thumbnails,
    }));
    return result;
  } catch (error: any) {
    console.error(colors.red("@error: ") + error.message);
    return [];
  }
}
export default function search_channels({ query }: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse({ query });
      const channels = await searchChannels({ query });
      if (!channels || channels.length === 0) {
        emitter.emit("error", colors.red("@error: ") + "No channels found");
        return;
      }
      emitter.emit("data", channels);
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
