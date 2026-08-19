import { useEffect, useRef } from 'react';

export default function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    let raf;
    let w, h;
    let visible = true;
    const mouse = { x: -1000, y: -1000 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // Reduced particle count for perf, batched by color
    const count = 1500;
    const greenParticles = [];
    const amberParticles = [];
    const allParticles = [];

    for (let i = 0; i < count; i++) {
      const p = {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: 0,
        vy: -Math.random() * 0.3 - 0.05,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        noiseOffset: Math.random() * 1000,
      };
      const isAmber = Math.random() > 0.7;
      if (isAmber) amberParticles.push(p);
      else greenParticles.push(p);
      allParticles.push(p);
    }

    const noise = (x) => Math.sin(x * 0.01) * 0.5 + Math.sin(x * 0.03) * 0.3;

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', onMove);

    // Pause when section is offscreen
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const drawBatch = (particles, color) => {
      ctx.fillStyle = color;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.noiseOffset += 1;
        p.vx += noise(p.noiseOffset) * 0.02;
        p.x += p.vx;
        p.y += p.vy;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < 14400) {
          const dist = Math.sqrt(distSq);
          const force = (120 - dist) / 120;
          p.x += (dx / dist) * force * 2;
          p.y += (dy / dist) * force * 2;
        }

        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, 6.283);
        ctx.fill();
      }
    };

    const render = () => {
      if (visible) {
        ctx.clearRect(0, 0, w, h);
        drawBatch(greenParticles, '#4ade80');
        drawBatch(amberParticles, '#f59e0b');
        ctx.globalAlpha = 1;
      }
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      io.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }} />;
}
