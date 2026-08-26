import { motion, useScroll, useTransform } from 'motion/react';
import { ALBUM } from '../data/tracks';

/** Hairline header that materialises once the hero has been scrolled past. */
export function TopBar() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [220, 520], [0, 1]);
  const y = useTransform(scrollY, [220, 520], [-14, 0]);
  const blur = useTransform(scrollY, [220, 520], ['blur(8px)', 'blur(0px)']);

  return (
    <motion.header
      style={{ opacity, y, filter: blur }}
      className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-5 md:px-10"
    >
      <span className="font-ui text-[9px] uppercase tracking-[0.42em] text-white/50 md:text-[10px]">
        {ALBUM.artist}
      </span>
      <span className="font-ui text-[9px] uppercase tracking-[0.42em] text-ember/70 md:text-[10px]">
        {ALBUM.title}
      </span>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
    </motion.header>
  );
}
