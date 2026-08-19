import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 w-full flex items-center justify-between px-[8vw]"
      style={{
        height: '68px',
        zIndex: 500,
        transition: 'all 0.4s ease',
        background: scrolled ? 'rgba(10,17,10,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <div className="font-display text-[20px]" style={{ letterSpacing: '0.05em' }}>
        <span style={{ color: 'var(--accent-green)' }}>V</span>
        ERDANT
      </div>

      <div className="hidden md:flex items-center gap-8">
        {['Platform', 'Impact', 'Science', 'Pricing', 'Blog'].map((l) => (
          <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">
            {l}
          </a>
        ))}
      </div>

      <a
        href="#cta"
        className="font-mono"
        style={{
          border: '1px solid var(--accent-green)',
          color: 'var(--accent-green)',
          padding: '8px 20px',
          borderRadius: '2px',
          fontSize: '13px',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--accent-green)';
          e.currentTarget.style.color = '#0a110a';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = 'var(--accent-green)';
        }}
      >
        Get Early Access
      </a>
    </nav>
  );
}
