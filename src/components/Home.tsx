import {
  Box,
  Flex,
  Text,
  Container,
  Heading,
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
      <Text fontSize="sm" color="brand.clay" fontWeight="bold">
        {date}
      </Text>
      <Text fontSize="xl" color="brand.aloe" fontWeight="bold" mt={2}>
        {title}
      </Text>
      <Text mt={4} color="brand.aloe">
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

const Home = () => {
  const timelineData = [
    {
      date: "5e Januari 2014",
      title: "Haff",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      imageUrl: "https://picsum.photos/seed/1/600/400", // Using Lorem Picsum for demo images
    },
    {
      date: "February 20xx",
      title: "Mer Haff",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      imageUrl: "https://picsum.photos/seed/2/600/400",
    },
    {
      date: "September 2023",
      title: "Sjukt mycket haff",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      imageUrl: "https://picsum.photos/seed/3/600/400",
    },
    {
      date: "Maj 2025",
      title: "Bröllop",
      description:
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
      imageUrl: "https://picsum.photos/seed/4/600/400",
    },
  ];

  return (
    <Container maxW="container.xl" py={8} px={{ base: 4, lg: 8 }}>
      <Heading fontSize="2xl" mb={12} color="brand.aloe" textAlign="center">
        Mya & Markus Bröllop - Vår resa
      </Heading>

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

export default Home;
