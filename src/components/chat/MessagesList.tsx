import React, { useCallback, useContext } from "react";
import Message from "components/chat/Message";
import { Spinner, Stack, Text, VStack } from "@chakra-ui/react";
import EmptyChat from "components/assets/EmptyChat";
import { FormattedMessage } from "react-intl";
import MessagesContext from "contexts/MessagesContext";
import DateBreaker from "components/shared/DateBreaker";
import ChatIndent from "components/chat/ChatIndent";
import { TChatEntry } from "types/chat";
import ChatMemberNotification from "components/chat/ChatMemberNotification";

const MessagesList: React.FC = () => {
  const { chatEntries, isFetching, isInitialized, fetchNextMessages } =
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
      py="4"
      onScroll={handleScroll}
    >
      {chatEntries.length === 0 && isInitialized ? (
        <VStack mb="8" w="full" spacing="3">
          <EmptyChat />
          <Text
            color="gray.300"
            whiteSpace="pre-wrap"
            textAlign="center"
            lineHeight="5"
          >
            <FormattedMessage id="chat.empty.description" />
          </Text>
        </VStack>
      ) : (
        <VStack w="full" spacing="2">
          <DateBreaker<TChatEntry>
            items={chatEntries}
            getItemKey={(entry) => entry.id.toString()}
            getItemDate={(entry) => entry.createdAt}
            renderItem={(entry) =>
              entry.type === "message" || entry.type === "pending-message" ? (
                <Message
                  message={entry.item}
                  isPending={entry.type === "pending-message"}
                />
              ) : entry.type === "member-added" ||
                entry.type === "member-removed" ? (
                <ChatMemberNotification
                  account={entry.item.account}
                  suffix={
                    <FormattedMessage
                      id={
                        entry.type === "member-added"
                          ? "chat.notification.member-joined"
                          : "chat.notification.member-removed"
                      }
                    />
                  }
                />
              ) : null
            }
            renderBreak={(localeDate) => (
              <ChatIndent>
                {localeDate === new Date().toLocaleDateString() ? (
                  <FormattedMessage id="common.today" />
                ) : localeDate ===
                  new Date(
                    new Date().setDate(new Date().getDate() - 1)
                  ).toLocaleDateString() ? (
                  <FormattedMessage id="common.yesterday" />
                ) : (
                  localeDate
                )}
              </ChatIndent>
            )}
          />
        </VStack>
      )}

      {isFetching && <Spinner flexShrink="0" mb="4" opacity="0.8" />}
    </Stack>
  );
};

export default MessagesList;
