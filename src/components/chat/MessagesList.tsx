import React, { memo, useCallback, useContext, useMemo, useState } from "react";
import ChatContext from "contexts/ChatContext";
import Message from "components/chat/Message";
import { Heading, Stack, VStack } from "@chakra-ui/react";
import useContractEvents from "hooks/useContractEvents";
import { Contract } from "ethers";
import { chatAbi } from "app/abis";

export interface MessagesListProps {
  take?: number;
}

const MessagesList: React.FC<MessagesListProps> = ({ take = 2 }) => {
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
    <VStack spacing="2" align="stretch">
      <Heading fontSize="xl">
        Messages ({chat.messagesCount.toNumber()})
      </Heading>

      <Stack
        direction="column-reverse"
        overflowY="auto"
        align="stretch"
        spacing="2"
        onScroll={handleScroll}
      >
        {chat && range.map((id) => <Message key={id} id={id} />)}
      </Stack>
    </VStack>
  );
};

export default memo(MessagesList);
