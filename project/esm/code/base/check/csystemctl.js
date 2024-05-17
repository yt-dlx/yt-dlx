import { execSync } from "child_process";
export default function csystemctl() {
    try {
        execSync("systemctl --version", { stdio: "ignore" });
        execSync("systemctl tor stop", { stdio: "ignore" });
        return true;
    }
    catch {
        return false;
    }
}
//# sourceMappingURL=csystemctl.js.map