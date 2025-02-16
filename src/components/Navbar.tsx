// Navbar.tsx
import {
  Box,
  Flex,
  IconButton,
  Text,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";
import { FiAnchor, FiHome, FiMapPin, FiMenu } from "react-icons/fi";
import { MdReply } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { IconType } from "react-icons";

interface LinkItemProps {
  name: string;
  icon: IconType;
  to: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Hem", icon: FiHome, to: "/" },
  { name: "Info", icon: FiMapPin, to: "/info" },
  { name: "Vart", icon: FiMapPin, to: "/vart" },
  { name: "Resa", icon: FiAnchor, to: "/resa" },
  { name: "Rsvp", icon: MdReply, to: "/rvsp" },
];

const NavItem = ({ name, to }: { name: string; to: string }) => {
  return (
    <NavLink to={to} style={{ textDecoration: "none" }}>
      {({ isActive }) => (
        <Box
          px={1}
          py={1}
          borderRadius="md"
          bg={isActive ? "brand.clay" : "transparent"}
          color={isActive ? "black" : "inherit"}
          fontSize={{ base: "xs", sm: "sm", md: "md" }}
          _hover={{
            bg: "brand.clay",
            color: "black",
          }}
        >
          {name}
        </Box>
      )}
    </NavLink>
  );
};

const MobileNavItem = ({ name, icon: Icon, to }: LinkItemProps) => {
  return (
    <NavLink to={to} style={{ textDecoration: "none" }}>
      {({ isActive }) => (
        <Flex
          align="center"
          p={3}
          mx={4}
          borderRadius="lg"
          role="group"
          cursor="pointer"
          bg={isActive ? "brand.clay" : "transparent"}
          color={isActive ? "black" : "inherit"}
          _hover={{
            bg: "brand.clay",
            color: "black",
          }}
        >
          <Icon />
          <Text ml={4}>{name}</Text>
        </Flex>
      )}
    </NavLink>
  );
};

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Flex
        bg="brand.aloe"
        px={4}
        h={16}
        position="fixed"
        w="full"
        top={0}
        zIndex={1000}
        alignItems="center"
        justifyContent="space-between"
      >
        <Text fontSize="xl" fontWeight="bold">
          Svartsö bröllop
        </Text>

        {/* Desktop Navigation */}
        <HStack spacing={4} display={{ base: "none", md: "flex" }}>
          {LinkItems.map((link) => (
            <NavItem key={link.name} name={link.name} to={link.to} />
          ))}
        </HStack>

        {/* Mobile Menu Button */}
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          icon={<FiMenu />}
          aria-label="Open menu"
          variant="outline"
        />
      </Flex>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="brand.aloe">
          <Flex direction="column" pt={20}>
            {LinkItems.map((link) => (
              <MobileNavItem key={link.name} {...link} />
            ))}
          </Flex>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
