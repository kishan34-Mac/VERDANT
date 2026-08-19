import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cases = [
  {
    tag: 'BRAZIL',
    region: 'Amazon Buffer Program',
    heading: 'Prevented 840K hectares of deforestation through predictive routing',
    result: '840K ha',
    resultLabel: 'forest saved',
  },
  {
    tag: 'PACIFIC',
    region: 'Coral Restoration Net',
    heading: 'Early bleaching detection enabled targeted intervention in 12 reef systems',
    result: '62%',
    resultLabel: 'mortality reduction',
  },
  {
    tag: 'NORWAY',
    region: 'Arctic Data Grid',
    heading: 'Real-time ice monitoring powers shipping route optimization',
    result: '2.1M tonnes',
    resultLabel: 'CO₂ avoided',
  },
];

export default function CaseStudies() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.case-heading', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      });
      gsap.from('.case-sub', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.15,
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      });
      gsap.fromTo(
        '.case-card',
        {
          clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
        },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.case-grid', start: 'top 80%' },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} style={{ background: 'var(--bg-primary)', padding: '120px 8vw' }}>
      <div className="mb-16 text-center">
        <h2 className="case-heading font-display" style={{ fontSize: 'clamp(2.5rem,4vw,3.5rem)', lineHeight: 1.1, color: 'var(--text-primary)' }}>
          Real impact.
        </h2>
        <p className="case-sub mt-4" style={{ fontSize: '16px', fontWeight: 300, color: 'var(--text-secondary)' }}>
          Documented results from active deployments.
        </p>
      </div>

      <div className="case-grid grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {cases.map((c) => (
          <div
            key={c.region}
            className="case-card"
            style={{
              background: '#1a1a10',
              border: '1px solid rgba(245,158,11,0.15)',
              borderRadius: '2px',
              padding: '2rem',
              position: 'relative',
            }}
          >
            <div
              className="font-mono"
              style={{
                display: 'inline-block',
                background: 'rgba(245,158,11,0.15)',
                color: 'var(--accent-amber)',
                padding: '4px 12px',
                borderRadius: '99px',
                fontSize: '11px',
                letterSpacing: '0.1em',
                marginBottom: '16px',
              }}
            >
              {c.tag}
            </div>
            <div className="font-mono" style={{ fontSize: '12px', color: 'var(--accent-amber)', marginBottom: '12px' }}>
              {c.region}
            </div>
            <h3 className="font-display" style={{ fontSize: '22px', fontWeight: 600, lineHeight: 1.3, color: 'var(--text-primary)', marginBottom: '20px' }}>
              {c.heading}
            </h3>
            <div style={{ borderLeft: '2px solid var(--accent-green)', paddingLeft: '1rem', marginBottom: '20px' }}>
              <div className="font-display" style={{ fontSize: '28px', fontWeight: 700, color: 'var(--accent-green)', lineHeight: 1.1 }}>
                {c.result}
              </div>
              <div style={{ fontSize: '12px', fontWeight: 300, color: 'var(--text-muted)' }}>{c.resultLabel}</div>
            </div>
            <a
              href="#"
              style={{ color: 'var(--accent-amber)', fontSize: '14px', textDecoration: 'none', transition: 'opacity 0.3s' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Read full case study →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
