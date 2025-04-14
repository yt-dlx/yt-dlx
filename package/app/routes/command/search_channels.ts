import colors from "colors";
import { z, ZodError } from "zod";
import { Client } from "youtubei";
import { EventEmitter } from "events";
/**
 * Zod schema for validating the input parameters for the search_channels function.
 *
 * @typedef {object} SearchChannelsParams
 * @property {string} query - The search query to find channels on YouTube. Must be at least 2 characters long.
 */
const ZodSchema = z.object({ query: z.string().min(2) });
/**
 * Represents the structure of a YouTube channel search result.
 *
 * @interface channelSearchType
 * @property {string} id - The ID of the channel.
 * @property {string} name - The name of the channel.
 * @property {number} subscriberCount - The number of subscribers the channel has.
 * @property {string} description - The description of the channel.
 * @property {string[]} thumbnails - An array of thumbnail URLs for the channel.
 */
export interface channelSearchType {
  id: string;
  name: string;
  subscriberCount: number;
  description: string;
  thumbnails: string[];
}
/**
 * Searches for YouTube channels based on the provided query.
 *
 * @function searchChannels
 * @param {SearchChannelsParams} options - The options object containing the search query.
 * @param {string} options.query - The search query to find channels on YouTube.
 * @returns {Promise<channelSearchType[]>} A promise that resolves with a list of channels matching the search query.
 *
 * @example
 * const channels = await searchChannels({ query: "Tech reviews" });
 */
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
 * Searches for YouTube channels based on a given query string and emits the channel data.
 *
 * @function search_channels
 * @param {SearchChannelsParams} options - The options object containing the search query.
 * @param {string} options.query - The search query to find channels on YouTube.
 * @returns {EventEmitter} The event emitter to handle `data` and `error` events.
 *
 * @example
 * const emitter = search_channels({ query: "Tech reviews" });
 * emitter.on("data", data => console.log(data));
 * emitter.on("error", error => console.error(error));
 */
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
