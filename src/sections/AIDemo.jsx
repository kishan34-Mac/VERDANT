import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const presets = [
  { label: 'Carbon levels in Amazon', response: 'Amazon basin CO₂ absorption running 12.4% below 2019 baseline. Primary factor: eastern corridor deforestation (+2.1M ha YTD). Recommend: immediate eastern buffer activation. Confidence: 94.2%', chart: [8, 6, 5, 4, 3] },
  { label: 'Coral reef status 2025', response: 'Great Barrier Reef bleaching index: 7.3/10 (critical). Water temp: +1.8°C above seasonal avg. 43% of monitored zones showing active bleaching. Recovery window: 8-14 weeks if temps normalize.', chart: [9, 8, 7, 5, 3] },
  { label: 'Arctic ice predictions', response: 'Arctic sea ice extent: 4.2M km² (18% below 1981-2010 median). Model projects seasonal minimum of 3.1M km² by Sept 15. Long-term trend: -13.1% per decade.', chart: [10, 8, 7, 5, 4] },
];

function BarChart({ data }) {
  const max = Math.max(...data);
  return (
    <div className="font-mono mt-2" style={{ fontSize: '11px', lineHeight: 1.6 }}>
      {data.map((v, i) => {
        const filled = Math.round((v / max) * 10);
        const bar = '█'.repeat(filled) + '░'.repeat(10 - filled);
        return (
          <div key={i} style={{ color: 'var(--accent-green)' }}>
            <span style={{ color: 'var(--text-muted)' }}>201{9 + i} </span>
            {bar} {v}M
          </div>
        );
      })}
    </div>
  );
}

// Static entry — no re-renders during streaming
function TerminalEntry({ entry }) {
  const responseRef = useRef(null);

  useEffect(() => {
    if (entry.type === 'response' && entry.fullText && responseRef.current) {
      const el = responseRef.current;
      let i = 0;
      const cursor = el.querySelector('.terminal-cursor');

      const stream = () => {
        i += 2; // 2 chars per tick for smoother feel at 30ms
        el.firstChild.nodeValue = entry.fullText.slice(0, i);
        if (i >= entry.fullText.length) {
          if (cursor) cursor.remove();
          el.dataset.done = '1';
          return;
        }
        entry._timer = setTimeout(stream, 30);
      };
      stream();

      return () => clearTimeout(entry._timer);
    }
  }, [entry]);

  if (entry.type === 'query') {
    return <div style={{ color: 'var(--accent-green)' }}>&gt; {entry.text}</div>;
  }
  if (entry.type === 'analyzing') {
    return (
      <div style={{ color: 'var(--text-muted)' }}>
        analyzing<span className="terminal-cursor" />
      </div>
    );
  }
  if (entry.type === 'response') {
    return (
      <div>
        <div ref={responseRef} style={{ color: 'var(--text-primary)' }}>
          {''}
          <span className="terminal-cursor" />
        </div>
        <BarChart data={entry.chart} />
      </div>
    );
  }
  return null;
}

export default function AIDemo() {
  const root = useRef(null);
  const [entries, setEntries] = useState([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const terminalBodyRef = useRef(null);
  const busyRef = useRef(false);
  const entryIdRef = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.demo-text', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      });
      gsap.from('.demo-terminal', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [entries]);

  const runQuery = (queryText) => {
    if (busyRef.current) return;
    const preset = presets.find((p) => p.label === queryText) || presets[0];
    busyRef.current = true;
    setBusy(true);

    const queryEntry = { id: ++entryIdRef.current, type: 'query', text: queryText };
    const analyzingEntry = { id: ++entryIdRef.current, type: 'analyzing' };

    setEntries((prev) => [...prev, queryEntry, analyzingEntry]);

    setTimeout(() => {
      // Replace analyzing entry with response entry
      const responseEntry = {
        id: ++entryIdRef.current,
        type: 'response',
        fullText: preset.response,
        chart: preset.chart,
      };
      setEntries((prev) => {
        const filtered = prev.filter((e) => e.type !== 'analyzing');
        return [...filtered, responseEntry];
      });

      // Estimate streaming time, then release busy
      const streamDuration = Math.ceil(preset.response.length / 2) * 30 + 200;
      setTimeout(() => {
        busyRef.current = false;
        setBusy(false);
      }, streamDuration);
    }, 1200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      runQuery(input.trim());
      setInput('');
    }
  };

  return (
    <section ref={root} id="science" style={{ background: 'var(--bg-secondary)', padding: '120px 8vw' }}>
      <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto" style={{ gridTemplateColumns: 'minmax(0,45%) minmax(0,55%)' }}>
        <div>
          <div className="demo-text eyebrow mb-4">LIVE DEMO</div>
          <h2 className="demo-text font-display mb-6" style={{ fontSize: 'clamp(2rem,4vw,3rem)', lineHeight: 1.1, color: 'var(--text-primary)' }}>
            Ask the planet anything.
          </h2>
          <p className="demo-text" style={{ fontSize: '16px', fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            Our AI ingests satellite data, sensor networks, and climate models — and answers in plain language.
          </p>
        </div>

        <div>
          <div className="demo-terminal" style={{ background: '#080e08', border: '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
            <div className="flex items-center px-4" style={{ background: '#111811', padding: '10px 16px' }}>
              <div className="flex gap-2">
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />
              </div>
              <div className="flex-1 text-center font-mono" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                verdant.ai — climate terminal
              </div>
              <div style={{ width: '60px' }} />
            </div>

            <div ref={terminalBodyRef} className="terminal-scroll" style={{ padding: '1.5rem', height: '280px', overflowY: 'auto', fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', lineHeight: 1.6 }}>
              {entries.map((entry) => (
                <div key={entry.id} style={{ marginBottom: '8px' }}>
                  <TerminalEntry entry={entry} />
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center" style={{ borderTop: '1px solid var(--border)', padding: '12px 16px', background: '#080e08' }}>
              <span className="font-mono" style={{ color: 'var(--accent-green)', fontSize: '13px' }}>&gt;&nbsp;</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="ask about carbon, reefs, ice..."
                className="flex-1 bg-transparent border-none outline-none font-mono"
                style={{ color: 'var(--text-primary)', fontSize: '13px' }}
              />
            </form>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            {presets.map((p) => (
              <button
                key={p.label}
                onClick={() => runQuery(p.label)}
                disabled={busy}
                className="font-mono"
                style={{
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                  padding: '6px 14px',
                  borderRadius: '2px',
                  fontSize: '12px',
                  background: 'transparent',
                  cursor: busy ? 'not-allowed' : 'none',
                  opacity: busy ? 0.5 : 1,
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  if (!busy) {
                    e.currentTarget.style.borderColor = 'var(--accent-green)';
                    e.currentTarget.style.color = 'var(--accent-green)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
