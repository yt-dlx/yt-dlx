import { exec } from "child_process";
import { platform } from "os";

const commands = {
  win32:
    'tsc -p tsconfig.json && caxa --input . --output "out/server.exe" -- "{{caxa}}/node_modules/.bin/node" "{{caxa}}/build/index.js"',
  darwin:
    'tsc -p tsconfig.json && caxa --input . --output "out/server.app" -- "{{caxa}}/node_modules/.bin/node" "{{caxa}}/build/index.js"',
  linux:
    'tsc -p tsconfig.json && caxa --input . --output "out/server.sh" -- "{{caxa}}/node_modules/.bin/node" "{{caxa}}/build/index.js"',
};

const command = commands[platform()];

if (command) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }
    console.log(`Stdout: ${stdout}`);
  });
} else console.error("Unsupported platform");
