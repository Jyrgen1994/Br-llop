import { Box, Button, FormControl, FormLabel, Input, VStack , Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import RSVP from "./RSVP";

interface AuthProps {
}

const Authentication: React.FC<AuthProps> = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const toast = useToast(); 
  const url = import.meta.env.VITE_BACKEND_URL;

  const validatePassword = async (password: string) : Promise<boolean> => {
    
    try {
      const response = await fetch(`${url}/api/validate/password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      const data = await response.json()
      if (!response.ok || response.status === 401) {
        throw new Error(`Authentication failed: ${data.message}`);
      }
      return true
    } catch (error) {
      console.error('Password validation error:', error);
      setIsAuthenticated(false)
      toast({
        title: "Inloggnign misslyckades",
        description: "Felaktig inbjudningskod. Försök igen.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
        variant: "solid",
      });
      return false
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await validatePassword(password);
    if (isValid) {
      setIsAuthenticated(true)
    }
  };
  
  if (isAuthenticated) {
    //isAuthenticated={true} onRSVPSubmit={handleRSVPSubmit} 
    return <RSVP />;
  }

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      width="100%"
      flex="1"
    >
      <form onSubmit={handleSubmit}>
        <VStack 
          spacing={4} 
          align="stretch" 
          width="100%"
        >
          <FormControl isRequired>
            <FormLabel 
              textAlign="center"
              fontWeight="bold" 
              fontFamily="adelio"
              userSelect="none"
              fontSize={["4xl", "5xl", "6xl"]}
              color="brand.clay">
                Inbjudningkod
            </FormLabel>
            <Input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              size="lg"
              height="60px"
              fontSize="xl"
              width="100%"
              maxW="400px"
              mx="auto"
            />
          </FormControl>
          <Button
            width="100%"
            height={"fit-content"}
            size="lg"
            textColor={"gray.800"}
            backgroundColor={"brand.clay"}
            borderColor={"brand.babyBlue"}
            borderRadius={"25px"}
            onClick={handleSubmit}
          >
            <Text fontSize={["4xl", "5xl", "6xl"]} fontFamily={"adelio"}>
                Logga in
            </Text>
          </Button>
        </VStack>
      </form>
    </Box>
);

};

export default Authentication;
