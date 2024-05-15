import { execSync } from "child_process";
import { platform } from "os";

function osget() {
  var recom: string;
  try {
    if (platform() === "darwin") {
      recom = "brew services stop tor && brew services start tor";
    } else if (platform() === "linux") {
      if (execSync("command -v systemctl", { stdio: "ignore" })) {
        recom = "systemctl stop tor && systemctl start tor";
      } else recom = "service tor stop && service tor start";
    } else return false;
  } catch {
    recom = "pkill tor && tor";
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
