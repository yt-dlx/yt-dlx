/**
 * Extracts text and runs from a YouTube text object into a standardized format.
 *
 * This function processes a text object, typically from YouTube API responses, to extract its text content
 * and optional runs array, handling cases where the object may be malformed or incomplete.
 *
 * @function extractText
 * @param {any} textObj - The raw text object from YouTube, which may contain a `text` field or a `runs` array.
 * @returns {{ runs?: any[]; text: string }} An object containing the extracted text and optional runs array.
 *
 * @example
 * const textObj = { text: "Hello", runs: [{ text: "Hello" }] };
 * const result = extractText(textObj);
 * console.log(result); // { runs: [{ text: "Hello" }], text: "Hello" }
 *
 * const emptyObj = {};
 * console.log(extractText(emptyObj)); // { runs: undefined, text: "" }
 */
export default function extractText(textObj: any): { runs?: any[]; text: string } {
  return {
    runs: textObj?.runs || undefined,
    text: textObj?.text || textObj?.runs?.[0]?.text || "",
  };
}
