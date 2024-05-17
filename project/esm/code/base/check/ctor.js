import { execSync } from "child_process";
export default function ctor() {
    try {
        execSync("tor --version", { stdio: "ignore" });
        return true;
    }
    catch {
        return false;
    }
}
//# sourceMappingURL=ctor.js.map