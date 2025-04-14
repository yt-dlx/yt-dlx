/**
 * Sanitizes a renderer object from YouTube into a standardized format.
 *
 * This function recursively processes a renderer object, typically from YouTube API responses, to normalize its structure.
 * It preserves the object's `type` property, recursively sanitizes nested objects and arrays, and copies primitive values as-is.
 * Returns null for invalid or missing inputs.
 *
 * @function sanitizeRenderer
 * @param {any} renderer - The raw renderer object from YouTube.
 * @returns {any} The sanitized renderer object, or null if the input is invalid.
 *
 * @example
 * const renderer = {
 *   type: "exampleRenderer",
 *   data: { name: "test" },
 *   items: [{ type: "nested", value: 42 }, "text"],
 * };
 * const result = sanitizeRenderer(renderer);
 * console.log(result);
 * // {
 * //   type: "exampleRenderer",
 * //   data: { type: undefined, name: "test" },
 * //   items: [{ type: "nested", value: 42 }, "text"],
 * // }
 *
 * console.log(sanitizeRenderer(null)); // null
 */
export default function sanitizeRenderer(renderer: any): any {
  if (!renderer) return null;
  const result: any = { type: renderer.type };
  for (const key in renderer) {
    if (key === "type") continue;
    if (Array.isArray(renderer[key])) {
      result[key] = renderer[key].map((item: any) => (typeof item === "object" ? sanitizeRenderer(item) : item));
    } else if (typeof renderer[key] === "object") {
      result[key] = sanitizeRenderer(renderer[key]);
    } else {
      result[key] = renderer[key];
    }
  }
  return result;
}
