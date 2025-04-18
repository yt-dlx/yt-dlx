import dotenv from "dotenv";
import colors from "colors";
import YouTubeDLX from "..";
dotenv.config();
console.clear();
YouTubeDLX.Misc.Video.Extract({ useTor: true, verbose: true, query: "Tera Hokey Rahu" })
  .on("error", error => console.error("Error:", error))
  .on("data", data => console.log("Data:", data));
