"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = calculateETA;
function calculateETA(startTime, percent) {
    var currentTime = new Date();
    var elapsedTime = (currentTime.getTime() - startTime.getTime()) / 1000;
    var remainingTime = (elapsedTime / percent) * (100 - percent);
    return remainingTime.toFixed(2);
}
//# sourceMappingURL=calculateETA.js.map