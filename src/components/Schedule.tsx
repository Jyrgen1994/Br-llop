import { Box, Circle, Flex, VStack, Text } from "@chakra-ui/react";

interface EventType {
  time: string;
  description: string;
}

interface ScheduleProps {
  events: EventType[];
}

const Schedule: React.FC<ScheduleProps> = ({ events }) => (
  <Box 
    position="relative" 
    pl={0} 
    ml={4} 
    height="100%" // Add this to fill the height of the parent
    display="flex" // Add flex display
    flexDirection="column" // Stack children vertically
  >
    {/* Vertical line */}
    <Box
      position="absolute"
      left="0"
      top="0"
      bottom="0"
      width="12px"
      bg="brand.sage"
      borderRadius={"5px"}
      opacity={0.3}
    />
    <VStack align="stretch" spacing={4}>
      {events.map((event: EventType, index: number) => (
        <Flex key={index} align="flex-start" position="relative">
          {/* Timeline circle */}
          <Circle
            size="12px"
            bg="brand.clay"
            position="absolute"
            left="0"
          />
          {/* Content */}
          <Box ml={4} width="100%">
            <Text 
              fontWeight="bold" 
              color="brand.navy" 
              textAlign="left"
              overflowWrap="break-word"
              wordBreak="break-word"
            >
              {event.time}
            </Text>
            <Text 
              color="brand.navy" 
              textAlign="left"
              overflowWrap="break-word"
              wordBreak="break-word"
            >
              {event.description}
            </Text>
          </Box>
        </Flex>
      ))}
    </VStack>
  </Box>
);

export default Schedule;