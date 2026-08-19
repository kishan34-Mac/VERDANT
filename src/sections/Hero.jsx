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

  const scrollToScience = () => {
    const el = document.getElementById('science');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={root}
      className="relative w-full min-h-[100dvh] flex items-center overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      <RootSystem />

      <div
        className="relative z-10 w-full px-4 sm:px-8 md:px-[8vw] pt-24 pb-20 lg:py-0"
        style={{ maxWidth: '720px' }}
      >
        <div className="hero-eyebrow eyebrow mb-4 sm:mb-6">AI FOR A LIVING PLANET</div>

        <h1
          className="font-display"
          style={{
            fontSize: 'clamp(2.2rem, 5.5vw, 4.8rem)',
            lineHeight: 1.08,
            color: 'var(--text-primary)',
          }}
        >
          <span className="hero-word inline-block">Intelligence</span>{' '}
          <span className="hero-word inline-block" style={{ color: 'var(--accent-green)' }}>that grows</span>{' '}
          <span className="hero-word inline-block">with the</span>{' '}
          <span className="hero-word inline-block" style={{ color: 'var(--accent-green)' }}>planet.</span>
        </h1>

        <p
          className="hero-body mt-6 sm:mt-8"
          style={{
            fontSize: 'clamp(15px, 2vw, 18px)',
            fontWeight: 300,
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            maxWidth: '520px',
          }}
        >
          Verdant's AI models read the earth in real time — tracking carbon, predicting tipping points, and routing resources to where they're needed most.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-8">
          <a
            href="#cta"
            className="hero-cta text-center"
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
            onClick={scrollToScience}
            className="hero-cta flex items-center justify-center gap-2 py-3 px-4"
            style={{
              color: 'var(--text-secondary)',
              background: 'transparent',
              border: '1px solid rgba(74,222,128,0.2)',
              borderRadius: '2px',
              fontSize: '14px',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--text-primary)';
              e.currentTarget.style.borderColor = 'var(--accent-green)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.borderColor = 'rgba(74,222,128,0.2)';
            }}
          >
            <Play size={16} className="text-[#4ade80]" /> Watch how it works
          </button>
        </div>
      </div>

      <div
        className="hero-scroll absolute left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
        style={{ bottom: '24px', zIndex: 10 }}
      >
        <span className="font-mono" style={{ fontSize: '10px', color: 'var(--text-muted)' }}>scroll to explore</span>
        <ChevronDown size={16} style={{ color: 'var(--text-muted)', animation: 'sonarPulse 2s ease-in-out infinite' }} />
      </div>
    </section>
  );
}
