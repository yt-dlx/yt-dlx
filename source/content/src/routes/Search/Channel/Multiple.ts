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
 * @shortdesc Searches for YouTube channels matching a given query.
 *
 * @description This function allows you to search for YouTube channels using a text-based query. It returns a list of channels that match the query, including information such as their ID, name, subscriber count, description, and thumbnails.
 *
 * @param {object} options - Options for searching channels.
 * @param {string} options.query - The search query string to find YouTube channels. **Required**.
 *
 * @returns {EventEmitter} An EventEmitter that emits the following events:
 * - `"data"`: Emitted with an array of channel objects (`channelSearchType`) that match the search query.
 * - `"error"`: Emitted if an error occurs during the search process, such as argument validation issues or network errors, or if no channels are found for the query.
 *
 * @example
 * // Define the structure for channelSearchType
 * interface channelSearchType {
 * id: string;
 * name: string;
 * subscriberCount: number;
 * description: string;
 * thumbnails: string[];
 * }
 *
 * @example
 * // 1. Search for YouTube channels with the query "programming tutorials"
 * YouTubeDLX.search_channels({ query: "programming tutorials" })
 * .on("data", (channels: channelSearchType[]) => console.log("Found Channels:", channels))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 2. Search for YouTube channels with the query "science communicators"
 * YouTubeDLX.search_channels({ query: "science communicators" })
 * .on("data", (channels: channelSearchType[]) => console.log("Found Channels:", channels))
 * .on("error", (error) => console.error("Error:", error));
 *
 * @example
 * // 3. Search for YouTube channels with a query that yields no results
 * YouTubeDLX.search_channels({ query: "nonexistent channels on youtube 12345" })
 * .on("data", (channels: channelSearchType[]) => console.log("Found Channels:", channels))
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
