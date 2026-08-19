import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGSAPContext() {
  const scope = useRef<gsap.Context | null>(null);

  useEffect(() => {
    return () => {
      scope.current?.revert();
    };
  }, []);

  return scope;
}
