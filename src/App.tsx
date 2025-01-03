import { Box, Flex } from '@chakra-ui/react';
import SimpleSidebar from './components/Sidebar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Vart from './components/Vart';
import Boende from './components/Boende';
import Resa from './components/Resa';
import { useState } from 'react';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  return (
    <Router>
      <Flex bg={"brand.sage"} minHeight="100vh" width="100vw">
      <SimpleSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}/>
        <Box
          flex={1}
          ml={{ base: 0, md: isSidebarOpen ? '300px' : '150px' }}
          transition="margin-left 0.3s"
        >

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vart" element={<Vart />} />
            <Route path="/resa" element={<Resa />} />
            <Route path="/boende" element={<Boende />} />
          </Routes>
        </Box>
    </Flex>
    </Router>
  );
}

export default App;
