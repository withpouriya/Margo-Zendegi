import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';

/**
 * `full` — live turbulence displacement on text, all ambient layers.
 * `lite` — mask + blur dissolve only. Still reads as smoke, costs a fraction.
 * `off`  — respects prefers-reduced-motion: plain cross-fades, nothing drifts.
 */
export type SmokeQuality = 'full' | 'lite' | 'off';

const WIDE = '(min-width: 900px)';

export function useSmokeQuality(): SmokeQuality {
  const reduced = useReducedMotion();
  const [wide, setWide] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(WIDE).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(WIDE);
    const onChange = () => setWide(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  if (reduced) return 'off';

  const cores = typeof navigator !== 'undefined' ? (navigator.hardwareConcurrency ?? 4) : 4;
  return wide && cores >= 4 ? 'full' : 'lite';
}
