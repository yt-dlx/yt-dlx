console.clear();
import { execSync } from "child_process";

function CheckCommand(command: string) {
  try {
    execSync(`${command} --version`);
    return true;
  } catch (error) {
    return false;
  }
}

async function main() {
  const commandsToCheck = ["sudo", "systemctl", "service", "tor"];
  for (const command of commandsToCheck) {
    let isAvailable: boolean;
    switch (command) {
      case "sudo":
        isAvailable = CheckCommand("sudo");
        break;
      case "systemctl":
        isAvailable = CheckCommand("systemctl");
        break;
      case "pkill":
        isAvailable = CheckCommand("pkill");
        break;
      case "tor":
        isAvailable = CheckCommand("tor");
        break;
      default:
        console.log(`Unknown command: ${command}`);
        isAvailable = false;
        break;
    }
    if (isAvailable) console.log(`'${command}' command is available.`);
    else console.log(`'${command}' command is not available.`);
  }
}

main();
