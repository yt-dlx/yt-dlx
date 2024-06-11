console.clear();
import * as path from "path";
import { encore } from "../src/index";

test("should find the required files with correct paths", () => {
  const dir = path.resolve(__dirname, "../src/public");
  expect(encore).toEqual(
    expect.arrayContaining([
      path.join(dir, "cprobe.exe"),
      path.join(dir, "ffmpeg.exe"),
      path.join(dir, "ffplay.exe"),
      path.join(dir, "ffprobe.exe"),
    ])
  );
});
