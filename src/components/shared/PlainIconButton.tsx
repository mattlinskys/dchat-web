import React from "react";
import { chakra, ChakraComponent } from "@chakra-ui/react";

const PlainIconButton: ChakraComponent<"button"> = (props) => (
  <chakra.button
    type="button"
    lineHeight="0"
    opacity={0.75}
    transition="100ms opacity"
    willChange="opacity"
    _hover={{
      opacity: 1,
    }}
    {...props}
  />
);

export default PlainIconButton;
