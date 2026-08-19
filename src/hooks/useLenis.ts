import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      touchMultiplier: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerFn = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after Lenis settles so positions are accurate
    const refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      clearTimeout(refreshTimeout);
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
    };
  }, []);
}
