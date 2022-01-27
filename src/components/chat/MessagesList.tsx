import React, { memo, useContext, useEffect, useState } from "react";
import ChatContext from "contexts/ChatContext";
import { useContractCalls } from "@usedapp/core";
import { chatAbi } from "app/abis";

export interface MessagesListProps {
  take?: number;
}

const MessagesList: React.FC<MessagesListProps> = ({ take = 10 }) => {
  const { chat } = useContext(ChatContext)!;
  const [skip, setSkip] = useState(0);
  useContractCalls(
    chat && chat.membersCount > 0
      ? new Array(Math.max(chat.messagesCount, take)).fill(null).map((_, i) => {
          const msgIndex = chat.messagesCount - i - skip;
          return msgIndex < 0
            ? false
            : {
                abi: chatAbi,
                address: chat.address,
                method: "messages",
                args: [msgIndex],
              };
        })
      : []
  );
  useEffect(() => {}, [chat?.messagesCount]);

  return null;
};

export default memo(MessagesList);
