"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const colors_1 = __importDefault(require("colors"));
const __1 = __importDefault(require(".."));
dotenv_1.default.config();
console.clear();
__1.default.Video.Highest({ query: "Dil Darbadar" })
    .on("data", data => console.log(colors_1.default.italic.green("@data:"), data))
    .on("error", error => console.error(colors_1.default.italic.red("@error:"), error));
//# sourceMappingURL=quick.spec.js.map