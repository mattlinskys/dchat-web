import React, { memo } from "react";

export interface MessagesListProps {
  address: string;
  messagesCount: number;
}

const MessagesList: React.FC<MessagesListProps> = ({ address }) => {
  return null;
};

export default memo(MessagesList);
