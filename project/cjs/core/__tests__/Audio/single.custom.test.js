"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// =============================[ CORE TESTER ]=============================
//
const colors_1 = __importDefault(require("colors"));
const __1 = __importDefault(require("../../"));
(async () => {
    try {
        const resolutions = ["high", "medium", "low", "ultralow"];
        for (const resolution of resolutions) {
            await __1.default.AudioOnly.Single.Custom({
                resolution,
                stream: false,
                verbose: true,
                onionTor: false,
                output: "public/audio",
                query: "21 savage - redrum",
            });
        }
    }
    catch (error) {
        console.error(colors_1.default.red(error.message));
    }
})();
//
// =============================[ CORE TESTER ]=============================
//# sourceMappingURL=single.custom.test.js.map