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
      gsap.from('.feature-card-mobile', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.feature-cards-container', start: 'top 85%' },
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
    <section
      ref={root}
      id="platform"
      className="py-16 sm:py-24 px-4 sm:px-8 md:px-[8vw] overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="text-center mb-12 sm:mb-16">
        <div className="eyebrow mb-4">THE PLATFORM</div>
        <h2
          className="font-display"
          style={{
            fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
            lineHeight: 1.1,
            color: 'var(--text-primary)',
          }}
        >
          <span className="feature-heading inline-block">Built from the</span>{' '}
          <span className="feature-heading inline-block">ground up.</span>
        </h2>
      </div>

      {/* Mobile & Tablet Card Layout (screens < 1024px) */}
      <div className="block lg:hidden max-w-4xl mx-auto feature-cards-container">
        {/* Core highlight card */}
        <div
          className="feature-card-mobile p-6 rounded-lg mb-6 flex flex-col items-center text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(74,222,128,0.15), rgba(74,222,128,0.05))',
            border: '1px solid var(--accent-green)',
            boxShadow: '0 0 30px rgba(74,222,128,0.1)',
          }}
        >
          <Hexagon size={36} className="text-[#4ade80] mb-2" />
          <div className="font-display text-xl font-bold text-[#4ade80]">VERDANT CORE</div>
          <p className="text-xs text-[#9aab94] mt-1 max-w-sm">
            The neural engine coordinating autonomous climate intelligence worldwide.
          </p>
        </div>

        {/* 6 Features in responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {features.map((f) => (
            <div
              key={f.name}
              className="feature-card-mobile p-5 rounded flex flex-col items-start"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                transition: 'all 0.3s ease',
              }}
            >
              <div
                className="p-3 rounded mb-3 flex items-center justify-center"
                style={{ background: 'rgba(74,222,128,0.1)' }}
              >
                <f.icon size={24} style={{ color: 'var(--accent-green)' }} />
              </div>
              <div className="font-display text-base font-semibold text-[#f0ede8] mb-1">
                {f.name}
              </div>
              <div className="text-xs text-[#9aab94] font-light leading-relaxed">
                {f.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Honeycomb Layout (screens >= 1024px) */}
      <div className="hidden lg:flex hex-grid relative items-center justify-center" style={{ height: '560px' }}>
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
