import { execSync } from "child_process";
import { platform } from "os";

function osget() {
  var recom: string;
  var osPlatform = platform();
  switch (osPlatform) {
    case "darwin":
      recom = "brew services restart tor";
      break;
    case "linux":
      if (execSync("which systemctl", { stdio: "ignore" })) {
        recom = "systemctl restart tor";
      } else if (execSync("which service", { stdio: "ignore" })) {
        recom = "service tor restart";
      } else recom = "pkill tor && tor";
      break;
    default:
      return false;
  }
  try {
    execSync(recom, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

var retor = async () => {
  var sysip: any, torip: any;
  switch (osget()) {
    case true:
      try {
        sysip = execSync("curl https://checkip.amazonaws.com --insecure", {
          stdio: "pipe",
        })
          .toString()
          .trim();
        torip = execSync(
          "curl --socks5-hostname 127.0.0.1:9050 https://checkip.amazonaws.com --insecure",
          { stdio: "pipe" }
        )
          .toString()
          .trim();
      } catch (error) {
        console.error("@error:", error);
      }
      break;
    default:
      try {
        sysip = execSync("curl https://checkip.amazonaws.com --insecure", {
          stdio: "pipe",
        })
          .toString()
          .trim();
      } catch (error) {
        console.error("@error:", error);
      }
      break;
  }
  return { sysip, torip };
};

export default retor;
