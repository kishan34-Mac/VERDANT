import { Star } from 'lucide-react';

const testimonials = [
  { quote: `Verdant's prediction models gave us a 3-week head start on the deforestation corridor. That's unprecedented.`, name: 'Dr. Elena Vasquez', role: 'Climate Scientist, IPCC' },
  { quote: `The real-time data ingestion is unlike anything I've worked with. It's like having a living atlas.`, name: 'Prof. James Okoye', role: 'Environmental Researcher, Oxford' },
  { quote: `We rerouted 40% of our shipping fleet based on Verdant's ice predictions. The fuel savings alone paid for it.`, name: 'Maren Lundegaard', role: 'Logistics Director, Nordic Maritime' },
  { quote: `Biodiversity mapping used to take months. Now it's a query. Verdant compressed a decade of work into a tool.`, name: 'Dr. Aisha Patel', role: 'Conservation Biologist, WWF' },
  { quote: `For policy work, the compliance engine is a game changer. We can model regulatory impact before we legislate.`, name: 'Sen. Ricardo Mendes', role: 'Environmental Policy Advisor' },
  { quote: `The watershed analysis caught a contamination event 48 hours before our sensors did. That saved lives.`, name: 'Dr. Liu Wei', role: 'Hydrologist, Tsinghua University' },
  { quote: `I've reviewed every climate AI platform on the market. Verdant is the only one that feels built for scientists, not investors.`, name: 'Dr. Hannah Berg', role: 'Marine Biologist, NOAA' },
  { quote: `The carbon intelligence layer integrates directly with our reporting pipeline. It cut our audit time by 70%.`, name: 'Carlos Nunez', role: 'Sustainability Officer, Fortune 100' },
  { quote: `What impressed me most was the prediction accuracy. 99.2% is not a marketing number — we verified it independently.`, name: 'Dr. Sofia Andersson', role: 'Atmospheric Physicist, MIT' },
  { quote: `Verdant turned our 14-person research team into something that operates like 140. The leverage is extraordinary.`, name: 'Dr. Kenji Tanaka', role: 'Ecologist, University of Tokyo' },
];

function Card({ t }) {
  return (
    <div
      className="flex-shrink-0"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '4px',
        padding: '1.25rem sm:1.5rem',
        width: 'clamp(260px, 75vw, 320px)',
      }}
    >
      <div className="flex gap-1 mb-2.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} size={13} style={{ color: 'var(--accent-amber)', fill: 'var(--accent-amber)' }} />
        ))}
      </div>
      <p
        style={{
          fontSize: '14px',
          fontWeight: 300,
          fontStyle: 'italic',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          marginBottom: '14px',
        }}
      >
        "{t.quote}"
      </p>
      <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>{t.name}</div>
      <div style={{ fontSize: '11px', fontWeight: 300, color: 'var(--text-muted)' }}>{t.role}</div>
    </div>
  );
}

export default function Testimonials() {
  const row1 = testimonials.slice(0, 5);
  const row2 = testimonials.slice(5);

  return (
    <section className="py-14 sm:py-20" style={{ background: 'var(--bg-secondary)' }}>
      <div className="text-center mb-8 sm:mb-12 px-4">
        <span className="font-mono text-xs text-[#556650] tracking-widest uppercase">
          WHAT SCIENTISTS SAY
        </span>
      </div>

      <div className="marquee-mask overflow-hidden">
        <div className="marquee-row">
          <div className="marquee-track-left flex gap-4 sm:gap-6" style={{ width: 'max-content' }}>
            {[...row1, ...row1, ...row1, ...row1].map((t, i) => (
              <Card key={`r1-${i}`} t={t} />
            ))}
          </div>
        </div>
      </div>

      <div className="marquee-mask overflow-hidden mt-4 sm:mt-6">
        <div className="marquee-row">
          <div className="marquee-track-right flex gap-4 sm:gap-6" style={{ width: 'max-content' }}>
            {[...row2, ...row2, ...row2, ...row2].map((t, i) => (
              <Card key={`r2-${i}`} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
