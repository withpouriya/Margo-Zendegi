import { motion, useScroll, useTransform } from 'motion/react';
import bgImage from '../assets/bg.jpeg';
import { GRAIN, SMOKE_SHEETS } from '../lib/textures';
import { useSmokeQuality } from '../hooks/useSmokeQuality';

/** Each sheet drifts on its own clock so the layers never lock into one plane. */
const SHEETS = [
  { texture: SMOKE_SHEETS[0], opacity: 0.16, scale: 2.4, duration: 64, blur: 6, reverse: false },
  { texture: SMOKE_SHEETS[1], opacity: 0.12, scale: 1.8, duration: 88, blur: 10, reverse: true },
  { texture: SMOKE_SHEETS[2], opacity: 0.09, scale: 1.35, duration: 46, blur: 3, reverse: false },
];

/** Slow red bloom behind the smoke — this is where the colour comes from. */
const GLOWS = [
  { left: '12%', top: '14%', size: '58vw', hue: 'rgba(214,40,40,0.20)', duration: 26, delay: 0 },
  { left: '62%', top: '46%', size: '48vw', hue: 'rgba(160,18,24,0.18)', duration: 34, delay: -8 },
  { left: '32%', top: '74%', size: '66vw', hue: 'rgba(90,8,14,0.24)', duration: 42, delay: -17 },
];

export function Atmosphere() {
  const quality = useSmokeQuality();
  const { scrollY } = useScroll();

  const bgScale = useTransform(scrollY, [0, 2600], [1.04, 1.24]);
  const bgY = useTransform(scrollY, [0, 2600], ['0%', '7%']);
  const bgDim = useTransform(scrollY, [0, 900], [0.58, 0.82]);

  const animated = quality !== 'off';
  const full = quality === 'full';

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {/* Photographic base, drifting slowly against the scroll */}
      <motion.div
        className="absolute inset-[-6%] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})`, scale: bgScale, y: bgY }}
      />

      {/* Darkening pass — deepens as the tracklist takes over */}
      <motion.div className="absolute inset-0 bg-black" style={{ opacity: bgDim }} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-transparent to-black/90" />

      {/* Ember bloom */}
      {GLOWS.map((glow, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: glow.left,
            top: glow.top,
            width: glow.size,
            height: glow.size,
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle at 50% 50%, ${glow.hue} 0%, transparent 68%)`,
            // The gradient already fades to nothing by 68%; the blur only
            // rounds off the last of the banding. It is also a full-surface
            // filter pass on a 48-66vw box that never stops animating, so
            // outside `full` the banding is the cheaper trade.
            filter: full ? 'blur(48px)' : undefined,
            animation: animated
              ? `mz-bloom ${glow.duration}s ease-in-out ${glow.delay}s infinite alternate`
              : undefined,
          }}
        />
      ))}

      {/* Smoke sheets.

          Measured at 6x CPU throttle on a 390px viewport, these are by far the
          most expensive thing on the page: dropping them took the scroll from
          13fps to 33fps on their own. Each one stacks a blur, a mask and a
          `screen` blend on a surface 180% of the viewport in both axes, and
          then animates a transform under all three — so none of it can stay a
          cheap composited layer. `full` still gets all three; everything else
          gets one, unblurred, which keeps the drift without the raster cost. */}
      {animated &&
        (full ? SHEETS : SHEETS.slice(0, 1)).map((sheet, i) => (
          <div
            key={i}
            className="absolute inset-[-40%]"
            style={{
              backgroundImage: sheet.texture,
              backgroundRepeat: 'repeat',
              opacity: sheet.opacity,
              mixBlendMode: 'screen',
              filter: full ? `blur(${sheet.blur}px)` : undefined,
              // The keyframes own `transform`, so the scale travels as a variable.
              ['--mz-scale' as string]: String(sheet.scale),
              animation: `${sheet.reverse ? 'mz-drift-b' : 'mz-drift-a'} ${sheet.duration}s linear infinite alternate`,
              maskImage:
                'radial-gradient(ellipse at 50% 45%, #000 10%, rgba(0,0,0,0.5) 55%, transparent 82%)',
              WebkitMaskImage:
                'radial-gradient(ellipse at 50% 45%, #000 10%, rgba(0,0,0,0.5) 55%, transparent 82%)',
            }}
          />
        ))}

      {/* Vignette + film grain */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 45%, transparent 30%, rgba(0,0,0,0.55) 78%, rgba(0,0,0,0.92) 100%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.13] mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
      />
    </div>
  );
}
