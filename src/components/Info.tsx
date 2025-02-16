import { 
    Box, 
    Text, 
    VStack, 
    HStack, 
    Card, 
    CardBody, 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Heading,
    AccordionIcon,
    AccordionButton,
    AccordionPanel,
    AccordionItem,
    Accordion,
    UnorderedList,
    ListItem
  } from "@chakra-ui/react";
  import { useState } from "react";
import Schedule from "./Schedule";
  
  interface CardType {
    title: string
    summary: string
    details: string
  }

  interface ContentSection {
    type: 'text' | 'list';
    content?: string;
    items?: {
      text: string;
      subItems?: string[];
    }[];
  }

  const Info = () => {
    const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    const cards = [
      {
        title: "Svartsö",
        summary: "Info om Svartsö",
        details: "Kommer snart... 🔜"
      },
      {
        title: "Boende",
        summary: "Info om boende",
        details: `
        Vill man stanna över på vandrarhemmet (1 eller 2 nätter) så anmäler man det i samband med OSA anmälan.
        
        Vill man stanna över natten så kostar det 200kr per person för 1 natt och 300 kr för 2 nätter.
        
        Man behöver även ta med sig eget lakan, alternativt hyra på plats.
        
        Frukost ingår i priset.
        
        Betalning för boendet sker på plats.`
      },
      {
        title: "Tidsschema",
        summary: "Info om scheman",
        details: ""
      }
    ];

    const cardsRowTwo: CardType[] = [
      {
        title: "Presenter",
        summary: "Hur vi tänker med presenter",
        details: `
                  För oss är det viktigaste att ni kommer! Om man ändå vill ge någon present så tycker vi det vore roligast med något personligt / hemmagjort.

                  Om du inte känner dig kreativt lagd så är dessa några föslag

                  
                  * Restaurang & spa upplevelser
                  * Köksredskap:
                  ** Espresso maskin
                  ** Kitchen aid
                  ** Fina vaser/skålar
                  ** Upplägningsfat`
                      },
    ];
  

    const fridaySchedule = [
      { time: "17:00 - 20:00", description: "Grillning på vandrarhemmet" },
      { time: "20:00 - 21:00", description: "Bastubad" },
      { time: "21:00 - sent", description: "Skönt häng" }
    ];
    
    const saturdaySchedule = [
      { time: "13:00 - 13:45", description: "Bröllopscermoni" },
      { time: "14:30 - 18:00", description: "Mingel med oss!" },
      { time: "18:00 - 21:00", description: "Bröllopsmiddag" },
      { time: "21:00 - sent", description: "Fest!!!" }
    ];
    
    const sundaySchedule = [
      { time: "11:00 - 13:00", description: "Brunch" },
      { time: "13:00 & framåt", description: "Lugnt häng"}
    ];

    // Helper function to process text content
    const processContent = (content: string): ContentSection[] => {
      if (!content) return [];
    
      const sections = content.split('\n\n').filter(Boolean);
      
      return sections.map(section => {
        if (section.includes('*')) {
          const lines = section.split('\n');
          const items: { text: string; subItems?: string[] }[] = [];
          let currentItem: typeof items[0] | null = null;
    
          lines.forEach(line => {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('**')) {
              // This is a sub-item
              const text = trimmedLine.replace('**', '').trim();
              if (currentItem) {
                if (!currentItem.subItems) currentItem.subItems = [];
                currentItem.subItems.push(text);
              }
            } else if (trimmedLine.startsWith('*')) {
              // This is a main item
              const text = trimmedLine.replace('*', '').trim();
              currentItem = { text };
              items.push(currentItem);
            }
          });
    
          return { type: 'list', items };
        }
        return { type: 'text', content: section };
      });
    };

// Modal body component
const ModalBodyContent = ({ content }: { content: string }) => {
  const processedContent = processContent(content);

  return (
    <VStack align="stretch" spacing={4}>
      {processedContent.map((section, index) => {
        if (section.type === 'list') {
          return (
            <Box key={index}>
              <UnorderedList spacing={2} pl={4}>
                {section.items?.map((item, itemIndex) => (
                  <ListItem
                    key={itemIndex}
                    fontSize={{ base: "sm", md: "md" }}
                    color="gray.600"
                  >
                    <Text as="span" fontWeight="bold">
                      {item.text}
                    </Text>
                    {item.subItems && item.subItems.length > 0 && (
                      <UnorderedList pl={4} mt={2} spacing={2}>
                        {item.subItems.map((subItem, subIndex) => (
                          <ListItem
                            key={subIndex}
                            fontSize={{ base: "sm", md: "md" }}
                            color="gray.600"
                          >
                            {subItem}
                          </ListItem>
                        ))}
                      </UnorderedList>
                    )}
                  </ListItem>
                ))}
              </UnorderedList>
            </Box>
          );
        }
        return (
          <Text
            key={index}
            whiteSpace="pre-line"
            color="gray.600"
            fontSize={{ base: "sm", md: "md" }}
          >
            {section.content}
          </Text>
        );
      })}
    </VStack>
  );
};



  
    const handleCardClick = (card: CardType) => {
      setSelectedCard(card);
      onOpen();
    };
  
    return (
      <Box
        bgImage="url('/assets/images/skärdgården.png')"
        bgSize="cover"
        bgPosition="center"
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        overflowX="hidden" // Prevent horizontal scroll
      >
          <VStack 
            spacing={8} 
            w="full"
            maxW="1200px" 
            mx="auto" // Center content
            p={{ base: 4, md: 8 }} // Responsive padding
          >
          {/* Main Info Card */}
          <Card w="full" bg="brand.aloe" boxShadow="xl">
            <CardBody>
              <Heading fontFamily="adelio" color="gray.600" size="lg">Allmänt om bröllopet</Heading>
              <Text mt={4} whiteSpace="pre-line">
                Vigseln kommer att äga rum 13:00 på lördagen den 31 Maj. <br />
                Vi har abonnerat Svartsö Vandrarhem fredag till söndag, vilket innebär att man kan stanna över delar av, eller hela helgen och hänga om man vill det.<br />
                Det går självklart bra att bara komma över dagen också!<br />
              </Text>
            </CardBody>
          </Card>
  
          {/* Clickable Cards */}
          <HStack justifyContent="center" spacing={4} w="full" overflowX="auto" p={2}>
            {cards.map((card, index) => (
              <Card 
                key={index}
                cursor="pointer"
                bg="brand.aloe"
                height="100%"  // This ensures full height
                onClick={() => handleCardClick(card)}
                _hover={{ transform: 'translateY(-5px)', transition: 'transform 0.2s' }}
              >
                <CardBody flex="1">
                  <Heading fontFamily={"adelio"} fontSize={"lg"} color="gray.600" size="md">{card.title}</Heading>
                  <Text
                  _hover={{ color: "brand.clay" }}
                >
                  {card.summary}
                </Text>
                </CardBody>
              </Card>
            ))}
          </HStack>
          <HStack justifyContent="center" spacing={4} w="full" overflowX="auto" p={2}>
            {cardsRowTwo.map((card, index) => (
              <Card 
                key={index}
                
                cursor="pointer"
                bg="brand.aloe"
                onClick={() => handleCardClick(card)}
                _hover={{ transform: 'translateY(-5px)', transition: 'transform 0.2s' }}
              >
                <CardBody>
                  <Heading fontFamily={"adelio"} fontSize={"lg"} color="gray.600" size="md">{card.title}</Heading>
                  <Text
                  _hover={{ color: "brand.clay" }}
                >
                  {card.summary}
                </Text>
                </CardBody>
              </Card>
            ))}
          </HStack>
  
          {/* Modal */}
          <Modal
          isOpen={isOpen}
          onClose={onClose}
          isCentered
        >
          <ModalOverlay />
          <ModalContent 
            bg="brand.aloe" 
            maxW={{ base: "90%", md: "80%" }}
            maxH="80vh"
          >
            <ModalHeader 
              fontFamily="adelio" 
              color="gray.600"
            >
              {selectedCard?.title}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody 
              overflowY="auto" 
              p={4}
            >
              {selectedCard?.title === "Tidsschema" ? (
                <Accordion allowToggle>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                          Fredag
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} color={"gray.600"}>
                      <Schedule events={fridaySchedule} />
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                          Lördag
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} color={"gray.600"}>
                      <Schedule events={saturdaySchedule} />
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                          Söndag
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} color={"gray.600"}>
                      <Schedule events={sundaySchedule} />
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              ) :  (
                <ModalBodyContent content={selectedCard?.details || ''} />
              )}
              </ModalBody>
            </ModalContent>
          </Modal>
        </VStack>
      </Box>
    );
  };
  
  export default Info;