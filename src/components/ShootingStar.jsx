import { useState, useEffect, useRef } from 'react';

const MIN_INTERVAL = 5000;
const MAX_INTERVAL = 10000;
const MIN_DURATION = 1100;
const MAX_DURATION = 1800;
const MIN_TRAIL = 50;
const MAX_TRAIL = 120;
const MIN_ANGLE_DEG = 25;
const MAX_ANGLE_DEG = 55;

function ShootingStar({ darkMode }) {
  const [star, setStar] = useState(null);
  const counterRef = useRef(0);

  useEffect(() => {
    if (!darkMode) {
      setStar(null);
      return;
    }
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    let cancelled = false;
    let timer = null;

    const spawn = () => {
      if (cancelled) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const r = Math.random();
      let startX, startY, fromLeft;
      if (r < 0.4) {
        startX = Math.random() * vw;
        startY = -50;
        fromLeft = startX < vw / 2;
      } else if (r < 0.7) {
        startX = vw + 50;
        startY = Math.random() * vh * 0.3;
        fromLeft = false;
      } else {
        startX = -50;
        startY = Math.random() * vh * 0.3;
        fromLeft = true;
      }

      const angleDeg = MIN_ANGLE_DEG + Math.random() * (MAX_ANGLE_DEG - MIN_ANGLE_DEG);
      const angleRad = (angleDeg * Math.PI) / 180;
      const dx = (fromLeft ? 1 : -1) * Math.cos(angleRad);
      const dy = Math.sin(angleRad);
      const distance = Math.hypot(vw, vh) * 1.2;
      const endX = startX + dx * distance;
      const endY = startY + dy * distance;
      const visualAngleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;

      const duration = MIN_DURATION + Math.random() * (MAX_DURATION - MIN_DURATION);
      const trail = MIN_TRAIL + Math.random() * (MAX_TRAIL - MIN_TRAIL);
      counterRef.current += 1;

      setStar({
        id: counterRef.current,
        startX,
        startY,
        endX,
        endY,
        visualAngleDeg,
        duration,
        trail,
      });

      timer = setTimeout(() => {
        if (cancelled) return;
        setStar(null);
        const wait = MIN_INTERVAL + Math.random() * (MAX_INTERVAL - MIN_INTERVAL);
        timer = setTimeout(spawn, wait);
      }, duration);
    };

    timer = setTimeout(
      spawn,
      MIN_INTERVAL + Math.random() * (MAX_INTERVAL - MIN_INTERVAL)
    );

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [darkMode]);

  if (!darkMode || !star) return null;

  const { id, startX, startY, endX, endY, visualAngleDeg, duration, trail } = star;
  return (
    <div className="shooting-star" aria-hidden="true">
      <div
        key={id}
        className="shooting-star__streak"
        style={{
          '--start-x': `${startX - trail}px`,
          '--start-y': `${startY}px`,
          '--end-x': `${endX - trail}px`,
          '--end-y': `${endY}px`,
          '--angle': `${visualAngleDeg}deg`,
          '--duration': `${duration}ms`,
          '--trail-length': `${trail}px`,
        }}
      />
    </div>
  );
}

export default ShootingStar;
