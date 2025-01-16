import { Box, Divider, Flex, HStack, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const LinkItems = [
  { name: "Hem", to: "/" },
  { name: "Vår Resa", to: "/tidslinje" },
  { name: "Karta", to: "/karta" },
  { name: "Båtresor", to: "/resa" },
  { name: "RSVP", to: "/rsvp" },
];

const Header = () => {
  return (
    <Box bg="white" w="full" p={4} boxShadow="md">
      <Flex direction="column" align="center">
        <Text 
        fontSize={["4xl", "6xl", "9xl"]}
        fontWeight="bold" 
        fontFamily="adelio"
        userSelect="none" // prevents text selection
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
        fontSize={["3xl", "4xl", "6xl"]}
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
        <HStack spacing={8} mt={4}>
          {LinkItems.map((link) => (
            <NavLink key={link.name} to={link.to} style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <Text
                  fontSize={["2xl", "3xl", "4xl"]}
                  fontFamily={"adelio"}
                  color={isActive ? "brand.clay" : "gray.600"}
                  _hover={{ color: "brand.clay" }}
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
