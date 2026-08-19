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
    <footer style={{ background: '#060c06', padding: '60px 8vw 32px' }}>
      <WorldMap />

      <div className="grid md:grid-cols-2 gap-12 mt-12 pb-12" style={{ borderBottom: '1px solid var(--border)' }}>
        <div>
          <div className="font-display text-[24px] mb-3" style={{ letterSpacing: '0.05em' }}>
            <span style={{ color: 'var(--accent-green)' }}>V</span>ERDANT
          </div>
          <p style={{ fontSize: '14px', fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '300px' }}>
            AI for a living planet. Intelligence that grows with the earth.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {linkCols.map((col) => (
            <div key={col.title}>
              <div className="font-mono mb-4" style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.15em' }}>
                {col.title.toUpperCase()}
              </div>
              {col.links.map((l) => (
                <a
                  key={l}
                  href="#"
                  style={{ display: 'block', fontSize: '13px', fontWeight: 300, color: 'var(--text-secondary)', marginBottom: '8px', transition: 'color 0.3s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-green)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  {l}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8">
        <div className="font-mono" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          © 2026 Verdant AI. All rights reserved.
        </div>
        <div className="flex gap-4">
          {[Github, Twitter, Linkedin, Youtube].map((Icon, i) => (
            <a
              key={i}
              href="#"
              style={{ color: 'var(--text-muted)', transition: 'color 0.3s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-green)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
