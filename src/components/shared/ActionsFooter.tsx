import React from "react";
import { HStack, StackProps } from "@chakra-ui/react";

export interface ActionsFooterProps extends StackProps {}

export const ActionsFooter: React.FC = (props) => (
  <HStack
    mt="4"
    w="full"
    display="flex"
    justifyContent="flex-end"
    spacing="2"
    {...props}
  />
);

export default ActionsFooter;
