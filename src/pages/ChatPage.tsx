import React, { useEffect, useMemo } from "react";
import useChat from "hooks/useChat";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { HOME_PATH } from "constants/routes";
import { Box, useToast } from "@chakra-ui/react";
import ChatContext from "contexts/ChatContext";
import ms from "ms";
import MessagesList from "components/chat/MessagesList";
import SendMsgForm from "components/chat/SendMsgForm";
import useChatMembers from "hooks/useChatMembers";

const ChatPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state } = useLocation();
  const toast = useToast();
  const [chat, isLoaded] = useChat(id!);
  const members = useChatMembers(chat?.address);

  useEffect(() => {
    if (!chat && isLoaded) {
      const notFound = () => {
        navigate(HOME_PATH);
        toast({
          title: "Chat not found",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      };

      let timeout: ReturnType<Window["setTimeout"]>;
      if ((state as null | { new?: boolean })?.new) {
        // * Wait for the next block
        timeout = window.setTimeout(notFound, ms("16s"));
      } else {
        notFound();
      }

      return () => {
        window.clearTimeout(timeout);
      };
    }
  }, [isLoaded]);

  const contextValue = useMemo(
    () =>
      chat
        ? {
            chat,
            isLoaded,
            members,
          }
        : undefined,
    [chat, isLoaded]
  );

  return (
    <ChatContext.Provider value={contextValue}>
      {chat && (
        <Box
          maxW="sm"
          mx="auto"
          my="8"
          p="4"
          rounded="md"
          border="1px"
          borderColor="gray.200"
        >
          <MessagesList />
          <SendMsgForm />
        </Box>
      )}
    </ChatContext.Provider>
  );
};

export default ChatPage;
