import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ALBUM } from '../data/tracks';
import { PLATFORMS, PlatformIcon } from './platforms';
import { SmokeText } from './SmokeText';

export function Outro() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const focus = useTransform(scrollYProgress, [0.1, 0.65], [0, 1]);
  const lift = useTransform(scrollYProgress, [0.1, 0.7], [70, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[92vh] flex-col items-center justify-center gap-12 px-6 pb-28 pt-10 text-center"
    >
      <motion.div style={{ y: lift }} className="flex flex-col items-center gap-7">
        <SmokeText focus={focus} strength={70} blur={16} band={64} seed={91}>
          <h2 className="font-display text-4xl uppercase tracking-[0.3em] text-transparent sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-b from-white via-[#f2bcbc] to-ember bg-clip-text drop-shadow-[0_0_40px_rgba(214,40,40,0.5)]">
              Out Now
            </span>
          </h2>
        </SmokeText>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="max-w-md font-ui text-[10px] uppercase leading-relaxed tracking-[0.4em] text-white/45"
        >
          {ALBUM.title} — {ALBUM.artist}
        </motion.p>
      </motion.div>

      {/* Platform row */}
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.9, delay: 0.25 }}
        className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
      >
        {PLATFORMS.map((platform) => (
          <a
            key={platform.name}
            href={platform.href}
            className="group flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.03] px-5 py-3 backdrop-blur-sm transition-all duration-500 hover:border-ember/60 hover:bg-ember/10 hover:shadow-[0_0_28px_-6px_rgba(214,40,40,0.7)]"
          >
            <span className="h-4 w-4 text-ember/70 transition-colors duration-500 group-hover:text-white">
              <PlatformIcon platform={platform} />
            </span>
            <span className="font-ui text-[10px] uppercase tracking-[0.3em] text-white/60 transition-colors duration-500 group-hover:text-white">
              {platform.name}
            </span>
          </a>
        ))}
      </motion.div>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay: 0.4 }}
        className="mt-10 flex flex-col gap-2 font-ui text-[9px] uppercase tracking-[0.34em] text-white/30"
      >
        <span className="mx-auto mb-4 h-px w-24 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <p>{ALBUM.credits}</p>
        <p>&copy; {new Date().getFullYear()} {ALBUM.artist}. All rights reserved.</p>
      </motion.footer>
    </section>
  );
}
