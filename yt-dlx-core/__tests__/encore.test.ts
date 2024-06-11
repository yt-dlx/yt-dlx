console.clear();
import * as path from "path";
import { encore } from "../src/index";

test("should find the required files with correct paths", () => {
  const dir = path.resolve(__dirname, "..");
  Object.keys(encore).forEach((file) => {
    const expectedPath = path.join(dir, file);
    console.log(`File: ${file}`);
    console.log(`Expected Path: ${expectedPath}`);
    console.log(`Actual Path: ${encore[file]}`);
    expect(encore[file]).toBe(expectedPath);
  });
});
