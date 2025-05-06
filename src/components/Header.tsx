import { Box, Divider, Flex, HStack, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const LinkItems = [
  { name: "Hem", to: "/" },
  { name: "Vår Resa", to: "/tidslinje" },
  { name: "Karta", to: "/karta" },
  { name: "Båtresor", to: "/resa" },
];

const Header = () => {
  return (
    <Box 
      as="header"
      position="fixed" // Make the header fixed
      top={0}
      left={0}
      right={0}
      bg="white" 
      p={4} 
      boxShadow="md"
      zIndex={1000} // Ensure header stays above other content
      width="100%"
      ref={(node: any) => {
        if (node) {
          // Dispatch a resize event after the header is rendered
          // to ensure our useViewportHeight hook gets the correct height
          window.dispatchEvent(new Event('resize'));
        }
      }}
    >
      <Flex direction="column" align="center">
        <Text
          fontSize={["4xl", "5xl", "6xl"]}
          fontWeight="bold"
          fontFamily="adelio"
          userSelect="none"
          color="brand.clay"
        >
          Markus & Mya
        </Text>
        <HStack
          spacing="4"
          align="center"
          w="full"
          maxW="600px"
          my={4}
        >
          <Divider
            borderColor="brand.clay"
            borderWidth="1px"
            flex="1"
            variant="solid"
          />
          <Text
            fontSize={["3xl", "4xl", "5xl"]}
            fontWeight="bold"
            fontFamily="adelio"
            userSelect="none"
            color="brand.clay"
          >
            2025-05-31
          </Text>
          <Divider
            borderColor="brand.clay"
            borderWidth="1px"
            flex="1"
            variant="solid"
          />
        </HStack>
        <HStack 
          spacing={[2, 3, 4]} // Responsive spacing
          mt={4}
          overflowX={["auto", "auto", "visible"]} // Allow scrolling on mobile
          pb={2} // Add padding at bottom for scrollbar
          width="100%"
          justifyContent="center"
          flexWrap={["nowrap", "nowrap", "wrap"]} // Allow wrapping on larger screens if needed
        >
          {LinkItems.map((link) => (
            <NavLink key={link.name} to={link.to} style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <Text
                  fontSize={["lg", "xl", "2xl", "3xl"]} // More responsive font sizes
                  fontFamily={"adelio"}
                  color={isActive ? "brand.clay" : "gray.600"}
                  _hover={{ color: "brand.clay" }}
                  whiteSpace="nowrap" // Prevent text wrapping
                  px={[1, 2]} // Add some horizontal padding
                >
                  {link.name}
                </Text>
              )}
            </NavLink>
          ))}
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;