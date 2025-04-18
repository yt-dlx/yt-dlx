"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const formatTime_1 = __importDefault(require("./formatTime"));
const calculateETA_1 = __importDefault(require("./calculateETA"));
var progbar = ({ percent, timemark, baseTime }) => {
    if (isNaN(percent))
        percent = 0;
    percent = Math.min(Math.max(percent, 0), 100);
    var color = percent < 25 ? colors_1.default.red : percent < 50 ? colors_1.default.yellow : colors_1.default.green;
    var width = Math.floor(process.stdout.columns / 4);
    var scomp = Math.round((width * percent) / 100);
    var progb = color("━").repeat(scomp) + color(" ").repeat(width - scomp);
    var timemark = (0, calculateETA_1.default)(baseTime, percent);
    process.stdout.write(`\r${color("@prog:")} ${progb} ${color("| @percent:")} ${percent.toFixed(2)}% ${color("| @timemark:")} ${timemark} ${color("| @eta:")} ${(0, formatTime_1.default)(timemark)}`);
};
exports.default = progbar;
//# sourceMappingURL=progbar.js.map