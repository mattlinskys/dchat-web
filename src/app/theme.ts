import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

const theme = extendTheme(
  {
    config: {
      initialColorMode: "dark",
      useSystemColorMode: false,
    },
    colors: {
      gray: {
        300: "#999999",
        400: "#6A6A6A",
        500: "#4E4E4E",
        600: "#343434",
        700: "#2A2A2A",
      },
      brand: {
        500: "#FFB74E",
      },
    },
    fonts: {
      heading: "Lato",
      body: "Lato",
    },
    styles: {
      global: {
        body: {
          bg: "gray.700",
          color: "white",
        },
        a: {
          fontWeight: "medium",
          _hover: {
            textDecoration: "underline",
          },
        },
      },
    },
    components: {
      Link: {
        baseStyle: {
          color: "brand.500",
        },
      },
      Modal: {
        baseStyle: {
          dialog: {
            bg: "gray.600",
          },
        },
      },
      Input: {
        baseStyle: {
          field: {
            _placeholder: { color: "gray.200" },
          },
        },
        variants: {
          filled: {
            field: {
              bg: "#5D5B5B",
              _hover: {
                bg: "#5D5B5B",
              },
              _focus: {
                bg: "#5D5B5B",
              },
            },
          },
        },
        sizes: {
          md: {
            field: {
              px: 3,
            },
          },
        },
        defaultProps: {
          variant: "filled",
          focusBorderColor: "brand.500",
        },
      },
      Button: {
        variants: {
          solid: {
            bg: "brand.500",
            color: "gray.700",
          },
        },
      },
      Tooltip: {
        baseStyle: {
          bg: "gray.700",
          color: "whiteAlpha.900",
        },
      },
      Divider: {
        baseStyle: {
          bg: "gray.400",
        },
      },
    },
  },
  withDefaultColorScheme({ colorScheme: "brand" })
);

export default theme;
