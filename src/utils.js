export function getComplementary([r, g, b]) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const x = max + min;
  return [x - r, x - g, x - b];
}

export function convertRGBtoHEX([r, g, b]) {
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

export function generatorRandomColor() {
  return [
    Math.round(Math.random() * 255),
    Math.round(Math.random() * 255),
    Math.round(Math.random() * 255),
  ];
}

export function isColorDark([r, g, b]) {
  const hsp = Math.sqrt(0.299 * r ** 2 + 0.587 * g ** 2 + 0.114 * b ** 2);
  return hsp <= 127.5;
}
