import { Flex, Button, VStack, Link, Text, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Resa = () => {
  const baseUrl =
    "https://waxholmsbolaget.se/?destPlaceId=9091001000000150&origPlaceId=9091001000000301&destName=Norra+Svarts%C3%B6+%28Svarts%C3%B6%29&origName=Str%C3%B6mkajen+%28Stockholm%29&journeyFocusTarget=OUTBOUND";
  
  const dates = [
    { label: "May 30, 2025", date: "2025-05-30" },
    { label: "May 31, 2025", date: "2025-05-31" },
    { label: "June 1, 2025", date: "2025-06-01" },
  ];

  // Get the header height
  const [headerHeight, setHeaderHeight] = useState("0px");
  
  useEffect(() => {
    const updateHeaderHeight = () => {
      const headerElement = document.querySelector('header');
      if (headerElement) {
        const height = `${headerElement.offsetHeight}px`;
        setHeaderHeight(height);
      }
    };
    
    // Initial measurement
    updateHeaderHeight();
    
    // Update on resize
    window.addEventListener('resize', updateHeaderHeight);
    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, []);

  return (
    <Box
      position="fixed"
      top={headerHeight} // Use dynamic header height instead of fixed 60px
      left={0}
      right={0}
      bottom={0}
      p={5}
      zIndex={0}
    >
      <Flex
        flex="1"
        height="100%"
        alignItems="center" // Center items vertically
        justifyContent="center" // Center items horizontally
        alignContent="center"
      >
        <VStack spacing={4} align="center" width="100%">
          {dates.map((dateObj, index) => (
            <Link
              key={index}
              href={`${baseUrl}&outboundDate=${dateObj.date}`}
              isExternal
              _hover={{ textDecoration: "none" }}
              borderRadius="25px"
              width="25%"
              minW="fit-content"
            >
              <Button
                width="100%"
                size="lg"
                textColor="gray.800"
                backgroundColor="brand.clay"
                borderColor="brand.babyBlue"
                borderRadius="25px"
              >
                <Text fontSize="2xl" fontFamily="adelio">
                  Båtschema för{" "}
                  {dateObj.label.replace("May", "Maj").replace("June", "Juni")}
                </Text>
              </Button>
            </Link>
          ))}
        </VStack>
      </Flex>
    </Box>
  );
};

export default Resa;