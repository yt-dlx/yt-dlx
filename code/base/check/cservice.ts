import { execSync } from "child_process";

export default function cservice(): boolean {
  try {
    execSync("service --version", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}
