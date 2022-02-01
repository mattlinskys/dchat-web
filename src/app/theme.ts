import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

const theme = extendTheme(
  {
    colors: {
      gray: {
        300: "#999999",
        400: "#4E4E4E",
        500: "#6A6A6A",
        600: "#343434",
        700: "#2A2A2A",
      },
      brand: {
        500: "#FFB74E",
        // 600: "#303CBE",
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
            color: "gray.700",
          },
        },
      },
    },
  },
  withDefaultColorScheme({ colorScheme: "brand" })
);

export default theme;
