import colors from "colors";
import { z, ZodError } from "zod";
import { Client } from "youtubei";
import { EventEmitter } from "events";
const ZodSchema = z.object({ channelLink: z.string().min(2) });
/**
 * Fetches data for a given Tube (e.g., YouTube) channel link.
 *
 * @param {object} options - An object containing the necessary options.
 * @param {string} options.channelLink - The URL of the YouTube channel.
 *
 * @returns {EventEmitter} An EventEmitter that emits the following events:
 * - "data": Emitted with the channel data object, which includes information like channel title, description, subscriber count, and thumbnails.
 * - "error": Emitted if there is an error during the process, such as an incorrect channel link or if the data cannot be retrieved.
 *
 * @example
 * // Fetch data for a YouTube channel
 * YouTubeDLX.ChannelData({ channelLink: "https://www.youtube.com/@Google" })
 * .on("data", (channelInfo) => console.log("Channel Data:", channelInfo))
 * .on("error", (err) => console.error("Error:", err));
 */
export default function channel_data({ channelLink }: z.infer<typeof ZodSchema>): EventEmitter {
  const emitter = new EventEmitter();
  (async () => {
    try {
      ZodSchema.parse({ channelLink });
      const youtube = new Client();
      const channelData: any = await youtube.getChannel(channelLink);
      if (!channelData) {
        emitter.emit("error", `${colors.red("@error: ")} Unable to fetch channel data for the provided link.`);
        return;
      }
      emitter.emit("data", channelData);
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
