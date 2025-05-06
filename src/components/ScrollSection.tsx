// src/components/Section.tsx
import React, { useRef } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { useViewportHeight } from '../hooks/useViewportHeight';
import { motion, useTransform, useScroll } from 'framer-motion';

interface SectionProps extends BoxProps {
  id: string;
  bgImage?: string;
  children: React.ReactNode;
}

const ScrollSection: React.FC<SectionProps> = ({ id, bgImage, children, ...rest }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportHeight = useViewportHeight();
  
  // Use framer-motion's useScroll to track this section's scroll progress
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Transform values based on scroll progress
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [3, 0, -3]);

  return (
    <Box
      ref={sectionRef}
      id={id}
      bgSize="cover"
      bgPosition="center"
      height={viewportHeight}
      minHeight={viewportHeight}
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      marginBottom="0"
      paddingTop="0"
      paddingBottom="0"
      {...rest}
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          scale,
          opacity,
          rotateX,
          transition: "transform 0.1s ease-out, opacity 0.1s ease-out"
        }}
      >
        {children}
      </motion.div>
    </Box>
  );
};

export default ScrollSection;