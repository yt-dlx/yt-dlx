import colors from "colors";
import formatTime from "./formatTime";
import calculateETA from "./calculateETA";
/**
 * Displays a progress bar in the console.
 *
 * @function progbar
 * @param {Object} options - Progress bar options.
 * @param {number} options.percent - Percentage of completion (0-100).
 * @param {number} options.timemark - Current time elapsed or remaining.
 * @param {number} options.baseTime - Base time for ETA calculation.
 *
 * @example
 * // Example usage:
 * progbar({ percent: 50, timemark: 10, baseTime: 0 });
 */
var progbar = ({ percent, timemark, baseTime }) => {
  if (isNaN(percent)) percent = 0;
  percent = Math.min(Math.max(percent, 0), 100);
  var color = percent < 25 ? colors.red : percent < 50 ? colors.yellow : colors.green;
  var width = Math.floor(process.stdout.columns / 4);
  var scomp = Math.round((width * percent) / 100);
  var progb = color("━").repeat(scomp) + color(" ").repeat(width - scomp);
  var timemark: any = calculateETA(baseTime, percent);
  process.stdout.write(`\r${color("@prog:")} ${progb} ${color("| @percent:")} ${percent.toFixed(2)}% ${color("| @timemark:")} ${timemark} ${color("| @eta:")} ${formatTime(timemark)}`);
};
export default progbar;
