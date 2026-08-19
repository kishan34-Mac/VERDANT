import { useEffect, useRef } from 'react';

export function useMousePosition() {
  const mouse = useRef({ x: 0, y: 0, nx: 0, ny: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.nx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.ny = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return mouse;
}
