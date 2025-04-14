import colors from "colors";
import { z, ZodError } from "zod";
import { Client } from "youtubei";
import { EventEmitter } from "events";
/**
 * Defines the schema for the input parameters used in the `channel_data` function.
 *
 * @typedef {object} ChannelDataOptions
 * @property {string} channelLink - The URL or ID of the YouTube channel.
 */
const ZodSchema = z.object({ channelLink: z.string().min(2) });
/**
 * Fetches the details of a YouTube channel based on its link or ID and emits the data.
 *
 * @function channel_data
 * @param {ChannelDataOptions} options - The options object containing the channel link.
 * @returns {EventEmitter} The event emitter to handle `data` and `error` events.
 *
 * @example
 * const emitter = channel_data({ channelLink: "https://www.youtube.com/channel/UC..." });
 * emitter.on("data", data => console.log(data));
 * emitter.on("error", error => console.error(error));
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
      console.log(colors.green("@info:"), "❣️ Thank you for using yt-dlx. Consider 🌟starring the GitHub repo https://github.com/yt-dlx.");
    }
  })().catch(err => emitter.emit("error", err.message));
  return emitter;
}
