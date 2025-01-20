import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  VStack,
  Checkbox,
  Text,
  useToast,
  HStack,
} from "@chakra-ui/react";


interface formDataType {
  Kommer: boolean
  Namn: string
  Email: string
  Telefon: string
  allergier: string
  annanDiet: string
  dietaryRestrictions: Array<string>
  selectedDates: Array<string>
}

interface fieldErrorType{
  Namn: string
  Email: string
  Telefon: string
}

const DayBox = ({ 
  formData, 
  setFormData, 
  day 
}: { 
  formData: formDataType;
  setFormData: React.Dispatch<React.SetStateAction<formDataType>>;
  day: string;
}) => {
  const isSelected = formData.selectedDates.includes(day);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    setFormData(prevData => ({
      ...prevData,
      selectedDates: isSelected
        ? prevData.selectedDates.filter(d => d !== day)
        : [...prevData.selectedDates, day]
    }));
  };

  return (
    <Box
      as="button"
      px={6}
      py={2}
      borderRadius="md"
      border="2px solid"
      bg={isSelected ? 'brand.clay' : 'brand.navy'}
      color={isSelected ? 'white' : 'brand.clay'}
      cursor="pointer"
      onClick={handleClick}
      _hover={{
        bg: isSelected ? 'brand.clay' : 'brand.clay',
        color: 'white',
      }}
      transition="all 0.2s"
      fontFamily="adelio"
      fontSize={["md", "lg", "xl"]}
    >
      {day}
    </Box>
  );
};

const Rsvp = () => {
  //TODO: Vill du sova över => om jag vilka dagar (välj mellan 3 datum)
  const toast = useToast();
  const [isAttending, setIsAttending] = useState(false);
  const [isStayingOverNight, setIsStayingOverNight] = useState(false);
  const [formData, setFormData] = useState<formDataType>({
    Kommer: false,
    Namn: "",
    Email: "",
    Telefon: "",
    allergier: "",
    annanDiet: "",
    dietaryRestrictions: [],
    selectedDates: [],
  });

  
  const dietRestrictions = ["Vegetarian", "Vegan", "Glutenfri", "Latkosfri", "Allergier", "Annat"]
  const freeTextFields = ["Email", "Telefon"]

  const [errors, setErrors] = useState<fieldErrorType>({
    Namn: "",
    Email: "",
    Telefon: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } : {name: string, value: string} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof fieldErrorType]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const sendToMailApi = async (formData: formDataType) => {
    const url = import.meta.env.VITE_BACKEND_URL;
    try {
      const requestBody = {
        to: "svartsobrolloprsvp@gmail.com",
        subject: `RSVP från ${formData.Namn}`,
        formData: {
          fields: Object.entries(formData).reduce((acc, [key, value]) => ({
            ...acc,
            [key]: value
          }), {})
        }
      };
      const response = await fetch(`${url}/api/email/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      //const data = await response.json();
      //console.log('Success:', data);
      return true;
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  };

  const validateForm = () => {
    const newErrors : fieldErrorType = {
      Namn: "",
      Email: "",
      Telefon: ""
    };

    if (isAttending) {
      if (!formData.Namn) newErrors.Namn = "Namn är obligatoriskt";
      if (!formData.Email) newErrors.Email = "Email är obligatoriskt";
      if (formData.Email) {
        const emailRegex = /^[A-Za-z0-9._+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        const isValid = emailRegex.test(formData.Email)
        if (!isValid) {
          newErrors.Email = "Felaktigt format på mail"
        }
      }

      if (!formData.Telefon) newErrors.Telefon = "Telefonnummer är obligatoriskt";
      if (formData.Telefon) {
        const normalizedPhoneNumber = formData.Telefon.replace(/^\+46/, '0');
        const phoneRegex = /^\d{10}$/;
        const isValid = phoneRegex.test(normalizedPhoneNumber);
        if (!isValid) {
          newErrors.Telefon = "Felaktigt format på nummer"
        }
      }
    }
    //console.log(newErrors)
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleDietChange = (diet: string) => {
    setFormData(prevData => ({
      ...prevData,
      dietaryRestrictions: prevData.dietaryRestrictions.includes(diet)
        ? prevData.dietaryRestrictions.filter(d => d !== diet)
        : [...prevData.dietaryRestrictions, diet]
    }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      // Replace with your actual API call
      await sendToMailApi(formData);
      //console.log(formData)
      toast({
        title: "Svar skickat! ✉️",
        description: "Tack för att ni svarade! 🐶",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit RSVP. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      Kommer: isAttending
    }));
  }, [isAttending]);

  return (
    <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg" color={"brand.clay"}>
      <form>
        <VStack spacing={4}>
            <FormControl key={"Namn"} isInvalid={!!errors.Namn}>
                   <FormLabel
                   textAlign="left"
                   fontWeight="bold" 
                   fontFamily="adelio"
                   userSelect="none"
                   fontSize={["1xl", "2xl", "3xl"]}
                   color="brand.clay">
                     Namn
                   </FormLabel>
                   <Input
                     name={"Namn"}
                     value={formData.Namn}
                     onChange={handleInputChange}
                   />
                   <FormErrorMessage>{errors.Namn}</FormErrorMessage>
          </FormControl>
          <FormControl>
            <HStack spacing={8} justify="center">
              <VStack>
                <Checkbox
                  isChecked={isAttending}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setIsAttending(true);
                    }
                  }}
                >
                  <FormLabel 
                    textAlign="center"
                    fontWeight="bold" 
                    fontFamily="adelio"
                    userSelect="none"
                    fontSize={["1xl", "2xl", "3xl"]}
                    color="brand.clay"
                    mb="0" // Remove bottom margin
                  >
                    Jag kommer!
                  </FormLabel>
                </Checkbox>
              </VStack>
              
              <VStack>
                <Checkbox
                  isChecked={!isAttending}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setIsAttending(false);
                      // Reset all fields except Namn
                      setFormData(prevData => ({
                        Kommer: false,
                        Namn: prevData.Namn, // Keep the name
                        Email: "",
                        Telefon: "",
                        allergier: "",
                        annanDiet: "",
                        dietaryRestrictions: [],
                        selectedDates: []
                      }));
                    }
                  }}
                >
                  <FormLabel 
                    textAlign="center"
                    fontWeight="bold" 
                    fontFamily="adelio"
                    userSelect="none"
                    fontSize={["1xl", "2xl", "3xl"]}
                    color="brand.clay"
                    mb="0" // Remove bottom margin
                  >
                    Jag kommer inte
                  </FormLabel>
                </Checkbox>
              </VStack>
            </HStack>
          </FormControl>

          {isAttending && (
            <>
              {freeTextFields.map((freeTexField: string) => (
                  <FormControl key={freeTexField} isInvalid={!!errors[freeTexField as keyof fieldErrorType]}>
                   <FormLabel
                   textAlign="left"
                   fontWeight="bold" 
                   fontFamily="adelio"
                   userSelect="none"
                   fontSize={["1xl", "2xl", "3xl"]}
                   color="brand.clay">
                     {freeTexField}
                   </FormLabel>
                   <Input
                     name={freeTexField}
                     value={String(formData[freeTexField as keyof formDataType] || '')}
                     onChange={handleInputChange}
                   />
                   <FormErrorMessage>{errors[freeTexField as keyof fieldErrorType]}</FormErrorMessage>
                 </FormControl>
              ))}
              <FormControl>
              <FormLabel 
                textAlign="left"
                fontWeight="bold" 
                fontFamily="adelio"
                userSelect="none"
                fontSize={["1xl", "2xl", "3xl"]}
                color="brand.clay"
              >
                Kostpreferenser
              </FormLabel>
              <VStack align="start" spacing={2}>
                {dietRestrictions.map((dietResriction: string) => (
                  <Checkbox
                    key={dietResriction}
                    isChecked={formData.dietaryRestrictions.includes(dietResriction)}
                    onChange={() => handleDietChange(dietResriction)}
                  >
                    <Text fontSize={["1xl","2xl"]} fontFamily={"adelio"} >
                      {dietResriction}
                    </Text>
                  </Checkbox>
                ))}
                {formData.dietaryRestrictions.includes('Annat') && (
                  <Input
                    placeholder="Ange andra kostpreferenser"
                    value={formData.annanDiet}
                    onChange={(e) => setFormData(prevData => ({
                      ...prevData,
                      annanDiet: e.target.value
                    }))}
                  />
                )}
                {formData.dietaryRestrictions.includes('Allergier') && (
                  <Input
                    placeholder="Ange allergier"
                    value={formData.allergier}
                    onChange={(e) => setFormData(prevData => ({
                      ...prevData,
                      allergier: e.target.value
                    }))}
                  />
                )}
              </VStack>
            </FormControl>
            <FormControl>
            <Checkbox
              isChecked={isStayingOverNight}
              onChange={(e) => setIsStayingOverNight(e.target.checked)}
            >
              <FormLabel 
                textAlign="center"
                fontWeight="bold" 
                fontFamily="adelio"
                userSelect="none"
                fontSize={["1xl", "2xl", "3xl"]}
                color="brand.clay">
                Vi vill sova över!
            </FormLabel>
            </Checkbox>
          </FormControl>
          {isStayingOverNight &&
            <HStack spacing={4} mt={4}>
              <DayBox formData={formData} setFormData={setFormData} day="Fredag" />
              <DayBox formData={formData} setFormData={setFormData} day="Lördag" />
            </HStack>
          }
            </>
          )}

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
                Skicka svar
            </Text>
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Rsvp;
