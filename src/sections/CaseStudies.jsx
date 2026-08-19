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
    <section
      ref={root}
      className="py-16 sm:py-24 px-4 sm:px-8 md:px-[8vw]"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="mb-12 sm:mb-16 text-center">
        <h2
          className="case-heading font-display"
          style={{
            fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
            lineHeight: 1.1,
            color: 'var(--text-primary)',
          }}
        >
          Real impact.
        </h2>
        <p className="case-sub mt-3 sm:mt-4" style={{ fontSize: '15px', fontWeight: 300, color: 'var(--text-secondary)' }}>
          Documented results from active deployments.
        </p>
      </div>

      <div className="case-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {cases.map((c) => (
          <div
            key={c.region}
            className="case-card flex flex-col justify-between"
            style={{
              background: '#1a1a10',
              border: '1px solid rgba(245,158,11,0.15)',
              borderRadius: '4px',
              padding: '1.75rem',
              position: 'relative',
            }}
          >
            <div>
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
                  marginBottom: '14px',
                }}
              >
                {c.tag}
              </div>
              <div className="font-mono" style={{ fontSize: '12px', color: 'var(--accent-amber)', marginBottom: '10px' }}>
                {c.region}
              </div>
              <h3
                className="font-display"
                style={{
                  fontSize: '19px',
                  fontWeight: 600,
                  lineHeight: 1.35,
                  color: 'var(--text-primary)',
                  marginBottom: '18px',
                }}
              >
                {c.heading}
              </h3>
            </div>

            <div>
              <div style={{ borderLeft: '2px solid var(--accent-green)', paddingLeft: '1rem', marginBottom: '18px' }}>
                <div className="font-display" style={{ fontSize: '26px', fontWeight: 700, color: 'var(--accent-green)', lineHeight: 1.1 }}>
                  {c.result}
                </div>
                <div style={{ fontSize: '12px', fontWeight: 300, color: 'var(--text-muted)' }}>{c.resultLabel}</div>
              </div>
              <a
                href="#"
                className="inline-flex items-center text-sm font-medium"
                style={{ color: 'var(--accent-amber)', textDecoration: 'none', transition: 'opacity 0.3s' }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                Read full case study →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
