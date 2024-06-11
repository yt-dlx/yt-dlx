console.clear();
import * as path from "path";
import { encore } from "../src/index";

test("should find the required files with correct paths", () => {
  const dir = path.resolve(__dirname, "..");
  Object.keys(encore).forEach((file) => {
    expect(encore[file]).toBe(path.join(dir, file));
  });
});
