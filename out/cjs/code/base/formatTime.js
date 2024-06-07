"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatTime(seconds) {
    if (!isFinite(seconds) || isNaN(seconds))
        return "00h 00m 00s";
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var secs = Math.floor(seconds % 60);
    return `${hours.toString().padStart(2, "0")}h ${minutes
        .toString()
        .padStart(2, "0")}m ${secs.toString().padStart(2, "0")}s`;
}
exports.default = formatTime;
//# sourceMappingURL=formatTime.js.map