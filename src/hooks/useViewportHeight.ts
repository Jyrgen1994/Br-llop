// src/hooks/useViewportHeight.ts
import { useState, useEffect } from 'react';

export const useViewportHeight = () => {
  const [remainingHeight, setRemainingHeight] = useState('100vh');

  useEffect(() => {
    // Delay the initial calculation to ensure components are rendered
    const initialTimeout = setTimeout(() => {
      calculateHeight();
    }, 100);

    const calculateHeight = () => {
      const header = document.querySelector('header');
      // Try multiple potential selectors for the navigation
      const navigation = 
        document.querySelector('homenavigation') || 
        document.querySelector('[data-testid="home-navigation"]') ||
        document.querySelector('nav') ||
        // Look for the specific structure in your component
        document.querySelector('div[style*="position: fixed"][style*="bottom: 5px"]');
      
      let headerHeight = 0;
      let navigationHeight = 0;
      
      if (header) {
        headerHeight = header.getBoundingClientRect().height;
      }
      
      if (navigation) {
        navigationHeight = navigation.getBoundingClientRect().height;
      } else {
        console.log('Navigation element not found'); // Debug log
      }
      
      setRemainingHeight(`calc(100vh - ${headerHeight + navigationHeight}px)`);
    };
    
    // Set up resize listener
    window.addEventListener('resize', calculateHeight);
    
    // Create a MutationObserver to detect DOM changes
    const observer = new MutationObserver(() => {
      calculateHeight();
    });
    
    // Observe the entire body for changes
    observer.observe(document.body, { 
      attributes: true, 
      childList: true, 
      subtree: true 
    });
    
    return () => {
      clearTimeout(initialTimeout);
      window.removeEventListener('resize', calculateHeight);
      observer.disconnect();
    };
  }, []);

  return remainingHeight;
};