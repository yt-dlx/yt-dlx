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
/**
 * Searches for YouTube channels based on a query.
 *
 * @param {object} options - Options for searching channels.
 * @param {string} options.query - The search query for channels.
 *
 * @returns {EventEmitter} Emits 'data' with an array of channels or 'error'.
 *
 * @example
 * // Search for YouTube channels.
 * YouTubeDLX.search_channels({ query: "technology" })
 * .on("data", (channels) => console.log("Channels:", channels))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // Handle the case where no channels are found.
 * YouTubeDLX.search_channels({ query: "nonexistentquerythatshouldreturnnothing" })
 * .on("data", (channels) => console.log("Channels:", channels))
 * .on("error", (error) => console.error("Error:", error));
 */
export default function search_channels({ query }: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse({ query });
      const channels = await searchChannels({ query });
      if (!channels || channels.length === 0) {
        emitter.emit("error", `${colors.red("@error: ")} No channels found for the provided query.`);
        return;
      }
      emitter.emit("data", channels);
    } catch (error) {
      if (error instanceof ZodError) emitter.emit("error", `${colors.red("@error:")} Argument validation failed: ${error.errors.map(e => `${e.path.join(".")}: ${e.message}`).join(", ")}`);
      else if (error instanceof Error) emitter.emit("error", `${colors.red("@error:")} ${error.message}`);
      else emitter.emit("error", `${colors.red("@error:")} An unexpected error occurred: ${String(error)}`);
    } finally {
      console.log(colors.green("@info:"), "❣️ Thank you for using yt-dlx. Consider 🌟starring the GitHub repo https://github.com/yt-dlx.");
    }
  })();
  return emitter;
}
