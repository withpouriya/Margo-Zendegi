import { useCallback, useEffect, useState } from 'react';
import { useMotionValueEvent, useScroll } from 'motion/react';
import { TRACKS } from './data/tracks';
import { Atmosphere } from './components/Atmosphere';
import { Embers } from './components/Embers';
import { Hero } from './components/Hero';
import { Intro } from './components/Intro';
import { Outro } from './components/Outro';
import { ProgressRail } from './components/ProgressRail';
import { TopBar } from './components/TopBar';
import { TrackSection } from './components/TrackSection';

export default function App() {
  const [active, setActive] = useState(-1);
  const { scrollY } = useScroll();

  const handleActive = useCallback((index: number) => setActive(index), []);

  // Nothing is "playing" while the hero still owns the screen.
  useMotionValueEvent(scrollY, 'change', (v) => {
    if (v < 200) setActive(-1);
  });

  // A reload should always start from the top, or the intro fights the browser.
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ash font-display text-ember selection:bg-ember selection:text-black">
      <Intro />

      <Atmosphere />
      <Embers />
      <TopBar />
      <Hero />
      <ProgressRail active={active} />

      <main className="relative z-30">
        {/* The hero occupies the first screen; it is painted by <Hero /> as fixed. */}
        <div className="h-screen" aria-hidden />

        <h2 className="sr-only">Tracklist</h2>
        {TRACKS.map((track, index) => (
          <TrackSection key={track.id} track={track} index={index} onActive={handleActive} />
        ))}

        <Outro />
      </main>
    </div>
  );
}
