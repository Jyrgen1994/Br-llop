import { Box, Text } from "@chakra-ui/react";

const Home = () => {
  return (
    <Box
      bgImage="url('/src/assets/soet.jpg')"
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
        Vi ska gifta oss!
      </Text>
    </Box>
  );
};

export default Home;
