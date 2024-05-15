import colors from "colors";
import YouTubeID from "../../web/YouTubeId";
import web, { singleVideoType } from "../../web";

/**
 * Fetches data for a single YouTube video based on the video ID or link.
 *
 * @param query - The video ID or link.
 * @returns A Promise that resolves with the metadata for the single video.
 * @throws An error if the input is an incorrect video link or if unable to get a response.
 */
export default async function video_data({
  query,
}: {
  query: string;
}): Promise<singleVideoType> {
  const videoId = await YouTubeID(query);
  if (!videoId) {
    throw new Error(colors.red("@error: ") + "incorrect playlist link");
  } else {
    const metaData = await web.singleVideo({ videoId });
    if (!metaData) {
      throw new Error(colors.red("@error: ") + "Unable to get response!");
    } else return metaData;
  }
}
