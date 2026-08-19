import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const navLinks = ['Platform', 'Impact', 'Science', 'Pricing', 'Blog'];

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full flex items-center justify-between px-4 sm:px-8 md:px-[8vw]"
        style={{
          height: '68px',
          zIndex: 500,
          transition: 'all 0.4s ease',
          background: scrolled || mobileMenuOpen ? 'rgba(10,17,10,0.95)' : 'transparent',
          backdropFilter: scrolled || mobileMenuOpen ? 'blur(16px)' : 'none',
          borderBottom: scrolled || mobileMenuOpen ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
        <a href="#" className="font-display text-[20px] flex items-center tracking-wider text-white no-underline">
          <span style={{ color: 'var(--accent-green)' }}>V</span>
          ERDANT
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">
              {l}
            </a>
          ))}
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden md:block">
          <a
            href="#cta"
            className="font-mono"
            style={{
              border: '1px solid var(--accent-green)',
              color: 'var(--accent-green)',
              padding: '8px 20px',
              borderRadius: '2px',
              fontSize: '13px',
              display: 'inline-block',
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
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center justify-center p-2 rounded text-[#f0ede8] focus:outline-none"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          style={{ background: 'transparent', border: '1px solid var(--border)' }}
        >
          {mobileMenuOpen ? <X size={20} className="text-[#4ade80]" /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[68px] z-40 md:hidden flex flex-col justify-between p-6"
          style={{
            background: 'rgba(10,17,10,0.98)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid var(--border)',
          }}
        >
          <div className="flex flex-col gap-6 pt-4">
            {navLinks.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="font-display text-2xl text-[#f0ede8] hover:text-[#4ade80] transition-colors py-2 border-b border-[rgba(74,222,128,0.1)]"
              >
                {l}
              </a>
            ))}
          </div>

          <div className="pb-8">
            <a
              href="#cta"
              onClick={() => setMobileMenuOpen(false)}
              className="font-mono block w-full text-center py-3 rounded font-medium text-sm"
              style={{
                background: 'var(--accent-green)',
                color: '#0a110a',
              }}
            >
              Get Early Access →
            </a>
          </div>
        </div>
      )}
    </>
  );
}
