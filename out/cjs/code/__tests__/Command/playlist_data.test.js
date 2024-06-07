"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require("../../"));
const colors_1 = __importDefault(require("colors"));
(async () => {
    try {
        console.log(colors_1.default.blue("@test:"), "ytSearch playlist single");
        const result = await __1.default.ytSearch.Playlist.Single({
            query: "https://youtube.com/playlist?list=PL06diOotXAJLAAHBY7kIUm5GQwm2ZinOz&si=raalOwdBLBtmJ9s5",
        });
        console.log(result);
    }
    catch (error) {
        console.error(colors_1.default.red(error.message));
    }
})();
//# sourceMappingURL=playlist_data.test.js.map