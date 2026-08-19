import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, ChevronDown } from 'lucide-react';
import RootSystem from '../three/RootSystem';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-eyebrow', { y: 20, opacity: 0, duration: 0.8, delay: 0.5 });
      gsap.from('.hero-word', {
        y: 80,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        delay: 0.8,
        ease: 'power3.out',
      });
      gsap.from('.hero-body', { y: 20, opacity: 0, duration: 0.8, delay: 1.4 });
      gsap.from('.hero-cta', { y: 20, opacity: 0, duration: 0.8, delay: 1.8, stagger: 0.1 });
      gsap.from('.hero-scroll', { opacity: 0, duration: 1, delay: 2.2 });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative w-full h-screen overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      <RootSystem />

      <div className="absolute" style={{ left: '8vw', top: '50%', transform: 'translateY(-50%)', maxWidth: '600px', zIndex: 10 }}>
        <div className="hero-eyebrow eyebrow mb-6">AI FOR A LIVING PLANET</div>

        <h1 className="font-display" style={{ fontSize: 'clamp(3rem,5.5vw,5rem)', lineHeight: 1.05, color: 'var(--text-primary)' }}>
          <span className="hero-word inline-block">Intelligence</span>{' '}
          <span className="hero-word inline-block" style={{ color: 'var(--accent-green)' }}>that grows</span>{' '}
          <span className="hero-word inline-block">with the</span>{' '}
          <span className="hero-word inline-block" style={{ color: 'var(--accent-green)' }}>planet.</span>
        </h1>

        <p className="hero-body mt-8" style={{ fontSize: '18px', fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: '480px' }}>
          Verdant's AI models read the earth in real time — tracking carbon, predicting tipping points, and routing resources to where they're needed most.
        </p>

        <div className="flex gap-4 mt-8">
          <a
            href="#cta"
            className="hero-cta"
            style={{
              background: 'var(--accent-green)',
              color: '#0a110a',
              fontWeight: 600,
              fontSize: '14px',
              padding: '14px 28px',
              borderRadius: '2px',
              transition: 'opacity 0.3s ease',
            }}
          >
            Request Access →
          </a>
          <button
            className="hero-cta flex items-center gap-2"
            style={{
              color: 'var(--text-secondary)',
              background: 'transparent',
              border: 'none',
              fontSize: '14px',
              cursor: 'none',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            <Play size={16} /> Watch how it works
          </button>
        </div>
      </div>

      <div className="hero-scroll absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ bottom: '30px', zIndex: 10 }}>
        <span className="font-mono" style={{ fontSize: '10px', color: 'var(--text-muted)' }}>scroll to explore</span>
        <ChevronDown size={16} style={{ color: 'var(--text-muted)', animation: 'sonarPulse 2s ease-in-out infinite' }} />
      </div>
    </section>
  );
}
