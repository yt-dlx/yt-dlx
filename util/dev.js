const os = require("os");
const readline = require("readline");
const { spawn } = require("child_process");

console.clear();

const colors = {
  reset: "\x1b[0m",
  red: "\x1b[1;31m",
  green: "\x1b[1;32m",
};

const code = {
  remake:
    "yarn run clean && yarn run make && yarn run update && yarn run build",
  postinstall: "run-s download-files setup-permissions",
  "setup-permissions": "shx chmod -R +x util/*",
  "download-files": "node ./util/cprobe.js",
  prepublishOnly: "yarn run clean:deps",
  "next:dev": "cd next && yarn run dev",
  "next:lint": "cd next && yarn run lint",
  "next:build": "cd next && yarn run build",
  "next:start": "cd next && yarn run start",
  "next:clean": "cd next && yarn run clean",
  clean: "yarn run clean:base && yarn run clean:next && yarn run clean:deps",
  "clean:base": "node util/clean/base.js",
  "clean:deps": "node util/clean/deps.js",
  "clean:next": "node util/clean/next.js",
  "make:base": "yarn install",
  "make:next": "cd next && yarn install",
  make: "yarn run make:base && yarn run make:next",
  "update:base": "yarn upgrade --latest",
  update: "yarn run update:base && yarn run update:next",
  "update:next": "cd next && yarn upgrade --latest && yarn add sharp@0.32.6",
  "build:next": "cd next && yarn run build",
  build: "yarn run build:base && yarn run build:next",
  "build:base":
    "tsc -p ./config/cjs.json && tsc -p ./config/esm.json && tsc -p ./config/types.json",
  spec: "tsup code/__tests__/other/quick.spec.ts --outDir temp && node temp/quick.spec.js",
  "test:mix": "tsup code --outDir temp && node temp/__tests__/mix.js",
  "test:video": "tsup code --outDir temp && node temp/__tests__/video.js",
  "test:audio": "tsup code --outDir temp && node temp/__tests__/audio.js",
  "test:command": "tsup code --outDir temp && node temp/__tests__/command.js",
  "test:scrape":
    "tsup code/__tests__/other/scrape.spec.ts --outDir temp && node temp/scrape.spec.js",
  "test:cli":
    "yarn run link && yt-dlx audio-lowest --query PERSONAL BY PLAZA && yt-dlx al --query SuaeRys5tTc && yarn run unlink",
  test: "yarn run test:scrape && yarn run test:mix && yarn run test:video && yarn run test:audio && yarn run test:command && yarn run test:cli",
};

function formatBytes(bytes) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 Byte";
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
}

function runScript() {
  console.log(`${colors.red}=================================${colors.reset}`);
  console.log(
    `${colors.green}@system:${colors.reset} welcome to the ${colors.red}yt-dlp${colors.reset} dev-test-kit`
  );
  console.log(
    `${colors.green}@system:${colors.reset} os type: ${colors.red}${os.type()}${
      colors.reset
    }`
  );
  console.log(
    `${colors.green}@system:${colors.reset} cpu architecture: ${
      colors.red
    }${os.arch()}${colors.reset}`
  );
  console.log(
    `${colors.green}@system:${colors.reset} total memory: ${
      colors.red
    }${formatBytes(os.totalmem())}${colors.reset}`
  );
  console.log(
    `${colors.green}@system:${colors.reset} home directory: ${
      colors.red
    }${os.homedir()}${colors.reset}`
  );
  console.log(
    `${colors.green}@system:${colors.reset} hostname: ${
      colors.red
    }${os.hostname()}${colors.reset}`
  );
  console.log(
    `${colors.green}@system:${colors.reset} release: ${
      colors.red
    }${os.release()}${colors.reset}`
  );
  console.log(`${colors.red}=================================${colors.reset}`);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  Object.keys(code).forEach((script, index) => {
    console.log(
      `${colors.green}@script:${colors.reset} ${colors.red}${index + 1}${
        colors.reset
      }: ` + script
    );
  });
  console.log(`${colors.red}=================================${colors.reset}`);
  rl.question(
    `${colors.green}@info:${colors.reset} enter the ${colors.red}number${colors.reset} of the ${colors.green}script${colors.reset} you want to run: ${colors.red}`,
    (answer) => {
      console.log(colors.reset);
      const scriptIndex = parseInt(answer) - 1;
      const scriptKeys = Object.keys(code);
      if (scriptIndex >= 0 && scriptIndex < scriptKeys.length) {
        const scriptName = scriptKeys[scriptIndex];
        const command = code[scriptName];
        console.log(`${colors.green}@choice:${colors.reset}`, scriptName);
        const childProcess = spawn(command, {
          shell: true,
          stdio: "inherit",
        });
        childProcess.on("error", (error) => {
          console.error(`${colors.red}@error:${colors.reset}`, error);
        });
        childProcess.on("exit", (code) => {
          if (code !== 0) {
            console.error(
              `${colors.red}@error:${colors.reset}`,
              `Exited with code ${code}`
            );
          }
          runScript();
        });
      } else {
        console.log(`${colors.red}@error:${colors.reset}`, "invalid choice.");
        runScript();
      }
      rl.close();
    }
  );
}

runScript();
