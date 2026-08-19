import { useEffect, useRef } from 'react';

export default function GrainOverlay() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    let raf;
    let frame = 0;

    // Pre-render a small noise tile and just blit it with random offsets
    const tileSize = 128;
    const tileCanvas = document.createElement('canvas');
    tileCanvas.width = tileSize;
    tileCanvas.height = tileSize;
    const tileCtx = tileCanvas.getContext('2d');
    const tileImage = tileCtx.createImageData(tileSize, tileSize);
    const tileData = tileImage.data;
    for (let i = 0; i < tileData.length; i += 4) {
      const v = Math.random() * 255;
      tileData[i] = v;
      tileData[i + 1] = v;
      tileData[i + 2] = v;
      tileData[i + 3] = 255;
    }
    tileCtx.putImageData(tileImage, 0, 0);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      frame++;
      if (frame % 4 === 0) {
        const w = canvas.width;
        const h = canvas.height;
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, w, h);
        // Tile the pre-rendered noise across the screen with random jitter
        for (let y = 0; y < h; y += tileSize) {
          for (let x = 0; x < w; x += tileSize) {
            const ox = Math.floor(Math.random() * 8) - 4;
            const oy = Math.floor(Math.random() * 8) - 4;
            ctx.drawImage(tileCanvas, x + ox, y + oy);
          }
        }
      }
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="grain-canvas" />;
}
