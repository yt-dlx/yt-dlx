import { spawn } from "child_process";

export default async function checkSudo() {
  return new Promise<boolean>((resolve) => {
    try {
      if (process.env.sudo === "false") resolve(false);
      const check = spawn("sudo", ["-n", "true"]);
      check.on("error", () => resolve(false));
      check.on("close", (code) => {
        resolve(code === 0);
      });
    } catch (error) {
      console.error(error);
      resolve(false);
    }
  });
}
