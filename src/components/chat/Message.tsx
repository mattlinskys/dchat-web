import React, { memo } from "react";
import MessageContent from "components/chat/MessageContent";
import VCard from "components/shared/VCard";
import useProfile from "hooks/useProfile";
import { IMessage } from "types/message";
import EncryptedMessageContent from "components/chat/EncryptedMessageContent";

export interface MessageProps {
  message: IMessage;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const [sender] = useProfile(message.sender);

  return (
    <>
      <VCard user={sender} />
      {message.encrypted ? (
        <EncryptedMessageContent messageId={message.id} />
      ) : (
        <MessageContent content={message.data} />
      )}
    </>
  );
};

export default memo(Message);
