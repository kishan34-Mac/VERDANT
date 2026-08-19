import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import ParticleField from '../three/ParticleField';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const root = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-line', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      });
      gsap.from('.cta-eyebrow', {
        opacity: 0,
        duration: 0.8,
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      });
      gsap.from('.cta-form', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <section ref={root} id="cta" className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
      <ParticleField />

      <div className="relative text-center" style={{ zIndex: 10, maxWidth: '700px', padding: '0 8vw' }}>
        <div className="cta-eyebrow eyebrow mb-6">JOIN THE MOVEMENT</div>
        <h2 className="font-display" style={{ fontSize: 'clamp(3rem,7vw,6rem)', lineHeight: 1.0, color: 'var(--text-primary)' }}>
          <span className="cta-line block">The planet</span>
          <span className="cta-line block">needs better</span>
          <span className="cta-line block" style={{ color: 'var(--accent-green)' }}>intelligence.</span>
        </h2>

        <form onSubmit={handleSubmit} className="cta-form" style={{ maxWidth: '480px', margin: '2.5rem auto 0' }}>
          <div className="flex items-end gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                borderBottom: '2px solid var(--border)',
                color: 'var(--text-primary)',
                fontSize: '16px',
                padding: '12px 0',
                outline: 'none',
                transition: 'border-color 0.3s ease',
              }}
              onFocus={(e) => (e.currentTarget.style.borderBottomColor = 'var(--accent-green)')}
              onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'var(--border)')}
            />
            <motion.button
              type="submit"
              animate={submitted ? { scale: [1, 1.1, 1] } : {}}
              style={{
                background: 'var(--accent-green)',
                color: '#0a110a',
                fontWeight: 600,
                fontSize: '14px',
                padding: '14px 28px',
                borderRadius: '2px',
                border: 'none',
                cursor: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {submitted ? `✓ You're on the list` : 'Request Early Access →'}
            </motion.button>
          </div>
        </form>
      </div>
    </section>
  );
}
