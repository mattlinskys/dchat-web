import React, { memo, useContext, useEffect, useState } from "react";
import ChatContext from "contexts/ChatContext";
import { useContractCalls, useEthers } from "@usedapp/core";
import { chatAbi } from "app/abis";
import { BigNumber, Contract } from "ethers";
import { IMessage } from "types/message";
import Message from "components/chat/Message";
import useChatContract from "hooks/useChatContract";

export interface MessagesListProps {
  take?: number;
}

const MessagesList: React.FC<MessagesListProps> = ({ take = 10 }) => {
  const { chat } = useContext(ChatContext)!;
  const { library } = useEthers();
  const [skip, setSkip] = useState(0);
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    if (!chat || !library) {
      return;
    }

    (async () => {
      const chatContract = new Contract(chat.address, chatAbi, library);
      // TODO:
      const result = await chatContract.messages(1);

      const msg: IMessage = {
        id: result.id,
        ...(result.replyTo.isZero() ? {} : { replyTo: result.replyTo }),
        sender: result.sender,
        ...(result.data ? { data: result.data } : {}),
        isEncrypted: result.encrypted,
        sentAt: new Date(result.time.toNumber() * 1000),
      };
      setMessages([msg]);
    })();
  }, [library, skip, take, chat?.address]);

  return (
    <>
      {messages.map((msg) => (
        <Message key={msg.id.toString()} message={msg} />
      ))}
    </>
  );
};

export default memo(MessagesList);
