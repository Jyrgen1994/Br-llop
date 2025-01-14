import { Box, Text } from "@chakra-ui/react";

const Hero = () => {
  return (
    <Box
      bgImage="url('/path/to/your/image.jpg')"
      bgSize="cover"
      bgPosition="center"
      height="400px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Text fontSize="4xl" color="white" fontWeight="bold" textAlign="center">
        We're Getting Married!
      </Text>
    </Box>
  );
};

export default Hero;
