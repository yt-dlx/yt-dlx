const FromBottomToTop = {
  initial: { opacity: 0, y: 100 },
  exit: { opacity: 0, y: 50, transition: { duration: 0.3 } },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const FromTopToBottom = {
  initial: { opacity: 0, y: -100 },
  exit: { opacity: 0, y: -50, transition: { duration: 0.3 } },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const FromLeftToRight = {
  initial: { opacity: 0, x: -100 },
  exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
  whileInView: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};
const FromRightToLeft = {
  initial: { opacity: 0, x: 100 },
  exit: { opacity: 0, x: 50, transition: { duration: 0.3 } },
  whileInView: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};
const AndBounce = {
  initial: { opacity: 0, y: -50 },
  whileInView: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, bounce: 0.3 },
  },
  exit: { opacity: 0, y: -50, transition: { duration: 0.3 } },
};

export default {
  FromBottomToTop,
  FromTopToBottom,
  FromLeftToRight,
  FromRightToLeft,
  AndBounce,
};
