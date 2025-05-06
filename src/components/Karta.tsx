import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface GenerateMapUrlProps {
  lat: number;
  lng: number;
  zoom: number;
}

const generateMapUrl = ({ lat, lng, zoom = 14 }: GenerateMapUrlProps) => {
  const key = import.meta.env.VITE_GOOGLE_API_KEY;
  return `https://www.google.com/maps/embed/v1/place?key=${key}&q=${lat},${lng}&zoom=${zoom}`;
};

const Karta = () => {
  const mapUrl = generateMapUrl({
    lat: 59.45771853855829,
    lng: 18.677500879954522,
    zoom: 14,
  });
  
  // Get the header height
  const [headerHeight, setHeaderHeight] = useState("0px");
  
  useEffect(() => {
    const updateHeaderHeight = () => {
      const headerElement = document.querySelector('header');
      if (headerElement) {
        const height = `${headerElement.offsetHeight}px`;
        setHeaderHeight(height);
      }
    };
    
    // Initial measurement
    updateHeaderHeight();
    
    // Update on resize
    window.addEventListener('resize', updateHeaderHeight);
    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, []);

  return (
    <Box
      position="fixed"
      top={headerHeight} // Use dynamic header height instead of fixed 60px
      left={0}
      right={0}
      bottom={0}
      p={5}
      zIndex={0}
    >
      <iframe
        title="Google map test"
        width="100%"
        height="100%"
        style={{
          border: 0,
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
        src={mapUrl}
        allowFullScreen
      />
    </Box>
  );
};

export default Karta;