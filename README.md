# VERDANT — AI for a Living Planet

> Intelligence that grows with the planet.

VERDANT is a cutting-edge AI sustainability technology platform that turns real-time earth data into actionable intelligence. It reads the planet in real time — tracking carbon, predicting climate tipping points, monitoring biodiversity, and routing resources to where they're needed most.

This repository contains the landing page for the platform, built as a production-grade, fully responsive single-page application with zero backend dependencies.

---

## The Problem

Climate change is accelerating, but the tools we use to understand it are fragmented and slow. Scientists, policymakers, and organizations face three critical gaps:

1. **Data is scattered.** Satellite imagery, sensor networks, and climate models live in separate silos. Getting a holistic picture requires stitching together dozens of incompatible sources.

2. **Insight arrives too late.** By the time a deforestation corridor is mapped or a reef bleaching event is detected, the window for intervention has often closed.

3. **Decisions lack context.** A carbon reading means nothing without trend lines, prediction models, and routing recommendations attached to it.

## The Solution

VERDANT addresses all three gaps in a single platform:

- **Carbon Intelligence** — Real-time atmospheric tracking with baseline comparisons and confidence scoring.
- **Species Monitor** — ML-powered biodiversity mapping that compresses months of fieldwork into a single query.
- **Climate Prediction** — 90-day forecast models with 99.2% verified accuracy.
- **Resource Routing** — AI-optimised distribution that directs interventions to where they'll have the most impact.
- **Policy Engine** — Regulatory compliance automation that models legislative impact before laws are written.
- **Water Systems** — Global watershed analysis that catches contamination events days before traditional sensors.

The interactive terminal demo on the landing page lets visitors query the platform directly — asking about Amazon carbon levels, coral reef status, or Arctic ice projections — and watch responses stream in real time with data visualizations.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite |
| 3D Graphics | Three.js (recursive root system, central orb, particle fields) |
| Scroll Animation | GSAP + ScrollTrigger |
| Component Transitions | Framer Motion |
| Smooth Scroll | Lenis |
| Canvas Effects | Native Canvas API (grain overlay, particle systems) |
| Styling | Tailwind CSS (layout + spacing) |
| Icons | Lucide React |

**Zero backend dependencies.** The entire experience runs client-side. The terminal demo uses hardcoded realistic responses, and all animations are GPU-accelerated.

---

## Design System

The visual language merges organic nature aesthetics with cutting-edge technology:

- **Bioluminescent green** (`#4ade80`) on deep forest backgrounds (`#0a110a`)
- **Recursive root system** — a Three.js scene where branches grow upward from seed points, color-lerping from root brown to glowing green tips, reacting to mouse movement
- **Grain overlay** — a pre-rendered noise tile composited at 3.5% opacity for organic texture
- **Custom cursor** — a two-element system (outer ring + inner dot) with lerp-based smoothing and hover/click states
- **Sonar pulses, breathing orbs, and torn-paper reveals** — scroll-triggered animations that make the page feel alive

### Typography

- **DM Sans** — headings and body (weights 300–700)
- **JetBrains Mono** — code, numbers, and eyebrow labels

---

## Performance

The page is engineered for 60fps on modern hardware:

- **IntersectionObserver pausing** — the Three.js root system and particle field stop rendering when scrolled off-screen
- **Pre-rendered grain tile** — noise texture is generated once and blitted, not recalculated per pixel every frame
- **Batched canvas rendering** — particles are grouped by color to minimize canvas state changes
- **Zero-re-render terminal streaming** — response text writes directly to DOM refs, avoiding hundreds of React re-renders per query
- **Event delegation** — the custom cursor uses a single delegated listener instead of per-element hover bindings
- **Code-splitting** — Three.js, GSAP, and Framer Motion are split into parallel-loading chunks; the CTA section loads lazily
- **Lambert over PBR materials** — the root system uses cheaper lighting calculations without visible quality loss
- **Reduced-motion support** — respects `prefers-reduced-motion` for accessibility

### Bundle Sizes (gzipped)

| Chunk | Size |
|-------|------|
| Main app | ~79 KB |
| Three.js | ~131 KB |
| Framer Motion | ~46 KB |
| GSAP | ~28 KB |
| CTA section (lazy) | ~2 KB |

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Fixed nav with scroll-aware background
│   ├── CursorDot.jsx       # Custom two-element cursor
│   ├── GrainOverlay.jsx    # Pre-rendered noise texture
│   └── WaveDivider.jsx     # Organic SVG section dividers
├── sections/
│   ├── Hero.jsx            # 3D root system + headline
│   ├── ImpactNumbers.jsx   # Sonar circle + count-up stats
│   ├── Features.jsx        # Honeycomb hexagon grid
│   ├── AIDemo.jsx          # Interactive climate terminal
│   ├── CaseStudies.jsx     # Torn-paper reveal cards
│   ├── Testimonials.jsx    # Dual marquee rows
│   ├── Pricing.jsx         # Monthly/annual toggle + morphing prices
│   ├── CTASection.jsx      # Particle field + email capture
│   └── Footer.jsx          # SVG world map + link grid
├── three/
│   ├── RootSystem.jsx      # Recursive branch generation + orb
│   ├── ParticleField.jsx   # 1500-particle Perlin-noise field
│   └── WorldMap.jsx        # SVG continents + pulsing location dots
├── hooks/
│   ├── useGSAPContext.ts   # GSAP context lifecycle
│   ├── useLenis.ts         # Smooth scroll + ScrollTrigger sync
│   └── useMousePosition.ts # Normalized mouse tracking
├── App.tsx                 # Section composition + lazy loading
└── index.css               # Design tokens, animations, cursor
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview

# Type-check
npm run typecheck
```

The dev server runs at `http://localhost:5173`.

---

## Deployment

This project is static and deploys to any static host with zero configuration.

### Vercel

```bash
npm run build
```

The `dist/` folder is the deploy target. Import the repository on [Vercel](https://vercel.com) and it will auto-detect Vite — no extra config needed.

### GitHub Pages / Netlify / Cloudflare Pages

Run `npm run build` and serve the `dist/` directory. For GitHub Pages, set the base path in `vite.config.ts` if deploying to a subdirectory.

---

## Browser Support

- Chrome / Edge 90+
- Firefox 88+
- Safari 14+

WebGL is required for the 3D root system. The custom cursor and grain overlay are disabled on touch devices automatically.

---

## License

This is a demonstration project. All data shown in the terminal demo is illustrative.

---

<p align="center">
  <em>The planet needs better intelligence.</em>
</p>
