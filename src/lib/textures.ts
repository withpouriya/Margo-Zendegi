/**
 * Pre-rasterised fractal-noise textures used as CSS background images.
 *
 * These are cheap: the browser rasterises the SVG once and then we only ever
 * animate `transform` on the layers that use them, which stays on the compositor.
 * Live `feTurbulence` filters are reserved for the text dissolve, where the
 * per-frame cost actually buys something.
 */
type NoiseOptions = {
  size?: number;
  baseFrequency?: string;
  octaves?: number;
  seed?: number;
};

function noiseSvg({
  size = 700,
  baseFrequency = '0.008 0.014',
  octaves = 4,
  seed = 3,
}: NoiseOptions): string {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">` +
    `<filter id="n" x="0" y="0" width="100%" height="100%">` +
    `<feTurbulence type="fractalNoise" baseFrequency="${baseFrequency}" numOctaves="${octaves}" seed="${seed}" stitchTiles="stitch"/>` +
    `<feColorMatrix type="saturate" values="0"/>` +
    `</filter>` +
    `<rect width="100%" height="100%" filter="url(#n)"/>` +
    `</svg>`
  );
}

export function noiseTexture(options: NoiseOptions = {}): string {
  return `url("data:image/svg+xml,${encodeURIComponent(noiseSvg(options))}")`;
}

/** Fine-grained film grain, laid over everything at low opacity. */
export const GRAIN = noiseTexture({ size: 220, baseFrequency: '0.75', octaves: 3, seed: 11 });

/** Three smoke sheets at different scales so the drift never looks like one plane. */
export const SMOKE_SHEETS = [
  noiseTexture({ size: 900, baseFrequency: '0.0045 0.009', octaves: 5, seed: 2 }),
  noiseTexture({ size: 760, baseFrequency: '0.0075 0.013', octaves: 4, seed: 17 }),
  noiseTexture({ size: 620, baseFrequency: '0.011 0.019', octaves: 4, seed: 41 }),
];
