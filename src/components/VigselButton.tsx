import { Button, Icon } from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";

const VigselButton = () => {

  const latitude = 59.4566687;
  const longitude = 18.6867593;
  
  const getMapsUrl = () => {
    return `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=walking`;
  };
  
  return (
    <Button 
      as="a" 
      href={getMapsUrl()} 
      target="_blank" 
      rel="noopener noreferrer"
      mt={6} 
      colorScheme="pink"
      leftIcon={<Icon as={FaMapMarkerAlt} />}
    >
      Visa Vigselplats
    </Button>
  );
};

export default VigselButton;