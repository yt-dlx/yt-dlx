"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.clear();
const AudioHighest_1 = __importDefault(require("../../routes/Audio/single/AudioHighest"));
(async () => {
    const data = await (0, AudioHighest_1.default)({
        query: "21 savage - redrum",
        metadata: true,
        verbose: true,
        stream: true,
        useTor: true,
    });
    console.log("@AudioHighest:", data);
})();
//# sourceMappingURL=quick.spec.js.map