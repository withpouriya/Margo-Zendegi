import { useEffect } from 'react';
import { TRACKS } from './data/tracks';
import { Atmosphere } from './components/Atmosphere';
import { Embers } from './components/Embers';
import { Hero } from './components/Hero';
import { Intro } from './components/Intro';
import { Outro } from './components/Outro';
import { TopBar } from './components/TopBar';
import { TrackSection } from './components/TrackSection';

export default function App() {
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

      <main className="relative z-30">
        {/* The hero occupies the first screen; it is painted by <Hero /> as fixed. */}
        <div className="h-screen" aria-hidden />

        <h2 className="sr-only">Tracklist</h2>
        {TRACKS.map((track) => (
          <TrackSection key={track.id} track={track} />
        ))}

        <Outro />
      </main>
    </div>
  );
}
