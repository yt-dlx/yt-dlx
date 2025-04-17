import colors from "colors";
import { z, ZodError } from "zod";
import { Client } from "youtubei";
import { EventEmitter } from "events";
const ZodSchema = z.object({ channelLink: z.string().min(2) });
/**
 * Fetches data for a YouTube channel.
 *
 * @param {object} options - Options for fetching channel data.
 * @param {string} options.channelLink - The link to the YouTube channel.
 *
 * @returns {EventEmitter} Emits 'data' with channel information or 'error'.
 *
 * @example
 * // Fetch data for a YouTube channel.
 * YouTubeDLX.Search.Channel.Single({ channelLink: "https://www.youtube.com/@LinusTechTips" })
 * .on("data", (channelInfo) => console.log("Channel Info:", channelInfo))
 * .on("error", (error) => console.error("Error:", error));
 *
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
