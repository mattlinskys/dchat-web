import React, { memo } from "react";
import MessageContent from "components/chat/MessageContent";
import VCard from "components/shared/VCard";
import useProfile from "hooks/useProfile";
import { IMessage } from "types/message";
import EncryptedMessageContent from "components/chat/EncryptedMessageContent";
import { Box } from "@chakra-ui/react";

export interface MessageProps {
  message: IMessage;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const [sender] = useProfile(message.sender);

  return (
    <Box my="3">
      <VCard user={sender} />
      {message.isEncrypted ? (
        <EncryptedMessageContent messageId={message.id} />
      ) : (
        <MessageContent content={message.data!} />
      )}
    </Box>
  );
};

export default memo(Message);
