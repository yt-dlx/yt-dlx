import { foundFiles } from "../src/index";
test("should find the required files", () => {
  expect(foundFiles).toEqual(
    expect.arrayContaining([
      "cprobe.exe",
      "ffmpeg.exe",
      "ffplay.exe",
      "ffprobe.exe",
    ])
  );
});
