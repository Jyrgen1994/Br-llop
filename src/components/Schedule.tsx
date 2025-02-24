import { Box, Circle, Flex, VStack, Text } from "@chakra-ui/react";

interface EventType {
  time: string;
  description: string;
}

interface ScheduleProps {
  events: EventType[];
}

const Schedule: React.FC<ScheduleProps> = ({ events }) => (
  <Box position="relative" pl={0} ml={4}>
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
        <Flex key={index} align="center" position="relative">
          {/* Timeline circle */}
          <Circle
            size="12px"
            bg="brand.clay"
            position="absolute"
            left="0"
          />
          
          {/* Content */}
          <Box ml={4}>
            <Text fontWeight="bold" color="gray.600">
              {event.time}
            </Text>
            <Text color="gray.600">
              {event.description}
            </Text>
          </Box>
        </Flex>
      ))}
    </VStack>
  </Box>
);

export default Schedule;