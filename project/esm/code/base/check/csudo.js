import { execSync } from "child_process";
export default function csudo() {
    try {
        execSync("sudo --version", { stdio: "ignore" });
        return true;
    }
    catch {
        return false;
    }
}
//# sourceMappingURL=csudo.js.map