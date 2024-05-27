"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Calculates the estimated time remaining based on the start time and completion percentage.
 *
 * @param startTime - The start time of the operation.
 * @param percent - The completion percentage of the operation.
 * @returns The estimated time remaining in seconds as a string with two decimal places.
 */
function calculateETA(startTime, percent) {
    var currentTime = new Date();
    var elapsedTime = (currentTime.getTime() - startTime.getTime()) / 1000;
    var remainingTime = (elapsedTime / percent) * (100 - percent);
    return remainingTime.toFixed(2);
}
exports.default = calculateETA;
//# sourceMappingURL=calculateETA.js.map