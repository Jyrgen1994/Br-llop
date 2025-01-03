// src/theme.ts

import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      sage: "#7b8586",
      aloe: "#c2d1bb",
      babyBlue: "#c7e6e8",
      pink: "#f1dfd5",
      clay: "#d5baa1",
    },
  },
  fonts: {
    heading: '"Playfair Display", serif',
    body: '"Open Sans", sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: "white",
        color: "brand.navy",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
      },
      variants: {
        solid: {
          bg: "brand.blue",
          color: "white",
          _hover: {
            bg: "brand.lightBlue",
          },
        },
        outline: {
          borderColor: "brand.pink",
          color: "brand.navy",
          _hover: {
            bg: "brand.pink",
            color: "white",
          },
        },
      },
    },
    Heading: {
      baseStyle: {
        color: "brand.navy",
      },
    },
  },
});

export default theme;
