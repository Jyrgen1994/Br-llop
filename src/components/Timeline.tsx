import {
  Box,
  Flex,
  Text,
  Container,
  Image,
  VStack,
} from "@chakra-ui/react";

interface timeLineProps {
  date: string;
  title: string;
  description: string;
  imageUrl: string;
  isImageLeft: boolean;
}

const TimelineItem = ({
  date,
  title,
  description,
  imageUrl,
  isImageLeft,
}: timeLineProps) => {
  console.log(` test ${isImageLeft}`);
  const textContent = (
    <Box flex={1} p={6}>
      <Text fontSize="2xl" color="brand.clay" fontWeight="bold" fontFamily={"adelio"}>
        {date}
      </Text>
      <Text fontSize="5xl" color="brand.aloe" fontWeight="bold" fontFamily={"adelio"} mt={2}>
        {title}
      </Text>
      <Text fontSize="3xl" mt={4} color="brand.aloe" fontFamily={"adelio"} >
        {description}
      </Text>
    </Box>
  );

  const imageContent = (
    <Box
      flex={1}
      h="300px"
      position="relative"
      overflow="hidden"
      borderRadius="md"
    >
      <Image src={imageUrl} alt={title} objectFit="cover" w="100%" h="100%" />
    </Box>
  );

  return (
    <Box position="relative">
      {/* Vertical connecting line */}
      <Box
        position="absolute"
        left="50%"
        top="-32px" // Adjust this value to connect with previous item
        height="calc(100% + 64px)" // Extends line above and below the content
        width="2px"
        bg="gray.600"
        transform="translateX(-50%)"
        display={{ base: "none", lg: "block" }}
      />

      {/* Circle connector */}
      <Box
        position="absolute"
        left="50%"
        top="50%"
        transform="translate(-50%, -50%)"
        width="16px"
        height="16px"
        borderRadius="full"
        bg="brand.clay"
        border="2px solid"
        borderColor="gray.600"
        zIndex={1}
        display={{ base: "none", lg: "block" }}
      />

      <Flex
        mb={16}
        gap={8}
        align="center"
        w="full"
        position="relative"
        zIndex={0}
      >
        {isImageLeft ? imageContent : textContent}
        {isImageLeft ? textContent : imageContent}
      </Flex>
    </Box>
  );
};

const Timeline = () => {
  const timelineData = [
    {
      date: "Januari 2014",
      title: "Vi blir tillsammans",
      description:
        "Vi blev officiellt tillsammans den 5e Januari 2014!",
      imageUrl: "https://picsum.photos/seed/1/600/400", // Using Lorem Picsum for demo images
    },
    {
      date: "Mars 2020",
      title: "Gösta",
      description:
        "Vi hämtar hem vår lilla gösta",
      imageUrl: "/src/assets/soet.jpg",
    },
    {
      date: "September 2023",
      title: "Förlovning",
      description:
        "Vi förlovar oss!",
      imageUrl: "https://picsum.photos/seed/3/600/400",
    },
    {
      date: "Maj 2025",
      title: "Bröllop",
      description:
        "Vi giter oss!",
      imageUrl: "https://picsum.photos/seed/4/600/400",
    },
  ];

  return (
    <Container maxW="container.xl" py={8} px={{ base: 4, lg: 8 }}>
      <Box
        maxH="80vh"
        overflowY="auto"
        px={{ base: 2, lg: 4 }}
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "gray.300",
            borderRadius: "24px",
          },
        }}
      >
        <VStack align="stretch" spacing={0} width="100%">
          {timelineData.map((item, index) => (
            <TimelineItem
              key={index}
              date={item.date}
              title={item.title}
              description={item.description}
              imageUrl={item.imageUrl}
              isImageLeft={index % 2 === 0}
            />
          ))}
        </VStack>
      </Box>
    </Container>
  );
};

export default Timeline;
