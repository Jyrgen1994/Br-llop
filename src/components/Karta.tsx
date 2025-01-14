import { Flex } from "@chakra-ui/react";

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

  return (
    <Flex 
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      p={5}
    >
      <iframe
        title="Google map test"
        width="100%"
        height="100%"
        style={{ 
          border: 0,
          borderRadius: '8px', // Optional: adds rounded corners
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' // Optional: adds subtle shadow
        }}
        src={mapUrl}
        allowFullScreen
      />
    </Flex>
  );
};

export default Karta;
