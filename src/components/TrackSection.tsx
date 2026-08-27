import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import type { Track } from '../data/tracks';
import { SmokeText } from './SmokeText';
import { useSmokeQuality } from '../hooks/useSmokeQuality';

/**
 * Scroll windows, in normalised section progress.
 *
 * With `offset: ["start end", "end start"]` progress 0.5 always puts the
 * section's centre at the viewport's centre, whatever the section height is.
 * These stops keep the resolved window tight around 0.5, so exactly one title
 * is legible at a time — the "one by one" rhythm.
 */
const TITLE_STOPS = [0.18, 0.44, 0.56, 0.82];
const FEAT_STOPS = [0.24, 0.48, 0.55, 0.78];

type Props = {
  track: Track;
};

export function TrackSection({ track }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const quality = useSmokeQuality();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const focus = useTransform(scrollYProgress, TITLE_STOPS, [0, 1, 1, 0]);
  const featFocus = useTransform(scrollYProgress, FEAT_STOPS, [0, 1, 1, 0]);

  // Direction has to come from raw progress, not focus — focus is symmetric,
  // so on its own it cannot tell "rising into view" from "leaving upward".
  const titleY = useTransform(scrollYProgress, TITLE_STOPS, [90, 0, 0, -90]);
  const titleScale = useTransform(scrollYProgress, TITLE_STOPS, [1.12, 1, 1, 0.94]);
  const letterSpacing = useTransform(focus, [0, 1], ['0.44em', '0.14em']);

  const numeralY = useTransform(scrollYProgress, [0, 1], [140, -140]);
  const numeralOpacity = useTransform(focus, [0, 1], [0, 1]);

  const plumeY = useTransform(scrollYProgress, TITLE_STOPS, [60, 0, 0, -120]);
  const plumeOpacity = useTransform(focus, [0, 0.6, 1], [0, 0.85, 0.5]);

  const ruleScale = useTransform(focus, [0.35, 1], [0, 1]);
  const metaOpacity = useTransform(focus, [0.15, 0.7], [0, 1]);

  const numeral = String(track.id).padStart(2, '0');

  return (
    <section
      ref={ref}
      aria-label={`Track ${track.id}: ${track.title}`}
      className="relative flex h-[85vh] min-h-[420px] items-center justify-center px-6"
    >
      {/* Ghost numeral, drifting against the scroll */}
      <motion.span
        aria-hidden
        style={{ y: numeralY, opacity: numeralOpacity }}
        className="pointer-events-none absolute select-none font-display text-[38vw] leading-none text-white/[0.04] md:text-[24vw]"
      >
        {numeral}
      </motion.span>

      {/* Plume rising behind the title as it resolves */}
      {quality !== 'off' && (
        <motion.div
          aria-hidden
          style={{ y: plumeY, opacity: plumeOpacity }}
          className="pointer-events-none absolute h-[46vh] w-[78vw] max-w-4xl"
          // A soft ember cloud; the blur keeps it reading as light, not a shape.
        >
          <div
            className="h-full w-full"
            style={{
              background:
                'radial-gradient(ellipse at 50% 62%, rgba(214,40,40,0.26) 0%, rgba(140,16,20,0.13) 38%, transparent 70%)',
              filter: 'blur(38px)',
            }}
          />
        </motion.div>
      )}

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
        {/* Track index rule */}
        <motion.div
          style={{ opacity: metaOpacity }}
          className="mb-6 flex items-center gap-4 font-ui text-[10px] tracking-[0.55em] text-ember/70"
        >
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-ember/50" />
          <span>TRACK {numeral}</span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-ember/50" />
        </motion.div>

        {/* The title itself */}
        <motion.div style={{ y: titleY, scale: titleScale }} className="w-full">
          <SmokeText
            focus={focus}
            seed={track.id * 7}
            strength={quality === 'full' ? 96 : 60}
            blur={18}
            angle={100}
            band={62}
          >
            <motion.h2
              style={{ letterSpacing }}
              className="font-display text-[2.6rem] font-medium uppercase leading-[1.05] text-transparent sm:text-6xl md:text-7xl lg:text-8xl"
            >
              <span className="bg-gradient-to-b from-smoke from-6% via-blood via-52% to-clot bg-clip-text drop-shadow-[0_0_36px_rgba(160,28,28,0.5)]">
                {track.title}
              </span>
            </motion.h2>
          </SmokeText>
        </motion.div>

        {/* Ember rule */}
        <motion.div
          aria-hidden
          style={{ scaleX: ruleScale, opacity: metaOpacity }}
          className="mt-8 h-px w-48 origin-center bg-gradient-to-r from-transparent via-ember to-transparent"
        />

        {/* Featured artists */}
        {track.feat && (
          <SmokeText
            focus={featFocus}
            seed={track.id * 13 + 3}
            strength={quality === 'full' ? 44 : 28}
            blur={10}
            angle={100}
            band={70}
            className="mt-7"
          >
            <p className="font-ui text-[11px] uppercase tracking-[0.42em] text-white/55 sm:text-xs">
              feat. {track.feat.join('  ·  ')}
            </p>
          </SmokeText>
        )}
      </div>
    </section>
  );
}
