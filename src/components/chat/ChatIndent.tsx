import React from "react";
import { HStack, Divider, Text } from "@chakra-ui/react";

const ChatIndent: React.FC = ({ children }) => (
  <HStack w="full" pl="14" pr="3" spacing="2">
    <Text fontSize="sm" color="gray.300" whiteSpace="nowrap" flexShrink="0">
      {children}
    </Text>

    <Divider />
  </HStack>
);

export default ChatIndent;
