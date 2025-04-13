/**
 * Represents a function that formats a given filesize into a human-readable string or returns the original number.
 *
 * @interface sizeFormat
 */
export default interface sizeFormat {
  /**
   * Formats the given filesize in bytes into a human-readable format (e.g., B, MB, GB, TB).
   *
   * @param {number} filesize - The filesize in bytes.
   * @returns {string | number} A human-readable string representing the size in B, MB, GB, or TB,
   *                            or the original number if the filesize is invalid or negative.
   *
   * @example
   * sizeFormat(1048576); // Output: "1.00 MB"
   * sizeFormat(-100); // Output: -100
   */
  (filesize: number): string | number;
}
