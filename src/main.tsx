import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.ts";
import Fonts from "./components/Fonts.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <Fonts />
      <App />
    </ChakraProvider>
  </StrictMode>,
);
