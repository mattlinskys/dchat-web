import React, { useContext } from "react";
import { Box, VStack, HStack, Heading } from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";
import MessagesList from "components/chat/MessagesList";
import SendMsgForm from "components/chat/SendMsgForm";
import ChatHeader from "components/chat/ChatHeader";
import ChatContext from "contexts/ChatContext";

const Chat: React.FC = () => {
  const {
    chat: { id },
  } = useContext(ChatContext);

  return (
    <VStack w="full" spacing="4">
      <Heading fontSize="xl">
        <FormattedMessage id="chat.title" values={{ id }} ignoreTag />
      </Heading>

      <Box maxW="md" w="full" rounded="md" border="1px" borderColor="gray.400">
        <ChatHeader />
        <MessagesList />

        <HStack
          px="3"
          py="2"
          borderTop="1px"
          borderTopColor="gray.400"
          borderStyle="solid"
        >
          <SendMsgForm />
        </HStack>
      </Box>
    </VStack>
  );
};

export default Chat;
