import colors from "colors";
import { z, ZodError } from "zod";
import { Client } from "youtubei";
import { EventEmitter } from "events";

const ZodSchema = z.object({
  channelLink: z.string().min(2),
});

/**
 * Fetches the channel data from YouTube based on the provided channel link.
 *
 * @param {Object} options - The parameters for fetching channel data.
 * @param {string} options.channelLink - The URL of the YouTube channel.
 *
 * @returns {EventEmitter} An EventEmitter object that emits the following events:
 * - "data": Contains the channel data.
 * - "error": Emits an error message if the fetching fails.
 *
 * @example
 * // Example 1: Fetch channel data with only the channel link
 * YouTubeDLX.Search.Video.Channel_Data({ channelLink: "https://www.youtube.com/c/ChannelName" })
 *   .on("data", (channelData) => console.log("Channel data:", channelData))
 *   .on("error", (err) => console.error("Error:", err));
 */
export default function channel_data({ channelLink }: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse({ channelLink });
      const youtube = new Client();
      const channelData: any = await youtube.getChannel(channelLink);
      if (!channelData) {
        emitter.emit("error", colors.red("@error: ") + "Unable to fetch channel data");
        return;
      }
      emitter.emit("data", channelData);
    } catch (error) {
      if (error instanceof ZodError) emitter.emit("error", error.errors);
      else if (error instanceof Error) emitter.emit("error", error.message);
      else emitter.emit("error", String(error));
    } finally {
      console.log(colors.green("@info:"), "❣️ Thank you for using yt-dlx. Consider 🌟starring the GitHub repo https://github.com/yt-dlx.");
    }
  })();
  return emitter;
}
