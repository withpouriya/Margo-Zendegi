import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ALBUM } from '../data/tracks';

const HOLD_MS = 2100;

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Opening curtain. The title condenses out of black, then the sheet lifts.
 * Skippable on any input, and skipped outright under reduced motion.
 *
 * Whether the curtain plays is decided once, at mount. Deriving it from a
 * hook that settles asynchronously would re-run the effect and re-lock the
 * page scroll after the curtain had already gone.
 */
export function Intro() {
  const [play] = useState(() => !prefersReducedMotion());
  const [open, setOpen] = useState(play);
  const doneRef = useRef(false);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    document.body.style.overflow = '';
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!play) return;

    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    const timer = window.setTimeout(finish, HOLD_MS);
    const skip = () => finish();

    window.addEventListener('wheel', skip, { passive: true });
    window.addEventListener('touchstart', skip, { passive: true });
    window.addEventListener('keydown', skip);
    window.addEventListener('pointerdown', skip);

    return () => {
      window.clearTimeout(timer);
      // Never leave the page unscrollable, whatever unmounted us.
      document.body.style.overflow = '';
      window.removeEventListener('wheel', skip);
      window.removeEventListener('touchstart', skip);
      window.removeEventListener('keydown', skip);
      window.removeEventListener('pointerdown', skip);
    };
  }, [play, finish]);

  const letters = ALBUM.title.toUpperCase().split('');

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="curtain"
          exit={{ opacity: 0, filter: 'blur(14px)', scale: 1.06 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ash"
        >
          <div className="flex flex-col items-center gap-6 px-6 text-center">
            <motion.p
              initial={{ opacity: 0, letterSpacing: '1.4em' }}
              animate={{ opacity: 0.5, letterSpacing: '0.62em' }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="font-ui text-[9px] uppercase text-white/60"
            >
              {ALBUM.artist}
            </motion.p>

            <h1 className="flex flex-wrap justify-center font-display text-3xl uppercase text-transparent sm:text-5xl md:text-6xl">
              {letters.map((char, i) => (
                <motion.span
                  key={`${char}-${i}`}
                  initial={{ opacity: 0, filter: 'blur(22px)', y: 26, scale: 1.3 }}
                  animate={{ opacity: 1, filter: 'blur(0px)', y: 0, scale: 1 }}
                  transition={{
                    duration: 1.15,
                    delay: 0.16 + i * 0.055,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block bg-gradient-to-b from-white to-ember bg-clip-text tracking-[0.22em] drop-shadow-[0_0_34px_rgba(214,40,40,0.55)]"
                >
                  {char === ' ' ? ' ' : char}
                </motion.span>
              ))}
            </h1>

            <motion.span
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.7, ease: 'easeOut' }}
              className="h-px w-40 bg-gradient-to-r from-transparent via-ember to-transparent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
