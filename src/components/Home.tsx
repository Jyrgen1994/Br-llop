// src/components/Home.tsx
import { Box, Text, Grid, GridItem } from "@chakra-ui/react";
import SmoothScroll from './SmoothScroll';
import ScrollSection from './ScrollSection';
import VigselButton from './VigselButton';
import Schedule from './Schedule';
import HomeNavigation from "./HomeNaviation";

const Home = () => {
  const saturdaySchedule = [
    { time: "08:00 - 10:00", description: "Frukost" },
    { time: "~11:00 - 13:00", description: "Lättare lunch" },
    { time: "14:00 - 14:30", description: "Vigsel" },
    { time: "14:30 - 15:00", description: "Gruppfotografering" },
    { time: "15:00 - 17:00", description: "Brudskål + mingel" },
    { time: "17:00 ~ 20:00", description: "Bröllopsmiddag" },
    { time: "~20:00 - sent", description: "Fest!" },
  ];

  return (
    <SmoothScroll>
      <HomeNavigation />
      
      {/* First section - Welcome */}
      <ScrollSection
        id="welcome"
      >
        <Grid
          templateRows="1fr auto 1fr"
          height="100%"
          width="100%"
          px={4}
          gap={[4, 6, 8]}
        >
          {/* Top area with title */}
          <GridItem alignSelf="end" textAlign="center">
            <Text
              fontSize={["4xl", "6xl"]}
              color="white"
              fontWeight="bold"
              fontFamily="adelio"
              lineHeight={1.1}
            >
              Vi ska gifta oss!
            </Text>
          </GridItem>
          
          {/* Center area with info box */}
          <GridItem alignSelf="center" justifySelf="center">
            <Box
              bg="rgba(0, 0, 0, 0.7)"
              p={[4, 6, 8]}
              borderRadius="md"
              maxWidth={["90%", "80%", "600px"]}
              width="100%"
              textAlign="center"
              color="white"
              mx="auto" // Center horizontally
            >
              <Text fontSize={["2xl", "2xl", "3xl"]} mb={4}>Bra att ha information</Text>
              <Text fontSize={["xl", "xl", "2xl"]} mb={4}>Vigsel</Text>
              <Text fontSize="lg" mb={2}>Tid: 14:00</Text>
              <Text fontSize="lg" mb={2}>Plats: Fårhagen vid landet. (10-15 min promenad)</Text>
              <Text fontSize="lg" mb={2}>Klädkod: Dina finaste sommarkläder!</Text>
              <VigselButton />
            </Box>
          </GridItem>
          
          {/* Bottom area (empty for spacing) */}
          <GridItem />
        </Grid>
      </ScrollSection>
      
      {/* Second section - Details */}
      <ScrollSection
        id="details"
      >
        <Box
          bg="rgba(0, 0, 0, 0.7)"
          p={[4, 6, 8]}
          borderRadius="md"
          height="auto"  // Changed from 80% to auto
          maxHeight="80%" // Added maxHeight instead
          maxWidth={["90%", "80%", "600px"]}
          width="80vw"
          textAlign="center"
          color="white"
          mx="auto" // Center horizontally"}
          overflow="auto" // Add scrolling if content is still too large
        >
          <Text fontSize={["1xl", "2xl", "3xl"]} fontWeight={"bold"} mb={4}>Schema - Bröllopsdag</Text>
          <Schedule events={saturdaySchedule} />
        </Box>
      </ScrollSection>
      
      {/* Third section - More Info */}
      <ScrollSection
        id="info"
      >
        <Box
          bg="rgba(0, 0, 0, 0.7)"
          p={[4, 6, 8]}
          borderRadius="md"
          height="auto"  // Changed from 80% to auto
          maxHeight="80%" // Added maxHeight instead
          maxWidth={["90%", "80%", "600px"]}
          width="80vw"
          textAlign="center"
          color="white"
          mx="auto" // Center horizontally"}
          overflow="auto" // Add scrolling if content is still too large
          zIndex={4} // Add higher zIndex to ensure content is visible
          position="relative" // Ensure proper positioning
        >
          <Text fontSize="3xl" mb={4}>Boende</Text>
          <Text fontSize="xs" mb={2}>1 natt = 200 kr , 2 nätter = 300kr</Text>
          <Text fontSize="xs" mb={2}>Betalning sker på plats (swish)</Text>
          <Text fontSize="xs" mb={2}>Ta med eget lakan. Finns att hyra för 180kr</Text>
          <Text fontSize="xs" mb={2}>Frukost ingår (Vegansk frukost finns)</Text>

        </Box>
      </ScrollSection>
      {/* Fourth section - More Info */}
      <ScrollSection
        id="presents"
      >
        <Box
          bg="rgba(0, 0, 0, 0.7)"
          p={[4, 6, 8]}
          borderRadius="md"
          height="auto"  // Changed from 80% to auto
          maxHeight="80%" // Added maxHeight instead
          maxWidth={["90%", "80%", "600px"]}
          width="80vw"
          textAlign="center"
          color="white"
          mx="auto" // Center horizontally"}
          overflow="auto" // Add scrolling if content is still too large
          zIndex={4} // Add higher zIndex to ensure content is visible
          position="relative" // Ensure proper positioning
        >
          <Text fontSize="3xl" mb={4}>🎁Presenter🎁</Text>
          <Text fontSize="xs" mb={2} align={"left"}>För oss är det viktigaste att ni kommer! Om man ändå vill ge någon present så tycker vi det vore roligast med något personligt / hemmagjort.</Text>
          <Text fontSize="xs" mb={2} align={"left"}>Om du inte känner dig kreativt lagd så är dessa några föslag</Text>
          <Text fontSize="l" mb={2} align={"left"} fontWeight={"bold"}>• Restaurang & spa upplevelser</Text>
          <Text fontSize="l" mb={2} align={"left"} fontWeight={"bold"}>• Köksredskap:</Text>
          <Text fontSize="xs" mb={2} align={"left"} pl={6}>• Espresso maskin</Text>
          <Text fontSize="xs" mb={2} align={"left"} pl={6}>• Kitchen aid</Text>
          <Text fontSize="xs" mb={2} align={"left"} pl={6}>• Fina vaser/skålar</Text>
          <Text fontSize="xs" mb={2} align={"left"} pl={6}>• Uppläggningsfat</Text>

        </Box>
      </ScrollSection>
      
    </SmoothScroll>
  );
};

export default Home;