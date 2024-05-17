import { execSync } from "child_process";

export default function cip(useTor: boolean): {
  sysIP: string;
  torIP?: string;
} {
  try {
    var sysIP = execSync("curl https://checkip.amazonaws.com --insecure", {
      stdio: "pipe",
    })
      .toString()
      .trim();
    var torIP: string | undefined;
    if (useTor) {
      torIP = execSync(
        "curl --socks5-hostname 127.0.0.1:9050 https://checkip.amazonaws.com --insecure",
        {
          stdio: "pipe",
        }
      )
        .toString()
        .trim();
    }
    return { sysIP, torIP };
  } catch {
    return { sysIP: "", torIP: "" };
  }
}
