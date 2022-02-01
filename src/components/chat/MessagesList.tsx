import React, { memo, useCallback, useContext, useMemo, useState } from "react";
import ChatContext from "contexts/ChatContext";
import Message from "components/chat/Message";
import { Box, Stack, Text, VStack } from "@chakra-ui/react";
import useContractEvents from "hooks/useContractEvents";
import { Contract } from "ethers";
import { chatAbi } from "app/abis";
import EmptyChat from "components/assets/EmptyChat";
import { FormattedMessage } from "react-intl";

export interface MessagesListProps {
  take?: number;
}

const MessagesList: React.FC<MessagesListProps> = ({ take = 10 }) => {
  const { chat } = useContext(ChatContext);
  const [page, setPage] = useState(0);
  const range = useMemo(() => {
    if (chat.messagesCount.isZero()) {
      return [];
    }
    const to = chat.messagesCount.toNumber();
    const from = Math.max(to - take * (page + 1), 0);
    return new Array(to - from)
      .fill(null)
      .map((_, i) => i + from + 1)
      .reverse();
  }, [take, page, chat.messagesCount]);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      if (!chat) {
        return;
      }
      // TODO:
    },
    [range.length, chat.messagesCount]
  );

  useContractEvents(new Contract(chat.address, chatAbi), "MsgSent", (id) => {
    // TODO:
  });

  return (
    <Box h="md" display="flex">
      {range.length === 0 ? (
        <VStack mt="auto" mb="8" w="full" spacing="3">
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
      ) : (
        <Stack
          w="full"
          direction="column-reverse"
          overflowY="auto"
          align="stretch"
          spacing="2"
          py="3"
          onScroll={handleScroll}
        >
          {chat && range.map((id) => <Message key={id} id={id} />)}
        </Stack>
      )}
    </Box>
  );
};

export default memo(MessagesList);
