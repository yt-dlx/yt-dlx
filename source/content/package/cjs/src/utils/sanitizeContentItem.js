"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = sanitizeContentItem;
const extractText_1 = __importDefault(require("./extractText"));
const sanitizeRenderer_1 = __importDefault(require("./sanitizeRenderer"));
function sanitizeContentItem(item) {
    if (!item)
        return null;
    if (item.type === "RichItem" && item.content?.videoRenderer) {
        return {
            type: "RichItem",
            content: {
                videoId: item.content.videoRenderer.videoId || "",
                title: (0, extractText_1.default)(item.content.videoRenderer.title),
                thumbnail: item.content.videoRenderer.thumbnail?.thumbnails?.map((t) => ({
                    url: t.url,
                    width: t.width,
                    height: t.height,
                })) || [],
            },
        };
    }
    else if (item.type === "RichSection")
        return { type: "RichSection", content: item.content ? (0, sanitizeRenderer_1.default)(item.content) : null };
    else if (item.type === "ContinuationItem")
        return { type: "ContinuationItem" };
    return item;
}
//# sourceMappingURL=sanitizeContentItem.js.map