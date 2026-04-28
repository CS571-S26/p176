import { useState, useEffect, useRef } from 'react';

const MIN_METEORS_PER_WAVE = 1;
const MAX_METEORS_PER_WAVE = 4;
const MIN_INITIAL_DELAY = 1000;
const MAX_INITIAL_DELAY = 5000;
const MIN_INTER_WAVE_DELAY = 1400;
const MAX_INTER_WAVE_DELAY = 4500;
const MIN_DURATION = 1500;
const MAX_DURATION = 2200;
const MIN_TRAIL = 80;
const MAX_TRAIL = 150;
const MIN_ANGLE_DEG = 25;
const MAX_ANGLE_DEG = 55;

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

// One direction is picked per wave so every meteor in the wave travels in
// roughly the same direction — a coordinated shower, not a chaotic crossfire.
function pickWaveDirection() {
  const angleDeg = MIN_ANGLE_DEG + Math.random() * (MAX_ANGLE_DEG - MIN_ANGLE_DEG);
  const r = Math.random();
  let edge;
  if (r < 0.4) edge = 'top';
  else if (r < 0.7) edge = 'right';
  else edge = 'left';
  const fromLeft = edge === 'left' ? true : edge === 'right' ? false : Math.random() < 0.5;
  return { angleDeg, edge, fromLeft };
}

function buildMeteor({ id, dark, direction }) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const { angleDeg, edge, fromLeft } = direction;

  // Start position is randomized along the shared edge so a wave's meteors
  // are scattered across the entry side rather than stacked on top of each
  // other. They still all travel parallel.
  let startX, startY;
  if (edge === 'top') {
    startX = Math.random() * vw;
    startY = -50 - Math.random() * 80;
  } else if (edge === 'right') {
    startX = vw + 50 + Math.random() * 80;
    startY = Math.random() * vh * 0.3;
  } else {
    startX = -50 - Math.random() * 80;
    startY = Math.random() * vh * 0.3;
  }

  const angleRad = (angleDeg * Math.PI) / 180;
  const dx = (fromLeft ? 1 : -1) * Math.cos(angleRad);
  const dy = Math.sin(angleRad);
  const distance = Math.hypot(vw, vh) * 1.2;
  const endX = startX + dx * distance;
  const endY = startY + dy * distance;
  const visualAngleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;

  const duration = MIN_DURATION + Math.random() * (MAX_DURATION - MIN_DURATION);
  const trail = MIN_TRAIL + Math.random() * (MAX_TRAIL - MIN_TRAIL);

  return {
    id,
    dark,
    startX,
    startY,
    endX,
    endY,
    visualAngleDeg,
    duration,
    trail,
  };
}

function MeteorShower({ darkMode }) {
  const [meteors, setMeteors] = useState([]);
  const counterRef = useRef(0);
  const darkModeRef = useRef(darkMode);

  useEffect(() => {
    darkModeRef.current = darkMode;
  }, [darkMode]);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let cancelled = false;
    let waveTimer = null;
    const removeTimers = new Map();

    const spawnWave = () => {
      if (cancelled) return;

      const count =
        MIN_METEORS_PER_WAVE
        + Math.floor(Math.random() * (MAX_METEORS_PER_WAVE - MIN_METEORS_PER_WAVE + 1));

      const wave = [];
      let longestDuration = 0;
      const dark = darkModeRef.current;
      const direction = pickWaveDirection();
      for (let i = 0; i < count; i++) {
        const id = ++counterRef.current;
        const meteor = buildMeteor({ id, dark, direction });
        wave.push(meteor);
        if (meteor.duration > longestDuration) longestDuration = meteor.duration;
      }

      setMeteors((prev) => [...prev, ...wave]);

      wave.forEach((meteor) => {
        const rt = setTimeout(() => {
          if (cancelled) return;
          setMeteors((prev) => prev.filter((m) => m.id !== meteor.id));
          removeTimers.delete(meteor.id);
        }, meteor.duration + 100);
        removeTimers.set(meteor.id, rt);
      });

      const gap = MIN_INTER_WAVE_DELAY
        + Math.random() * (MAX_INTER_WAVE_DELAY - MIN_INTER_WAVE_DELAY);
      waveTimer = setTimeout(spawnWave, longestDuration + gap);
    };

    const initialDelay = MIN_INITIAL_DELAY
      + Math.random() * (MAX_INITIAL_DELAY - MIN_INITIAL_DELAY);
    waveTimer = setTimeout(spawnWave, initialDelay);

    return () => {
      cancelled = true;
      if (waveTimer) clearTimeout(waveTimer);
      removeTimers.forEach(clearTimeout);
      removeTimers.clear();
    };
  }, []);

  if (prefersReducedMotion()) return null;

  return (
    <div className="meteor" aria-hidden="true">
      {meteors.map((m) => (
        <div
          key={m.id}
          className={`meteor__head meteor__head--${m.dark ? 'dark' : 'light'}`}
          style={{
            '--start-x': `${m.startX}px`,
            '--start-y': `${m.startY}px`,
            '--end-x': `${m.endX}px`,
            '--end-y': `${m.endY}px`,
            '--angle': `${m.visualAngleDeg}deg`,
            '--duration': `${m.duration}ms`,
            '--max-trail': `${m.trail}px`,
          }}
        >
          <div className="meteor__streak" />
        </div>
      ))}
    </div>
  );
}

export default MeteorShower;
