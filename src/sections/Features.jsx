import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Atom,
  Bird,
  Droplets,
  CloudSun,
  Route,
  Scale,
  Hexagon,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: Atom, name: 'Carbon Intelligence', desc: 'Real-time atmospheric tracking' },
  { icon: Bird, name: 'Species Monitor', desc: 'ML-powered biodiversity mapping' },
  { icon: Droplets, name: 'Water Systems', desc: 'Global watershed analysis' },
  { icon: CloudSun, name: 'Climate Prediction', desc: '90-day forecast models' },
  { icon: Route, name: 'Resource Routing', desc: 'AI-optimised distribution' },
  { icon: Scale, name: 'Policy Engine', desc: 'Regulatory compliance automation' },
];

export default function Features() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-heading', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      });
      gsap.from('.hex-item', {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: { trigger: '.hex-grid', start: 'top 80%' },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="platform" style={{ background: 'var(--bg-primary)', padding: '120px 8vw' }}>
      <div className="text-center mb-16">
        <div className="eyebrow mb-4">THE PLATFORM</div>
        <h2 className="font-display" style={{ fontSize: 'clamp(2.5rem,4vw,3.5rem)', lineHeight: 1.1, color: 'var(--text-primary)' }}>
          <span className="feature-heading inline-block">Built from the</span>{' '}
          <span className="feature-heading inline-block">ground up.</span>
        </h2>
      </div>

      <div className="hex-grid relative flex items-center justify-center" style={{ height: '560px' }}>
        {/* Honeycomb layout: center + 6 around */}
        {/* Positions for a honeycomb with 200x230 hexagons */}
        {[
          { icon: Atom, name: 'Carbon Intelligence', desc: 'Real-time atmospheric tracking', pos: { x: -210, y: -58 } },
          { icon: Bird, name: 'Species Monitor', desc: 'ML-powered biodiversity mapping', pos: { x: 0, y: -116 } },
          { icon: Droplets, name: 'Water Systems', desc: 'Global watershed analysis', pos: { x: 210, y: -58 } },
          { icon: CloudSun, name: 'Climate Prediction', desc: '90-day forecast models', pos: { x: -210, y: 58 } },
          { icon: Route, name: 'Resource Routing', desc: 'AI-optimised distribution', pos: { x: 0, y: 116 } },
          { icon: Scale, name: 'Policy Engine', desc: 'Regulatory compliance automation', pos: { x: 210, y: 58 } },
        ].map((f) => (
          <div
            key={f.name}
            className="hex-item absolute"
            style={{ left: '50%', top: '50%', transform: `translate(-50%, -50%) translate(${f.pos.x}px, ${f.pos.y}px)` }}
          >
            <div className="hexagon-border" style={{ width: '210px', height: '240px', background: 'var(--border-hover)' }}>
              <div
                className="hexagon flex flex-col items-center justify-center text-center"
                style={{ width: '200px', height: '230px', background: 'var(--bg-card)', margin: '5px' }}
              >
                <f.icon size={28} style={{ color: 'var(--accent-green)', marginBottom: '12px', transition: 'transform 0.35s ease' }} />
                <div style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '6px' }}>{f.name}</div>
                <div style={{ fontSize: '12px', fontWeight: 300, color: 'var(--text-muted)' }}>{f.desc}</div>
              </div>
            </div>
          </div>
        ))}

        {/* Center hexagon - VERDANT CORE */}
        <div
          className="hex-item absolute"
          style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <div
            className="hexagon flex flex-col items-center justify-center"
            style={{ width: '200px', height: '230px', background: 'var(--accent-green)' }}
          >
            <Hexagon size={32} style={{ color: '#0a110a', marginBottom: '8px' }} />
            <div className="font-display" style={{ fontSize: '18px', fontWeight: 700, color: '#0a110a' }}>VERDANT</div>
            <div className="font-display" style={{ fontSize: '18px', fontWeight: 700, color: '#0a110a' }}>CORE</div>
          </div>
        </div>
      </div>
    </section>
  );
}
