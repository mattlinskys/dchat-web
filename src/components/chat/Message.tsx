import React, { memo, useContext, useMemo } from "react";
import MessageContent from "components/chat/MessageContent";
import VCard from "components/shared/VCard";
import useProfile from "hooks/useProfile";
import { IMessage } from "types/message";
import EncryptedMessageContent from "components/chat/EncryptedMessageContent";
import { Box } from "@chakra-ui/react";
import { useContractCall } from "@usedapp/core";
import { chatAbi } from "app/abis";
import ChatContext from "contexts/ChatContext";

export interface MessageProps {
  id: number;
}

const Message: React.FC<MessageProps> = ({ id }) => {
  const { chat } = useContext(ChatContext);
  const result = useContractCall({
    abi: chatAbi,
    address: chat.address,
    method: "messages",
    args: [id],
  }) as any | undefined;
  const message = useMemo<IMessage | undefined>(
    () =>
      result &&
      ({
        id: result.id,
        ...(result.replyTo.isZero() ? {} : { replyTo: result.replyTo }),
        sender: result.sender,
        ...(result.data ? { data: result.data } : {}),
        isEncrypted: result.encrypted,
        sentAt: new Date(result.time.toNumber() * 1000),
      } as IMessage),
    [result]
  );
  const { profile: sender } = useProfile(message?.sender);

  return (
    <Box>
      {message && (
        <>
          <VCard user={sender} />
          {message.isEncrypted ? (
            <EncryptedMessageContent messageId={message.id} />
          ) : (
            <MessageContent content={message.data!} />
          )}
        </>
      )}
    </Box>
  );
};

export default memo(Message);
