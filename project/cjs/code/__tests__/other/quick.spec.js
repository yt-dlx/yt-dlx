"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.clear();
const AudioCustom_1 = __importDefault(require("../../routes/Audio/single/AudioCustom"));
(async () => {
    var core = await (0, AudioCustom_1.default)({
        query: "21 savage - redrum",
        resolution: "medium",
        metadata: false,
        verbose: true,
        stream: false,
        useTor: true,
    });
    console.log("@AudioCustom:", core);
})();
//# sourceMappingURL=quick.spec.js.map