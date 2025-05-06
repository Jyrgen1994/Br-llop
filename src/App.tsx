import { Flex, Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Karta from "./components/Karta";
import Resa from "./components/Resa";
import Header from "./components/Header";
import Timeline from "./components/Timeline";
import Info from "./components/Info";
import { useEffect, useState } from "react";

function App() {
  // State to track header height
  const [headerHeight, setHeaderHeight] = useState("0px");
  
  // Measure the actual header height after render
  useEffect(() => {
    const updateHeaderHeight = () => {
      const headerElement = document.querySelector('header');
      if (headerElement) {
        const height = `${headerElement.offsetHeight}px`;
        setHeaderHeight(height);
      }
    };
    
    // Initial measurement
    updateHeaderHeight();
    
    // Update on resize
    window.addEventListener('resize', updateHeaderHeight);
    
    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, []);

  return (
    <Router>
      <Flex
        direction="column"
        bg="gray.800"
        minHeight="100vh"
        width="100vw"
        maxWidth="100%" 
        overflow="hidden"
      >
        <Header />
        <Box
          pt={headerHeight} // Dynamic padding based on actual header height
          flex={1}
          position="relative"
          id="content-wrapper" // ID for Lenis to target
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/info" element={<Info />} />
            <Route path="/tidslinje" element={<Timeline />} />
            <Route path="/karta" element={<Karta />} />
            <Route path="/resa" element={<Resa />} />
          </Routes>
        </Box>
      </Flex>
    </Router>
  );
}

export default App;