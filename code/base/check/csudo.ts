import { execSync } from "child_process";

export default function csudo(): boolean {
  try {
    execSync("sudo --version", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}
