import { spawn } from "child_process";
import { type, arch, totalmem, homedir, hostname, release } from "os";
import { createInterface } from "readline";

console.clear();

const colors = {
  reset: "\x1b[0m",
  red: "\x1b[1;31m",
  green: "\x1b[1;32m",
};

const core = {
  remake:
    "yarn run clean && yarn run make && yarn run update && yarn run build",
  postinstall: "run-s download-files setup-permissions",
  prepublishOnly: "yarn run clean:deps",
  "setup-permissions": "chmod -R +x util/*",
  "download-files": "node util/cprobe.mjs",
  "frontend:dev": "cd frontend && yarn run dev",
  "frontend:lint": "cd frontend && yarn run lint",
  "frontend:build": "cd frontend && yarn run build",
  "frontend:start": "cd frontend && yarn run start",
  "frontend:clean": "cd frontend && yarn run clean",
  clean:
    "yarn run clean:base && yarn run clean:frontend && yarn run clean:deps",
  "clean:base": "rm -rf node_modules temp project others",
  "clean:frontend": "cd frontend && rm -rf .next node_modules",
  "clean:deps": "rm -rf util/ffmpeg.tar.xz util/ffmpeg util/cprobe",
  make: "yarn run make:base && yarn run make:frontend",
  "make:base": "yarn install",
  "make:frontend": "cd frontend && yarn install",
  update: "yarn run update:base && yarn run update:frontend",
  "update:base": "yarn upgrade --latest",
  "update:frontend": "cd frontend && yarn upgrade --latest",
  build: "yarn run build:base && yarn run build:frontend",
  "build:frontend": "cd frontend && yarn run build",
  "build:base":
    "rm -rf project temp && tsc -p ./config/cjs.json && tsc -p ./config/esm.json && tsc -p ./config/types.json",
  spec: "rm -rf temp && tsup core/__tests__/other/quick.spec.ts --outDir temp && node temp/quick.spec.js",
  test: "rm -rf temp && yarn run test:scrape && yarn run test:mix && yarn run test:video && yarn run test:audio && yarn run test:command && yarn run test:cli",
  "test:mix":
    "rm -rf temp && tsup core --outDir temp && node temp/__tests__/mix.js",
  "test:video":
    "rm -rf temp && tsup core --outDir temp && node temp/__tests__/video.js",
  "test:audio":
    "rm -rf temp && tsup core --outDir temp && node temp/__tests__/audio.js",
  "test:command":
    "rm -rf temp && tsup core --outDir temp && node temp/__tests__/command.js",
  "test:scrape":
    "rm -rf temp && tsup core/__tests__/other/scrape.spec.ts --outDir temp && node temp/scrape.spec.js",
  "test:cli":
    "yarn run link && yt-dlx audio-lowest --query PERSONAL BY PLAZA && yt-dlx al --query SuaeRys5tTc && yarn run unlink",
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
    `${colors.green}@system:${colors.reset} os type: ${colors.red}${type()}${
      colors.reset
    }`
  );
  console.log(
    `${colors.green}@system:${colors.reset} cpu architecture: ${
      colors.red
    }${arch()}${colors.reset}`
  );
  console.log(
    `${colors.green}@system:${colors.reset} total memory: ${
      colors.red
    }${formatBytes(totalmem())}${colors.reset}`
  );
  console.log(
    `${colors.green}@system:${colors.reset} home directory: ${
      colors.red
    }${homedir()}${colors.reset}`
  );
  console.log(
    `${colors.green}@system:${colors.reset} hostname: ${
      colors.red
    }${hostname()}${colors.reset}`
  );
  console.log(
    `${colors.green}@system:${colors.reset} release: ${colors.red}${release()}${
      colors.reset
    }`
  );
  console.log(`${colors.red}=================================${colors.reset}`);
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  Object.keys(core).forEach((script, index) => {
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
      const scriptKeys = Object.keys(core);
      if (scriptIndex >= 0 && scriptIndex < scriptKeys.length) {
        const scriptName = scriptKeys[scriptIndex];
        const command = core[scriptName];
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
