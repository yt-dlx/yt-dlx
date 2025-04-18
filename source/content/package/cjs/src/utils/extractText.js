"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = extractText;
function extractText(textObj) {
    return {
        runs: textObj?.runs || undefined,
        text: textObj?.text || textObj?.runs?.[0]?.text || "",
    };
}
//# sourceMappingURL=extractText.js.map