export default function calculateETA(startTime, percent) {
    var currentTime = new Date();
    var elapsedTime = (currentTime.getTime() - startTime.getTime()) / 1000;
    var remainingTime = (elapsedTime / percent) * (100 - percent);
    return remainingTime.toFixed(2);
}
//# sourceMappingURL=calculateETA.js.map