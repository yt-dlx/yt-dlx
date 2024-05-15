"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const colors_1 = __importDefault(require("colors"));
const fs_1 = require("fs");
const path_1 = require("path");
console.clear();
function runTestFiles(folderPath) {
    const files = (0, fs_1.readdirSync)(folderPath);
    files.forEach((file) => {
        const filePath = (0, path_1.join)(folderPath, file);
        if ((0, fs_1.lstatSync)(filePath).isDirectory()) {
            if (file === "Audio")
                runTestFiles(filePath);
        }
        else if (file.endsWith(".test.js")) {
            console.log(colors_1.default.yellow("@testing:"), filePath);
            const result = (0, child_process_1.spawnSync)("node", [filePath], { stdio: "inherit" });
            if (result.error)
                console.error(colors_1.default.red("@error:"), result.error);
        }
    });
}
runTestFiles((0, path_1.resolve)(__dirname));
//# sourceMappingURL=audio.js.map