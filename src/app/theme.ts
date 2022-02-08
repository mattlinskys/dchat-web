import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

const Input = {
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
};

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
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='1000' height='1478' viewBox='0 0 1000 1478' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m524.046 479.1 5.837-5.678c110.074-104.098 282.72-103.16 389.347 3.517 107.446 107.496 107.572 282.061 1.1 392.056l-3.26 3.314-220.43 220.534-9.681 9.913c-86.012 90.146-141.663 205.026-158.766 328.207-4.097 29.51-31.296 50.372-60.75 46.595-29.454-3.777-50.01-30.762-45.913-60.273 20.784-149.689 89.66-289.02 196.141-396.948l3.238-3.26 220.43-220.535 4.597-4.773c62.834-67.735 61.885-173.046-3.269-238.23-66.038-66.07-173.28-66.148-240.854-.677l-2.036 2.004-261.906 262.03-3.265 3.015c-21.254 18.103-53.015 17.277-72.882-2.6-20.703-20.712-20.728-54.349-.212-75.544l.628-.638L524.046 479.1Zm-52.24-432.063c4.098-29.51 31.297-50.372 60.751-46.595 29.454 3.777 50.01 30.762 45.913 60.273-20.784 149.689-89.66 289.02-196.141 396.948l-3.238 3.26-220.43 220.535-4.597 4.773c-62.834 67.735-61.885 173.046 3.269 238.23 66.038 66.07 173.28 66.148 240.854.677l2.036-2.004 261.906-262.03 3.265-3.015c21.254-18.103 53.015-17.277 72.882 2.6 20.703 20.712 20.728 54.349.212 75.544l-.628.638L475.954 998.9l-5.837 5.677c-110.074 104.098-282.72 103.16-389.347-3.517C-26.676 893.565-26.802 719 79.67 609.005l3.26-3.314 220.43-220.534 9.681-9.913c86.012-90.146 141.663-205.026 158.766-328.207Z' fill='%23383737' fill-rule='nonzero' opacity='.4'/%3E%3C/svg%3E")`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        },
        a: {
          fontWeight: "medium",
          _hover: {
            textDecoration: "underline",
          },
        },
        "aside.emoji-picker-react": {
          boxShadow: "none",
          bg: "gray.600",
          borderColor: "gray.500",
        },
        ".emoji-picker-react .emoji-group:before": {
          bg: "gray.600",
        },
        ".emoji-picker-react .emoji button": {
          color: "gray.500",
        },
        ".emoji-picker-react .emoji-categories button": {
          filter: "invert(1)",
        },
        ".emoji-picker-react .active-category-indicator-wrapper .active-category-indicator":
          {
            bg: "brand.500",
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
      Input,
      Textarea: {
        baseStyle: Input.baseStyle.field,
        variants: {
          filled: Input.variants.filled.field,
        },
        defaultProps: Input.defaultProps,
      },
      Button: {
        variants: {
          solid: {
            bg: "brand.500",
            color: "gray.700",
          },
          outline: {
            bg: "gray.600",
            borderColor: "gray.400",
          },
          unstyled: {
            color: "brand.500",
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
