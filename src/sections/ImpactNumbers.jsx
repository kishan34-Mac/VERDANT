import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '2.4B', label: 'TREES MONITORED' },
  { value: '140+', label: 'COUNTRIES ACTIVE' },
  { value: '99.2%', label: 'PREDICTION ACCURACY' },
  { value: '<200ms', label: 'REAL-TIME LATENCY' },
];

export default function ImpactNumbers() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stat-card', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      });

      // Count up numeric parts
      stats.forEach((stat, i) => {
        const el = root.current?.querySelectorAll('.stat-num')[i];
        if (!el) return;
        const numMatch = stat.value.match(/[\d.]+/);
        if (!numMatch) return;
        const target = parseFloat(numMatch[0]);
        const prefix = stat.value.split(numMatch[0])[0];
        const suffix = stat.value.split(numMatch[0])[1];
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: root.current, start: 'top 75%' },
          onUpdate: () => {
            el.textContent = `${prefix}${obj.val.toFixed(1).replace(/\.0$/, '')}${suffix}`;
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="impact"
      className="py-16 sm:py-24 px-4 sm:px-8 md:px-[8vw]"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="flex flex-col items-center gap-10 sm:gap-14 max-w-6xl mx-auto">
        {/* Breathing circle */}
        <div className="relative flex items-center justify-center w-full max-w-[320px] h-[160px] sm:h-[180px]">
          <div className="sonar-ring" style={{ width: '130px', height: '130px', animationDelay: '0s' }} />
          <div className="sonar-ring" style={{ width: '130px', height: '130px', animationDelay: '1s' }} />
          <div className="sonar-ring" style={{ width: '130px', height: '130px', animationDelay: '2s' }} />
          <div className="absolute" style={{ animation: 'spin 8s linear infinite' }}>
            <Leaf size={36} style={{ color: 'var(--accent-green)' }} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="stat-card flex flex-col justify-center items-center"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                padding: '1.75rem 1.25rem',
                borderRadius: '4px',
                textAlign: 'center',
              }}
            >
              <div
                className="stat-num font-display"
                style={{
                  fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
                  color: 'var(--accent-green)',
                  lineHeight: 1.1,
                }}
              >
                0
              </div>
              <div
                className="font-mono mt-3"
                style={{
                  fontSize: '12px',
                  fontWeight: 400,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.1em',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
