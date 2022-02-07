import React, { useContext } from "react";
import { Box, VStack, Heading } from "@chakra-ui/react";
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
    <VStack w="full" spacing="4" flexGrow="1" justify="center">
      <Heading fontSize="xl">
        <FormattedMessage id="chat.title" values={{ id }} ignoreTag />
      </Heading>

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
};

export default Chat;
