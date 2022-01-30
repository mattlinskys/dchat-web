import React, { useEffect, useMemo } from "react";
import useChat from "hooks/useChat";
import {
  useNavigate,
  useParams,
  useLocation,
  Location,
} from "react-router-dom";
import { HOME_PATH } from "constants/routes";
import { Box, VStack, Spinner, useToast } from "@chakra-ui/react";
import ChatContext from "contexts/ChatContext";
import ms from "ms";
import MessagesList from "components/chat/MessagesList";
import SendMsgForm from "components/chat/SendMsgForm";
import useChatMembers from "hooks/useChatMembers";
import MessagesProvider from "providers/MessagesProvider";

const ChatPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, pathname, search } = useLocation() as Location & {
    state: null | { new?: boolean };
  };
  const toast = useToast();
  const { chat, isLoaded } = useChat(id!);
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
      if (state?.new) {
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

  useEffect(() => {
    if (chat && state?.new) {
      // * Reset state
      navigate(pathname + search);
    }
  }, [!!chat, state?.new]);

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

  return contextValue ? (
    <ChatContext.Provider value={contextValue}>
      <MessagesProvider>
        <VStack
          maxW="sm"
          mx="auto"
          my="8"
          p="4"
          spacing="4"
          align="stretch"
          rounded="md"
          border="1px"
          borderColor="gray.200"
        >
          <MessagesList />
          <SendMsgForm />
        </VStack>
      </MessagesProvider>
    </ChatContext.Provider>
  ) : (
    <Box
      position="fixed"
      top="50%"
      left="50%"
      lineHeight="none"
      transform="auto-gpu"
      translateX="-50%"
      translateY="-50%"
    >
      <Spinner size="xl" />
    </Box>
  );
};

export default ChatPage;
