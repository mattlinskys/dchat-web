import React from "react";
import { HStack, Divider, Text } from "@chakra-ui/react";

const ChatIndent: React.FC = ({ children }) => (
  <HStack w="full" pl="14" pr="3" spacing="2" maxW="100%" flexShrink="0">
    <Text
      as="span"
      fontSize="sm"
      color="gray.300"
      whiteSpace="nowrap"
      flexShrink="0"
      isTruncated
    >
      {children}
    </Text>

    <Divider />
  </HStack>
);

export default ChatIndent;
