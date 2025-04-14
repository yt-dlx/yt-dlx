/**
 * Calculates the estimated time remaining (ETA) based on the start time and percentage of completion.
 *
 * @function calculateETA
 * @param {Date} startTime - The starting time of the process.
 * @param {number} percent - The current percentage of completion (0-100).
 * @returns {string} The estimated time remaining in seconds, formatted to two decimal places.
 *
 * @example
 * // Example usage:
 * const startTime = new Date();
 * const eta = calculateETA(startTime, 50);
 * console.log(eta); // Output: Estimated time remaining in seconds
 */
export default function calculateETA(startTime: Date, percent: number): string {
  var currentTime = new Date();
  var elapsedTime = (currentTime.getTime() - startTime.getTime()) / 1000;
  var remainingTime = (elapsedTime / percent) * (100 - percent);
  return remainingTime.toFixed(2);
}
