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
import {
  Box,
  Spinner,
  Text,
  HStack,
  Link,
  Button,
  Icon,
  Divider,
} from "@chakra-ui/react";
import ChatContext from "contexts/ChatContext";
import ms from "ms";
import MessagesProvider from "providers/MessagesProvider";
import MembersProvider from "providers/MembersProvider";
import Chat from "components/chat/Chat";
import ChatMetaTitle from "components/chat/ChatMetaTitle";
import useSnackbar from "hooks/useSnackbar";
import { FormattedMessage, useIntl } from "react-intl";
import CachedChatsProvider from "providers/CachedChatsProvider";
// import ChatProvider from "providers/ChatProvider";
import useChatRemovedEvents from "hooks/useChatRemovedEvents";
import InfoDialog from "components/shared/InfoDialog";
import MetaMaskIcon from "components/icons/MetaMaskIcon";
import { useConnect } from "wagmi";
import useConnectErrorSnackbar from "hooks/useConnectErrorSnackbar";

const ChatPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, pathname, search } = useLocation() as Location & {
    state: null | { new?: boolean };
  };
  const { formatMessage } = useIntl();
  const [
    {
      data: {
        connected: isConnected,
        connectors: [connector],
      },
      error,
      loading: isConnecting,
    },
    connect,
  ] = useConnect();
  useConnectErrorSnackbar(error);
  const snackbar = useSnackbar();
  const { chat, isLoaded } = useChat(id!);

  useEffect(() => {
    if (!chat && isLoaded) {
      const notFound = () => {
        navigate(HOME_PATH, { replace: true });
        snackbar(
          "error",
          formatMessage(
            { id: "chat.join.not-found" },
            {
              id,
            }
          )
        );
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
      navigate(pathname + search, { replace: true });
    }
  }, [!!chat, state?.new]);

  useChatRemovedEvents(id!, () => {
    navigate(HOME_PATH, { replace: true });
    snackbar(
      "error",
      formatMessage(
        { id: "chat.join.removed" },
        {
          id,
        }
      )
    );
  });

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
        <CachedChatsProvider>
          {/* <ChatProvider id={id as string}> */}
          <ChatContext.Provider value={contextValue}>
            <MembersProvider>
              <MessagesProvider>
                <ChatMetaTitle />
                <Chat />
              </MessagesProvider>
            </MembersProvider>
          </ChatContext.Provider>
          {/* </ChatProvider> */}
        </CachedChatsProvider>
      ) : (
        <Box
          position="fixed"
          top="50%"
          left="50%"
          lineHeight="none"
          transform="auto"
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

      <InfoDialog
        isOpen={!isConnected && !isConnecting}
        title={<FormattedMessage id="no-wallet-info.title" />}
        details={<FormattedMessage id="no-wallet-info.details" />}
      >
        <Box
          mt="4"
          w="full"
          display="flex"
          flexDirection="column"
          align="stretch"
        >
          <Button
            onClick={() => connect(connector)}
            variant="outline"
            size="lg"
            leftIcon={<Icon as={MetaMaskIcon} w="5" h="auto" />}
          >
            <FormattedMessage id="no-wallet-info.connect" />
          </Button>
          <Divider mt="6" mb="4" />
          <Button onClick={() => navigate(HOME_PATH)} mb="-2">
            <FormattedMessage id="no-wallet-info.go-back" />
          </Button>
        </Box>
      </InfoDialog>
    </>
  );
};

export default ChatPage;
