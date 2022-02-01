import React from "react";
import { Box, Heading, HStack } from "@chakra-ui/react";
import MessagesList from "components/chat/MessagesList";
import SendMsgForm from "components/chat/SendMsgForm";

const Chat: React.FC = () => {
  return (
    <Box
      maxW="md"
      w="full"
      mx="auto"
      mt="20"
      mb="8"
      rounded="md"
      border="1px"
      borderColor="gray.500"
    >
      <HStack
        p="3"
        borderBottom="1px"
        borderBottomColor="gray.500"
        borderStyle="solid"
      >
        <Heading fontSize="lg">Chat #id</Heading>
      </HStack>

      <MessagesList />

      <HStack
        px="3"
        py="2"
        borderTop="1px"
        borderTopColor="gray.500"
        borderStyle="solid"
      >
        <SendMsgForm />
      </HStack>
    </Box>
  );
};

export default Chat;
