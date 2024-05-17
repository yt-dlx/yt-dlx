import { execSync } from "child_process";

export default function ctor(): boolean {
  try {
    execSync("tor --version", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}
