console.clear();
import cip from "../../base/check/cip";
import { execSync } from "child_process";
import cservice from "../../base/check/cservice";
import csystemctl from "../../base/check/csystemctl";

switch (true) {
  case csystemctl():
    execSync("systemctl restart tor", { stdio: "inherit" });
    console.log("@ipAddress", cip(true));
    break;
  case cservice():
    execSync("service tor restart", { stdio: "inherit" });
    console.log("@ipAddress", cip(true));
    break;
  default:
    console.log("@ipAddress", cip(false));
    break;
}
