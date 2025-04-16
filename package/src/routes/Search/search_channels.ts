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
 * Searches for Tube (e.g., YouTube) channels based on a given query.
 *
 * @param {object} options - An object containing the necessary options.
 * @param {string} options.query - The search query to find channels.
 *
 * @returns {EventEmitter} An EventEmitter that emits the following events:
 * - "data": Emitted with an array of channel objects. Each object contains details like the channel ID, name, subscriber count, description, and thumbnails.
 * - "error": Emitted if there is an error during the process, such as no channels found for the query.
 *
 * @example
 * // Search for YouTube channels with the query "programming tutorials"
 * YouTubeDLX.SearchChannels({ query: "programming tutorials" })
 * .on("data", (channels) => console.log("Found channels:", channels))
 * .on("error", (err) => console.error("Error:", err));
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
