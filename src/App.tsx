import { Suspense, lazy } from 'react';
import { useLenis } from './hooks/useLenis';
import Navbar from './components/Navbar';
import CursorDot from './components/CursorDot';
import GrainOverlay from './components/GrainOverlay';
import WaveDivider from './components/WaveDivider';
import Hero from './sections/Hero';
import ImpactNumbers from './sections/ImpactNumbers';
import Features from './sections/Features';
import AIDemo from './sections/AIDemo';
import CaseStudies from './sections/CaseStudies';
import Testimonials from './sections/Testimonials';
import Pricing from './sections/Pricing';
import Footer from './sections/Footer';

const CTASection = lazy(() => import('./sections/CTASection'));

function SectionFallback() {
  return <div style={{ height: '100vh', background: 'var(--bg-primary)' }} />;
}

function App() {
  useLenis();

  return (
    <>
      <GrainOverlay />
      <CursorDot />
      <Navbar />

      <main>
        <Hero />
        <WaveDivider fill="#111a11" />
        <ImpactNumbers />
        <WaveDivider fill="#0a110a" />
        <Features />
        <WaveDivider fill="#111a11" />
        <AIDemo />
        <WaveDivider fill="#0a110a" />
        <CaseStudies />
        <WaveDivider fill="#111a11" />
        <Testimonials />
        <WaveDivider fill="#0a110a" />
        <Pricing />
        <WaveDivider fill="#0a110a" />
        <Suspense fallback={<SectionFallback />}>
          <CTASection />
        </Suspense>
        <Footer />
      </main>
    </>
  );
}

export default App;
