import { spawnSync } from "child_process";
import colors from "colors";
import { readdirSync, lstatSync } from "fs";
import { resolve, join } from "path";
console.clear();
function runTestFiles(folderPath) {
    const files = readdirSync(folderPath);
    files.forEach((file) => {
        const filePath = join(folderPath, file);
        if (lstatSync(filePath).isDirectory()) {
            if (file === "Command")
                runTestFiles(filePath);
        }
        else if (file.endsWith(".test.js")) {
            console.log(colors.yellow("@testing:"), filePath);
            const result = spawnSync("node", [filePath], { stdio: "inherit" });
            if (result.error)
                console.error(colors.red("@error:"), result.error);
        }
    });
}
runTestFiles(resolve(__dirname));
//# sourceMappingURL=command.js.map