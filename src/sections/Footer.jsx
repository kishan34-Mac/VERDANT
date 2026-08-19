import { Github, Twitter, Linkedin, Youtube } from 'lucide-react';
import WorldMap from '../three/WorldMap';

const linkCols = [
  { title: 'Platform', links: ['Carbon Intelligence', 'Species Monitor', 'Water Systems', 'Climate Prediction'] },
  { title: 'Company', links: ['About', 'Careers', 'Press', 'Contact'] },
  { title: 'Resources', links: ['Documentation', 'API Reference', 'Case Studies', 'Blog'] },
  { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Compliance'] },
];

export default function Footer() {
  return (
    <footer
      className="pt-12 sm:pt-16 pb-8 px-4 sm:px-8 md:px-[8vw]"
      style={{ background: '#060c06' }}
    >
      <div className="overflow-hidden mb-6">
        <WorldMap />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mt-8 pb-10 border-b border-[rgba(74,222,128,0.1)]">
        <div className="md:col-span-4">
          <div className="font-display text-[22px] sm:text-[24px] mb-3 tracking-wider text-white">
            <span style={{ color: 'var(--accent-green)' }}>V</span>ERDANT
          </div>
          <p style={{ fontSize: '13px', fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '300px' }}>
            AI for a living planet. Intelligence that grows with the earth.
          </p>
        </div>

        <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          {linkCols.map((col) => (
            <div key={col.title}>
              <div className="font-mono mb-3 sm:mb-4 text-[11px] text-[#556650] tracking-widest uppercase">
                {col.title}
              </div>
              {col.links.map((l) => (
                <a
                  key={l}
                  href="#"
                  className="block text-xs sm:text-[13px] text-[#9aab94] hover:text-[#4ade80] transition-colors mb-2"
                >
                  {l}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 text-center sm:text-left">
        <div className="font-mono text-xs text-[#556650]">
          © 2026 Verdant AI. All rights reserved.
        </div>
        <div className="flex gap-4">
          {[Github, Twitter, Linkedin, Youtube].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="text-[#556650] hover:text-[#4ade80] transition-colors"
              aria-label="Social Link"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
