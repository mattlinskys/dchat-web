import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import MessagesList from "components/chat/MessagesList";
import SendMsgForm from "components/chat/SendMsgForm";
import ChatHeader from "components/chat/ChatHeader";
import ChatsMenu from "components/chat/ChatsMenu";

const Chat: React.FC = () => (
  <VStack w="full" spacing="3" flexGrow="1" justify="center">
    <ChatsMenu />

    <Box
      maxW="md"
      w="full"
      rounded="md"
      border="1px"
      borderColor="gray.400"
      bg="gray.700"
    >
      <ChatHeader />
      <MessagesList />

      <SendMsgForm />
    </Box>
  </VStack>
);

export default Chat;
