import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { TRACKS } from '../data/tracks';

/**
 * Fixed rail on the right: a scroll-progress thread plus one tick per track.
 * The active tick widens and names itself.
 */
export function ProgressRail({ active }: { active: number }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });

  return (
    <div className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:flex lg:flex-col lg:items-end lg:gap-4">
      {/* Continuous progress thread */}
      <div className="absolute -left-5 top-0 h-full w-px overflow-hidden bg-white/10">
        <motion.div
          style={{ scaleY: progress }}
          className="h-full w-full origin-top bg-gradient-to-b from-ember via-ember/70 to-transparent"
        />
      </div>

      {TRACKS.map((track, i) => {
        const isActive = i === active;
        return (
          <div key={track.id} className="flex items-center justify-end gap-3">
            <AnimatePresence>
              {isActive && (
                <motion.span
                  initial={{ opacity: 0, x: 12, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: 12, filter: 'blur(6px)' }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="whitespace-nowrap font-ui text-[9px] uppercase tracking-[0.34em] text-white/70"
                >
                  {track.title}
                </motion.span>
              )}
            </AnimatePresence>
            <motion.span
              animate={{
                width: isActive ? 26 : 10,
                opacity: isActive ? 1 : 0.28,
                backgroundColor: isActive ? '#d62828' : '#ffffff',
              }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="block h-px rounded-full"
              style={{ boxShadow: isActive ? '0 0 10px rgba(214,40,40,0.9)' : undefined }}
            />
          </div>
        );
      })}
    </div>
  );
}
