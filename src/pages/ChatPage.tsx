import React, { useEffect, useMemo } from "react";
import useChat from "hooks/useChat";
import {
  useNavigate,
  useParams,
  useLocation,
  Location,
} from "react-router-dom";
import { HOME_PATH } from "constants/routes";
import { Box, Spinner, useToast, Text, HStack } from "@chakra-ui/react";
import ChatContext from "contexts/ChatContext";
import ms from "ms";
import MessagesProvider from "providers/MessagesProvider";
import MembersProvider from "providers/MembersProvider";
import Chat from "components/chat/Chat";
import ChatMetaTitle from "components/chat/ChatMetaTitle";

const ChatPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, pathname, search } = useLocation() as Location & {
    state: null | { new?: boolean };
  };
  const toast = useToast();
  const { chat, isLoaded } = useChat(id!);

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
          }
        : undefined,
    [chat, isLoaded]
  );

  return (
    <>
      {contextValue ? (
        <ChatContext.Provider value={contextValue}>
          <MembersProvider>
            <MessagesProvider>
              <ChatMetaTitle />
              <Chat />
            </MessagesProvider>
          </MembersProvider>
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
      )}

      <HStack mt="auto" justify="center" p="4">
        <Text color="gray.200">Footer</Text>
      </HStack>
    </>
  );
};

export default ChatPage;
