import { execSync } from "child_process";

export default function cip(): { sysIP: string; torIP: string } {
  try {
    return {
      sysIP: execSync("curl https://checkip.amazonaws.com --insecure", {
        stdio: "pipe",
      })
        .toString()
        .trim(),
      torIP: execSync(
        "curl --socks5-hostname 127.0.0.1:9050 https://checkip.amazonaws.com --insecure",
        {
          stdio: "pipe",
        }
      )
        .toString()
        .trim(),
    };
  } catch {
    return { sysIP: "", torIP: "" };
  }
}
