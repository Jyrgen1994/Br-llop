import React from 'react';
import { Flex } from '@chakra-ui/react';

interface GenerateMapUrlProps {
    lat: number
    lng: number
    zoom: number
}

const generateMapUrl = ({lat, lng, zoom=14} : GenerateMapUrlProps) => {
    const key = import.meta.env.VITE_GOOGLE_API_KEY
    return `https://www.google.com/maps/embed/v1/place?key=${key}&q=${lat},${lng}&zoom=${zoom}`;
}


const Vart = () => {
  const mapUrl = generateMapUrl({lat: 59.45771853855829, lng: 18.677500879954522, zoom: 14})
  return (
    <Flex flex={1} p={5} height="100%" flexDirection="column">
        <iframe
            title='Google map test'
            width={"100%"}
            height={"100%"}
            style={{ border: 0}}
            src={mapUrl}
            allowFullScreen
        />
    </Flex>
  );
};

export default Vart;
