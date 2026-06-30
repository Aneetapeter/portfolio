import { useRef } from 'react';
import gsap from 'gsap';

function Magnetic({ children }) {
  const ref = useRef(null);

  const onMove = (event) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    gsap.to(node, { x: x * 0.18, y: y * 0.22, duration: 0.45, ease: 'power3.out' });
  };

  const onLeave = () => {
    if (ref.current) gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.35)' });
  };

  return (
    <span ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="magnetic inline-flex">
      {children}
    </span>
  );
}

export default Magnetic;
