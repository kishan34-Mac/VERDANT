const dots = [
  { x: 48, y: 32, name: 'London' },
  { x: 25, y: 38, name: 'NYC' },
  { x: 33, y: 68, name: 'São Paulo' },
  { x: 67, y: 48, name: 'Mumbai' },
  { x: 78, y: 36, name: 'Beijing' },
  { x: 88, y: 75, name: 'Sydney' },
  { x: 55, y: 58, name: 'Nairobi' },
  { x: 22, y: 28, name: 'Toronto' },
  { x: 50, y: 30, name: 'Berlin' },
  { x: 84, y: 32, name: 'Tokyo' },
  { x: 49, y: 55, name: 'Lagos' },
  { x: 62, y: 47, name: 'Dubai' },
  { x: 76, y: 55, name: 'Singapore' },
  { x: 18, y: 48, name: 'Mexico City' },
  { x: 30, y: 78, name: 'Buenos Aires' },
];

export default function WorldMap() {
  return (
    <svg viewBox="0 0 100 60" preserveAspectRatio="none" style={{ width: '100%', height: '180px' }}>
      {/* Simplified continent shapes */}
      <g stroke="#1a2a1a" strokeWidth="0.2" fill="transparent">
        {/* North America */}
        <path d="M10,18 Q15,15 25,16 L28,20 L30,28 L25,34 L18,38 L12,32 L8,24 Z" />
        {/* South America */}
        <path d="M25,40 L32,42 L34,55 L30,68 L26,72 L22,60 L22,48 Z" />
        {/* Europe */}
        <path d="M45,22 L52,20 L54,26 L50,32 L46,30 L44,26 Z" />
        {/* Africa */}
        <path d="M46,34 L54,34 L56,45 L52,56 L48,58 L44,48 L44,38 Z" />
        {/* Asia */}
        <path d="M55,20 L72,18 L82,22 L84,30 L78,36 L68,34 L60,30 L56,26 Z" />
        {/* Australia */}
        <path d="M80,52 L88,50 L90,56 L86,62 L80,60 L78,56 Z" />
      </g>
      {dots.map((d, i) => (
        <g key={d.name}>
          <circle cx={d.x} cy={d.y} r="0.6" fill="#4ade80" opacity="0.8" />
          <circle
            cx={d.x}
            cy={d.y}
            r="0.6"
            fill="none"
            stroke="#4ade80"
            strokeWidth="0.15"
            className="map-dot-pulse"
            style={{ animationDelay: `${i * 0.13}s` }}
          />
        </g>
      ))}
    </svg>
  );
}
