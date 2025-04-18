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
exports.Tube = void 0;
exports.default = TubeLogin;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const colors_1 = __importDefault(require("colors"));
const youtubei_js_1 = require("youtubei.js");
exports.Tube = null;
async function TubeLogin(cookiesFilePathOrString) {
    let cookiesData;
    if (fs.existsSync(cookiesFilePathOrString)) {
        try {
            cookiesData = fs.readFileSync(cookiesFilePathOrString, "utf8");
        }
        catch (error) {
            console.error(colors_1.default.red("@error:"), "Failed to read cookies file.");
            process.exit(1);
        }
    }
    else
        cookiesData = cookiesFilePathOrString;
    try {
        exports.Tube = await youtubei_js_1.Innertube.create({
            user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            cache: new youtubei_js_1.UniversalCache(true, path.join(process.cwd(), "YouTubeDLX")),
            cookie: cookiesData,
        });
        console.log(colors_1.default.green("@info:"), "Connected to YouTube...");
        return exports.Tube;
    }
    catch (err) {
        console.error(colors_1.default.red("@error:"), "Failed to authenticate. The cookies appear to be corrupt or invalid.");
        console.error(colors_1.default.red("@error:"), "Try using valid YouTube cookies.");
        process.exit(1);
    }
}
//# sourceMappingURL=TubeLogin.js.map