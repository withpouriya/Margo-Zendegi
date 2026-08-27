import { useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { useSmokeQuality } from '../hooks/useSmokeQuality';

type SmokeTextProps = {
  /** 0 = fully dissolved, 1 = fully resolved. Drive it from scroll. */
  focus: MotionValue<number>;
  children: ReactNode;
  className?: string;
  /** Peak displacement in px at focus = 0. */
  strength?: number;
  /** Peak gaussian blur in px at focus = 0. */
  blur?: number;
  /** Direction the dissolve wipe travels. */
  angle?: number;
  /** Width of the soft wipe band, in % of element width. */
  band?: number;
  baseFrequency?: string;
  seed?: number;
};

/**
 * Text that condenses out of smoke and disperses back into it.
 *
 * Three stacked layers, because CSS applies `filter` before `mask`:
 *   1. outer — feDisplacementMap, shreds the whole composite into wisps
 *   2. middle — gaussian blur + opacity
 *   3. inner — a soft gradient wipe, so letters arrive one after another
 *
 * The displacement filter is mounted only while the text is mid-transition.
 * At both ends of that window the displacement is ~0 (top) or the text is
 * invisible (bottom), so attaching and detaching it is never visible.
 */
export function SmokeText({
  focus,
  children,
  className = '',
  strength = 90,
  blur = 16,
  angle = 100,
  band = 58,
  baseFrequency = '0.012 0.028',
  seed = 2,
}: SmokeTextProps) {
  const quality = useSmokeQuality();
  const filterId = `smoke-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;

  const displacementRef = useRef<SVGFEDisplacementMapElement | null>(null);
  const liveRef = useRef(false);
  const [live, setLive] = useState(false);

  const blurPx = useTransform(focus, [0, 1], [blur, 0]);
  const blurFilter = useMotionTemplate`blur(${blurPx}px)`;
  const opacity = useTransform(focus, [0, 0.3, 1], [0, 0.22, 1]);
  const plainOpacity = useTransform(focus, [0, 1], [0, 1]);

  const wipeStart = useTransform(focus, [0, 1], [-band - 14, 100]);
  const wipeEnd = useTransform(wipeStart, (v) => v + band);
  const wipe = useMotionTemplate`linear-gradient(${angle}deg, #000 ${wipeStart}%, transparent ${wipeEnd}%)`;

  useMotionValueEvent(focus, 'change', (v) => {
    const shouldBeLive = v > 0.004 && v < 0.997;
    if (shouldBeLive !== liveRef.current) {
      liveRef.current = shouldBeLive;
      setLive(shouldBeLive);
    }
    if (shouldBeLive && displacementRef.current) {
      displacementRef.current.setAttribute('scale', ((1 - v) * strength).toFixed(2));
    }
  });

  // The filter element does not exist on the render that flips `live` on, so
  // seed its first value here rather than waiting for the next scroll tick.
  useLayoutEffect(() => {
    if (live && displacementRef.current) {
      displacementRef.current.setAttribute('scale', ((1 - focus.get()) * strength).toFixed(2));
    }
  }, [live, focus, strength]);

  if (quality === 'off') {
    return (
      <motion.div className={className} style={{ opacity: plainOpacity }}>
        {children}
      </motion.div>
    );
  }

  const displacing = quality === 'full' && live;

  return (
    <div
      className={className}
      style={{
        filter: displacing ? `url(#${filterId})` : undefined,
        willChange: live ? 'filter' : undefined,
      }}
    >
      {displacing && (
        <svg aria-hidden style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            <filter
              id={filterId}
              x="-45%"
              y="-70%"
              width="190%"
              height="240%"
              colorInterpolationFilters="sRGB"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency={baseFrequency}
                numOctaves={3}
                seed={seed}
                result="turbulence"
              >
                <animate
                  attributeName="baseFrequency"
                  dur="11s"
                  values={`${baseFrequency};0.02 0.052;${baseFrequency}`}
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feDisplacementMap
                ref={displacementRef}
                in="SourceGraphic"
                in2="turbulence"
                scale="0"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      )}

      <motion.div style={{ filter: blurFilter, opacity }}>
        <motion.div style={{ maskImage: wipe, WebkitMaskImage: wipe }}>{children}</motion.div>
      </motion.div>
    </div>
  );
}
