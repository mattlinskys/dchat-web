import React, { memo, useContext, useMemo } from "react";
import VCard from "components/shared/VCard";
import useProfile from "hooks/useProfile";
import { IMessage } from "types/message";
import EncryptedMessageContent from "components/chat/EncryptedMessageContent";
import { Box, Text } from "@chakra-ui/react";
import { useContractCall, useEthers } from "@usedapp/core";
import { chatAbi } from "app/abis";
import ChatContext from "contexts/ChatContext";

export interface MessageProps {
  id: number;
}

const Message: React.FC<MessageProps> = ({ id }) => {
  const { chat } = useContext(ChatContext);
  const { account } = useEthers();
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
        sentAt: new Date(result.time.toNumber() * 1000),
      } as IMessage),
    [result]
  );
  const { profile: sender } = useProfile(message?.sender);

  return (
    <Box px="3" py="1">
      {message && (
        <>
          <VCard
            user={sender}
            account={message.sender}
            isMe={message.sender === account}
            avatarSize="9"
            details={
              <Text
                as="time"
                title={message.sentAt.toISOString()}
                ml="1"
                fontSize="xs"
                color="gray.300"
              >
                {message.sentAt.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            }
          />
          <Box pl="10" mt="2">
            <EncryptedMessageContent messageId={message.id} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default memo(Message);
