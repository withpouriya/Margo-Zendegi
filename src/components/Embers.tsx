import { useMemo } from 'react';
import { useSmokeQuality } from '../hooks/useSmokeQuality';

/** Deterministic PRNG so the ember field is stable across re-renders. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function Embers({ count = 22 }: { count?: number }) {
  const quality = useSmokeQuality();

  const particles = useMemo(() => {
    const rand = mulberry32(0x5eed);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: rand() * 100,
      size: 1 + rand() * 2.6,
      duration: 14 + rand() * 20,
      delay: -rand() * 34,
      drift: (rand() - 0.5) * 140,
      opacity: 0.25 + rand() * 0.45,
    }));
  }, [count]);

  if (quality === 'off') return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-ember"
          style={{
            left: `${p.left}%`,
            bottom: '-6vh',
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            boxShadow: '0 0 6px 1px rgba(214,40,40,0.55)',
            ['--mz-drift' as string]: `${p.drift}px`,
            animation: `mz-ember ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
