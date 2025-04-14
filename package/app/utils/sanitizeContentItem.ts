import extractText from "./extractText";
import sanitizeRenderer from "./sanitizeRenderer";

/**
 * Sanitizes a content item from YouTube into a standardized format.
 *
 * This function processes a content item, typically from YouTube API responses, to extract and normalize
 * relevant fields based on the item type (e.g., RichItem, RichSection, ContinuationItem). It handles
 * missing or malformed data gracefully, returning null for invalid inputs.
 *
 * @function sanitizeContentItem
 * @param {any} item - The raw content item object from YouTube.
 * @returns {any} The sanitized content item object, or null if the input is invalid.
 *
 * @example
 * const richItem = {
 *   type: "RichItem",
 *   content: {
 *     videoRenderer: {
 *       videoId: "abc123",
 *       title: { text: "Video Title" },
 *       thumbnail: { thumbnails: [{ url: "thumb.jpg", width: 320, height: 180 }] },
 *     },
 *   },
 * };
 * const result = sanitizeContentItem(richItem);
 * console.log(result);
 * // {
 * //   type: "RichItem",
 * //   content: {
 * //     videoId: "abc123",
 * //     title: { runs: undefined, text: "Video Title" },
 * //     thumbnail: [{ url: "thumb.jpg", width: 320, height: 180 }],
 * //   },
 * // }
 *
 * console.log(sanitizeContentItem(null)); // null
 */
export default function sanitizeContentItem(item: any): any {
  if (!item) return null;
  if (item.type === "RichItem" && item.content?.videoRenderer) {
    return {
      type: "RichItem",
      content: {
        videoId: item.content.videoRenderer.videoId || "",
        title: extractText(item.content.videoRenderer.title),
        thumbnail:
          item.content.videoRenderer.thumbnail?.thumbnails?.map((t: any) => ({
            url: t.url,
            width: t.width,
            height: t.height,
          })) || [],
      },
    };
  } else if (item.type === "RichSection") {
    return { type: "RichSection", content: item.content ? sanitizeRenderer(item.content) : null };
  } else if (item.type === "ContinuationItem") {
    return { type: "ContinuationItem" };
  }
  return item;
}
