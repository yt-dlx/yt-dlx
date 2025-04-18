export default function extractText(textObj) {
    return {
        runs: textObj?.runs || undefined,
        text: textObj?.text || textObj?.runs?.[0]?.text || "",
    };
}
//# sourceMappingURL=extractText.js.map