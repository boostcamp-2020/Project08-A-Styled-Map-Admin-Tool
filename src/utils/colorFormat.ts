/** https://css-tricks.com/converting-color-spaces-in-javascript/ */
interface HexToHSLType {
  h: number;
  s: number;
  l: number;
}

export function hexToHSL(color: string): HexToHSLType {
  let r = parseInt(color.slice(1, 3), 16);
  let g = parseInt(color.slice(3, 5), 16);
  let b = parseInt(color.slice(5), 16);

  r /= 255;
  g /= 255;
  b /= 255;
  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;
  let h = 0;
  let s = 0;
  let l = 0;

  if (delta === 0) h = 0;
  else if (cmax === r) h = ((g - b) / delta) % 6;
  else if (cmax === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return {
    h: Math.round(h),
    s: Math.round(s),
    l: Math.round(l),
  };
}

export function hslToHEX(color: string): string {
  if (color === 'transparent' || !color) return 'transparent';
  const hsl = color.match(/(\d*\.?\d+)/g)?.map((c) => Number(c)) as number[];

  const h: number = hsl[0];
  const s: number = hsl[1] / 100;
  const l: number = hsl[2] / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (h >= 300 && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  // Having obtained RGB, convert channels to hex
  let stringR: string = Math.round((r + m) * 255).toString(16);
  let stringG: string = Math.round((g + m) * 255).toString(16);
  let stringB: string = Math.round((b + m) * 255).toString(16);

  // Prepend 0s, if necessary
  if (stringR.length === 1) stringR = `0${stringR}`;
  if (stringG.length === 1) stringG = `0${stringG}`;
  if (stringB.length === 1) stringB = `0${stringB}`;

  return `#${stringR}${stringG}${stringB}`;
}
