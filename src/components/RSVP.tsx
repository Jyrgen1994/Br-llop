import { Box,  Text } from "@chakra-ui/react";

const Rsvp = () => {
  return (
    <Box
      bgSize="cover"
      bgPosition="center"
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Text 
        fontSize="9xl" 
        color="white" 
        fontWeight="bold" 
        textAlign="center" 
        fontFamily="adelio"
      >
        Coming soon...
      </Text>
    </Box>
  );
};

export default Rsvp;
