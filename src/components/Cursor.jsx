import { useEffect, useRef } from 'react';
import gsap from 'gsap';

function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return undefined;
    const move = (event) => {
      gsap.to(dot.current, { x: event.clientX, y: event.clientY, duration: 0.08, ease: 'none' });
      gsap.to(ring.current, { x: event.clientX, y: event.clientY, duration: 0.38, ease: 'power3.out' });
    };
    const over = (event) => {
      const active = event.target.closest('a, button, .magnetic, .project-card, .skill-orb');
      gsap.to(ring.current, {
        scale: active ? 2.4 : 1,
        borderColor: active ? 'rgba(125,211,252,0.9)' : 'rgba(255,255,255,0.28)',
        backgroundColor: active ? 'rgba(125,211,252,0.08)' : 'rgba(255,255,255,0)',
        duration: 0.25,
      });
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 mix-blend-difference md:block" />
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[101] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-200 shadow-[0_0_25px_rgba(125,211,252,0.9)] md:block" />
    </>
  );
}

export default Cursor;
