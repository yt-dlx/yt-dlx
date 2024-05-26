"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.clear();
const list_formats_1 = __importDefault(require("../../routes/command/list_formats"));
(async () => {
    const data = await (0, list_formats_1.default)({
        query: "21 savage - redrum",
        verbose: true,
    });
    // =============================================
    console.log("@AudioLow:", data.AudioLow);
    console.log("@AudioLowDRC:", data.AudioLowDRC);
    console.log("@AudioHigh:", data.AudioHigh);
    console.log("@AudioHighDRC:", data.AudioHighDRC);
    // =============================================
    console.log("@VideoLow:", data.VideoLow);
    console.log("@VideoLowHDR:", data.VideoLowHDR);
    console.log("@VideoHigh:", data.VideoHigh);
    console.log("@VideoHighHDR:", data.VideoHighHDR);
    // =============================================
    console.log("@ManifestLow:", data.ManifestLow);
    console.log("@ManifestHigh:", data.ManifestHigh);
})();
//# sourceMappingURL=quick.spec.js.map