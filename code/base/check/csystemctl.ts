import { execSync } from "child_process";

export default function csystemctl(): boolean {
  try {
    execSync("systemctl --version", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}
