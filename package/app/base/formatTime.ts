/**
 * Formats a given number of seconds into a human-readable time format (hh:mm:ss).
 *
 * @function formatTime
 * @param {number} seconds - The number of seconds to format.
 * @returns {string} Formatted time string in "hh hours mm minutes ss seconds" format.
 * Returns "00h 00m 00s" if the input is not a finite number or is NaN.
 *
 * @example
 * // Example usage:
 * const formattedTime = formatTime(3665); // 3665 seconds = 1 hour, 1 minute, 5 seconds
 * console.log(formattedTime); // Output: "01h 01m 05s"
 */
export default function formatTime(seconds: number): string {
  if (!isFinite(seconds) || isNaN(seconds)) return "00h 00m 00s";
  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor((seconds % 3600) / 60);
  var secs = Math.floor(seconds % 60);
  return `${hours.toString().padStart(2, "0")}h ${minutes.toString().padStart(2, "0")}m ${secs.toString().padStart(2, "0")}s`;
}
