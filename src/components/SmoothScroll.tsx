// src/components/SmoothScroll.tsx
import React from 'react';
import { Box } from '@chakra-ui/react';
import { LenisProvider } from '../contexts/LenisContext';

interface SmoothScrollProps {
  children: React.ReactNode;
  backgroundImage?: string; // Add prop for background image
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ 
  children, 
  backgroundImage = "/assets/images/costa_1.JPG" // Default background
}) => {
  return (
    <LenisProvider>
      {/* Fixed background */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgImage={`url('${backgroundImage}')`}
        bgSize="cover"
        bgPosition="center"
        bgAttachment="fixed"
        zIndex={0}
      />
      
      {/* Scrollable content container */}
      <Box
        as="main"
        width="100%"
        minHeight="100vh"
        position="relative"
        overflow="hidden"
        marginBottom={"50px"}
        zIndex={1}
      >
        {children}
      </Box>
    </LenisProvider>
  );
};

export default SmoothScroll;