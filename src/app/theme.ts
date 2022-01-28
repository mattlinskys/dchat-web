import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "#F8F9FD",
      },
      a: {
        color: "teal.500",
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
  components: {
    Link: {
      baseStyle: {
        color: "blue.600",
      },
    },
  },
});

export default theme;
