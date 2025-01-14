import { Flex } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Karta from "./components/Karta";
import Resa from "./components/Resa";
import Rsvp from "./components/RSVP";
import Header from "./components/Header";
import Timeline from "./components/Timeline";

function App() {
  return (
    <Router>
      <Flex 
        direction="column" 
        bg="gray.800" 
        minHeight="100vh" 
        width="100vw"
        overflow="hidden" // Prevents any potential scrolling issues
      >
        <Header />
        <Flex flex={1} position="relative"> {/* Changed Box to Flex and added position="relative" */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tidslinje" element={<Timeline />} /> 
            <Route path="/karta" element={<Karta />} />
            <Route path="/resa" element={<Resa />} />
            <Route path="/rsvp" element={<Rsvp />} />
          </Routes>
        </Flex>
      </Flex>
    </Router>
  );
}


export default App;
