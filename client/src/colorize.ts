const colorize = (hex: string, opacity: number): string => {
  const sanitizedHex = hex.replace(/^#/, "");
  const r = parseInt(sanitizedHex.substring(0, 2), 16);
  const g = parseInt(sanitizedHex.substring(2, 4), 16);
  const b = parseInt(sanitizedHex.substring(4, 6), 16);
  const validOpacity = Math.max(0, Math.min(1, opacity));
  return `rgba(${r}, ${g}, ${b}, ${validOpacity})`;
};
export default colorize;
