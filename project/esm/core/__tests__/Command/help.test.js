import YouTube from "../../";
import colors from "colors";
(async () => {
    try {
        console.log(colors.blue("@test:"), "help");
        await YouTube.info.help();
    }
    catch (error) {
        console.error(colors.red(error.message));
    }
})();
//# sourceMappingURL=help.test.js.map