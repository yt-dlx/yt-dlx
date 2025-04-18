"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.locator = locator;
const colors_1 = __importDefault(require("colors"));
const path = __importStar(require("path"));
const fsx = __importStar(require("fs-extra"));
async function getBinaryPath(execName) {
    try {
        const nodeModulesPath = path.join(process.cwd(), "node_modules", "yt-dlx", "package");
        const binaryPath = path.join(nodeModulesPath, execName + (process.platform === "win32" ? ".exe" : process.platform === "linux" ? ".bin" : ""));
        try {
            await fsx.access(binaryPath, fsx.constants.X_OK);
            return binaryPath;
        }
        catch {
            const devPath = path.join(process.cwd(), "package", execName + (process.platform === "win32" ? ".exe" : process.platform === "linux" ? ".bin" : ""));
            await fsx.access(devPath, fsx.constants.X_OK);
            return devPath;
        }
    }
    catch {
        return null;
    }
}
async function locator() {
    try {
        const results = {};
        const execNames = ["yt-dlx", "ffmpeg", "ffprobe"];
        for (const execName of execNames) {
            const execPath = await getBinaryPath(execName);
            if (execPath)
                results[execName] = execPath;
            else {
                console.log(colors_1.default.yellow("@warning:"), `${execName} not found in package binary directory.`);
                if (execName === "yt-dlx")
                    console.error(colors_1.default.red("@error:"), "please run 'yarn/npm/bun/pnpm install/add yt-dlx'");
                results[execName] = "";
            }
        }
        return results;
    }
    catch (error) {
        console.error(colors_1.default.red("@error:"), "Error in locator function:", error);
        return {};
    }
}
//# sourceMappingURL=locator.js.map