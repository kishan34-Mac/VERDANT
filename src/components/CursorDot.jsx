import { useEffect, useRef } from 'react';

export default function CursorDot() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let rx = 0, ry = 0, dx = 0, dy = 0;
    let mx = 0, my = 0;
    let raf;
    let needsUpdate = false;

    // Use passive listener + flag to avoid work when mouse is idle
    const move = (e) => {
      mx = e.clientX;
      my = e.clientY;
      needsUpdate = true;
    };

    const loop = () => {
      if (needsUpdate) {
        dx += (mx - dx) * 0.25;
        dy += (my - dy) * 0.25;
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        dot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
        ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;

        // If close enough to target, stop updating
        if (Math.abs(mx - dx) < 0.5 && Math.abs(my - dy) < 0.5) {
          dx = mx;
          dy = my;
          rx = mx;
          ry = my;
          needsUpdate = false;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    // Event delegation for hover — no per-element listeners
    const onOver = (e) => {
      if (e.target.closest('a, button, .hexagon, input, [role="button"]')) {
        ring.classList.add('hovering');
      }
    };
    const onOut = (e) => {
      if (e.target.closest('a, button, .hexagon, input, [role="button"]')) {
        ring.classList.remove('hovering');
      }
    };

    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    const onDown = () => ring.classList.add('clicking');
    const onUp = () => ring.classList.remove('clicking');

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" style={{ willChange: 'transform' }} />
      <div ref={dotRef} className="cursor-dot" style={{ willChange: 'transform' }} />
    </>
  );
}
