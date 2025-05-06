// src/contexts/LenisContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';

interface LenisContextType {
  lenis: Lenis | null;
  scrollProgress?: number;
}

const LenisContext = createContext<LenisContextType>({ lenis: null });

export const useLenis = () => useContext(LenisContext);

interface LenisProviderProps {
  children: React.ReactNode;
}

export const LenisProvider: React.FC<LenisProviderProps> = ({ children }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Create Lenis instance with optimized configuration
    const lenisInstance = new Lenis({
      duration: 1.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
      wheelMultiplier: 1.2, // Slightly increased for better responsiveness
    });

    // Track scroll progress
    lenisInstance.on('scroll', ({ scroll, limit }: any) => {
      const progress = scroll / limit;
      setScrollProgress(progress);
    });

    setLenis(lenisInstance);

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);

    // Clean up on unmount
    return () => {
      lenisInstance.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis, scrollProgress }}>
      {children}
    </LenisContext.Provider>
  );
};