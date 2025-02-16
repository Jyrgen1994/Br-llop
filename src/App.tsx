import { Flex } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Karta from "./components/Karta";
import Resa from "./components/Resa";
import Header from "./components/Header";
import Timeline from "./components/Timeline";
import Authentication from "./components/Authentication";
import Info from "./components/Info";

function App() {
  return (
    <Router>
      <Flex 
        direction="column" 
        bg="gray.800" 
        minHeight="100vh" 
        width="100vw"
        maxWidth="100%" // Ensure content doesn't overflow
        overflow="hidden"
      >
        <Header />
        <Flex 
          flex={1} 
          position="relative"
          direction="column" // Added for better mobile layout
        > 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/info" element={<Info />} />
            <Route path="/tidslinje" element={<Timeline />} /> 
            <Route path="/karta" element={<Karta />} />
            <Route path="/resa" element={<Resa />} />
            <Route path="/rsvp" element={<Authentication />} />
          </Routes>
        </Flex>
      </Flex>
    </Router>
  );
}


export default App;
