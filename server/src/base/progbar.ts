import colors from "colors";
import formatTime from "./formatTime";
import calculateETA from "./calculateETA";

const progbar = ({ percent, timemark, baseTime }: any) => {
  if (isNaN(percent)) percent = 0;
  percent = Math.min(Math.max(percent, 0), 100);
  const color = percent < 25 ? colors.red : percent < 50 ? colors.yellow : colors.green;
  const width = Math.floor(process.stdout.columns / 4);
  const scomp = Math.round((width * percent) / 100);
  const progb = color("━").repeat(scomp) + color(" ").repeat(width - scomp);
  process.stdout.write(
    `\r${color("@prog:")} ${progb} ${color("| @percent:")} ${percent.toFixed(
      2,
    )}% ${color("| @timemark:")} ${timemark} ${color("| @eta:")} ${formatTime(
      calculateETA(baseTime, percent),
    )}`,
  );
};

export default progbar;
