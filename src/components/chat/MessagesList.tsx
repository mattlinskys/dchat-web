import React, { useCallback, useContext } from "react";
import Message from "components/chat/Message";
import { Spinner, Stack, Text, VStack } from "@chakra-ui/react";
import EmptyChat from "components/assets/EmptyChat";
import { FormattedMessage } from "react-intl";
import MessagesContext from "contexts/MessagesContext";

const MessagesList: React.FC = () => {
  const { messages, isFetching, fetchNextMessages } =
    useContext(MessagesContext);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      if (isFetching) {
        return;
      }

      const list = e.target as HTMLElement;
      if (list.offsetHeight - list.scrollTop + 48 > list.scrollHeight) {
        fetchNextMessages();
      }
    },
    [isFetching, fetchNextMessages]
  );

  return (
    <Stack
      w="full"
      h="md"
      direction="column-reverse"
      overflowY="auto"
      align="center"
      spacing="2"
      py="3"
      onScroll={handleScroll}
    >
      {messages.length === 0 && !isFetching ? (
        <>
          <VStack mb="8" w="full" spacing="3">
            <EmptyChat />
            <Text
              color="gray.300"
              whiteSpace="pre-wrap"
              textAlign="center"
              lineHeight="5"
            >
              <FormattedMessage id="chat.empty.description" ignoreTag />
            </Text>
          </VStack>
        </>
      ) : (
        <>
          {messages.map((message) => (
            <Message key={message.id.toString()} message={message} />
          ))}
        </>
      )}
      {isFetching && <Spinner flexShrink="0" mb="4" opacity="0.8" />}
    </Stack>
  );
};

export default MessagesList;
