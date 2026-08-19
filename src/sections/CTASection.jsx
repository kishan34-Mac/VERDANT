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
    <section
      ref={root}
      id="cta"
      className="relative w-full min-h-[85vh] py-20 px-4 sm:px-8 md:px-[8vw] overflow-hidden flex flex-col items-center justify-center"
      style={{ background: 'var(--bg-primary)' }}
    >
      <ParticleField />

      <div className="relative text-center w-full" style={{ zIndex: 10, maxWidth: '720px' }}>
        <div className="cta-eyebrow eyebrow mb-4 sm:mb-6">JOIN THE MOVEMENT</div>
        <h2
          className="font-display"
          style={{
            fontSize: 'clamp(2.2rem, 6vw, 4.8rem)',
            lineHeight: 1.05,
            color: 'var(--text-primary)',
          }}
        >
          <span className="cta-line block">The planet</span>
          <span className="cta-line block">needs better</span>
          <span className="cta-line block" style={{ color: 'var(--accent-green)' }}>intelligence.</span>
        </h2>

        <form onSubmit={handleSubmit} className="cta-form w-full max-w-lg mx-auto mt-8 sm:mt-10">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full font-mono text-center sm:text-left"
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                borderBottom: '2px solid var(--border)',
                color: 'var(--text-primary)',
                fontSize: '16px',
                padding: '12px 4px',
                outline: 'none',
                transition: 'border-color 0.3s ease',
              }}
              onFocus={(e) => (e.currentTarget.style.borderBottomColor = 'var(--accent-green)')}
              onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'var(--border)')}
            />
            <motion.button
              type="submit"
              animate={submitted ? { scale: [1, 1.05, 1] } : {}}
              className="py-3.5 px-6 rounded font-semibold text-sm whitespace-nowrap transition-all duration-300"
              style={{
                background: 'var(--accent-green)',
                color: '#0a110a',
                border: 'none',
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
