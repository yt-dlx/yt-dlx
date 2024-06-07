"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.clear();
const AudioHighest_1 = __importDefault(require("../../routes/Audio/single/AudioHighest"));
(async () => {
    var core = await (0, AudioHighest_1.default)({
        query: "21 savage - redrum",
        metadata: false,
        verbose: true,
        stream: false,
        useTor: false,
    });
    console.log("@AudioCustom:", core);
})();
//# sourceMappingURL=quick.spec.js.map