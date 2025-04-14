/**
 * Interface defining the structure of a response from YouTube-related operations.
 *
 * This interface represents a standardized response format, including the data payload,
 * an optional error message, and a status indicating success or failure.
 *
 * @interface TubeResponse
 * @template T - The type of the data payload.
 * @property {T} [data] - The data returned by the operation, if successful.
 * @property {string} [message] - An optional error message, typically present when status is "error".
 * @property {"success" | "error"} status - The status of the operation, either "success" or "error".
 *
 * @example
 * const response: TubeResponse<{ count: number }> = {
 *   status: "success",
 *   data: { count: 5 },
 * };
 * console.log(response); // { status: "success", data: { count: 5 } }
 *
 * const errorResponse: TubeResponse<null> = {
 *   status: "error",
 *   message: "Failed to fetch data",
 * };
 * console.log(errorResponse); // { status: "error", message: "Failed to fetch data" }
 */
export default interface TubeResponse<T> {
  data?: T;
  message?: string;
  status: "success" | "error";
}
