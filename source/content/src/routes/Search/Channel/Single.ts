import colors from "colors";
import { z, ZodError } from "zod";
import { Client } from "youtubei";
import { EventEmitter } from "events";
const ZodSchema = z.object({ channelLink: z.string().min(2) });
/**
 * @shortdesc Fetches detailed information about a YouTube channel using its link.
 *
 * @description This function allows you to retrieve comprehensive data for a given YouTube channel by providing its URL. The data includes details such as the channel's name, description, subscriber count, thumbnails, available videos, playlists, and more. The exact structure of the emitted data object can vary based on the channel's content and settings.
 *
 * @param {object} options - Options for fetching channel data.
 * @param {string} options.channelLink - The URL of the YouTube channel. **Required**.
 *
 * @returns {EventEmitter} An EventEmitter that emits the following events:
 * - `"data"`: Emitted with an object containing detailed information about the YouTube channel.
 * - `"error"`: Emitted if an error occurs during the fetching process, such as an invalid channel link or a network issue.
 *
 * @example
 * // Fetch data for a YouTube channel
 * YouTubeDLX.channel_data({ channelLink: "https://www.youtube.com/@LinusTechTips" })
 * .on("data", (channelInfo) => console.log("Channel Data:", channelInfo))
 * .on("error", (error) => console.error("Error:", error));
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
