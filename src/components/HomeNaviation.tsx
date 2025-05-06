import { FaArrowCircleUp, FaCalendar, FaGifts, FaHome } from "react-icons/fa";
import { useLenis } from "../contexts/LenisContext";
import { Box, Button, Flex, Icon } from "@chakra-ui/react";

const HomeNavigation = () => {
    const { lenis } = useLenis();
  
    const sections = [
      { id: 'welcome', label: 'Start', icon: FaArrowCircleUp },
      { id: 'details', label: 'Schema', icon: FaCalendar },
      { id: 'info', label: 'Annan Information', icon: FaHome },
      { id: 'presents', label: 'Annan Information', icon: FaGifts },
    ];
  
  
    
    const handleNavigate = (id: any) => {
      const element = document.getElementById(id);
      if (element && lenis) {
        // Get the header height to use as offset
        const header = document.querySelector('header');
        const offset = header ? header.getBoundingClientRect().height : 0;
        // Scroll to the element with the offset
        lenis.scrollTo(element, {
          offset: -offset, // Negative offset to account for header height
          duration: 1.2, // Smooth animation duration
          immediate: false
        });
      }
    };
    
    return (
      <Box
        data-testid="home-navigation"  // Add this line
        position="fixed"
        bottom="0px"
        left="0"
        width="100%"
        zIndex="10"
        textAlign="center"
        background={"white"}
      >
        <Flex justify="center" gap={0}>
          {sections.map((section) => (
            <Button
              key={section.id}
              onClick={() => handleNavigate(section.id)}
              variant="outline"
              color="gray.800"
              backgroundColor={'brand.clay'}
              _hover={{ bg: 'rgba(255,255,255,0.2)' }}
              borderColor="gray.800"
              borderRadius="0"
              height="50px"
              flex="1"
            >
              <Icon as={section.icon} boxSize="24px" />
            </Button>
          ))}
        </Flex>
      </Box>
    );
  };

  export default HomeNavigation;