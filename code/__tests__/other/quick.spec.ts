console.clear();
import { execSync } from "child_process";

function ctor() {
  try {
    execSync("tor --version", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}
function csudo() {
  try {
    execSync("sudo --version", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}
function cservice() {
  try {
    execSync("service --version", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}
function csystemctl() {
  try {
    execSync("systemctl --version", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

var isctor = ctor();
var iscsudo = csudo();
var iscservice = cservice();
var iscsystemctl = csystemctl();

console.log("@tor:", isctor);
console.log("@sudo:", iscsudo);
console.log("@service:", iscservice);
console.log("@systemctl:", iscsystemctl);
