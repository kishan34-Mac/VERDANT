import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'STARTER',
    monthly: 0,
    annual: 0,
    features: [
      { text: '5 API queries / day', on: true },
      { text: 'Carbon Intelligence module', on: true },
      { text: 'Community support', on: true },
      { text: 'Species Monitor', on: false },
      { text: 'Resource routing', on: false },
      { text: 'Policy Engine access', on: false },
    ],
    cta: 'Start Free',
    popular: false,
  },
  {
    name: 'PRO',
    monthly: 299,
    annual: 239,
    features: [
      { text: 'Unlimited API queries', on: true },
      { text: 'All intelligence modules', on: true },
      { text: 'Priority support', on: true },
      { text: '90-day climate predictions', on: true },
      { text: 'Resource routing', on: true },
      { text: 'Policy Engine access', on: false },
    ],
    cta: 'Start Pro Trial',
    popular: true,
  },
  {
    name: 'ENTERPRISE',
    monthly: -1,
    annual: -1,
    features: [
      { text: 'Everything in Pro', on: true },
      { text: 'Dedicated compute cluster', on: true },
      { text: 'Custom model training', on: true },
      { text: 'On-prem deployment', on: true },
      { text: 'Policy Engine access', on: true },
      { text: '24/7 dedicated support', on: true },
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function Pricing() {
  const root = useRef(null);
  const [annual, setAnnual] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pricing-heading', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      });
      gsap.from('.price-card', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.2,
        scrollTrigger: { trigger: '.price-grid', start: 'top 80%' },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const priceFor = (p) => (annual ? p.annual : p.monthly);

  return (
    <section ref={root} id="pricing" style={{ background: 'var(--bg-primary)', padding: '120px 8vw' }}>
      <div className="text-center mb-12">
        <h2 className="pricing-heading font-display" style={{ fontSize: 'clamp(2.5rem,4vw,3.5rem)', lineHeight: 1.1, color: 'var(--text-primary)', marginBottom: '32px' }}>
          Transparent pricing.
        </h2>

        {/* Toggle */}
        <div className="inline-flex items-center gap-1 p-1" style={{ border: '1px solid var(--border)', borderRadius: '99px' }}>
          {['Monthly', 'Annual (save 20%)'].map((label, i) => {
            const active = (i === 1) === annual;
            return (
              <button
                key={label}
                onClick={() => setAnnual(i === 1)}
                className="font-mono"
                style={{
                  padding: '6px 16px',
                  borderRadius: '99px',
                  fontSize: '12px',
                  transition: 'all 0.3s ease',
                  background: active ? 'var(--accent-green)' : 'transparent',
                  color: active ? '#0a110a' : 'var(--text-secondary)',
                  cursor: 'none',
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="price-grid flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
        {plans.map((p) => (
          <div
            key={p.name}
            className="price-card"
            style={{
              background: 'var(--bg-card)',
              border: `1px solid ${p.popular ? 'var(--accent-green)' : 'var(--border)'}`,
              borderRadius: '4px',
              padding: '2.5rem',
              width: '300px',
              transform: p.popular ? 'scale(1.02)' : 'none',
              boxShadow: p.popular ? '0 0 30px rgba(74,222,128,0.1)' : 'none',
              position: 'relative',
            }}
          >
            {p.popular && (
              <div
                className="font-mono absolute"
                style={{
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'var(--accent-green)',
                  color: '#0a110a',
                  fontSize: '10px',
                  padding: '3px 10px',
                  borderRadius: '99px',
                  letterSpacing: '0.1em',
                }}
              >
                MOST POPULAR
              </div>
            )}

            <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '20px' }}>{p.name}</div>

            <div style={{ height: '48px', marginBottom: '20px' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={annual ? 'annual' : 'monthly'}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-baseline gap-1"
                >
                  {priceFor(p) === -1 ? (
                    <span className="font-display" style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: 'var(--text-primary)' }}>Custom</span>
                  ) : (
                    <>
                      <span className="font-display" style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: 'var(--text-primary)' }}>
                        ${priceFor(p)}
                      </span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>/mo</span>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mb-6">
              {p.features.map((f) => (
                <div key={f.text} className="flex items-center gap-3 mb-3">
                  {f.on ? (
                    <Check size={16} style={{ color: 'var(--accent-green)' }} />
                  ) : (
                    <X size={16} style={{ color: 'var(--text-muted)' }} />
                  )}
                  <span style={{ fontSize: '14px', fontWeight: 300, color: f.on ? 'var(--text-secondary)' : 'var(--text-muted)' }}>
                    {f.text}
                  </span>
                </div>
              ))}
            </div>

            <button
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '2px',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'none',
                transition: 'all 0.3s ease',
                background: p.popular ? 'var(--accent-green)' : 'transparent',
                color: p.popular ? '#0a110a' : 'var(--accent-green)',
                border: `1px solid var(--accent-green)`,
              }}
              onMouseEnter={(e) => {
                if (!p.popular) {
                  e.currentTarget.style.background = 'var(--accent-green)';
                  e.currentTarget.style.color = '#0a110a';
                }
              }}
              onMouseLeave={(e) => {
                if (!p.popular) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--accent-green)';
                }
              }}
            >
              {p.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
