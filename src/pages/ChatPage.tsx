import React, { useEffect, useMemo } from "react";
import useChat from "hooks/useChat";
import {
  useNavigate,
  useParams,
  useLocation,
  Location,
  Link as RouterLink,
} from "react-router-dom";
import { HOME_PATH } from "constants/routes";
import { Box, Spinner, Text, HStack, Link } from "@chakra-ui/react";
import ChatContext from "contexts/ChatContext";
import ms from "ms";
import MessagesProvider from "providers/MessagesProvider";
import MembersProvider from "providers/MembersProvider";
import Chat from "components/chat/Chat";
import ChatMetaTitle from "components/chat/ChatMetaTitle";
import useSnackbar from "hooks/useSnackbar";
import { FormattedMessage } from "react-intl";

const ChatPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, pathname, search } = useLocation() as Location & {
    state: null | { new?: boolean };
  };
  const snackbar = useSnackbar();
  const { chat, isLoaded } = useChat(id!);

  useEffect(() => {
    if (!chat && isLoaded) {
      const notFound = () => {
        navigate(HOME_PATH);
        // TODO:
        snackbar("error", "Chat not found");
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

      <HStack mt="auto" justify="center" spacing="2" p="4">
        <Link as={RouterLink} to="/">
          <Text as="span" px="2" py="1" color="gray.200">
            <FormattedMessage id="chat.footer.nav.home" />
          </Text>
        </Link>

        <Link
          href="//github.com/mattlinskys/dchat-web"
          rel="noopener noreferrer nofollow"
          target="_blank"
        >
          <Text as="span" px="2" py="1" color="gray.200">
            <FormattedMessage id="chat.footer.nav.github" />
          </Text>
        </Link>
      </HStack>
    </>
  );
};

export default ChatPage;
