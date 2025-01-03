// App.tsx

import { ReactText } from "react";
import {
  Box,
  BoxProps,
  Flex,
  useDisclosure,
  FlexProps,
  Icon,
  Drawer,
  DrawerContent,
  IconButton,
  Text,
} from "@chakra-ui/react";
import {
  FiHome,
  FiChevronsLeft,
  FiChevronsRight,
  FiMenu,
  FiMapPin,
  FiAnchor,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { NavLink } from "react-router-dom";

interface LinkItemProps {
  name: string;
  icon: IconType;
  to: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Hem", icon: FiHome, to: "/" },
  { name: "Vart", icon: FiMapPin, to: "/vart" },
  { name: "Resa", icon: FiAnchor, to: "/resa" },
];

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  to: string;
  isOpen: boolean;
}
const NavItem = ({ icon, children, to, isOpen, ...rest }: NavItemProps) => {
  return (
    <NavLink to={to} style={{ textDecoration: "none" }}>
      {({ isActive }) => (
        <Flex
          align="center"
          p="4"
          mx={isOpen ? "4" : "0"}
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "brand.clay",
            color: "black",
          }}
          bg={isActive ? "brand.clay" : "transparent"}
          color={isActive ? "black" : "inherit"}
          {...rest}
        >
          {icon && (
            <Icon
              mr={isOpen ? "4" : "0"}
              fontSize="16"
              _groupHover={{
                color: "brand.pink",
              }}
              as={icon}
            />
          )}
          {isOpen && children}
        </Flex>
      )}
    </NavLink>
  );
};

interface SideBarProps extends BoxProps {
  toggleSidebar: () => void;
  isOpen: boolean;
}

const SidebarContent = ({ toggleSidebar, isOpen, ...rest }: SideBarProps) => {
  return (
    <Box
      bg={"brand.aloe"}
      w={{ base: "full", md: isOpen ? "300px" : "150px" }}
      pos="fixed"
      h="full"
      transition="width 0.3s ease"
      {...rest}
    >
      <Flex
        h="20"
        alignItems={"center"}
        justifyContent={"space-between"}
        px={isOpen ? "8" : "4"}
      >
        {isOpen ? (
          <Text fontSize="xl" fontWeight="bold" mt={2}>
            Svartsö bröllop
          </Text>
        ) : (
          <Icon as={FiMenu} fontSize="24px" />
        )}
        <IconButton
          display={{ base: "none", md: "flex" }}
          onClick={toggleSidebar}
          icon={isOpen ? <FiChevronsLeft /> : <FiChevronsRight />}
          variant="outline"
          aria-label="toggle sidebar"
        />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} to={link.to} isOpen={isOpen}>
          {isOpen ? link.name : ""}
        </NavItem>
      ))}
    </Box>
  );
};

interface simpleSidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (arg0: boolean) => void;
}

export default function SimpleSidebar({
  isSidebarOpen,
  setIsSidebarOpen,
}: simpleSidebarProps) {
  const { isOpen, onClose } = useDisclosure();
  //const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box minH="100vh" bg={"brand.aloe"}>
      <SidebarContent
        toggleSidebar={toggleSidebar}
        isOpen={isSidebarOpen}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent toggleSidebar={toggleSidebar} isOpen={true} />
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
