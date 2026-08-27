import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import headImage from '../assets/head.png';
import { ALBUM } from '../data/tracks';
import { PLATFORMS, PlatformIcon, type Platform } from './platforms';
import { useSmokeQuality } from '../hooks/useSmokeQuality';

/** Where each icon flies to as the hero breaks apart. */
const SCATTER = [
  { x: '-16vw', y: '16vh', rotate: -48 },
  { x: '-5vw', y: '26vh', rotate: -16 },
  { x: '5vw', y: '26vh', rotate: 16 },
  { x: '16vw', y: '16vh', rotate: 48 },
];

type ScatterIconProps = {
  platform: Platform;
  target: (typeof SCATTER)[number];
  scrollY: MotionValue<number>;
  scale: MotionValue<number>;
};

function ScatterIcon({ platform, target, scrollY, scale }: ScatterIconProps) {
  const x = useTransform(scrollY, [0, 300], ['0vw', target.x]);
  const y = useTransform(scrollY, [0, 300], ['0vh', target.y]);
  const rotate = useTransform(scrollY, [0, 300], [0, target.rotate]);

  return (
    <motion.a
      href={platform.href}
      aria-label={platform.name}
      style={{ x, y, rotate, scale }}
      className="pointer-events-auto h-8 w-8 p-1 text-ember/60 transition-colors duration-500 hover:text-white hover:drop-shadow-[0_0_16px_rgba(214,40,40,0.9)] md:h-10 md:w-10"
    >
      <PlatformIcon platform={platform} />
    </motion.a>
  );
}

export function Hero() {
  const quality = useSmokeQuality();
  const { scrollY } = useScroll();

  // The artwork retreats into a watermark rather than leaving entirely.
  const headScale = useTransform(scrollY, [0, 620], [1, 0.34]);
  const headY = useTransform(scrollY, [0, 620], ['0vh', '-39vh']);
  const headRotate = useTransform(scrollY, [0, 620], [0, 7]);
  const headOpacity = useTransform(scrollY, [0, 480, 700], [1, 0.34, 0.16]);
  const headBlur = useTransform(scrollY, [0, 700], ['blur(0px)', 'blur(3px)']);

  const wordmarkOpacity = useTransform(scrollY, [0, 260], [1, 0]);
  const wordmarkY = useTransform(scrollY, [0, 400], [0, -70]);
  const wordmarkSpacing = useTransform(scrollY, [0, 400], ['0.62em', '1.1em']);

  const iconsOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const iconScale = useTransform(scrollY, [0, 300], [1, 0.5]);

  return (
    <>
      {/* Fixed artwork */}
      <div className="pointer-events-none fixed inset-0 z-10 flex flex-col items-center justify-center">
        <motion.div
          style={{
            scale: headScale,
            y: headY,
            rotate: headRotate,
            opacity: headOpacity,
            filter: headBlur,
          }}
          className="relative flex w-56 items-center justify-center sm:w-64 md:w-80"
        >
          <div className="absolute inset-0 scale-125 rounded-full bg-ember/25 opacity-60 blur-3xl" />
          <motion.img
            src={headImage}
            alt={`${ALBUM.title} cover artwork`}
            className="relative z-10 h-auto w-full drop-shadow-[0_0_46px_rgba(214,40,40,0.45)]"
            animate={quality === 'off' ? undefined : { y: [0, -16, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Wordmark under the artwork */}
        <motion.div
          style={{ opacity: wordmarkOpacity, y: wordmarkY }}
          className="absolute bottom-[28vh] flex flex-col items-center gap-4 px-6 text-center sm:bottom-[26vh]"
        >
          <motion.p
            style={{ letterSpacing: wordmarkSpacing }}
            className="font-ui text-[9px] uppercase text-white/45 sm:text-[10px]"
          >
            {ALBUM.artist}
          </motion.p>
          <h1 className="font-display text-2xl uppercase tracking-[0.34em] text-transparent sm:text-3xl md:text-4xl">
            <span className="bg-gradient-to-b from-smoke from-8% via-blood via-70% to-clot bg-clip-text drop-shadow-[0_0_30px_rgba(160,28,28,0.55)]">
              {ALBUM.title}
            </span>
          </h1>
        </motion.div>
      </div>

      {/* Streaming icons — scatter apart as the page opens */}
      <motion.div
        style={{ opacity: iconsOpacity }}
        className="pointer-events-none fixed bottom-14 z-20 flex w-full justify-center gap-8 md:bottom-20 md:gap-12"
      >
        {PLATFORMS.map((platform, i) => (
          <ScatterIcon
            key={platform.name}
            platform={platform}
            target={SCATTER[i]}
            scrollY={scrollY}
            scale={iconScale}
          />
        ))}
      </motion.div>
    </>
  );
}
